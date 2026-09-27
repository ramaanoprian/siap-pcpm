import { ArrowLeft, ArrowRight, BookOpen, Check, CircleCheck, Clock, ExternalLink, Lightbulb, Link2, Play, Search } from 'lucide-react';
import { babById, babKelompok, KELOMPOK, MATERI, type Bab } from '../data/materi';
import { usePengaturan } from '../lib/sync';
import { Bar, PageHead } from '../components';
import { cx } from '../util';

export function useDibaca() {
  const [p, save] = usePengaturan();
  const dibaca = (p.preferensi.materi_dibaca as string[] | undefined) ?? [];
  const set = (id: string, on: boolean) => {
    const next = on ? [...new Set([...dibaca, id])] : dibaca.filter((x) => x !== id);
    save({ preferensi: { ...p.preferensi, materi_dibaca: next } });
  };
  return [dibaca, set] as const;
}

/** Ke mana tombol latihan mengarah untuk bab yang tidak punya bank soal. */
const LATIHAN_LAIN: Record<string, { href: string; label: string }> = {
  'tpd-pof': { href: '#/wawancara', label: 'Coba wawancara' },
  lgd: { href: '#/wawancara', label: 'Coba wawancara' },
  'wawancara-akhir': { href: '#/wawancara', label: 'Coba wawancara' },
  psikotes: { href: '#/psikologi', label: 'Coba psikotes' },
  kesehatan: { href: '#/jadwal', label: 'Atur jadwal' },
  'peta-seleksi': { href: '#/jadwal', label: 'Atur jadwal' },
};

export function tujuanLatihan(bab: Bab) {
  if (bab.modul) return { href: bab.topik ? `#/latihan/bab-${bab.id}` : `#/latihan/${bab.modul}`, label: 'Latihan soal' };
  return LATIHAN_LAIN[bab.id];
}

export function Materi({ id }: { id?: string }) {
  const bab = babById(id);
  return bab ? <BacaBab key={bab.id} bab={bab} /> : <DaftarBab />;
}

function DaftarBab() {
  const [dibaca] = useDibaca();
  const selesai = MATERI.filter((b) => dibaca.includes(b.id)).length;
  const lanjut = MATERI.find((b) => !dibaca.includes(b.id));
  const jumlahVideo = MATERI.reduce((n, b) => n + (b.video?.length ?? 0), 0);

  return (
    <div className="page">
      <PageHead title="Materi" sub="Semua subtes dan tahapan seleksi PCPM. Baca rangkuman, tonton videonya, lalu latihan." />

      <section className="card hero-materi">
        <div className="grow">
          <p className="eyebrow">Progres belajarmu</p>
          <h2 className="display-sm">
            {selesai} dari {MATERI.length} bab selesai
          </h2>
          <Bar value={(selesai / MATERI.length) * 100} tone="ok" />
          <p className="hero-stats">
            <span>📚 {MATERI.length} bab</span>
            <span>▶️ {jumlahVideo} video</span>
            <span>🧩 {KELOMPOK.length} kelompok</span>
          </p>
        </div>
        {lanjut && (
          <a className="btn primary" href={`#/materi/${lanjut.id}`}>
            <BookOpen size={18} /> {selesai ? 'Lanjut baca' : 'Mulai baca'}
          </a>
        )}
      </section>

      <nav className="kelompok-jump" aria-label="Lompat ke kelompok">
        {KELOMPOK.map((k) => (
          <a key={k.id} href={`#/materi`} onClick={(e) => { e.preventDefault(); document.getElementById(`k-${k.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className={cx('jump-chip', k.warna)}>
            <span aria-hidden>{k.emoji}</span> {k.nama}
          </a>
        ))}
      </nav>

      {KELOMPOK.map((k) => {
        const bab = babKelompok(k.id);
        const sudah = bab.filter((b) => dibaca.includes(b.id)).length;
        return (
          <section key={k.id} id={`k-${k.id}`} className="kelompok">
            <header className={cx('kelompok-head', k.warna)}>
              <span className="kelompok-emoji" aria-hidden>
                {k.emoji}
              </span>
              <span className="grow">
                <h2>{k.nama}</h2>
                <small>{k.singkat}</small>
              </span>
              <span className="kelompok-count">
                {sudah}/{bab.length}
              </span>
            </header>
            <ol className="path">
              {bab.map((b, i) => {
                const done = dibaca.includes(b.id);
                return (
                  <li key={b.id} className={cx('path-item', k.warna, done && 'done', lanjut?.id === b.id && 'next')}>
                    <span className="path-dot" aria-hidden>
                      {done ? <Check size={18} strokeWidth={3} /> : i + 1}
                    </span>
                    <a className="card path-card" href={`#/materi/${b.id}`}>
                      <span className="grow">
                        <b>{b.judul}</b>
                        <small className="block muted">{b.ringkas}</small>
                        <span className="path-meta">
                          <span className="chip small">
                            <Clock size={13} /> {b.menit} menit
                          </span>
                          {!!b.video?.length && (
                            <span className="chip small">
                              <Play size={13} /> {b.video.length} video
                            </span>
                          )}
                          {done && (
                            <span className="chip small ok">
                              <CircleCheck size={13} /> Selesai
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
          </section>
        );
      })}

      <p className="muted small">
        Isi dirangkum dari sumber resmi (bi.go.id, teks undang-undang, ojk.go.id, lps.go.id, kemenkeu.go.id, bps.go.id, KBBI) dan tautannya ada di akhir setiap bab. Bagian berlabel tips adalah saran
        belajar, bukan ketentuan resmi BI. Angka yang sering berubah, seperti BI-Rate terbaru, sengaja tidak ditulis.
      </p>
    </div>
  );
}

function BacaBab({ bab }: { bab: Bab }) {
  const [dibaca, setDibaca] = useDibaca();
  const done = dibaca.includes(bab.id);
  const k = KELOMPOK.find((x) => x.id === bab.kelompok)!;
  const sekelompok = babKelompok(bab.kelompok);
  const idx = MATERI.indexOf(bab);
  const berikut = MATERI[idx + 1];
  const latihan = tujuanLatihan(bab);

  return (
    <div className="page reader">
      <a className="back" href="#/materi">
        <ArrowLeft size={16} /> Semua materi
      </a>

      <header className={cx('reader-head', k.warna)}>
        <p className="eyebrow">
          <span aria-hidden>{k.emoji}</span> {k.nama} · Bab {sekelompok.indexOf(bab) + 1} dari {sekelompok.length}
        </p>
        <h1>{bab.judul}</h1>
        <p>{bab.ringkas}</p>
        <div className="path-meta">
          <span className="chip small">
            <Clock size={13} /> {bab.menit} menit baca
          </span>
          {!!bab.video?.length && (
            <span className="chip small">
              <Play size={13} /> {bab.video.length} video
            </span>
          )}
          <span className="chip small">
            <Link2 size={13} /> {bab.sumber.length} sumber
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

      {!!bab.video?.length && (
        <section className="card">
          <h2 className="row">
            <Play size={20} /> Belajar lewat video
          </h2>
          <ul className="video-list">
            {bab.video.map((v) => {
              const cari = v.kanal === 'Pencarian YouTube';
              return (
                <li key={v.url}>
                  <a className={cx('video-item', cari && 'cari')} href={v.url} target="_blank" rel="noreferrer">
                    <span className="video-play" aria-hidden>
                      {cari ? <Search size={18} /> : <Play size={18} fill="currentColor" />}
                    </span>
                    <span className="grow">
                      <b>{v.judul}</b>
                      <small className="block muted">{v.kanal}</small>
                    </span>
                    <ExternalLink size={15} className="muted" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="muted small">Video dibuka di YouTube atau situs pemiliknya. Kalau ada isi yang berbeda dengan rangkuman di atas, ikuti sumber resmi.</p>
        </section>
      )}

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
          {done ? <CircleCheck size={18} /> : <Check size={18} />} {done ? 'Selesai' : 'Tandai selesai'}
        </button>
        {latihan && (
          <a className="btn primary" href={latihan.href} onClick={() => !done && setDibaca(bab.id, true)}>
            {latihan.label} <ArrowRight size={18} />
          </a>
        )}
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
