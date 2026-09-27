import { useEffect, useState } from 'react';
import { Download, KeyRound, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { usePengaturan } from '../lib/sync';
import { PageHead, SyncBadge } from '../components';
import { TARGET_SOAL_DEFAULT } from '../lib/stats';
import { cx, daysBetween, today } from '../util';

interface InstallPrompt extends Event {
  prompt: () => Promise<void>;
}

/** Tombol pasang aplikasi (Chrome/Edge/Android); di iPhone lewat menu Bagikan → Tambah ke Layar Utama. */
function usePasang() {
  const [ev, setEv] = useState<InstallPrompt | null>(null);
  useEffect(() => {
    const on = (e: Event) => {
      e.preventDefault();
      setEv(e as InstallPrompt);
    };
    window.addEventListener('beforeinstallprompt', on);
    return () => window.removeEventListener('beforeinstallprompt', on);
  }, []);
  return ev;
}

export function Pengaturan({ email }: { email: string }) {
  const [p, save] = usePengaturan();
  const tema = (p.preferensi.tema as string | undefined) ?? 'auto';
  const [pw, setPw] = useState('');
  const [pesan, setPesan] = useState<string | null>(null);
  const target = (p.preferensi.target_soal as number | undefined) ?? TARGET_SOAL_DEFAULT;
  const pasang = usePasang();
  const terpasang = typeof window !== 'undefined' && window.matchMedia?.('(display-mode: standalone)').matches;

  return (
    <div className="page">
      <PageHead title="Pengaturan" />

      <section className="card">
        <h2 className="label">Target belajar</h2>
        <div className="form-grid">
          <label className="field">
            <span>Tanggal tes (perkiraan)</span>
            <input type="date" value={p.tanggal_target} min={today()} onChange={(e) => e.target.value && save({ tanggal_target: e.target.value })} />
          </label>
          <label className="field">
            <span>Menit belajar per hari</span>
            <input
              type="number"
              min={5}
              max={600}
              step={5}
              value={p.menit_per_hari}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= 5 && v <= 600) save({ menit_per_hari: v });
              }}
            />
          </label>
        </div>
        <div>
          <span className="field">Target soal per hari</span>
          <div className="seg">
            {[10, 20, 30, 50].map((n) => (
              <button key={n} type="button" className={cx(target === n && 'on')} onClick={() => save({ preferensi: { ...p.preferensi, target_soal: n } })}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <p className="muted small">
          {daysBetween(today(), p.tanggal_target)} hari lagi, sekitar {Math.round((daysBetween(today(), p.tanggal_target) * p.menit_per_hari) / 60)} jam belajar. Jadwal yang sudah disusun tidak ikut berubah. Hapus tugasnya di Jadwal bila ingin menyusun ulang.
        </p>
      </section>

      <section className="card">
        <h2 className="label">Tampilan</h2>
        <div className="seg">
          {[
            ['auto', 'Ikuti perangkat'],
            ['terang', 'Terang'],
            ['gelap', 'Gelap'],
          ].map(([id, nama]) => (
            <button key={id} type="button" className={cx(tema === id && 'on')} onClick={() => save({ preferensi: { ...p.preferensi, tema: id } })}>
              {nama}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="label">Pasang di HP</h2>
        {terpasang ? (
          <p className="muted small">Aplikasi sudah terpasang. Materi dan latihan tetap bisa dibuka tanpa internet; progres dikirim saat online lagi.</p>
        ) : (
          <>
            <p className="muted small">
              Pasang Siap PCPM di layar utama supaya bisa dibuka seperti aplikasi, termasuk saat offline. Di iPhone: buka di Safari, ketuk Bagikan, lalu "Tambah ke Layar Utama".
            </p>
            {pasang && (
              <button className="btn primary" onClick={() => pasang.prompt()}>
                <Download size={16} /> Pasang aplikasi
              </button>
            )}
          </>
        )}
      </section>

      <section className="card">
        <h2 className="label">Sinkronisasi</h2>
        <p className="muted small">
          Data disimpan dulu di perangkat ini, lalu dikirim ke server otomatis setiap ada perubahan dan setiap menit. Aplikasi tetap bisa dipakai tanpa internet.
        </p>
        <SyncBadge />
      </section>

      {supabase && (
        <section className="card">
          <h2 className="label">Akun</h2>
          <p>{email}</p>
          <form
            className="row wrap"
            onSubmit={async (e) => {
              e.preventDefault();
              const { error } = await supabase!.auth.updateUser({ password: pw });
              setPesan(error ? error.message : 'Kata sandi diganti.');
              if (!error) setPw('');
            }}
          >
            <input className="input" type="password" minLength={8} placeholder="Kata sandi baru (min. 8)" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
            <button className="btn" disabled={pw.length < 8}>
              <KeyRound size={16} /> Ganti sandi
            </button>
          </form>
          {pesan && <p className="muted small">{pesan}</p>}
          <button className="btn danger-ghost" onClick={() => supabase!.auth.signOut()}>
            <LogOut size={16} /> Keluar
          </button>
        </section>
      )}
    </div>
  );
}
