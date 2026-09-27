import { ArrowRight, Flame, Layers, Target } from 'lucide-react';
import { MODUL, FASE, namaModul } from '../data/modul';
import { SOAL } from '../data/soal';
import { ISTILAH } from '../data/istilah';
import { useRows, usePengaturan, useStore } from '../lib/sync';
import { byMulaiDesc, faseUntuk, rataSkorModul, streak, topikLemah } from '../lib/stats';
import { Bar, Empty, toneSkor } from '../components';
import { daysBetween, durasi, relatif, tanggalPanjang, today } from '../util';

export function Beranda() {
  const store = useStore();
  const [p] = usePengaturan();
  const percobaan = useRows('percobaan');
  const status = useRows('status_soal');
  const kartu = useRows('flashcard_progres');
  const tugas = useRows('jadwal_tugas');

  const hariIni = today();
  const sisa = daysBetween(hariIni, p.tanggal_target);
  const mulai = (p.preferensi.mulai as string | undefined) ?? hariIni;
  const fase = FASE.find((f) => f.id === faseUntuk(hariIni, mulai, p.tanggal_target))!;
  const rata = rataSkorModul(percobaan);
  const dikuasai = status.filter((s) => s.terakhir_benar).length;
  const kenal = new Set(kartu.map((k) => k.istilah_id));
  const jatuhTempo = kartu.filter((k) => k.jadwal_ulang <= hariIni).length + Math.min(10, ISTILAH.filter((i) => !kenal.has(i.id)).length);
  const tugasHariIni = tugas.filter((t) => t.tanggal === hariIni).sort((a, b) => a.deskripsi.localeCompare(b.deskripsi));
  const terakhir = [...percobaan].sort(byMulaiDesc).slice(0, 5);
  const lemah = topikLemah(status).filter((t) => t.persen < 80).slice(0, 4);
  const beruntun = streak(percobaan, tugas);

  return (
    <div className="page">
      <section className="hero card">
        <div>
          <p className="eyebrow">{tanggalPanjang(hariIni)}</p>
          <h1 className="hero-title">
            {sisa > 0 ? <>H-{sisa}</> : sisa === 0 ? 'Hari ini tesnya!' : 'Target sudah lewat'}
          </h1>
          <p className="muted">
            Menuju tes {tanggalPanjang(p.tanggal_target)} · Fase <b>{fase.nama}</b>: {fase.keterangan}
          </p>
        </div>
        <div className="hero-stats">
          <div className="mini">
            <Flame size={18} />
            <b>{beruntun}</b>
            <span>hari beruntun</span>
          </div>
          <div className="mini">
            <Target size={18} />
            <b>
              {dikuasai}/{SOAL.length}
            </b>
            <span>soal dikuasai</span>
          </div>
          <a className="mini link" href="#/flashcard">
            <Layers size={18} />
            <b>{jatuhTempo}</b>
            <span>kartu menunggu</span>
          </a>
        </div>
      </section>

      <div className="grid-2">
        <section className="card">
          <div className="card-head">
            <h2>Tugas hari ini</h2>
            <a href="#/jadwal" className="small-link">
              Jadwal <ArrowRight size={14} />
            </a>
          </div>
          {tugasHariIni.length ? (
            <ul className="checklist">
              {tugasHariIni.map((t) => (
                <li key={t.id} className={t.selesai ? 'done' : undefined}>
                  <label>
                    <input
                      type="checkbox"
                      checked={t.selesai}
                      onChange={(e) =>
                        store.patch('jadwal_tugas', t.id, {
                          selesai: e.target.checked,
                          selesai_at: e.target.checked ? new Date().toISOString() : null,
                        })
                      }
                    />
                    <span>
                      {t.deskripsi}
                      <small className="muted">
                        {' '}
                        · {t.target_menit} menit{t.modul ? ` · ${namaModul(t.modul)}` : ''}
                      </small>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>
              Belum ada tugas untuk hari ini. <a href="#/jadwal">Susun jadwal 2 minggu</a> supaya tahu apa yang dikerjakan setiap hari.
            </Empty>
          )}
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Skor per modul</h2>
            <span className="muted small">rata-rata 5 percobaan terakhir</span>
          </div>
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
          <a className="btn primary block" href="#/latihan">
            Mulai latihan <ArrowRight size={16} />
          </a>
        </section>
      </div>

      <div className="grid-2">
        <section className="card">
          <div className="card-head">
            <h2>Topik yang perlu dikejar</h2>
          </div>
          {lemah.length ? (
            <ul className="skor-list">
              {lemah.map((t) => (
                <li key={t.modul + t.topik}>
                  <div className="row-between">
                    <span>
                      {t.topik} <small className="muted">· {namaModul(t.modul)}</small>
                    </span>
                    <b>{t.persen}%</b>
                  </div>
                  <Bar value={t.persen} tone={toneSkor(t.persen)} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Kerjakan beberapa latihan dulu. Topik yang akurasinya di bawah 80% akan muncul di sini.</Empty>
          )}
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Latihan terakhir</h2>
            <a href="#/riwayat" className="small-link">
              Riwayat <ArrowRight size={14} />
            </a>
          </div>
          {terakhir.length ? (
            <ul className="attempts">
              {terakhir.map((a) => (
                <li key={a.id}>
                  <a href={`#/riwayat/${a.id}`}>
                    <span className={`skor-pill ${toneSkor(Number(a.skor))}`}>{Math.round(Number(a.skor ?? 0))}</span>
                    <span className="grow">
                      <b>{namaModul(a.modul)}</b> <span className="muted">· {a.mode === 'simulasi' ? 'Simulasi' : 'Latihan'}</span>
                      <small className="muted block">
                        {a.jumlah_benar}/{a.jumlah_soal} benar · {durasi(a.durasi_detik)} · {relatif(a.mulai_at)}
                      </small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Belum ada latihan. Mulai dengan latihan campuran untuk memetakan kemampuanmu.</Empty>
          )}
        </section>
      </div>
    </div>
  );
}
