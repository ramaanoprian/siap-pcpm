import { MODUL, type Fase, type ModulId } from '../data/modul';
import { SOAL } from '../data/soal';
import { cariSoal } from '../data/generator';
import { addDays, daysBetween, parseDate, today } from '../util';
import type { JadwalTugas, Percobaan, StatusSoal } from './sync';

export type PerTopik = Record<string, { benar: number; total: number }>;
export interface JawabanItem {
  soal_id: string;
  pilih: number | null;
  benar: boolean;
}

export const byMulaiDesc = (a: Percobaan, b: Percobaan) => b.mulai_at.localeCompare(a.mulai_at);

/** Skor sebuah percobaan untuk satu modul: skor langsung, atau bagian subtes itu bila percobaannya tryout. */
function skorUntukModul(p: Percobaan, m: ModulId): number | null {
  if (p.modul === m) return p.skor == null ? null : Number(p.skor);
  if (!isTryout(p)) return null;
  const js = ((p.jawaban as unknown as JawabanItem[] | null) ?? []).filter((j) => cariSoal(j.soal_id)?.modul === m);
  return js.length ? (js.filter((j) => j.benar).length / js.length) * 100 : null;
}

/** Rata-rata skor 5 percobaan terakhir per modul, termasuk bagian subtes dari tryout (null bila belum pernah). */
export function rataSkorModul(percobaan: Percobaan[]): Record<ModulId, number | null> {
  const out = {} as Record<ModulId, number | null>;
  const sorted = [...percobaan].sort(byMulaiDesc);
  for (const m of MODUL) {
    const list = sorted.map((p) => skorUntukModul(p, m.id)).filter((x): x is number => x != null).slice(0, 5);
    out[m.id] = list.length ? Math.round(list.reduce((s, x) => s + x, 0) / list.length) : null;
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

// ---------- Pengulangan berjarak soal ----------

/** Jarak hari sebelum soal yang pernah salah diulang: salah → besok, lalu makin jarang tiap kali benar. */
export const JARAK_ULANG = [1, 3, 7, 14];

/**
 * Tanggal soal perlu diulang, atau null bila tidak perlu (belum pernah salah, atau sudah dikuasai:
 * jawaban terakhir benar dan jumlah benar melebihi jumlah salah minimal 3).
 */
export function jadwalUlang(st: StatusSoal): string | null {
  if (!st.terakhir_dikerjakan || !st.jumlah_salah) return null;
  const lebih = st.jumlah_benar - st.jumlah_salah;
  if (st.terakhir_benar && lebih >= 3) return null;
  const langkah = st.terakhir_benar ? Math.min(Math.max(lebih + 1, 1), JARAK_ULANG.length - 1) : 0;
  return addDays(localDay(st.terakhir_dikerjakan), JARAK_ULANG[langkah]);
}

/** Id soal yang jadwal ulangnya sudah tiba pada `hari`. */
export function soalJatuhTempo(status: StatusSoal[], hari = today()): Set<string> {
  return new Set(status.filter((s) => { const j = jadwalUlang(s); return j != null && j <= hari; }).map((s) => s.soal_id));
}

// ---------- Aktivitas harian ----------

/** Jumlah soal yang dijawab per tanggal (YYYY-MM-DD, waktu lokal). */
export function soalPerHari(percobaan: Percobaan[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const p of percobaan) {
    const jawaban = (p.jawaban as unknown as JawabanItem[] | null) ?? [];
    const n = jawaban.length ? jawaban.filter((j) => j.pilih != null).length : p.jumlah_soal;
    const d = localDay(p.mulai_at);
    out.set(d, (out.get(d) ?? 0) + n);
  }
  return out;
}

export const TARGET_SOAL_DEFAULT = 20;

export const isTryout = (p: Pick<Percobaan, 'paket'>) => !!p.paket?.startsWith('tryout');

/** Nama percobaan untuk daftar: "Tryout PCPM" atau "<modul> · Latihan/Simulasi". */
export const labelPercobaan = (p: Pick<Percobaan, 'paket' | 'modul' | 'mode'>, nama: (m: string) => string) =>
  isTryout(p) ? 'Tryout PCPM' : `${nama(p.modul)} · ${p.mode === 'simulasi' ? 'Simulasi' : 'Latihan'}`;
