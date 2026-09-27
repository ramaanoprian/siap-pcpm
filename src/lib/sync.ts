/*
 * Penyimpanan lokal + sinkron ke Supabase.
 *
 * Semua perubahan langsung disimpan di browser (localStorage) dan masuk antrean,
 * sehingga aplikasi tetap bisa dipakai tanpa sinyal. Antrean dikirim ke server
 * (push) lalu perubahan dari perangkat lain diambil (pull). Aturannya mengikuti skema:
 *   - push: upsert baris antrean, tapi baris server yang client_updated_at-nya lebih
 *     baru tidak ditimpa (last-write-wins berdasarkan client_updated_at);
 *   - pull: ambil baris dengan updated_at > kursor terakhir per tabel;
 *   - hapus = isi deleted_at (soft delete), tidak pernah DELETE sungguhan;
 *   - user_id dan updated_at diisi server.
 */
import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import type { Database, Json } from './database.types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

type Tables = Database['public']['Tables'];
export type TableName = keyof Tables;
type ServerRow<T extends TableName> = Tables[T]['Row'];
/** Baris versi lokal: kolom yang diisi server boleh belum ada. */
export type Row<T extends TableName> = Omit<ServerRow<T>, 'user_id' | 'created_at' | 'updated_at'> & {
  created_at?: string;
  updated_at?: string;
};
export type Pengaturan = Row<'pengaturan'>;
export type Percobaan = Row<'percobaan'>;
export type StatusSoal = Row<'status_soal'>;
export type FlashcardProgres = Row<'flashcard_progres'>;
export type PsikologiHasil = Row<'psikologi_hasil'>;
export type WawancaraJawaban = Row<'wawancara_jawaban'>;
export type JadwalTugas = Row<'jadwal_tugas'>;

interface TableDef {
  /** Kolom kunci selain user_id; kosong untuk pengaturan (satu baris per user). */
  key: string | null;
  onConflict: string;
  /** Kolom yang dikirim klien saat upsert (tanpa user_id, created_at, updated_at). */
  columns: string[];
}

const SYNC_COLS = ['client_updated_at', 'deleted_at'];
const DEFS: Record<TableName, TableDef> = {
  pengaturan: {
    key: null,
    onConflict: 'user_id',
    columns: ['tanggal_target', 'menit_per_hari', 'preferensi', ...SYNC_COLS],
  },
  percobaan: {
    key: 'id',
    onConflict: 'id',
    columns: ['id', 'modul', 'mode', 'paket', 'mulai_at', 'durasi_detik', 'jumlah_soal', 'jumlah_benar', 'skor', 'per_topik', 'jawaban', ...SYNC_COLS],
  },
  status_soal: {
    key: 'soal_id',
    onConflict: 'user_id,soal_id',
    columns: ['soal_id', 'ditandai', 'jumlah_benar', 'jumlah_salah', 'terakhir_benar', 'terakhir_dikerjakan', ...SYNC_COLS],
  },
  flashcard_progres: {
    key: 'istilah_id',
    onConflict: 'user_id,istilah_id',
    columns: ['istilah_id', 'kotak', 'jadwal_ulang', 'jumlah_review', ...SYNC_COLS],
  },
  psikologi_hasil: {
    key: 'id',
    onConflict: 'id',
    columns: ['id', 'jawaban', 'profil', 'skor_konsistensi', ...SYNC_COLS],
  },
  wawancara_jawaban: {
    key: 'pertanyaan_id',
    onConflict: 'user_id,pertanyaan_id',
    columns: ['pertanyaan_id', 'jawaban', 'star', 'catatan', ...SYNC_COLS],
  },
  jadwal_tugas: {
    key: 'id',
    onConflict: 'id',
    columns: ['id', 'tanggal', 'fase', 'modul', 'deskripsi', 'target_menit', 'selesai', 'selesai_at', ...SYNC_COLS],
  },
};
export const TABLES = Object.keys(DEFS) as TableName[];

type AnyRow = Record<string, unknown> & { client_updated_at: string; deleted_at: string | null; updated_at?: string };
type TableData = Record<string, AnyRow>;

export interface SyncStatus {
  state: 'lokal' | 'idle' | 'syncing' | 'error' | 'offline';
  lastSync?: string;
  error?: string;
  pending: number;
}

const ME = 'me';
const keyOf = (t: TableName, r: Record<string, unknown>) => {
  const k = DEFS[t].key;
  return k ? String(r[k]) : ME;
};
const time = (s: string | null | undefined) => (s ? Date.parse(s) : 0);
const nowIso = () => new Date().toISOString();

export const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));

function read<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(k: string, v: unknown) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* penyimpanan penuh atau diblokir */
  }
}

export class Store {
  private data = {} as Record<TableName, TableData>;
  private queue = {} as Record<TableName, string[]>;
  private cursors = {} as Partial<Record<TableName, string>>;
  private listeners = new Set<() => void>();
  private timer: ReturnType<typeof setTimeout> | undefined;
  private running: Promise<void> | null = null;
  private again = false;
  status: SyncStatus;

  /** `db` bisa diganti untuk pengujian; null berarti mode lokal. */
  constructor(
    readonly userId: string,
    private db: SupabaseClient<Database> | null = supabase,
  ) {
    for (const t of TABLES) {
      this.data[t] = read<TableData>(this.k(`data:${t}`), {});
      this.queue[t] = [];
    }
    Object.assign(this.queue, read(this.k('queue'), {}));
    this.cursors = read(this.k('cursor'), {});
    this.status = {
      state: db ? 'idle' : 'lokal',
      lastSync: read<string | undefined>(this.k('last-sync'), undefined),
      pending: this.pendingCount(),
    };
  }

  private k(name: string) {
    return `siap-pcpm:${this.userId}:${name}`;
  }

  // ---------- baca ----------

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };
  table<T extends TableName>(t: T): Record<string, Row<T>> {
    return this.data[t] as unknown as Record<string, Row<T>>;
  }
  get<T extends TableName>(t: T, key: string = ME): Row<T> | undefined {
    const r = this.data[t][key];
    return r && !r.deleted_at ? (r as unknown as Row<T>) : undefined;
  }

  // ---------- tulis ----------

  /** Simpan satu baris utuh (baru atau pengganti). */
  put<T extends TableName>(t: T, row: Omit<Row<T>, 'client_updated_at' | 'deleted_at'> & Partial<Row<T>>) {
    const full = { deleted_at: null, ...row, client_updated_at: nowIso() } as unknown as AnyRow;
    const key = keyOf(t, full);
    const prev = this.data[t][key];
    if (prev?.created_at) full.created_at = prev.created_at;
    if (prev?.updated_at) full.updated_at = prev.updated_at;
    this.commit(t, key, full);
  }

  /** Ubah sebagian kolom baris yang sudah ada. */
  patch<T extends TableName>(t: T, key: string, changes: Partial<Row<T>>) {
    const prev = this.data[t][key];
    if (!prev) return;
    this.commit(t, key, { ...prev, ...(changes as object), client_updated_at: nowIso() });
  }

  remove(t: TableName, key: string) {
    const prev = this.data[t][key];
    if (!prev || prev.deleted_at) return;
    const at = nowIso();
    this.commit(t, key, { ...prev, deleted_at: at, client_updated_at: at });
  }

  private commit(t: TableName, key: string, row: AnyRow) {
    this.data[t] = { ...this.data[t], [key]: row };
    if (!this.queue[t].includes(key)) this.queue[t] = [...this.queue[t], key];
    this.saveTable(t);
    this.saveQueue();
    this.setStatus({ pending: this.pendingCount() });
    this.schedule(1500);
  }

  private saveTable(t: TableName) {
    write(this.k(`data:${t}`), this.data[t]);
  }
  private saveQueue() {
    write(this.k('queue'), this.queue);
  }
  private pendingCount() {
    return TABLES.reduce((n, t) => n + this.queue[t].length, 0);
  }
  private setStatus(s: Partial<SyncStatus>) {
    this.status = { ...this.status, ...s };
    this.emit();
  }
  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  // ---------- sinkron ----------

  schedule(delay = 0) {
    if (!this.db) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.sync(), delay);
  }

  /** Kirim antrean lalu ambil perubahan dari server. Aman dipanggil berkali-kali. */
  sync(): Promise<void> {
    if (!this.db) return Promise.resolve();
    if (this.running) {
      this.again = true;
      return this.running;
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      this.setStatus({ state: 'offline' });
      return Promise.resolve();
    }
    this.setStatus({ state: 'syncing', error: undefined });
    this.running = (async () => {
      try {
        for (const t of TABLES) await this.push(t);
        for (const t of TABLES) await this.pull(t);
        const at = nowIso();
        write(this.k('last-sync'), at);
        this.setStatus({ state: 'idle', lastSync: at, pending: this.pendingCount() });
      } catch (e) {
        this.setStatus({ state: 'error', error: e instanceof Error ? e.message : String(e), pending: this.pendingCount() });
      } finally {
        this.running = null;
        if (this.again) {
          this.again = false;
          this.schedule(500);
        }
      }
    })();
    return this.running;
  }

  private async push(t: TableName) {
    const db = this.db!;
    const def = DEFS[t];
    const keys = [...this.queue[t]];
    if (!keys.length) return;

    for (let i = 0; i < keys.length; i += 100) {
      const chunk = keys.slice(i, i + 100);
      const local = chunk.map((k) => this.data[t][k]).filter(Boolean);

      // Baris server yang diubah lebih baru (dari perangkat lain) tidak ditimpa.
      const sel = db.from(t).select('*');
      const { data: server, error } = await (def.key ? sel.in(def.key, chunk) : sel);
      if (error) throw new Error(error.message);
      const serverByKey = new Map((server ?? []).map((r) => [keyOf(t, r), r as unknown as AnyRow]));

      const toSend: AnyRow[] = [];
      for (const row of local) {
        const key = keyOf(t, row);
        const s = serverByKey.get(key);
        if (s && time(s.client_updated_at) > time(row.client_updated_at)) this.applyServer(t, key, s);
        else toSend.push(row);
      }

      if (toSend.length) {
        const payload = toSend.map((r) => {
          const out: Record<string, unknown> = { user_id: this.userId };
          for (const c of def.columns) out[c] = r[c] ?? null;
          return out;
        });
        const { data: saved, error: upErr } = await db.from(t).upsert(payload as any, { onConflict: def.onConflict }).select('*');
        if (upErr) throw new Error(upErr.message);
        for (const s of (saved ?? []) as unknown as AnyRow[]) {
          const key = keyOf(t, s);
          const cur = this.data[t][key];
          // Hanya tandai terkirim bila tidak diubah lagi selama proses kirim.
          if (cur && time(cur.client_updated_at) === time(s.client_updated_at)) {
            this.data[t] = { ...this.data[t], [key]: { ...cur, updated_at: s.updated_at, created_at: s.created_at as string } };
            this.queue[t] = this.queue[t].filter((k) => k !== key);
          }
        }
      }
      this.saveTable(t);
      this.saveQueue();
    }
  }

  private async pull(t: TableName) {
    const db = this.db!;
    for (;;) {
      const cursor = this.cursors[t];
      let q = db.from(t).select('*').order('updated_at', { ascending: true }).limit(500);
      // Mundur 10 detik agar baris yang disimpan bersamaan tidak terlewat; mengambil ulang tidak masalah.
      if (cursor) q = q.gt('updated_at', new Date(time(cursor) - 10_000).toISOString());
      const { data: rows, error } = await q;
      if (error) throw new Error(error.message);
      const list = (rows ?? []) as unknown as AnyRow[];
      let changed = false;
      for (const s of list) {
        const key = keyOf(t, s);
        const cur = this.data[t][key];
        const queued = this.queue[t].includes(key);
        if (queued && cur && time(cur.client_updated_at) >= time(s.client_updated_at)) continue;
        if (cur && time(cur.updated_at) === time(s.updated_at) && time(cur.client_updated_at) === time(s.client_updated_at)) continue;
        this.applyServer(t, key, s, false);
        changed = true;
      }
      const last = list[list.length - 1]?.updated_at;
      const advanced = last && time(last) > time(cursor);
      if (advanced) {
        this.cursors[t] = last;
        write(this.k('cursor'), this.cursors);
      }
      if (changed) this.saveTable(t);
      if (list.length < 500 || !advanced) break;
    }
  }

  private applyServer(t: TableName, key: string, s: AnyRow, save = true) {
    const row = { ...s };
    delete row.user_id;
    this.data[t] = { ...this.data[t], [key]: row };
    this.queue[t] = this.queue[t].filter((k) => k !== key);
    if (save) {
      this.saveTable(t);
      this.saveQueue();
    }
    this.emit();
  }
}

// ---------- React ----------

export const StoreContext = createContext<Store | null>(null);

export function useStore(): Store {
  const s = useContext(StoreContext);
  if (!s) throw new Error('Store belum siap');
  return s;
}

/** Semua baris tabel yang belum dihapus. Ikut diperbarui saat data berubah. */
export function useRows<T extends TableName>(t: T): Row<T>[] {
  const store = useStore();
  const table = useSyncExternalStore(store.subscribe, () => store.table(t));
  return useMemo(() => Object.values(table).filter((r) => !r.deleted_at), [table]);
}

export function useSyncStatus(): SyncStatus {
  const store = useStore();
  return useSyncExternalStore(store.subscribe, () => store.status);
}

export const DEFAULT_PENGATURAN = {
  tanggal_target: '2027-08-01',
  menit_per_hari: 60,
  preferensi: {} as Record<string, unknown>,
};

export function usePengaturan() {
  const store = useStore();
  const table = useSyncExternalStore(store.subscribe, () => store.table('pengaturan'));
  const row = table[ME] && !table[ME].deleted_at ? table[ME] : undefined;
  const value = useMemo(
    () => ({
      tanggal_target: row?.tanggal_target ?? DEFAULT_PENGATURAN.tanggal_target,
      menit_per_hari: row?.menit_per_hari ?? DEFAULT_PENGATURAN.menit_per_hari,
      preferensi: ((row?.preferensi as Record<string, unknown> | undefined) ?? {}) as Record<string, unknown>,
    }),
    [row],
  );
  const save = (changes: Partial<typeof value>) => {
    const next = { ...value, ...changes };
    store.put('pengaturan', { ...next, preferensi: next.preferensi as Json });
  };
  return [value, save] as const;
}
