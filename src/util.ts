/** Tanggal lokal hari ini dalam format YYYY-MM-DD (bukan UTC, agar pergantian hari mengikuti jam WIB). */
export function today(): string {
  return toDateStr(new Date());
}

export function toDateStr(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(s: string, n: number): string {
  const d = parseDate(s);
  d.setDate(d.getDate() + n);
  return toDateStr(d);
}

/** Selisih hari b − a. */
export function daysBetween(a: string, b: string): number {
  return Math.round((parseDate(b).getTime() - parseDate(a).getTime()) / 86_400_000);
}

const fmtTgl = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
const fmtTglPanjang = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const fmtHari = new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
const fmtJam = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' });

export const tanggal = (s: string) => fmtTgl.format(s.length === 10 ? parseDate(s) : new Date(s));
export const tanggalPanjang = (s: string) => fmtTglPanjang.format(s.length === 10 ? parseDate(s) : new Date(s));
export const hari = (s: string) => fmtHari.format(parseDate(s));
export const jam = (iso: string) => fmtJam.format(new Date(iso));

export function durasi(detik: number): string {
  const m = Math.floor(detik / 60);
  const s = detik % 60;
  if (m >= 60) return `${Math.floor(m / 60)} j ${m % 60} m`;
  return m ? `${m} m ${String(s).padStart(2, '0')} d` : `${s} d`;
}

export function jamMenit(detik: number): string {
  const m = Math.floor(Math.max(0, detik) / 60);
  const s = Math.max(0, detik) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function relatif(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return tanggal(iso);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export type Route = 'beranda' | 'materi' | 'latihan' | 'progres' | 'riwayat' | 'flashcard' | 'psikologi' | 'wawancara' | 'jadwal' | 'pengaturan' | 'lainnya';

export function go(route: Route, param?: string) {
  location.hash = `/${route}${param ? `/${param}` : ''}`;
}
