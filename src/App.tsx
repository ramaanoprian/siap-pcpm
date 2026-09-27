import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  BookOpen,
  BookOpenCheck,
  Brain,
  CalendarDays,
  ChartColumnBig,
  History,
  House,
  Layers,
  LayoutGrid,
  MessageSquareText,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { Store, StoreContext, usePengaturan } from './lib/sync';
import { LoginPage, NewPasswordPage } from './Login';
import { SyncBadge } from './components';
import { Beranda } from './pages/Beranda';
import { Latihan } from './pages/Latihan';
import { Materi } from './pages/Materi';
import { Riwayat } from './pages/Riwayat';
import { Progres } from './pages/Progres';
import { Flashcard } from './pages/Flashcard';
import { Psikologi } from './pages/Psikologi';
import { Wawancara } from './pages/Wawancara';
import { Jadwal } from './pages/Jadwal';
import { Pengaturan } from './pages/Pengaturan';
import { cx, type Route } from './util';


interface NavItem {
  id: Route;
  nama: string;
  icon: LucideIcon;
  warna: string;
}

const NAV: NavItem[] = [
  { id: 'beranda', nama: 'Beranda', icon: House, warna: 'c-blue' },
  { id: 'materi', nama: 'Materi', icon: BookOpen, warna: 'c-green' },
  { id: 'latihan', nama: 'Latihan', icon: BookOpenCheck, warna: 'c-blue' },
  { id: 'progres', nama: 'Progres', icon: ChartColumnBig, warna: 'c-teal' },
  { id: 'flashcard', nama: 'Flashcard', icon: Layers, warna: 'c-orange' },
  { id: 'jadwal', nama: 'Jadwal', icon: CalendarDays, warna: 'c-purple' },
  { id: 'riwayat', nama: 'Riwayat', icon: History, warna: 'c-teal' },
  { id: 'wawancara', nama: 'Wawancara', icon: MessageSquareText, warna: 'c-pink' },
  { id: 'psikologi', nama: 'Psikologi', icon: Brain, warna: 'c-purple' },
  { id: 'pengaturan', nama: 'Pengaturan', icon: Settings, warna: 'c-teal' },
];
const TAB_UTAMA: Route[] = ['beranda', 'materi', 'latihan', 'jadwal'];

function readRoute(): { route: Route; param?: string } {
  const [r, param] = location.hash.replace(/^#\/?/, '').split('/');
  const route = (NAV.some((n) => n.id === r) || r === 'lainnya' ? r : 'beranda') as Route;
  return { route, param };
}

function useRoute() {
  const [r, setR] = useState(readRoute);
  useEffect(() => {
    const on = () => {
      setR(readRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return r;
}

// ---------- Akun ----------

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!supabase);
  const [recovery, setRecovery] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = supabase ? session?.user.id : 'lokal';
  const store = useMemo(() => (userId ? new Store(userId) : null), [userId]);

  // Sinkron saat masuk, berkala, saat kembali online, dan saat tab dibuka lagi.
  useEffect(() => {
    if (!store || !supabase) return;
    store.sync();
    const tick = setInterval(() => store.sync(), 60_000);
    const onVisible = () => document.visibilityState === 'visible' && store.sync();
    const onOnline = () => store.sync();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('online', onOnline);
    return () => {
      clearInterval(tick);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('online', onOnline);
    };
  }, [store]);

  if (!ready) return <div className="splash" aria-busy="true" />;
  if (supabase && recovery && session) return <NewPasswordPage onDone={() => setRecovery(false)} />;
  if (!store) return <LoginPage />;

  return (
    <StoreContext.Provider value={store}>
      <Shell email={session?.user.email ?? ''} />
    </StoreContext.Provider>
  );
}

// ---------- Kerangka halaman ----------

function useTheme() {
  const [p] = usePengaturan();
  const tema = (p.preferensi.tema as string | undefined) ?? 'auto';
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const dark = tema === 'gelap' || (tema === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
      root.dataset.theme = dark ? 'dark' : 'light';
      document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#0e1621' : '#f2f6fb');
    };
    apply();
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [tema]);
}

function Shell({ email }: { email: string }) {
  const { route, param } = useRoute();
  useTheme();

  let page: ReactNode;
  switch (route) {
    case 'materi': page = <Materi id={param} />; break;
    case 'latihan': page = <Latihan awal={param} />; break;
    case 'riwayat': page = <Riwayat id={param} />; break;
    case 'progres': page = <Progres />; break;
    case 'flashcard': page = <Flashcard />; break;
    case 'psikologi': page = <Psikologi />; break;
    case 'wawancara': page = <Wawancara id={param} />; break;
    case 'jadwal': page = <Jadwal />; break;
    case 'pengaturan': page = <Pengaturan email={email} />; break;
    case 'lainnya': page = <Lainnya />; break;
    default: page = <Beranda />;
  }

  const aktif = (id: Route) => route === id || (id === 'lainnya' && !TAB_UTAMA.includes(route));

  return (
    <div className="app">
      <aside className="side">
        <a className="brand" href="#/">
          <span className="logo" aria-hidden>P</span>
          <span>
            <b>Siap PCPM</b>
            <small>Persiapan tes Bank Indonesia</small>
          </span>
        </a>
        <nav>
          {NAV.map((n) => (
            <a key={n.id} href={`#/${n.id}`} className={cx('side-link', route === n.id && 'on')} aria-current={route === n.id ? 'page' : undefined}>
              <span className={cx('side-icon', n.warna)} aria-hidden>
                <n.icon size={19} strokeWidth={2.2} />
              </span>
              <span>{n.nama}</span>
            </a>
          ))}
        </nav>
        <SyncBadge />
      </aside>

      <main className="main">{page}</main>

      <nav className="tabbar" aria-label="Menu utama">
        {[...NAV.filter((n) => TAB_UTAMA.includes(n.id)), { id: 'lainnya' as Route, nama: 'Lainnya', icon: LayoutGrid, warna: '' }].map((n) => (
          <a key={n.id} href={`#/${n.id}`} className={cx('tab', aktif(n.id) && 'on')} aria-current={aktif(n.id) ? 'page' : undefined}>
            <n.icon size={24} strokeWidth={aktif(n.id) ? 2.2 : 1.8} />
            <span>{n.nama}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

function Lainnya() {
  return (
    <div className="page">
      <header className="page-head">
        <h1>Lainnya</h1>
      </header>
      <div className="menu-grid">
        {NAV.filter((n) => !TAB_UTAMA.includes(n.id)).map((n) => (
          <a key={n.id} href={`#/${n.id}`} className="card menu-tile">
            <span className={`tile-icon ${n.warna}`}>
              <n.icon size={24} strokeWidth={1.8} />
            </span>
            <b>{n.nama}</b>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <SyncBadge />
      </div>
    </div>
  );
}
