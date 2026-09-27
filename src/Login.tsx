import { useState, type ReactNode } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="login">
      <div className="login-hero">
        <span className="logo big" aria-hidden>P</span>
        <h1>Siap PCPM.</h1>
        <p>Latihan soal, flashcard, jadwal, dan persiapan wawancara, tersinkron di semua perangkatmu.</p>
      </div>
      <div className="login-main">{children}</div>
    </div>
  );
}

function Field({ label, ...input }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...input} />
    </label>
  );
}

const pesanGalat = (msg: string) =>
  /invalid login/i.test(msg)
    ? 'Email atau kata sandi salah.'
    : /email not confirmed/i.test(msg)
      ? 'Email belum dikonfirmasi. Buka Supabase → Authentication → Users, lalu konfirmasi akunnya.'
      : /rate limit/i.test(msg)
        ? 'Terlalu banyak percobaan. Tunggu beberapa menit.'
        : msg;

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [lupa, setLupa] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setErr(null);
    setInfo(null);
    if (lupa) {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: location.href.split('#')[0],
      });
      if (error) setErr(pesanGalat(error.message));
      else setInfo('Link untuk membuat kata sandi baru sudah dikirim. Cek email (dan folder spam).');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
      if (error) setErr(pesanGalat(error.message));
    }
    setBusy(false);
  };

  return (
    <Shell>
      <form className="login-card" onSubmit={submit}>
        <h2>{lupa ? 'Atur ulang kata sandi' : 'Masuk'}</h2>
        <p className="muted">{lupa ? 'Masukkan email akunmu.' : 'Pakai akun yang dibuat di Supabase.'}</p>
        <Field label="Email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        {!lupa && (
          <Field label="Kata sandi" type="password" autoComplete="current-password" required value={pw} onChange={(e) => setPw(e.target.value)} />
        )}
        {err && <p className="notice error">{err}</p>}
        {info && <p className="notice ok">{info}</p>}
        <button className="btn primary block" disabled={busy}>
          {busy ? <Loader2 className="spin" size={18} /> : <>{lupa ? 'Kirim link' : 'Masuk'} <ArrowRight size={16} /></>}
        </button>
        <button type="button" className="link-btn" onClick={() => { setLupa(!lupa); setErr(null); setInfo(null); }}>
          {lupa ? 'Kembali ke halaman masuk' : 'Lupa kata sandi?'}
        </button>
      </form>
    </Shell>
  );
}

export function NewPasswordPage({ onDone }: { onDone: () => void }) {
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <Shell>
      <form
        className="login-card"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const { error } = await supabase!.auth.updateUser({ password: pw });
          setBusy(false);
          if (error) setErr(pesanGalat(error.message));
          else {
            history.replaceState(null, '', location.pathname);
            onDone();
          }
        }}
      >
        <h2>Buat kata sandi baru</h2>
        <Field label="Kata sandi baru (min. 8 karakter)" type="password" autoComplete="new-password" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} />
        {err && <p className="notice error">{err}</p>}
        <button className="btn primary block" disabled={busy || pw.length < 8}>
          {busy ? <Loader2 className="spin" size={18} /> : 'Simpan'}
        </button>
      </form>
    </Shell>
  );
}
