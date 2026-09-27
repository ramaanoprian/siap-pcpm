import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, CircleDot, Pause, Play, RotateCcw } from 'lucide-react';
import { PERTANYAAN, STAR_BAGIAN } from '../data/wawancara';
import { useRows, useStore } from '../lib/sync';
import { Bar, PageHead } from '../components';
import { jamMenit } from '../util';

type Star = Partial<Record<'s' | 't' | 'a' | 'r', string>>;
const KATEGORI = [...new Set(PERTANYAAN.map((p) => p.kategori))];

export function Wawancara({ id }: { id?: string }) {
  const jawaban = useRows('wawancara_jawaban');
  const terisi = new Set(jawaban.filter((j) => j.jawaban.trim() || Object.values((j.star ?? {}) as Star).some((v) => v?.trim())).map((j) => j.pertanyaan_id));
  const q = PERTANYAAN.find((p) => p.id === id);
  if (q) return <Editor key={q.id} id={q.id} />;

  return (
    <div className="page">
      <PageHead title="Wawancara" sub="Siapkan jawaban untuk pertanyaan yang sering muncul. Untuk pertanyaan perilaku, pakai pola STAR." />
      <section className="card">
        <div className="row-between">
          <span>
            {terisi.size} dari {PERTANYAAN.length} pertanyaan sudah dijawab
          </span>
        </div>
        <Bar value={(terisi.size / PERTANYAAN.length) * 100} tone="ok" />
      </section>
      {KATEGORI.map((k) => (
        <section key={k} className="card">
          <h2 className="label">{k}</h2>
          <ul className="q-list">
            {PERTANYAAN.filter((p) => p.kategori === k).map((p) => (
              <li key={p.id}>
                <a href={`#/wawancara/${p.id}`}>
                  {terisi.has(p.id) ? <Check size={16} className="ok-icon" /> : <CircleDot size={16} className="muted" />}
                  <span className="grow">{p.teks}</span>
                  {p.star && <span className="tag">STAR</span>}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Editor({ id }: { id: string }) {
  const store = useStore();
  const q = PERTANYAAN.find((p) => p.id === id)!;
  const saved = useRows('wawancara_jawaban').find((j) => j.pertanyaan_id === id);
  const [teks, setTeks] = useState(saved?.jawaban ?? '');
  const [star, setStar] = useState<Star>((saved?.star as Star) ?? {});
  const [catatan, setCatatan] = useState(saved?.catatan ?? '');
  const [status, setStatus] = useState<'tersimpan' | 'mengetik'>('tersimpan');
  const first = useRef(true);

  // Simpan otomatis 1 detik setelah berhenti mengetik.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setStatus('mengetik');
    const t = setTimeout(() => {
      store.put('wawancara_jawaban', { pertanyaan_id: id, jawaban: teks, star, catatan: catatan || null });
      setStatus('tersimpan');
    }, 1000);
    return () => clearTimeout(t);
  }, [teks, star, catatan, id, store]);

  const kata = (teks + ' ' + Object.values(star).join(' ')).trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="page">
      <a href="#/wawancara" className="small-link back">
        <ArrowLeft size={14} /> Wawancara
      </a>
      <PageHead title={q.teks} sub={q.petunjuk} />
      <Latih />
      {q.star && (
        <section className="card">
          <h2 className="label">Kerangka STAR</h2>
          <div className="star-grid">
            {STAR_BAGIAN.map((b) => (
              <label key={b.key} className="field">
                <span>
                  <b>{b.nama}</b> · <span className="muted">{b.petunjuk}</span>
                </span>
                <textarea rows={3} value={star[b.key] ?? ''} onChange={(e) => setStar((s) => ({ ...s, [b.key]: e.target.value }))} />
              </label>
            ))}
          </div>
        </section>
      )}
      <section className="card">
        <label className="field">
          <span>
            <b>{q.star ? 'Jawaban lengkap' : 'Jawaban'}</b>{' '}
            <span className="muted">{q.star ? '· rangkai keempat bagian STAR menjadi cerita singkat' : ''}</span>
          </span>
          <textarea rows={8} value={teks} onChange={(e) => setTeks(e.target.value)} placeholder="Tulis jawabanmu di sini…" />
        </label>
        <label className="field">
          <span>
            <b>Catatan</b> <span className="muted">· hal yang perlu diperbaiki, masukan dari teman, dll.</span>
          </span>
          <textarea rows={2} value={catatan} onChange={(e) => setCatatan(e.target.value)} />
        </label>
        <p className="muted small">
          {kata} kata · sekitar {Math.max(1, Math.round(kata / 130))} menit diucapkan · {status === 'tersimpan' ? 'Tersimpan' : 'Menyimpan…'}
        </p>
      </section>
    </div>
  );
}

/** Stopwatch untuk latihan menjawab dengan suara keras (target 1–2 menit). */
function Latih() {
  const [jalan, setJalan] = useState(false);
  const [detik, setDetik] = useState(0);
  useEffect(() => {
    if (!jalan) return;
    const t = setInterval(() => setDetik((d) => d + 1), 1000);
    return () => clearInterval(t);
  }, [jalan]);
  return (
    <section className="card latih">
      <div>
        <b className={detik > 120 ? 'timer low' : 'timer'}>{jamMenit(detik)}</b>
        <p className="muted small">Latih menjawab dengan suara keras. Idealnya 1–2 menit.</p>
      </div>
      <div className="row">
        <button className="btn" onClick={() => setJalan(!jalan)}>
          {jalan ? <Pause size={16} /> : <Play size={16} />} {jalan ? 'Jeda' : 'Mulai'}
        </button>
        <button className="icon-btn" aria-label="Ulang" onClick={() => { setJalan(false); setDetik(0); }}>
          <RotateCcw size={16} />
        </button>
      </div>
    </section>
  );
}
