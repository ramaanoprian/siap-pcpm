import { MODUL, type Fase, type ModulId } from '../data/modul';
import { SOAL } from '../data/soal';
import { addDays, daysBetween, parseDate, today } from '../util';
import type { JadwalTugas, Percobaan, StatusSoal } from './sync';

export type PerTopik = Record<string, { benar: number; total: number }>;
export interface JawabanItem {
  soal_id: string;
  pilih: number | null;
  benar: boolean;
}

export const byMulaiDesc = (a: Percobaan, b: Percobaan) => b.mulai_at.localeCompare(a.mulai_at);

/** Rata-rata skor 5 percobaan terakhir per modul (null bila belum pernah). */
export function rataSkorModul(percobaan: Percobaan[]): Record<ModulId, number | null> {
  const out = {} as Record<ModulId, number | null>;
  const sorted = [...percobaan].sort(byMulaiDesc);
  for (const m of MODUL) {
    const list = sorted.filter((p) => p.modul === m.id && p.skor != null).slice(0, 5);
    out[m.id] = list.length ? Math.round(list.reduce((s, p) => s + Number(p.skor), 0) / list.length) : null;
  }
  return out;
}

/** Akurasi per topik dari status soal (jawaban terakhir), diurutkan dari yang terlemah. */
export function topikLemah(status: StatusSoal[]) {
  const agg = new Map<string, { modul: ModulId; topik: string; benar: number; total: number }>();
  const byId = new Map(status.map((s) => [s.soal_id, s]));
  for (const s of SOAL) {
    const st = byId.get(s.id);
    if (!st || st.terakhir_benar == null) continue;
    const k = `${s.modul}|${s.topik}`;
    const cur = agg.get(k) ?? { modul: s.modul, topik: s.topik, benar: 0, total: 0 };
    cur.total++;
    if (st.terakhir_benar) cur.benar++;
    agg.set(k, cur);
  }
  return [...agg.values()]
    .map((a) => ({ ...a, persen: Math.round((a.benar / a.total) * 100) }))
    .sort((a, b) => a.persen - b.persen || b.total - a.total);
}

export function modulTerlemah(percobaan: Percobaan[]): ModulId {
  const rata = rataSkorModul(percobaan);
  // Modul yang belum pernah dicoba didahulukan.
  return [...MODUL].sort((a, b) => (rata[a.id] ?? -1) - (rata[b.id] ?? -1))[0].id;
}

/** Jumlah hari berturut-turut (sampai hari ini atau kemarin) yang ada kegiatan belajar. */
export function streak(percobaan: Percobaan[], tugas: JadwalTugas[]): number {
  const days = new Set<string>();
  for (const p of percobaan) days.add(localDay(p.mulai_at));
  for (const t of tugas) if (t.selesai && t.selesai_at) days.add(localDay(t.selesai_at));
  let d = today();
  if (!days.has(d)) d = addDays(d, -1);
  let n = 0;
  while (days.has(d)) {
    n++;
    d = addDays(d, -1);
  }
  return n;
}

const localDay = (iso: string) => {
  const d = new Date(iso);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

// ---------- Jadwal ----------

/** Fase belajar untuk suatu tanggal, dihitung dari tanggal mulai dan tanggal target tes. */
export function faseUntuk(tgl: string, mulai: string, target: string): Fase {
  const sisa = daysBetween(tgl, target);
  if (daysBetween(mulai, tgl) < 14 && sisa > 45) return 'diagnosis';
  if (sisa <= 30) return 'simulasi';
  if (sisa <= 90) return 'pendalaman';
  return 'dasar';
}

export interface TugasBaru {
  tanggal: string;
  fase: Fase;
  modul: string | null;
  deskripsi: string;
  target_menit: number;
}

const namaM = (m: ModulId) => MODUL.find((x) => x.id === m)!.nama;

/** Susun tugas harian untuk `hari` hari ke depan, melewati tanggal yang sudah punya tugas. */
export function susunJadwal(opts: {
  mulai: string;
  target: string;
  menit: number;
  hari: number;
  sudahAda: Set<string>;
  lemah: ModulId;
}): TugasBaru[] {
  const out: TugasBaru[] = [];
  const start = today();
  const urutan: ModulId[] = ['potensi-dasar', 'kebanksentralan', 'english'];
  for (let i = 0; i < opts.hari; i++) {
    const tgl = addDays(start, i);
    if (daysBetween(tgl, opts.target) < 0) break;
    if (opts.sudahAda.has(tgl)) continue;
    const fase = faseUntuk(tgl, opts.mulai, opts.target);
    const idx = daysBetween(opts.mulai, tgl);
    const m = urutan[((idx % 3) + 3) % 3];
    const dow = parseDate(tgl).getDay(); // 0 = Minggu
    const menit = opts.menit;
    const bagi = (f: number) => Math.max(5, Math.round((menit * f) / 5) * 5);
    const add = (modul: string | null, deskripsi: string, f: number) =>
      out.push({ tanggal: tgl, fase, modul, deskripsi, target_menit: bagi(f) });

    if (fase === 'diagnosis') {
      if (idx % 2 === 0) add('campuran', 'Latihan campuran 10 soal. Catat topik yang masih salah.', 0.6);
      else add(m, `Latihan ${namaM(m)} 10 soal untuk memetakan kemampuan awal.`, 0.6);
      add('kebanksentralan', 'Flashcard: kenali istilah kebanksentralan baru.', 0.4);
    } else if (fase === 'dasar') {
      add(m, `Latihan ${namaM(m)}: kerjakan soal yang belum pernah dicoba dan baca pembahasannya.`, 0.6);
      if (dow === 6) add(null, 'Wawancara: tulis satu jawaban dengan pola STAR.', 0.4);
      else if (dow === 0) add(null, 'Psikologi: isi latihan refleksi diri, lalu baca profilnya.', 0.4);
      else add('kebanksentralan', 'Flashcard: ulang istilah yang jatuh tempo hari ini.', 0.4);
    } else if (fase === 'pendalaman') {
      add(opts.lemah, `Ulangi soal ${namaM(opts.lemah)} yang salah atau ditandai.`, 0.4);
      add(m, `Latihan ${namaM(m)} 20 soal.`, 0.4);
      add(dow === 6 || dow === 0 ? null : 'kebanksentralan', dow === 6 || dow === 0 ? 'Wawancara: latih menjawab dengan suara keras, maksimal 2 menit.' : 'Flashcard: ulang istilah yang jatuh tempo.', 0.2);
    } else {
      add(dow % 2 ? 'campuran' : m, dow % 2 ? 'Simulasi campuran dengan waktu, seperti tes sungguhan.' : `Simulasi ${namaM(m)} dengan waktu.`, 0.6);
      add(null, 'Tinjau pembahasan soal yang salah di Riwayat.', 0.2);
      add(null, dow === 6 || dow === 0 ? 'Wawancara: ulang semua jawaban STAR.' : 'Flashcard: ulang istilah yang jatuh tempo.', 0.2);
    }
  }
  return out;
}
