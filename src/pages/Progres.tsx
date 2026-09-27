import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, RotateCcw, Trophy } from 'lucide-react';
import { MATERI } from '../data/materi';
import { MODUL, namaModul } from '../data/modul';
import { SOAL } from '../data/soal';
import { usePengaturan, useRows } from '../lib/sync';
import { byMulaiDesc, isTryout, rataSkorModul, soalJatuhTempo, soalPerHari, streak, TARGET_SOAL_DEFAULT, topikLemah } from '../lib/stats';
import { Bar, Empty, PageHead, toneSkor } from '../components';
import { addDays, cx, parseDate, tanggal, today } from '../util';
import { Sparkline } from './Riwayat';

const MINGGU = 16;

export function Progres() {
  const [p] = usePengaturan();
  const percobaan = useRows('percobaan');
  const status = useRows('status_soal');
  const tugas = useRows('jadwal_tugas');
  const [filter, setFilter] = useState<string>('semua');

  const hariIni = today();
  const target = (p.preferensi.target_soal as number | undefined) ?? TARGET_SOAL_DEFAULT;
  const perHari = useMemo(() => soalPerHari(percobaan), [percobaan]);
  const urut = [...percobaan].sort(byMulaiDesc);
  const tren = urut
    .filter((x) => filter === 'semua' || (filter === 'tryout' ? isTryout(x) : x.modul === filter))
    .reverse()
    .map((x) => Number(x.skor ?? 0))
    .slice(-30);
  const rata = rataSkorModul(percobaan);
  const lemah = topikLemah(status);
  const totalSoal = [...perHari.values()].reduce((a, b) => a + b, 0);
  const tryout = urut.filter(isTryout);
  const ulang = soalJatuhTempo(status, hariIni).size;

  // Kalender aktivitas: kolom = minggu (Senin–Minggu), baris = hari.
  const senin = addDays(hariIni, -((parseDate(hariIni).getDay() + 6) % 7) - (MINGGU - 1) * 7);
  const kolom = Array.from({ length: MINGGU }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(senin, w * 7 + d)));
  const level = (n: number) => (n === 0 ? 0 : n < target / 2 ? 1 : n < target ? 2 : 3);

  return (
    <div className="page">
      <PageHead title="Progres" sub="Grafik skor, konsistensi belajar, dan peta topik yang masih lemah." />

      <div className="stat-cards">
        <div className="card stat-card c-orange">
          <span>🔥</span>
          <b>{streak(percobaan, tugas)}</b>
          <small>hari beruntun</small>
        </div>
        <div className="card stat-card c-blue">
          <span>✍️</span>
          <b>{totalSoal}</b>
          <small>soal dikerjakan</small>
        </div>
        <div className="card stat-card c-green">
          <span>✅</span>
          <b>
            {status.filter((s) => s.terakhir_benar).length}/{SOAL.length}
          </b>
          <small>soal bank dikuasai</small>
        </div>
        <div className="card stat-card c-pink">
          <span>🔁</span>
          <b>{ulang}</b>
          <small>perlu diulang</small>
        </div>
      </div>

      <section className="card">
        <div className="card-head">
          <h2>Aktivitas {MINGGU} minggu</h2>
          <span className="muted small">target {target} soal/hari</span>
        </div>
        <div className="heat" role="img" aria-label="Kalender jumlah soal per hari">
          {kolom.map((minggu, w) => (
            <div key={w} className="heat-col">
              {minggu.map((d) => {
                const n = perHari.get(d) ?? 0;
                return <i key={d} className={cx(`lv${level(n)}`, d > hariIni && 'future', d === hariIni && 'now')} title={`${tanggal(d)}: ${n} soal`} />;
              })}
            </div>
          ))}
        </div>
        <div className="heat-legend muted small">
          Sedikit <i className="lv0" /> <i className="lv1" /> <i className="lv2" /> <i className="lv3" /> Target tercapai
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Tren skor</h2>
        </div>
        <div className="seg wrap">
          {[{ id: 'semua', nama: 'Semua' }, { id: 'tryout', nama: 'Tryout' }, ...MODUL].map((m) => (
            <button key={m.id} type="button" className={cx(filter === m.id && 'on')} onClick={() => setFilter(m.id)}>
              {m.nama}
            </button>
          ))}
        </div>
        {tren.length > 1 ? <Sparkline values={tren} /> : <Empty>Kerjakan minimal dua latihan untuk melihat grafiknya.</Empty>}
      </section>

      <div className="grid-2">
        <section className="card">
          <h2>Skor per subtes</h2>
          <ul className="skor-list">
            {MODUL.map((m) => (
              <li key={m.id}>
                <div className="row-between">
                  <span>{m.nama}</span>
                  <b>{rata[m.id] ?? '–'}</b>
                </div>
                <Bar value={rata[m.id] ?? 0} tone={toneSkor(rata[m.id])} />
              </li>
            ))}
          </ul>
          <p className="muted small">Rata-rata 5 percobaan terakhir per modul.</p>
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Tryout terakhir</h2>
            <a className="small-link" href="#/latihan">
              Tryout baru <ArrowRight size={14} />
            </a>
          </div>
          {tryout.length ? (
            <ul className="attempts">
              {tryout.slice(0, 4).map((a) => (
                <li key={a.id}>
                  <a href={`#/riwayat/${a.id}`}>
                    <span className={`skor-pill ${toneSkor(Number(a.skor))}`}>{Math.round(Number(a.skor ?? 0))}</span>
                    <span className="grow">
                      <b>Tryout PCPM</b>
                      <small className="muted block">
                        {tanggal(a.mulai_at)} · {a.jumlah_benar}/{a.jumlah_soal} benar
                      </small>
                    </span>
                    <Trophy size={18} className="muted" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Belum ada tryout. Coba satu untuk tahu posisimu di tiap subtes.</Empty>
          )}
        </section>
      </div>

      <section className="card">
        <div className="card-head">
          <h2>Peta kelemahan</h2>
          {ulang > 0 && (
            <a className="small-link" href="#/latihan/ulang">
              <RotateCcw size={14} /> Ulang {ulang} soal
            </a>
          )}
        </div>
        {lemah.length ? (
          <ul className="peta">
            {lemah.map((t) => {
              const bab = MATERI.find((b) => b.modul === t.modul && b.topik === t.topik);
              return (
                <li key={t.modul + t.topik} className={cx('peta-item', toneSkor(t.persen))}>
                  <span className="peta-skor">{t.persen}%</span>
                  <span className="grow">
                    <b>{t.topik}</b>
                    <small className="block muted">
                      {namaModul(t.modul)} · {t.benar}/{t.total} benar
                    </small>
                  </span>
                  {bab && t.persen < 80 && (
                    <a className="btn tonal small-btn" href={`#/materi/${bab.id}`}>
                      <BookOpen size={15} /> Baca ulang
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <Empty>Belum ada data. Setelah latihan, topik diurutkan dari akurasi terendah di sini, lengkap dengan tautan ke bab materinya.</Empty>
        )}
      </section>
    </div>
  );
}
