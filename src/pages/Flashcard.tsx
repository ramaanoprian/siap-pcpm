import { useMemo, useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { ISTILAH, JARAK_KOTAK, istilahById, type Istilah } from '../data/istilah';
import { useRows, useStore } from '../lib/sync';
import { Bar, Empty, PageHead } from '../components';
import { addDays, cx, shuffle, today } from '../util';

const BARU_PER_SESI = 10;
const KATEGORI = ['Semua', ...new Set(ISTILAH.map((i) => i.kategori))];

export function Flashcard() {
  const store = useStore();
  const progres = useRows('flashcard_progres');
  const byId = useMemo(() => new Map(progres.map((p) => [p.istilah_id, p])), [progres]);
  const [kategori, setKategori] = useState('Semua');
  const [antrean, setAntrean] = useState<Istilah[] | null>(null);
  const [balik, setBalik] = useState(false);
  const [hasil, setHasil] = useState({ ingat: 0, lupa: 0 });
  const hariIni = today();

  const pool = ISTILAH.filter((i) => kategori === 'Semua' || i.kategori === kategori);
  const jatuhTempo = pool.filter((i) => byId.get(i.id) && byId.get(i.id)!.jadwal_ulang <= hariIni);
  const baru = pool.filter((i) => !byId.get(i.id));
  const perKotak = [1, 2, 3].map((k) => progres.filter((p) => p.kotak === k).length);

  const mulai = (semua = false) => {
    const list = semua ? shuffle(pool) : [...shuffle(jatuhTempo), ...shuffle(baru).slice(0, BARU_PER_SESI)];
    setAntrean(list);
    setBalik(false);
    setHasil({ ingat: 0, lupa: 0 });
  };

  const jawab = (ingat: boolean) => {
    if (!antrean?.length) return;
    const kartu = antrean[0];
    const prev = byId.get(kartu.id);
    const kotak = ingat ? Math.min(3, (prev?.kotak ?? 0) + 1) : 1;
    store.put('flashcard_progres', {
      istilah_id: kartu.id,
      kotak,
      jadwal_ulang: addDays(hariIni, ingat ? JARAK_KOTAK[kotak] : 1),
      jumlah_review: (prev?.jumlah_review ?? 0) + 1,
    });
    setHasil((h) => (ingat ? { ...h, ingat: h.ingat + 1 } : { ...h, lupa: h.lupa + 1 }));
    // Kartu yang belum diingat muncul lagi di akhir sesi ini.
    setAntrean(ingat ? antrean.slice(1) : [...antrean.slice(1), kartu]);
    setBalik(false);
  };

  if (antrean) {
    const kartu = antrean[0];
    const total = hasil.ingat + antrean.length;
    if (!kartu)
      return (
        <div className="page">
          <PageHead title="Sesi selesai" />
          <section className="card center">
            <p className="big-score ok">{hasil.ingat}</p>
            <p>kartu diingat{hasil.lupa ? `, ${hasil.lupa} kali perlu diulang` : ''}.</p>
            <p className="muted small">Kartu dijadwalkan ulang otomatis: kotak 1 besok, kotak 2 tiga hari lagi, kotak 3 seminggu lagi.</p>
            <button className="btn primary" onClick={() => setAntrean(null)}>
              Kembali
            </button>
          </section>
        </div>
      );
    const p = byId.get(kartu.id);
    return (
      <div className="page flash">
        <div className="quiz-top">
          <button type="button" className="icon-btn" aria-label="Keluar" onClick={() => setAntrean(null)}>
            <X size={20} />
          </button>
          <div className="grow">
            <div className="row-between small">
              <span>{antrean.length} kartu tersisa</span>
              <span className="muted">Kotak {p?.kotak ?? 'baru'}</span>
            </div>
            <Bar value={(hasil.ingat / Math.max(1, total)) * 100} tone="ok" />
          </div>
        </div>
        <button type="button" className={cx('flip card', balik && 'back')} onClick={() => setBalik(!balik)} aria-live="polite">
          <span className="tag">{kartu.kategori}</span>
          <b className="flip-term">{kartu.istilah}</b>
          {balik ? <p className="flip-def">{kartu.arti}</p> : <p className="muted small">Ingat-ingat artinya, lalu ketuk kartu untuk membalik.</p>}
        </button>
        {balik ? (
          <div className="quiz-nav">
            <button className="btn big" onClick={() => jawab(false)}>
              <RotateCcw size={16} /> Belum ingat
            </button>
            <button className="btn primary big" onClick={() => jawab(true)}>
              <Check size={16} /> Sudah ingat
            </button>
          </div>
        ) : (
          <button className="btn primary big block" onClick={() => setBalik(true)}>
            Lihat arti
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      <PageHead title="Flashcard" sub="Istilah kebanksentralan dengan sistem Leitner. Kartu yang sering diingat makin jarang muncul." />
      <div className="seg wrap">
        {KATEGORI.map((k) => (
          <button key={k} type="button" className={cx(kategori === k && 'on')} onClick={() => setKategori(k)}>
            {k}
          </button>
        ))}
      </div>

      <section className="card">
        <div className="stat-row">
          <div>
            <b>{jatuhTempo.length}</b>
            <span>jatuh tempo</span>
          </div>
          <div>
            <b>{baru.length}</b>
            <span>belum dipelajari</span>
          </div>
          {perKotak.map((n, k) => (
            <div key={k}>
              <b>{n}</b>
              <span>kotak {k + 1}</span>
            </div>
          ))}
        </div>
        {jatuhTempo.length + baru.length ? (
          <button className="btn primary big" onClick={() => mulai()}>
            Mulai sesi · {jatuhTempo.length + Math.min(BARU_PER_SESI, baru.length)} kartu
          </button>
        ) : (
          <Empty>Semua kartu sudah diulang untuk hari ini. Datang lagi besok, atau ulang semua kartu sekarang.</Empty>
        )}
        <button className="link-btn" onClick={() => mulai(true)}>
          Ulang semua {pool.length} kartu tanpa menunggu jadwal
        </button>
      </section>

      <section className="card">
        <h2 className="label">Daftar istilah</h2>
        <ul className="glossary">
          {pool.map((i) => {
            const p = byId.get(i.id);
            return (
              <li key={i.id}>
                <div className="row-between">
                  <b>{i.istilah}</b>
                  <span className={cx('box-chip', p && `k${p.kotak}`)}>{p ? `Kotak ${p.kotak}` : 'Baru'}</span>
                </div>
                <p className="muted small">{istilahById.get(i.id)!.arti}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
