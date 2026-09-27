import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Bookmark, BookmarkCheck, Check, Clock, RotateCcw, Shuffle, Timer, X } from 'lucide-react';
import { MODUL, modulById, namaModul, type ModulId, type ModulPercobaan } from '../data/modul';
import { SOAL, type Soal } from '../data/soal';
import { isGenerated, JUMLAH_POLA, soalAcak, TOPIK_GENERATOR } from '../data/generator';
import { babById, MATERI } from '../data/materi';
import { newId, usePengaturan, useRows, useStore, type StatusSoal } from '../lib/sync';
import { soalJatuhTempo, type JawabanItem, type PerTopik } from '../lib/stats';
import type { Json } from '../lib/database.types';
import { Bar, Empty, PageHead } from '../components';
import { cx, go, jamMenit, shuffle } from '../util';

type Mode = 'latihan' | 'simulasi';
type Sumber = 'semua' | 'ulang' | 'belum' | 'salah' | 'ditandai';

/** Soal yang tampil di sesi: opsinya bisa diacak, `urutan[k]` = indeks opsi asli untuk opsi ke-k. */
type SoalSesi = Soal & { urutan: number[] };

interface Sesi {
  id: string;
  modul: ModulPercobaan;
  mode: Mode;
  paket: string;
  soal: SoalSesi[];
  mulai: string;
  batasDetik: number | null;
}

const SUMBER: { id: Sumber; nama: string }[] = [
  { id: 'semua', nama: 'Semua soal' },
  { id: 'ulang', nama: 'Jadwal ulang' },
  { id: 'belum', nama: 'Belum pernah' },
  { id: 'salah', nama: 'Terakhir salah' },
  { id: 'ditandai', nama: 'Ditandai' },
];

function pilihSoal(modul: ModulPercobaan, sumber: Sumber, status: Map<string, StatusSoal>, topik: string[] | null, jatuhTempo: Set<string>): Soal[] {
  let list = modul === 'campuran' ? SOAL : SOAL.filter((s) => s.modul === modul);
  if (topik) list = list.filter((s) => topik.includes(s.topik));
  if (sumber === 'ulang') list = list.filter((s) => jatuhTempo.has(s.id));
  if (sumber === 'belum') list = list.filter((s) => !status.get(s.id)?.terakhir_dikerjakan);
  if (sumber === 'salah') list = list.filter((s) => status.get(s.id)?.terakhir_benar === false);
  if (sumber === 'ditandai') list = list.filter((s) => status.get(s.id)?.ditandai);
  return list;
}

/** Opsi penutup seperti "Tidak dapat disimpulkan" tetap di akhir; soal cari-kesalahan (A: …) tidak diacak. */
const OPSI_PENUTUP = /^(tidak dapat disimpulkan|tidak ada kesalahan|semua (jawaban )?benar)$/i;

function acakOpsi(s: Soal): SoalSesi {
  const asli = s.opsi.map((_, k) => k);
  if (isGenerated(s.id) || s.opsi.some((o) => /^[A-E]: /.test(o))) return { ...s, urutan: asli };
  const tetap = asli.filter((k) => OPSI_PENUTUP.test(s.opsi[k]));
  const urutan = [...shuffle(asli.filter((k) => !tetap.includes(k))), ...tetap];
  return { ...s, opsi: urutan.map((k) => s.opsi[k]), kunci: urutan.indexOf(s.kunci), urutan };
}

/** Soal bacaan dijaga tetap berurutan dan bersama; sisanya diacak, begitu juga urutan opsinya. */
function susun(list: Soal[], jumlah: number): SoalSesi[] {
  const acak = shuffle(list).slice(0, jumlah);
  return acak.sort((a, b) => (a.bacaan && b.bacaan ? a.id.localeCompare(b.id) : 0)).map(acakOpsi);
}

/**
 * Komposisi tryout: tiga subtes Tes Pengetahuan dengan waktu per soal sesuai modul. Jumlah soal ini
 * perkiraan untuk latihan, bukan komposisi resmi (BI tidak mengumumkan jumlah soal per subtes).
 */
const TRYOUT: { modul: ModulId; n: number }[] = [
  { modul: 'potensi-dasar', n: 30 },
  { modul: 'kebanksentralan', n: 30 },
  { modul: 'english', n: 20 },
];
const TRYOUT_SOAL = TRYOUT.reduce((a, t) => a + t.n, 0);
const TRYOUT_MENIT = Math.round(TRYOUT.reduce((a, t) => a + t.n * modulById(t.modul)!.menitPerSoal, 0));

/** Soal tryout dikelompokkan per subtes; Potensi Dasar dicampur dengan soal acak. */
function susunTryout(): SoalSesi[] {
  return TRYOUT.flatMap(({ modul, n }) => {
    const tetap = SOAL.filter((s) => s.modul === modul);
    const pool = modul === 'potensi-dasar' ? [...shuffle(tetap).slice(0, n / 2), ...soalAcak(n)] : tetap;
    return susun(pool, n);
  });
}

/** Soal Potensi Dasar buatan generator ikut dicampur bila modulnya memuat Potensi Dasar. */
const pakaiGenerator = (modul: ModulPercobaan, sumber: Sumber, topik: string[] | null) =>
  (modul === 'potensi-dasar' || modul === 'campuran') && (sumber === 'semua' || sumber === 'belum') && (!topik || topik.some((t) => TOPIK_GENERATOR.includes(t)));

/** `awal` dari URL: id modul (`#/latihan/english`) atau bab materi (`#/latihan/bab-moneter`). */
export function Latihan({ awal }: { awal?: string }) {
  const [sesi, setSesi] = useState<Sesi | null>(null);
  if (sesi) return <Kuis sesi={sesi} onSelesai={(id) => go('riwayat', id)} onBatal={() => setSesi(null)} />;
  return <Pengaturan key={awal} awal={awal} onMulai={setSesi} />;
}

function Pengaturan({ awal, onMulai }: { awal?: string; onMulai: (s: Sesi) => void }) {
  const statusRows = useRows('status_soal');
  const status = useMemo(() => new Map(statusRows.map((s) => [s.soal_id, s])), [statusRows]);
  const [p] = usePengaturan();
  const dibaca = (p.preferensi.materi_dibaca as string[] | undefined) ?? [];
  const babAwal = awal?.startsWith('bab-') ? babById(awal.slice(4)) : undefined;
  const [bab, setBab] = useState(babAwal);
  const topik = bab?.topik ? [bab.topik] : null;
  const [modul, setModul] = useState<ModulPercobaan>(babAwal?.modul ?? (MODUL.some((m) => m.id === awal) ? (awal as ModulPercobaan) : 'campuran'));
  const [mode, setMode] = useState<Mode>('latihan');
  const [sumber, setSumber] = useState<Sumber>(awal === 'ulang' ? 'ulang' : 'semua');
  const [jumlah, setJumlah] = useState(awal === 'ulang' ? 20 : 10);
  const jatuhTempo = useMemo(() => soalJatuhTempo(statusRows), [statusRows]);

  const tetap = pilihSoal(modul, sumber, status, topik, jatuhTempo);
  const generator = pakaiGenerator(modul, sumber, topik);
  const tersedia = generator ? [...tetap, ...soalAcak(Math.max(jumlah, 20), topik)] : tetap;
  const n = Math.min(jumlah, tersedia.length);
  const belumBaca = MATERI.filter((b) => b.modul && (modul === 'campuran' || b.modul === modul) && !dibaca.includes(b.id));
  const menitPerSoal = modul === 'campuran' ? 1 : modulById(modul)!.menitPerSoal;

  const mulai = () => {
    const soal = susun(tersedia, n);
    onMulai({
      id: newId(),
      modul,
      mode,
      paket: `${sumber}·${soal.length}`,
      soal,
      mulai: new Date().toISOString(),
      batasDetik: mode === 'simulasi' ? Math.round(soal.length * menitPerSoal * 60) : null,
    });
  };

  const mulaiTryout = () =>
    onMulai({
      id: newId(),
      modul: 'campuran',
      mode: 'simulasi',
      paket: `tryout·${TRYOUT_SOAL}`,
      soal: susunTryout(),
      mulai: new Date().toISOString(),
      batasDetik: TRYOUT_MENIT * 60,
    });

  return (
    <div className="page">
      <PageHead title="Latihan" sub="Pilih modul dan mode, lalu mulai. Hasilnya tersimpan di Riwayat." />

      {!bab && (
        <section className="card tryout">
          <span className="tryout-icon" aria-hidden>
            <Timer size={28} />
          </span>
          <div className="grow">
            <p className="eyebrow">Tryout PCPM</p>
            <h2>
              {TRYOUT_SOAL} soal · {TRYOUT_MENIT} menit
            </h2>
            <p className="small">
              {TRYOUT.map((t) => `${namaModul(t.modul)} ${t.n}`).join(' · ')}. Skor keluar per subtes. Komposisinya perkiraan untuk latihan, bukan jumlah resmi.
            </p>
          </div>
          <button className="btn primary big" onClick={mulaiTryout}>
            Mulai tryout <ArrowRight size={16} />
          </button>
        </section>
      )}

      {!bab && jatuhTempo.size > 0 && sumber !== 'ulang' && (
        <button type="button" className="card nudge ulang" onClick={() => { setSumber('ulang'); setModul('campuran'); setJumlah(20); }}>
          <span className="nudge-icon" aria-hidden>
            <RotateCcw size={20} />
          </span>
          <span className="grow">
            <b>{jatuhTempo.size} soal perlu diulang hari ini</b>
            <small className="block muted">Soal yang pernah salah muncul lagi besok, lalu 3, 7, dan 14 hari kemudian sampai kamu kuasai.</small>
          </span>
          <ArrowRight size={18} />
        </button>
      )}

      {bab && (
        <div className="filter-bar">
          <span className="chip on">
            <BookOpen size={16} /> Bab: {bab.judul}
          </span>
          <button type="button" className="link-btn" onClick={() => setBab(undefined)}>
            Latihan semua topik
          </button>
        </div>
      )}

      {!bab && belumBaca.length > 0 && (
        <a className="card nudge" href={`#/materi/${belumBaca[0].id}`}>
          <span className="nudge-icon" aria-hidden>
            <BookOpen size={20} />
          </span>
          <span className="grow">
            <b>Baca materinya dulu</b>
            <small className="block muted">
              {belumBaca.length} bab {modul === 'campuran' ? 'materi' : namaModul(modul)} belum dibaca. Mulai dari "{belumBaca[0].judul}".
            </small>
          </span>
          <ArrowRight size={18} />
        </a>
      )}

      <section className="card">
        <h2 className="label">Modul</h2>
        <div className="choice-grid">
          {[{ id: 'campuran' as const, nama: 'Campuran', deskripsi: 'Semua modul diacak. Cocok untuk diagnosis.' }, ...MODUL].map((m) => {
            const total = m.id === 'campuran' ? SOAL.length : SOAL.filter((s) => s.modul === m.id).length;
            const selesai = (m.id === 'campuran' ? SOAL : SOAL.filter((s) => s.modul === m.id)).filter((s) => status.get(s.id)?.terakhir_benar).length;
            return (
              <button key={m.id} type="button" className={cx('choice', modul === m.id && 'on')} onClick={() => {
                  setModul(m.id);
                  if (bab && bab.modul !== m.id) setBab(undefined);
                }} aria-pressed={modul === m.id}>
                <b>{m.nama}</b>
                <small>{m.deskripsi}</small>
                <Bar value={(selesai / total) * 100} tone="ok" />
                <small className="muted">
                  {selesai}/{total} dikuasai
                  {(m.id === 'potensi-dasar' || m.id === 'campuran') && ' · + soal acak tanpa batas'}
                </small>
              </button>
            );
          })}
        </div>

        <div className="form-row">
          <div>
            <h2 className="label">Mode</h2>
            <div className="seg">
              <button type="button" className={cx(mode === 'latihan' && 'on')} onClick={() => setMode('latihan')}>
                Latihan
              </button>
              <button type="button" className={cx(mode === 'simulasi' && 'on')} onClick={() => setMode('simulasi')}>
                Simulasi
              </button>
            </div>
            <p className="muted small">
              {mode === 'latihan' ? 'Jawaban dan pembahasan langsung muncul setelah memilih.' : 'Pakai batas waktu. Pembahasan baru muncul setelah selesai.'}
            </p>
          </div>
          <div>
            <h2 className="label">Soal</h2>
            <div className="seg wrap">
              {SUMBER.map((s) => (
                <button key={s.id} type="button" className={cx(sumber === s.id && 'on')} onClick={() => setSumber(s.id)}>
                  {s.nama}
                  {s.id === 'ulang' && ` (${jatuhTempo.size})`}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="label">Jumlah</h2>
            <div className="seg">
              {[5, 10, 20, 50].map((j) => (
                <button key={j} type="button" className={cx(jumlah === j && 'on')} onClick={() => setJumlah(j)}>
                  {j}
                </button>
              ))}
            </div>
          </div>
        </div>

        {generator && (
          <p className="muted small row">
            <Shuffle size={14} /> Termasuk soal baru dari {JUMLAH_POLA} pola (numerik, verbal, logika) dengan angka dan kata acak, jadi hampir tidak ada yang sama persis. Urutan pilihan jawaban juga diacak.
          </p>
        )}

        {tersedia.length ? (
          <button className="btn primary big" onClick={mulai}>
            Mulai {n} soal{mode === 'simulasi' ? ` · ${Math.round(n * menitPerSoal)} menit` : ''} <ArrowRight size={16} />
          </button>
        ) : (
          <Empty>{sumber === 'ulang' ? 'Tidak ada soal yang jatuh tempo untuk diulang. Mantap!' : 'Tidak ada soal untuk pilihan ini. Coba pilih "Semua soal".'}</Empty>
        )}
      </section>
    </div>
  );
}

function Kuis({ sesi, onSelesai, onBatal }: { sesi: Sesi; onSelesai: (id: string) => void; onBatal: () => void }) {
  const store = useStore();
  const statusRows = useRows('status_soal');
  const status = useMemo(() => new Map(statusRows.map((s) => [s.soal_id, s])), [statusRows]);
  const [i, setI] = useState(0);
  const [pilih, setPilih] = useState<(number | null)[]>(() => sesi.soal.map(() => null));
  const [sisa, setSisa] = useState(sesi.batasDetik ?? 0);
  const selesaiRef = useRef(false);
  const sim = sesi.mode === 'simulasi';
  const soal = sesi.soal[i];
  const dijawab = pilih[i];
  const terungkap = !sim && dijawab != null;

  const selesai = () => {
    if (selesaiRef.current) return;
    selesaiRef.current = true;
    const now = new Date().toISOString();
    // Pilihan dikembalikan ke indeks opsi asli agar Riwayat cocok dengan bank soal.
    const jawaban: JawabanItem[] = sesi.soal.map((s, k) => ({
      soal_id: s.id,
      pilih: pilih[k] == null ? null : s.urutan[pilih[k]!],
      benar: pilih[k] === s.kunci,
    }));
    const per: PerTopik = {};
    sesi.soal.forEach((s, k) => {
      const t = (per[s.topik] ??= { benar: 0, total: 0 });
      t.total++;
      if (jawaban[k].benar) t.benar++;
    });
    const benar = jawaban.filter((j) => j.benar).length;
    store.put('percobaan', {
      id: sesi.id,
      modul: sesi.modul,
      mode: sesi.mode,
      paket: sesi.paket,
      mulai_at: sesi.mulai,
      durasi_detik: Math.round((Date.now() - Date.parse(sesi.mulai)) / 1000),
      jumlah_soal: sesi.soal.length,
      jumlah_benar: benar,
      skor: Math.round((benar / sesi.soal.length) * 10000) / 100,
      per_topik: per,
      jawaban: jawaban as unknown as Json,
    });
    // Status per soal hanya diperbarui untuk soal yang dijawab.
    sesi.soal.forEach((s, k) => {
      if (pilih[k] == null || isGenerated(s.id)) return;
      const prev = status.get(s.id);
      const ok = jawaban[k].benar;
      store.put('status_soal', {
        soal_id: s.id,
        ditandai: prev?.ditandai ?? false,
        jumlah_benar: (prev?.jumlah_benar ?? 0) + (ok ? 1 : 0),
        jumlah_salah: (prev?.jumlah_salah ?? 0) + (ok ? 0 : 1),
        terakhir_benar: ok,
        terakhir_dikerjakan: now,
      });
    });
    onSelesai(sesi.id);
  };

  // Hitung mundur simulasi; selesai otomatis saat waktu habis.
  useEffect(() => {
    if (!sim) return;
    const end = Date.parse(sesi.mulai) + (sesi.batasDetik ?? 0) * 1000;
    const t = setInterval(() => {
      const s = Math.round((end - Date.now()) / 1000);
      setSisa(s);
      if (s <= 0) selesai();
    }, 500);
    return () => clearInterval(t);
  }, [pilih]);

  // Cegah halaman tertutup tidak sengaja di tengah latihan.
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, []);

  const tandai = () => {
    const prev = status.get(soal.id);
    store.put('status_soal', {
      soal_id: soal.id,
      ditandai: !prev?.ditandai,
      jumlah_benar: prev?.jumlah_benar ?? 0,
      jumlah_salah: prev?.jumlah_salah ?? 0,
      terakhir_benar: prev?.terakhir_benar ?? null,
      terakhir_dikerjakan: prev?.terakhir_dikerjakan ?? null,
    });
  };
  const ditandai = status.get(soal.id)?.ditandai;
  const terjawab = pilih.filter((p) => p != null).length;
  const benarSejauh = pilih.filter((p, k) => p === sesi.soal[k].kunci).length;

  return (
    <div className="page quiz">
      <div className="quiz-top">
        <button
          type="button"
          className="icon-btn"
          aria-label="Keluar"
          onClick={() => (terjawab === 0 || confirm('Keluar dari latihan? Jawaban yang belum diselesaikan tidak disimpan.')) && onBatal()}
        >
          <X size={20} />
        </button>
        <div className="grow">
          <div className="row-between small">
            <span>
              {sesi.paket.startsWith('tryout') ? `Tryout · ${namaModul(soal.modul)}` : namaModul(sesi.modul)} · Soal {i + 1} dari {sesi.soal.length}
            </span>
            {sim ? (
              <span className={cx('timer', sisa < 60 && 'low')}>
                <Clock size={14} /> {jamMenit(sisa)}
              </span>
            ) : (
              <span className="muted">
                {benarSejauh}/{terjawab} benar
              </span>
            )}
          </div>
          <Bar value={((i + 1) / sesi.soal.length) * 100} />
        </div>
      </div>

      <section className="card question">
        <div className="row-between">
          <span className="tag">{soal.topik}</span>
          {isGenerated(soal.id) ? (
            <span className="tag tonal">
              <Shuffle size={12} /> Soal acak
            </span>
          ) : (
            <button type="button" className={cx('icon-btn', ditandai && 'on')} onClick={tandai} aria-pressed={!!ditandai} title="Tandai untuk diulang">
              {ditandai ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          )}
        </div>
        {soal.bacaan && (
          <details className="bacaan" open>
            <summary>Bacaan</summary>
            {soal.bacaan.split('\n\n').map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </details>
        )}
        <p className="q-text">{soal.teks}</p>
        <ol className="options">
          {soal.opsi.map((o, k) => {
            const benar = terungkap && k === soal.kunci;
            const salah = terungkap && k === dijawab && k !== soal.kunci;
            return (
              <li key={k}>
                <button
                  type="button"
                  className={cx('option', dijawab === k && 'picked', benar && 'right', salah && 'wrong')}
                  disabled={terungkap}
                  onClick={() => setPilih((p) => p.map((x, j) => (j === i ? k : x)))}
                >
                  <span className="opt-key">{String.fromCharCode(65 + k)}</span>
                  <span className="grow">{o}</span>
                  {benar && <Check size={18} />}
                  {salah && <X size={18} />}
                </button>
              </li>
            );
          })}
        </ol>
        {terungkap && (
          <div className={cx('explain', dijawab === soal.kunci ? 'ok' : 'bad')}>
            <b>{dijawab === soal.kunci ? 'Benar.' : `Kurang tepat. Jawaban: ${String.fromCharCode(65 + soal.kunci)}.`}</b> {soal.bahas}
          </div>
        )}
      </section>

      <div className="quiz-nav">
        <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>
          <ArrowLeft size={16} /> Sebelumnya
        </button>
        {i < sesi.soal.length - 1 ? (
          <button className="btn primary" onClick={() => setI(i + 1)} disabled={!sim && dijawab == null}>
            Berikutnya <ArrowRight size={16} />
          </button>
        ) : (
          <button
            className="btn primary"
            disabled={!sim && dijawab == null}
            onClick={() =>
              (terjawab === sesi.soal.length || confirm(`${sesi.soal.length - terjawab} soal belum dijawab dan akan dihitung salah. Selesaikan?`)) && selesai()
            }
          >
            Selesai <Check size={16} />
          </button>
        )}
      </div>

      {sim && (
        <div className="card">
          <h2 className="label">Navigasi soal</h2>
          <div className="nav-grid">
            {sesi.soal.map((s, k) => (
              <button
                key={s.id}
                type="button"
                className={cx('nav-dot', pilih[k] != null && 'answered', k === i && 'current', status.get(s.id)?.ditandai && 'flag')}
                onClick={() => setI(k)}
              >
                {k + 1}
              </button>
            ))}
          </div>
          <p className="muted small">
            {terjawab} dari {sesi.soal.length} terjawab. Waktu habis = otomatis selesai.
          </p>
        </div>
      )}
    </div>
  );
}

