import { ArrowRight, BookOpen, BookOpenCheck, CalendarDays, ChartColumnBig, Flame, Layers, MessageSquareText, RotateCcw, Target } from 'lucide-react';
import { MATERI } from '../data/materi';
import { MODUL, FASE, namaModul } from '../data/modul';
import { SOAL } from '../data/soal';
import { ISTILAH } from '../data/istilah';
import { useRows, usePengaturan, useStore } from '../lib/sync';
import { byMulaiDesc, faseUntuk, labelPercobaan, rataSkorModul, soalJatuhTempo, soalPerHari, streak, TARGET_SOAL_DEFAULT, topikLemah } from '../lib/stats';
import { Bar, Empty, toneSkor } from '../components';
import { addDays, cx, daysBetween, durasi, parseDate, relatif, tanggalPanjang, today } from '../util';

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
  const dibaca = (p.preferensi.materi_dibaca as string[] | undefined) ?? [];
  const babBerikut = MATERI.find((b) => !dibaca.includes(b.id));
  const target = (p.preferensi.target_soal as number | undefined) ?? TARGET_SOAL_DEFAULT;
  const perHari = soalPerHari(percobaan);
  const soalHariIni = perHari.get(hariIni) ?? 0;
  const minggu = Array.from({ length: 7 }, (_, k) => addDays(hariIni, k - 6));
  const perluUlang = soalJatuhTempo(status, hariIni).size;
  const sapaan = new Date().getHours() < 11 ? 'Selamat pagi' : new Date().getHours() < 15 ? 'Selamat siang' : new Date().getHours() < 19 ? 'Selamat sore' : 'Selamat malam';

  return (
    <div className="page">
      <section className="hero card">
        <div>
          <p className="eyebrow">
            {sapaan}! · {tanggalPanjang(hariIni)}
          </p>
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

      <section className="card daily">
        <Cincin nilai={soalHariIni} target={target} />
        <div className="grow">
          <p className="eyebrow">Target hari ini</p>
          <h2>
            {soalHariIni >= target ? 'Target tercapai! 🎉' : `${target - soalHariIni} soal lagi`}
          </h2>
          <ol className="week" aria-label="Soal 7 hari terakhir">
            {minggu.map((d) => {
              const n = perHari.get(d) ?? 0;
              return (
                <li key={d} className={cx(n >= target && 'full', n > 0 && n < target && 'part', d === hariIni && 'now')} title={`${d}: ${n} soal`}>
                  <span>{['M', 'S', 'S', 'R', 'K', 'J', 'S'][parseDate(d).getDay()]}</span>
                  <i aria-hidden>{n >= target ? '★' : ''}</i>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="daily-actions">
          <a className="btn primary" href="#/latihan">
            Latihan <ArrowRight size={16} />
          </a>
          {perluUlang > 0 && (
            <a className="btn tonal" href="#/latihan/ulang">
              <RotateCcw size={16} /> Ulang {perluUlang}
            </a>
          )}
        </div>
      </section>

      <nav className="tiles" aria-label="Menu belajar">
        {TILES.map((t) => (
          <a key={t.href} className="tile" href={t.href}>
            <span className={`tile-icon ${t.warna}`}>
              <t.icon size={24} />
            </span>
            {t.nama}
          </a>
        ))}
      </nav>

      <a className="card continue" href={babBerikut ? `#/materi/${babBerikut.id}` : `#/latihan`}>
        <span className="tile-icon c-green" aria-hidden>
          {babBerikut ? <BookOpen size={26} /> : <BookOpenCheck size={26} />}
        </span>
        <span className="grow">
          <small className="muted block">{babBerikut ? `Lanjut belajar · ${dibaca.length}/${MATERI.length} bab dibaca` : 'Semua bab sudah dibaca'}</small>
          <b>{babBerikut ? babBerikut.judul : 'Asah terus lewat latihan campuran'}</b>
          <small className="muted block">{babBerikut ? `${babBerikut.menit} menit baca${babBerikut.video?.length ? `, ${babBerikut.video.length} video` : ''}` : 'Soal Potensi Dasar selalu baru dan opsi jawaban diacak.'}</small>
        </span>
        <ArrowRight size={20} />
      </a>

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
                      <b>{labelPercobaan(a, namaModul)}</b>
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

const TILES = [
  { href: '#/materi', nama: 'Materi', icon: BookOpen, warna: 'c-green' },
  { href: '#/latihan', nama: 'Latihan', icon: BookOpenCheck, warna: 'c-blue' },
  { href: '#/flashcard', nama: 'Flashcard', icon: Layers, warna: 'c-orange' },
  { href: '#/jadwal', nama: 'Jadwal', icon: CalendarDays, warna: 'c-purple' },
  { href: '#/wawancara', nama: 'Wawancara', icon: MessageSquareText, warna: 'c-pink' },
  { href: '#/progres', nama: 'Progres', icon: ChartColumnBig, warna: 'c-teal' },
];

/** Cincin progres target soal harian. */
function Cincin({ nilai, target }: { nilai: number; target: number }) {
  const r = 34;
  const k = 2 * Math.PI * r;
  const f = Math.min(1, nilai / Math.max(1, target));
  return (
    <svg className={cx('ring', f >= 1 && 'full')} viewBox="0 0 84 84" role="img" aria-label={`${nilai} dari ${target} soal`}>
      <circle cx="42" cy="42" r={r} className="ring-bg" />
      <circle cx="42" cy="42" r={r} className="ring-fg" strokeDasharray={k} strokeDashoffset={k * (1 - f)} transform="rotate(-90 42 42)" />
      <text x="42" y="40" textAnchor="middle" className="ring-n">
        {nilai}
      </text>
      <text x="42" y="56" textAnchor="middle" className="ring-t">
        dari {target}
      </text>
    </svg>
  );
}

