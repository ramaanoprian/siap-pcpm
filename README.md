# Siap PCPM

Aplikasi belajar pribadi untuk persiapan tes PCPM Bank Indonesia. Bisa dibuka dari browser apa pun (komputer maupun HP), dan progresnya tersinkron antarperangkat lewat Supabase.

| Menu | Isi |
| --- | --- |
| **Beranda** | Hitung mundur ke tanggal tes, fase belajar, tugas hari ini, skor per modul, dan topik terlemah |
| **Materi** | 6 bab rangkuman Kebanksentralan (kelembagaan, moneter, makroprudensial, sistem pembayaran, Rupiah, OJK/LPS/KSSK) dari sumber resmi, dengan tautan sumber di setiap bab dan tombol langsung ke latihan topik yang sama |
| **Latihan** | Potensi Dasar, Kebanksentralan, English, atau Campuran. Mode *latihan* menampilkan pembahasan langsung, mode *simulasi* memakai batas waktu. Soal bisa difilter: belum pernah, terakhir salah, atau ditandai |
| **Riwayat** | Tren skor, hasil per topik, dan pembahasan setiap percobaan |
| **Flashcard** | 36 istilah kebanksentralan dengan sistem Leitner 3 kotak (ulang 1, 3, dan 7 hari) |
| **Jadwal** | Tugas harian 2 minggu ke depan, disusun otomatis sesuai fase (diagnosis → dasar → pendalaman → simulasi), menit per hari, dan modul terlemah |
| **Wawancara** | 15 pertanyaan umum, kerangka STAR, simpan otomatis, dan stopwatch latihan bicara |
| **Psikologi** | Latihan refleksi diri 20 butir dengan profil 5 dimensi dan skor konsistensi (bukan tes resmi) |

Bank soal ada di `src/data/` (`soal.ts`, `soal-materi.ts`, `soal-lanjutan.ts`). Soal Potensi Dasar (numerik, verbal, logika) juga dibuat otomatis dari pola dengan angka dan kata acak (`generator.ts`), dan urutan pilihan jawaban diacak di setiap sesi. Materi untuk semua subtes dan tahapan seleksi ada di `materi.ts` (Kebanksentralan) dan `materi-lain.ts` (tahapan seleksi, TPD, Pengetahuan Umum, English, psikologi); tipe dan kelompoknya di `materi-dasar.ts`. Setiap fakta harus punya sumber resmi yang dicantumkan di bab tersebut, dan setiap bab boleh punya daftar `video`. Soal-soalnya buatan sendiri untuk latihan pola, bukan soal resmi. `id` setiap soal, istilah, dan pertanyaan dipakai sebagai kunci di database, jadi jangan diganti setelah aplikasi dipakai.

## Cara kerja data

- Semua perubahan disimpan dulu di browser, jadi aplikasi tetap bisa dipakai tanpa sinyal. Antrean perubahan dikirim ke Supabase setiap ada perubahan, setiap menit, dan saat koneksi kembali.
- Push memakai upsert *last-write-wins* berdasarkan `client_updated_at`. Pull mengambil baris dengan `updated_at` lebih baru dari kursor per tabel.
- Hapus = mengisi `deleted_at` (soft delete). Logikanya ada di `src/lib/sync.ts`.
- Tidak ada tabel baru untuk fitur belajar: jadwal ulang soal dihitung dari `status_soal` (`jadwalUlang` di `src/lib/stats.ts`), tryout disimpan sebagai `percobaan` dengan `paket` berawalan `tryout`, dan target soal harian ada di `pengaturan.preferensi.target_soal`.
- `public/sw.js` menyimpan aplikasi di cache supaya bisa dibuka offline dan dipasang di layar utama HP.
- Skema ada di `supabase/migrations/0001_init_siap_pcpm_schema.sql` dan **sudah diterapkan**. Perubahan skema berikutnya dibuat sebagai file migrasi baru (`0002_…`).

## Pemasangan (sekali saja)

Database Supabase `siap-pcpm` sudah siap. Yang perlu dilakukan:

1. **Supabase → Authentication → Users → Add user → Create new user**: isi email dan kata sandi, lalu centang *Auto Confirm User*.
2. **Supabase → Authentication → Sign In / Providers**: matikan *Allow new users to sign up*.
3. **Supabase → Authentication → URL Configuration**: isi *Site URL* dan *Redirect URLs* dengan `https://ramaanoprian.github.io/siap-pcpm/`. Ini dipakai untuk link "Lupa kata sandi".
4. **GitHub → Settings → Secrets and variables → Actions → Variables**: tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` (kunci publik/anon).
5. **GitHub → Settings → Pages → Source: GitHub Actions**.
6. Merge ke `main`. Aplikasi otomatis terpasang di `https://ramaanoprian.github.io/siap-pcpm/`.

Kunci anon memang aman berada di aplikasi web. Data dilindungi Row Level Security, sehingga setiap akun hanya bisa membaca datanya sendiri. Jangan pernah memasukkan *service_role / secret key*.

## Pengembangan

```bash
npm install
npm run build
```

Tanpa variabel Supabase, aplikasi berjalan dalam **mode lokal**: tanpa login, dan data hanya tersimpan di browser itu.
