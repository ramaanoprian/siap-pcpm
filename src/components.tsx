import type { ReactNode } from 'react';
import { CloudOff, HardDrive, Loader2, RefreshCw, TriangleAlert, Check } from 'lucide-react';
import { useStore, useSyncStatus } from './lib/sync';
import { cx, relatif } from './util';

export function PageHead({ title, sub, children }: { title: string; sub?: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-head">
      <div>
        <h1>{title}</h1>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {children && <div className="page-actions">{children}</div>}
    </header>
  );
}

export function Bar({ value, tone }: { value: number; tone?: 'ok' | 'warn' | 'danger' }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="bar" role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100}>
      <i className={tone} style={{ width: `${v}%` }} />
    </div>
  );
}

export const toneSkor = (s: number | null | undefined) => (s == null ? undefined : s >= 75 ? 'ok' : s >= 55 ? 'warn' : 'danger');

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>;
}

export function SyncBadge() {
  const store = useStore();
  const s = useSyncStatus();
  const label =
    s.state === 'lokal'
      ? 'Mode lokal: data hanya di browser ini'
      : s.state === 'syncing'
        ? 'Menyinkronkan…'
        : s.state === 'offline'
          ? `Offline${s.pending ? ` · ${s.pending} perubahan menunggu` : ''}`
          : s.state === 'error'
            ? 'Sinkron gagal, coba lagi'
            : s.pending
              ? `${s.pending} perubahan menunggu`
              : s.lastSync
                ? `Tersinkron ${relatif(s.lastSync)}`
                : 'Belum tersinkron';
  const Icon =
    s.state === 'lokal' ? HardDrive : s.state === 'syncing' ? Loader2 : s.state === 'offline' ? CloudOff : s.state === 'error' ? TriangleAlert : s.pending ? RefreshCw : Check;
  return (
    <button
      type="button"
      className={cx('sync', s.state)}
      onClick={() => store.sync()}
      disabled={s.state === 'lokal' || s.state === 'syncing'}
      title={s.error ?? 'Sinkronkan sekarang'}
    >
      <Icon size={14} className={s.state === 'syncing' ? 'spin' : undefined} />
      <span>{label}</span>
    </button>
  );
}
