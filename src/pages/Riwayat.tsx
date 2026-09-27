import { useState } from 'react';
import { ArrowLeft, Check, RotateCcw, Trash2, X } from 'lucide-react';
import { MODUL, namaModul } from '../data/modul';
import { cariSoal } from '../data/generator';
import { useRows, useStore } from '../lib/sync';
import { byMulaiDesc, type JawabanItem, type PerTopik } from '../lib/stats';
import { Bar, Empty, PageHead, toneSkor } from '../components';
import { cx, durasi, jam, tanggal } from '../util';

export function Riwayat({ id }: { id?: string }) {
  const percobaan = useRows('percobaan');
  const [filter, setFilter] = useState<string>('semua');
  if (id) {
    const p = percobaan.find((x) => x.id === id);
    return p ? <Detail id={id} /> : <div className="page"><Empty>Percobaan tidak ditemukan. <a href="#/riwayat">Kembali</a></Empty></div>;
  }

  const list = [...percobaan].sort(byMulaiDesc).filter((p) => filter === 'semua' || p.modul === filter);
  const skor = [...list].reverse().map((p) => Number(p.skor ?? 0)).slice(-30);

  return (
    <div className="page">
      <PageHead title="Riwayat" sub={`${percobaan.length} percobaan tersimpan`} />
      <div className="seg wrap">
        {[{ id: 'semua', nama: 'Semua' }, ...MODUL, { id: 'campuran', nama: 'Campuran' }].map((m) => (
          <button key={m.id} type="button" className={cx(filter === m.id && 'on')} onClick={() => setFilter(m.id)}>
            {m.nama}
          </button>
        ))}
      </div>

      {skor.length > 1 && (
        <section className="card">
          <h2 className="label">Tren skor</h2>
          <Sparkline values={skor} />
        </section>
      )}

      {list.length ? (
        <ul className="card attempts">
          {list.map((a) => (
            <li key={a.id}>
              <a href={`#/riwayat/${a.id}`}>
                <span className={`skor-pill ${toneSkor(Number(a.skor))}`}>{Math.round(Number(a.skor ?? 0))}</span>
                <span className="grow">
                  <b>{namaModul(a.modul)}</b> <span className="muted">· {a.mode === 'simulasi' ? 'Simulasi' : 'Latihan'}</span>
                  <small className="muted block">
                    {tanggal(a.mulai_at)} {jam(a.mulai_at)} · {a.jumlah_benar}/{a.jumlah_soal} benar · {durasi(a.durasi_detik)}
                  </small>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>
          Belum ada percobaan. <a href="#/latihan">Mulai latihan</a>
        </Empty>
      )}
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 600;
  const h = 120;
  const x = (i: number) => (i / (values.length - 1)) * (w - 16) + 8;
  const y = (v: number) => h - 8 - (v / 100) * (h - 16);
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label={`Tren ${values.length} skor terakhir`}>
      {[25, 50, 75].map((g) => (
        <line key={g} x1={0} x2={w} y1={y(g)} y2={y(g)} className="grid" />
      ))}
      <path d={d} className="line" vectorEffect="non-scaling-stroke" />
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3} className="dot">
          <title>{Math.round(v)}</title>
        </circle>
      ))}
    </svg>
  );
}

function Detail({ id }: { id: string }) {
  const store = useStore();
  const p = useRows('percobaan').find((x) => x.id === id)!;
  const [hanyaSalah, setHanyaSalah] = useState(false);
  const jawaban = (p.jawaban as unknown as JawabanItem[]) ?? [];
  const per = (p.per_topik as unknown as PerTopik) ?? {};
  const tampil = jawaban.filter((j) => !hanyaSalah || !j.benar);
  const skor = Math.round(Number(p.skor ?? 0));

  return (
    <div className="page">
      <a href="#/riwayat" className="small-link back">
        <ArrowLeft size={14} /> Riwayat
      </a>
      <PageHead
        title={`${namaModul(p.modul)} · ${p.mode === 'simulasi' ? 'Simulasi' : 'Latihan'}`}
        sub={`${tanggal(p.mulai_at)} ${jam(p.mulai_at)} · ${durasi(p.durasi_detik)}`}
      >
        <a className="btn" href="#/latihan">
          <RotateCcw size={16} /> Latihan lagi
        </a>
        <button
          className="btn danger-ghost"
          onClick={() => {
            if (confirm('Hapus percobaan ini dari riwayat?')) {
              store.remove('percobaan', p.id);
              location.hash = '/riwayat';
            }
          }}
        >
          <Trash2 size={16} /> Hapus
        </button>
      </PageHead>

      <div className="grid-2">
        <section className="card score-card">
          <div className={`big-score ${toneSkor(skor)}`}>{skor}</div>
          <p>
            <b>
              {p.jumlah_benar} dari {p.jumlah_soal}
            </b>{' '}
            soal benar
          </p>
          <p className="muted small">{skor >= 75 ? 'Bagus. Pertahankan dan lanjut ke topik lain.' : skor >= 55 ? 'Hampir. Baca pembahasan soal yang salah di bawah.' : 'Ulangi topik ini dan baca pembahasannya pelan-pelan.'}</p>
        </section>
        <section className="card">
          <h2 className="label">Per topik</h2>
          <ul className="skor-list">
            {Object.entries(per).map(([t, v]) => {
              const pct = Math.round((v.benar / v.total) * 100);
              return (
                <li key={t}>
                  <div className="row-between">
                    <span>{t}</span>
                    <b>
                      {v.benar}/{v.total}
                    </b>
                  </div>
                  <Bar value={pct} tone={toneSkor(pct)} />
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="row-between">
        <h2>Pembahasan</h2>
        <label className="toggle">
          <input type="checkbox" checked={hanyaSalah} onChange={(e) => setHanyaSalah(e.target.checked)} /> Hanya yang salah
        </label>
      </div>
      <ol className="review">
        {tampil.map((j) => {
          const s = cariSoal(j.soal_id);
          if (!s) return null;
          return (
            <li key={j.soal_id} className="card">
              <div className="row-between">
                <span className="tag">{s.topik}</span>
                <span className={cx('verdict', j.benar ? 'ok' : 'bad')}>
                  {j.benar ? <Check size={14} /> : <X size={14} />} {j.benar ? 'Benar' : j.pilih == null ? 'Tidak dijawab' : 'Salah'}
                </span>
              </div>
              <p className="q-text">{s.teks}</p>
              <ul className="review-opts">
                {s.opsi.map((o, k) => (
                  <li key={k} className={cx(k === s.kunci && 'right', k === j.pilih && k !== s.kunci && 'wrong')}>
                    <span className="opt-key">{String.fromCharCode(65 + k)}</span> {o}
                  </li>
                ))}
              </ul>
              <p className="explain">{s.bahas}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
