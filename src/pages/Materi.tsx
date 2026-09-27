import { ArrowLeft, ArrowRight, BookOpen, Check, CircleCheck, Clock, ExternalLink, Lightbulb, Link2 } from 'lucide-react';
import { babById, MATERI, type Bab } from '../data/materi';
import { usePengaturan } from '../lib/sync';
import { Bar, PageHead } from '../components';
import { cx } from '../util';

function useDibaca() {
  const [p, save] = usePengaturan();
  const dibaca = (p.preferensi.materi_dibaca as string[] | undefined) ?? [];
  const set = (id: string, on: boolean) => {
    const next = on ? [...new Set([...dibaca, id])] : dibaca.filter((x) => x !== id);
    save({ preferensi: { ...p.preferensi, materi_dibaca: next } });
  };
  return [dibaca, set] as const;
}

export function Materi({ id }: { id?: string }) {
  const bab = babById(id);
  return bab ? <BacaBab bab={bab} /> : <DaftarBab />;
}

function DaftarBab() {
  const [dibaca] = useDibaca();
  const selesai = MATERI.filter((b) => dibaca.includes(b.id)).length;
  const lanjut = MATERI.find((b) => !dibaca.includes(b.id));

  return (
    <div className="page">
      <PageHead title="Materi" sub="Baca rangkumannya dulu, lalu langsung latihan soal di topik yang sama." />

      <section className="card hero-materi">
        <div className="grow">
          <p className="eyebrow">Kebanksentralan</p>
          <h2 className="display-sm">
            {selesai} dari {MATERI.length} bab dibaca
          </h2>
          <Bar value={(selesai / MATERI.length) * 100} tone="ok" />
        </div>
        {lanjut && (
          <a className="btn primary" href={`#/materi/${lanjut.id}`}>
            <BookOpen size={18} /> {selesai ? 'Lanjut baca' : 'Mulai baca'}
          </a>
        )}
      </section>

      <ol className="path">
        {MATERI.map((b, k) => {
          const done = dibaca.includes(b.id);
          return (
            <li key={b.id} className={cx('path-item', done && 'done', lanjut?.id === b.id && 'next')}>
              <span className="path-dot" aria-hidden>
                {done ? <Check size={18} strokeWidth={2.6} /> : k + 1}
              </span>
              <a className="card path-card" href={`#/materi/${b.id}`}>
                <span className="grow">
                  <b>{b.judul}</b>
                  <small className="block muted">{b.ringkas}</small>
                  <span className="path-meta">
                    <span className="chip small">
                      <Clock size={13} /> {b.menit} menit
                    </span>
                    <span className="chip small">{b.topik}</span>
                    {done && (
                      <span className="chip small ok">
                        <CircleCheck size={13} /> Sudah dibaca
                      </span>
                    )}
                  </span>
                </span>
                <ArrowRight size={18} className="muted" />
              </a>
            </li>
          );
        })}
      </ol>

      <section className="card">
        <h2>Potensi Dasar dan English</h2>
        <p className="muted">
          Kedua modul ini lebih banyak diasah lewat latihan. Setiap soal punya pembahasan, dan soal hitungan dibuat baru dengan angka acak setiap kali latihan.
        </p>
        <div className="row wrap">
          <a className="btn tonal" href="#/latihan/potensi-dasar">
            Latihan Potensi Dasar
          </a>
          <a className="btn tonal" href="#/latihan/english">
            Latihan English
          </a>
        </div>
      </section>

      <p className="muted small">
        Semua isi dirangkum dari sumber resmi: bi.go.id, teks undang-undang, ojk.go.id, lps.go.id, dan kemenkeu.go.id. Tautannya ada di akhir setiap bab. Angka yang sering berubah, seperti BI-Rate
        terbaru, sengaja tidak ditulis; cek langsung di situs BI.
      </p>
    </div>
  );
}

function BacaBab({ bab }: { bab: Bab }) {
  const [dibaca, setDibaca] = useDibaca();
  const done = dibaca.includes(bab.id);
  const idx = MATERI.indexOf(bab);
  const berikut = MATERI[idx + 1];

  return (
    <div className="page reader">
      <a className="back" href="#/materi">
        <ArrowLeft size={16} /> Semua bab
      </a>

      <header className="reader-head">
        <p className="eyebrow">
          Bab {idx + 1} dari {MATERI.length} · {bab.topik}
        </p>
        <h1>{bab.judul}</h1>
        <p className="muted">{bab.ringkas}</p>
        <div className="path-meta">
          <span className="chip small">
            <Clock size={13} /> {bab.menit} menit baca
          </span>
          <span className="chip small">
            <Link2 size={13} /> {bab.sumber.length} sumber resmi
          </span>
        </div>
      </header>

      <section className="card ingat">
        <h2 className="row">
          <Lightbulb size={20} /> Poin yang sering ditanya
        </h2>
        <ul>
          {bab.ingat.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <article className="card prose">
        {bab.bagian.map((b) => (
          <section key={b.judul}>
            <h2>{b.judul}</h2>
            {b.isi?.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {b.poin && (
              <ul>
                {b.poin.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <section className="card">
        <h2 className="label">Sumber</h2>
        <ul className="sources">
          {bab.sumber.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.nama} <ExternalLink size={13} />
              </a>
              <small className="block muted">{new URL(s.url).hostname.replace(/^www\./, '')}</small>
            </li>
          ))}
        </ul>
      </section>

      <div className="reader-actions">
        <button type="button" className={cx('btn', done ? 'tonal' : 'outlined')} onClick={() => setDibaca(bab.id, !done)} aria-pressed={done}>
          {done ? <CircleCheck size={18} /> : <Check size={18} />} {done ? 'Sudah dibaca' : 'Tandai dibaca'}
        </button>
        <a className="btn primary" href={`#/latihan/bab-${bab.id}`} onClick={() => !done && setDibaca(bab.id, true)}>
          Latihan soal <ArrowRight size={18} />
        </a>
      </div>

      {berikut && (
        <a className="card next-bab" href={`#/materi/${berikut.id}`}>
          <span className="grow">
            <small className="muted block">Bab berikutnya</small>
            <b>{berikut.judul}</b>
          </span>
          <ArrowRight size={18} />
        </a>
      )}
    </div>
  );
}
