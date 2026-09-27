-- =========================================================
-- Siap PCPM: skema progres pengguna + RLS
-- SUDAH DITERAPKAN di proyek Supabase "siap-pcpm" (mlrpskirnegqjryputwx).
-- File ini hanya arsip/referensi. JANGAN dijalankan ulang.
--
-- Kolom sinkron di setiap tabel:
--   updated_at        : diisi server (trigger) -> kursor pull sinkron
--   client_updated_at : diisi klien saat data diubah -> penentu last-write-wins
--   deleted_at        : soft delete supaya penghapusan ikut tersinkron
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- 1. Pengaturan (1 baris per user)
create table public.pengaturan (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  tanggal_target date not null default '2027-08-01',
  menit_per_hari integer not null default 60 check (menit_per_hari between 5 and 600),
  preferensi jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- 2. Percobaan latihan / simulasi
create table public.percobaan (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  modul text not null check (modul in ('potensi-dasar','kebanksentralan','english','campuran')),
  mode text not null check (mode in ('latihan','simulasi')),
  paket text,
  mulai_at timestamptz not null default now(),
  durasi_detik integer not null default 0 check (durasi_detik >= 0),
  jumlah_soal integer not null default 0 check (jumlah_soal >= 0),
  jumlah_benar integer not null default 0 check (jumlah_benar >= 0),
  skor numeric(5,2),
  per_topik jsonb not null default '{}'::jsonb,
  jawaban jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index percobaan_user_updated_idx on public.percobaan (user_id, updated_at);
create index percobaan_user_mulai_idx on public.percobaan (user_id, mulai_at desc);

-- 3. Status per soal
create table public.status_soal (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  soal_id text not null,
  ditandai boolean not null default false,
  jumlah_benar integer not null default 0 check (jumlah_benar >= 0),
  jumlah_salah integer not null default 0 check (jumlah_salah >= 0),
  terakhir_benar boolean,
  terakhir_dikerjakan timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  primary key (user_id, soal_id)
);
create index status_soal_user_updated_idx on public.status_soal (user_id, updated_at);

-- 4. Progres flashcard (Leitner)
create table public.flashcard_progres (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  istilah_id text not null,
  kotak smallint not null default 1 check (kotak between 1 and 3),
  jadwal_ulang date not null default current_date,
  jumlah_review integer not null default 0 check (jumlah_review >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  primary key (user_id, istilah_id)
);
create index flashcard_user_updated_idx on public.flashcard_progres (user_id, updated_at);

-- 5. Hasil sesi psikologi
create table public.psikologi_hasil (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  jawaban jsonb not null default '{}'::jsonb,
  profil jsonb not null default '{}'::jsonb,
  skor_konsistensi numeric(5,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index psikologi_user_updated_idx on public.psikologi_hasil (user_id, updated_at);

-- 6. Bank jawaban wawancara
create table public.wawancara_jawaban (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  pertanyaan_id text not null,
  jawaban text not null default '',
  star jsonb not null default '{}'::jsonb,
  catatan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  primary key (user_id, pertanyaan_id)
);
create index wawancara_user_updated_idx on public.wawancara_jawaban (user_id, updated_at);

-- 7. Tugas jadwal belajar
create table public.jadwal_tugas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tanggal date not null,
  fase text not null check (fase in ('diagnosis','dasar','pendalaman','simulasi')),
  modul text,
  deskripsi text not null,
  target_menit integer not null default 30 check (target_menit > 0),
  selesai boolean not null default false,
  selesai_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index jadwal_user_tanggal_idx on public.jadwal_tugas (user_id, tanggal);
create index jadwal_user_updated_idx on public.jadwal_tugas (user_id, updated_at);

-- Trigger updated_at + RLS untuk semua tabel
do $$
declare t text;
begin
  foreach t in array array['pengaturan','percobaan','status_soal','flashcard_progres','psikologi_hasil','wawancara_jawaban','jadwal_tugas']
  loop
    execute format('create trigger %I before update on public.%I for each row execute function public.set_updated_at()', t || '_set_updated_at', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('create policy %I on public.%I for select to authenticated using ((select auth.uid()) = user_id)', t || '_select_own', t);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', t || '_insert_own', t);
    execute format('create policy %I on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', t || '_update_own', t);
    execute format('create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', t || '_delete_own', t);
  end loop;
end $$;
