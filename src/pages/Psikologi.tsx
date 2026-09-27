import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { BUTIR, DIMENSI, SKALA, nilaiPsikologi } from '../data/psikologi';
import { newId, useRows, useStore, type PsikologiHasil } from '../lib/sync';
import { Bar, Empty, PageHead, toneSkor } from '../components';
import { cx, shuffle, tanggal } from '../util';

export function Psikologi() {
  const hasil = useRows('psikologi_hasil');
  const [mode, setMode] = useState<'daftar' | 'isi' | string>('daftar');
  const urut = [...hasil].sort((a, b) => (b.created_at ?? b.client_updated_at).localeCompare(a.created_at ?? a.client_updated_at));

  if (mode === 'isi') return <Isi onSelesai={(id) => setMode(id)} onBatal={() => setMode('daftar')} />;
  const lihat = hasil.find((h) => h.id === mode);
  if (lihat) return <Hasil h={lihat} onKembali={() => setMode('daftar')} />;

  return (
    <div className="page">
      <PageHead title="Psikologi" sub="Latihan refleksi diri untuk membiasakan menjawab jujur dan konsisten. Ini bukan tes psikologi resmi." />
      <section className="card">
        <h2>Sebelum mulai</h2>
        <ul className="tips">
          <li>Ada {BUTIR.length} pernyataan. Jawab sesuai kebiasaanmu yang sebenarnya, bukan jawaban yang terdengar ideal.</li>
          <li>Beberapa pernyataan sengaja berlawanan makna. Jawaban yang saling bertentangan menurunkan skor konsistensi.</li>
          <li>Hindari terlalu sering memilih Netral. Di tes asli, pola ini bisa terbaca sebagai ragu-ragu.</li>
        </ul>
        <button className="btn primary big" onClick={() => setMode('isi')}>
          Mulai <ArrowRight size={16} />
        </button>
      </section>

      <section className="card">
        <h2 className="label">Riwayat sesi</h2>
        {urut.length ? (
          <ul className="attempts">
            {urut.map((h) => (
              <li key={h.id}>
                <button type="button" onClick={() => setMode(h.id)}>
                  <span className={`skor-pill ${toneSkor(Number(h.skor_konsistensi))}`}>{Math.round(Number(h.skor_konsistensi ?? 0))}</span>
                  <span className="grow">
                    <b>Konsistensi {Math.round(Number(h.skor_konsistensi ?? 0))}%</b>
                    <small className="muted block">{tanggal(h.created_at ?? h.client_updated_at)}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Belum ada sesi.</Empty>
        )}
      </section>
    </div>
  );
}

function Isi({ onSelesai, onBatal }: { onSelesai: (id: string) => void; onBatal: () => void }) {
  const store = useStore();
  const urutan = useMemo(() => shuffle(BUTIR), []);
  const [jawaban, setJawaban] = useState<Record<string, number>>({});
  const [i, setI] = useState(0);
  const b = urutan[i];
  const lengkap = Object.keys(jawaban).length === urutan.length;

  const pilih = (v: number) => {
    setJawaban((j) => ({ ...j, [b.id]: v }));
    if (i < urutan.length - 1) setTimeout(() => setI((x) => x + 1), 150);
  };

  const simpan = () => {
    const { profil, konsistensi } = nilaiPsikologi(jawaban);
    const id = newId();
    store.put('psikologi_hasil', { id, jawaban, profil, skor_konsistensi: konsistensi });
    onSelesai(id);
  };

  return (
    <div className="page quiz">
      <div className="quiz-top">
        <button type="button" className="icon-btn" onClick={onBatal} aria-label="Batal">
          <ArrowLeft size={20} />
        </button>
        <div className="grow">
          <div className="row-between small">
            <span>
              Pernyataan {i + 1} dari {urutan.length}
            </span>
          </div>
          <Bar value={(Object.keys(jawaban).length / urutan.length) * 100} />
        </div>
      </div>
      <section className="card question">
        <p className="q-text big">{b.teks}</p>
        <div className="likert">
          {SKALA.map((s, k) => (
            <button key={k} type="button" className={cx('option', jawaban[b.id] === k + 1 && 'picked')} onClick={() => pilih(k + 1)}>
              <span className="opt-key">{k + 1}</span>
              <span className="grow">{s}</span>
            </button>
          ))}
        </div>
      </section>
      <div className="quiz-nav">
        <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>
          <ArrowLeft size={16} /> Sebelumnya
        </button>
        {i < urutan.length - 1 ? (
          <button className="btn" onClick={() => setI(i + 1)} disabled={!jawaban[b.id]}>
            Berikutnya <ArrowRight size={16} />
          </button>
        ) : (
          <button className="btn primary" disabled={!lengkap} onClick={simpan}>
            Lihat hasil
          </button>
        )}
      </div>
    </div>
  );
}

function Hasil({ h, onKembali }: { h: PsikologiHasil; onKembali: () => void }) {
  const store = useStore();
  const profil = (h.profil ?? {}) as Record<string, number>;
  const k = Math.round(Number(h.skor_konsistensi ?? 0));
  const jawaban = (h.jawaban ?? {}) as Record<string, number>;
  const netral = Object.values(jawaban).filter((v) => v === 3).length;
  return (
    <div className="page">
      <button className="small-link back" onClick={onKembali}>
        <ArrowLeft size={14} /> Psikologi
      </button>
      <PageHead title="Profil refleksi diri" sub={tanggal(h.created_at ?? h.client_updated_at)}>
        <button
          className="btn danger-ghost"
          onClick={() => {
            if (confirm('Hapus hasil ini?')) {
              store.remove('psikologi_hasil', h.id);
              onKembali();
            }
          }}
        >
          <Trash2 size={16} /> Hapus
        </button>
      </PageHead>
      <div className="grid-2">
        <section className="card score-card">
          <div className={`big-score ${toneSkor(k)}`}>{k}</div>
          <p>
            <b>Skor konsistensi</b>
          </p>
          <p className="muted small">
            {k >= 80 ? 'Jawabanmu konsisten.' : k >= 60 ? 'Ada beberapa jawaban yang saling bertentangan. Baca ulang pernyataan dengan teliti.' : 'Banyak jawaban bertentangan. Jawab lebih jujur dan pelan-pelan.'}
            {netral > 5 && ` Kamu memilih Netral ${netral} kali. Coba lebih tegas.`}
          </p>
        </section>
        <section className="card">
          <h2 className="label">Profil</h2>
          <ul className="skor-list">
            {DIMENSI.map((d) => (
              <li key={d.id}>
                <div className="row-between">
                  <span>
                    {d.nama} <small className="muted">· {d.keterangan}</small>
                  </span>
                  <b>{profil[d.id] ?? 0}</b>
                </div>
                <Bar value={profil[d.id] ?? 0} tone={toneSkor(profil[d.id])} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
