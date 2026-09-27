import type { ModulId } from './modul';
import { SOAL_LANJUTAN } from './soal-lanjutan';
import { SOAL_MATERI } from './soal-materi';

export interface Soal {
  /** Tetap dan unik; dipakai sebagai kunci status_soal.soal_id. Jangan diganti setelah dipakai. */
  id: string;
  modul: ModulId;
  topik: string;
  teks: string;
  opsi: string[];
  /** Indeks opsi yang benar. */
  kunci: number;
  bahas: string;
  bacaan?: string;
}

// Soal latihan buatan sendiri untuk membiasakan pola tes, bukan soal resmi PCPM.

const BACAAN_EN = `Central banks in many countries use interest rates as their main policy tool. When inflation rises above the target, a central bank may raise its policy rate. Higher rates make borrowing more expensive, which tends to slow spending by households and firms. Over time, weaker demand helps bring inflation back toward the target.

However, monetary policy works with a lag: the full effect of a rate change on prices may take one to two years. For this reason, central banks must look ahead and act based on forecasts rather than on current inflation alone.

Clear communication also matters. If the public believes that the central bank is committed to its target, expectations of future inflation remain anchored, which makes the job of controlling prices easier.`;

export const SOAL: Soal[] = [
  // ---------------- Potensi Dasar: Verbal ----------------
  {
    id: 'pd-v01', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Sinonim dari PRAGMATIS adalah ...',
    opsi: ['Praktis', 'Idealis', 'Teoretis', 'Dogmatis', 'Estetis'], kunci: 0,
    bahas: 'Pragmatis berarti bersangkutan dengan kegunaan dan kepraktisan, jadi sinonimnya praktis.',
  },
  {
    id: 'pd-v02', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Sinonim dari KONKLUSI adalah ...',
    opsi: ['Pendahuluan', 'Gagasan', 'Kesimpulan', 'Ringkasan', 'Pertanyaan'], kunci: 2,
    bahas: 'Konklusi adalah kesimpulan. Ringkasan berbeda karena hanya memendekkan isi tanpa menarik simpulan.',
  },
  {
    id: 'pd-v03', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Antonim dari EKSPLISIT adalah ...',
    opsi: ['Tersurat', 'Implisit', 'Jelas', 'Rinci', 'Terbuka'], kunci: 1,
    bahas: 'Eksplisit berarti tersurat atau dinyatakan dengan jelas. Lawannya implisit, yaitu tersirat.',
  },
  {
    id: 'pd-v04', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Antonim dari DEFISIT adalah ...',
    opsi: ['Kekurangan', 'Utang', 'Surplus', 'Neraca', 'Inflasi'], kunci: 2,
    bahas: 'Defisit adalah kekurangan (pengeluaran lebih besar dari penerimaan). Lawannya surplus.',
  },
  {
    id: 'pd-v05', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'DOKTER : STETOSKOP = ...',
    opsi: ['Petani : Cangkul', 'Guru : Murid', 'Pilot : Bandara', 'Penulis : Buku', 'Hakim : Terdakwa'], kunci: 0,
    bahas: 'Hubungannya profesi dengan alat kerja. Petani bekerja memakai cangkul. Penulis : Buku adalah profesi dengan hasil kerja, bukan alat.',
  },
  {
    id: 'pd-v06', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'AIR : HAUS = ...',
    opsi: ['Api : Panas', 'Makanan : Lapar', 'Hujan : Basah', 'Lampu : Terang', 'Buku : Pintar'], kunci: 1,
    bahas: 'Air menghilangkan haus, dan makanan menghilangkan lapar. Pilihan lain menunjukkan sebab dan akibat, bukan sesuatu yang menghilangkan kebutuhan.',
  },
  {
    id: 'pd-v07', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'BANK SENTRAL : KEBIJAKAN MONETER = ...',
    opsi: ['OJK : Pencetakan uang', 'Pemerintah : Kebijakan fiskal', 'Bank umum : Penetapan pajak', 'DPR : Penetapan kurs', 'LPS : Target inflasi'], kunci: 1,
    bahas: 'Bank sentral merumuskan kebijakan moneter, dan pemerintah merumuskan kebijakan fiskal (anggaran dan pajak).',
  },
  {
    id: 'pd-v08', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Kata yang TIDAK termasuk kelompoknya adalah ...',
    opsi: ['Merkurius', 'Venus', 'Mars', 'Bulan', 'Jupiter'], kunci: 3,
    bahas: 'Merkurius, Venus, Mars, dan Jupiter adalah planet. Bulan adalah satelit alami Bumi.',
  },

  // ---------------- Potensi Dasar: Numerik ----------------
  {
    id: 'pd-n01', modul: 'potensi-dasar', topik: 'Numerik',
    teks: '2, 6, 12, 20, 30, ... Bilangan berikutnya adalah ...',
    opsi: ['36', '40', '42', '44', '48'], kunci: 2,
    bahas: 'Selisihnya 4, 6, 8, 10, lalu 12. Jadi 30 + 12 = 42.',
  },
  {
    id: 'pd-n02', modul: 'potensi-dasar', topik: 'Numerik',
    teks: '3, 5, 9, 17, 33, ... Bilangan berikutnya adalah ...',
    opsi: ['49', '57', '64', '65', '66'], kunci: 3,
    bahas: 'Selisihnya berlipat dua: 2, 4, 8, 16, lalu 32. Jadi 33 + 32 = 65. Bisa juga dilihat sebagai pola ×2 − 1.',
  },
  {
    id: 'pd-n03', modul: 'potensi-dasar', topik: 'Numerik',
    teks: '100, 95, 85, 70, 50, ... Bilangan berikutnya adalah ...',
    opsi: ['20', '25', '30', '35', '40'], kunci: 1,
    bahas: 'Pengurangnya bertambah 5 setiap langkah: −5, −10, −15, −20, lalu −25. Jadi 50 − 25 = 25.',
  },
  {
    id: 'pd-n04', modul: 'potensi-dasar', topik: 'Numerik',
    teks: 'Harga suatu barang naik 20%, lalu turun 20% dari harga barunya. Dibanding harga awal, harga akhirnya ...',
    opsi: ['Sama saja', 'Turun 4%', 'Naik 4%', 'Turun 2%', 'Naik 2%'], kunci: 1,
    bahas: '1,2 × 0,8 = 0,96. Harga akhir 96% dari harga awal, jadi turun 4%.',
  },
  {
    id: 'pd-n05', modul: 'potensi-dasar', topik: 'Numerik',
    teks: 'Rata-rata lima bilangan adalah 12. Jika satu bilangan dikeluarkan, rata-rata empat bilangan sisanya 10. Bilangan yang dikeluarkan adalah ...',
    opsi: ['10', '12', '16', '20', '22'], kunci: 3,
    bahas: 'Jumlah awal 5 × 12 = 60. Jumlah sisa 4 × 10 = 40. Bilangan yang dikeluarkan 60 − 40 = 20.',
  },
  {
    id: 'pd-n06', modul: 'potensi-dasar', topik: 'Numerik',
    teks: 'A dapat menyelesaikan pekerjaan dalam 6 hari, B dalam 3 hari. Jika bekerja bersama, pekerjaan selesai dalam ...',
    opsi: ['1,5 hari', '2 hari', '2,5 hari', '4,5 hari', '9 hari'], kunci: 1,
    bahas: 'Per hari A menyelesaikan 1/6 dan B 1/3 pekerjaan. Bersama 1/6 + 2/6 = 1/2 per hari, jadi selesai dalam 2 hari.',
  },
  {
    id: 'pd-n07', modul: 'potensi-dasar', topik: 'Numerik',
    teks: 'Tabungan Rp10.000.000 mendapat bunga sederhana 6% per tahun. Besar bunga setelah 18 bulan adalah ...',
    opsi: ['Rp600.000', 'Rp750.000', 'Rp900.000', 'Rp1.080.000', 'Rp1.200.000'], kunci: 2,
    bahas: 'Bunga = 10.000.000 × 6% × 1,5 tahun = Rp900.000.',
  },
  {
    id: 'pd-n08', modul: 'potensi-dasar', topik: 'Numerik',
    teks: '3/8 dari 480 adalah ...',
    opsi: ['120', '160', '180', '200', '240'], kunci: 2,
    bahas: '480 ÷ 8 = 60, lalu 60 × 3 = 180.',
  },
  {
    id: 'pd-n09', modul: 'potensi-dasar', topik: 'Numerik',
    teks: 'Perbandingan umur A dan B adalah 3 : 5. Jumlah umur mereka 48 tahun. Umur B adalah ...',
    opsi: ['18 tahun', '24 tahun', '28 tahun', '30 tahun', '32 tahun'], kunci: 3,
    bahas: 'Satu bagian = 48 ÷ (3 + 5) = 6. Umur B = 5 × 6 = 30 tahun.',
  },
  {
    id: 'pd-n10', modul: 'potensi-dasar', topik: 'Numerik',
    teks: 'Sebuah mobil melaju 90 km/jam selama 2 jam 20 menit. Jarak yang ditempuh adalah ...',
    opsi: ['180 km', '200 km', '210 km', '216 km', '230 km'], kunci: 2,
    bahas: '2 jam 20 menit = 7/3 jam. Jarak = 90 × 7/3 = 210 km.',
  },

  // ---------------- Potensi Dasar: Logika ----------------
  {
    id: 'pd-l01', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Semua pegawai kantor X mengikuti pelatihan. Sebagian peserta pelatihan berasal dari luar Jawa. Kesimpulan yang tepat adalah ...',
    opsi: [
      'Sebagian pegawai kantor X berasal dari luar Jawa',
      'Semua peserta pelatihan adalah pegawai kantor X',
      'Tidak ada pegawai kantor X dari luar Jawa',
      'Tidak dapat ditarik kesimpulan yang pasti',
      'Semua pegawai kantor X berasal dari Jawa',
    ], kunci: 3,
    bahas: 'Peserta dari luar Jawa bisa saja bukan pegawai kantor X. Karena itu tidak ada kesimpulan pasti tentang asal pegawai.',
  },
  {
    id: 'pd-l02', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Jika inflasi naik, suku bunga kebijakan dinaikkan. Suku bunga kebijakan tidak dinaikkan. Maka ...',
    opsi: ['Inflasi naik', 'Inflasi tidak naik', 'Inflasi turun tajam', 'Suku bunga turun', 'Tidak dapat disimpulkan'], kunci: 1,
    bahas: 'Modus tollens: jika p maka q, dan bukan q, maka bukan p. Jadi inflasi tidak naik. "Turun tajam" terlalu jauh untuk disimpulkan.',
  },
  {
    id: 'pd-l03', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Semua analis menguasai statistik. Semua orang yang menguasai statistik bersikap teliti. Maka ...',
    opsi: ['Sebagian analis tidak teliti', 'Semua analis teliti', 'Semua yang teliti adalah analis', 'Tidak ada analis yang menguasai statistik', 'Sebagian yang teliti tidak menguasai statistik'], kunci: 1,
    bahas: 'Semua yang menguasai statistik teliti, dan semua analis menguasai statistik. Jadi semua analis teliti. Kebalikannya belum tentu benar.',
  },
  {
    id: 'pd-l04', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Ingkaran dari "Semua peserta lulus tes" adalah ...',
    opsi: ['Semua peserta tidak lulus tes', 'Tidak ada peserta yang lulus tes', 'Ada peserta yang tidak lulus tes', 'Sebagian peserta lulus tes', 'Peserta lulus tes'], kunci: 2,
    bahas: 'Ingkaran "semua ... lulus" adalah "ada (minimal satu) ... yang tidak lulus".',
  },
  {
    id: 'pd-l05', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'P, Q, R, S, dan T duduk berderet dari kiri ke kanan. P di ujung kiri, R tepat di kanan P, S di ujung kanan, dan T tidak bersebelahan dengan R. Siapa yang duduk di tengah?',
    opsi: ['P', 'Q', 'R', 'S', 'T'], kunci: 1,
    bahas: 'Urutan 1 P, 2 R, dan 5 S. T tidak boleh di kursi 3 karena akan bersebelahan dengan R, jadi T di kursi 4 dan Q di kursi 3 (tengah).',
  },
  {
    id: 'pd-l06', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Jika rapat selesai lebih awal, Dina pulang naik KRL. Jika Dina naik KRL, ia tiba sebelum pukul 18.00. Hari ini rapat selesai lebih awal. Maka ...',
    opsi: ['Dina tiba setelah pukul 18.00', 'Dina tiba sebelum pukul 18.00', 'Dina tidak naik KRL', 'Rapat selesai terlambat', 'Tidak dapat disimpulkan'], kunci: 1,
    bahas: 'Silogisme berantai: rapat selesai awal, maka naik KRL, maka tiba sebelum 18.00.',
  },

  // ---------------- Kebanksentralan ----------------
  {
    id: 'bi-k01', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Menurut UU No. 4 Tahun 2023 tentang Pengembangan dan Penguatan Sektor Keuangan (P2SK), tujuan Bank Indonesia adalah ...',
    opsi: [
      'Mencapai dan memelihara kestabilan nilai Rupiah saja',
      'Mencapai stabilitas nilai Rupiah, memelihara stabilitas sistem pembayaran, dan turut menjaga stabilitas sistem keuangan untuk mendukung pertumbuhan ekonomi yang berkelanjutan',
      'Mengawasi seluruh bank umum dan lembaga keuangan nonbank',
      'Menjaga pertumbuhan ekonomi minimal 5% per tahun',
      'Menyusun dan melaksanakan APBN',
    ], kunci: 1,
    bahas: 'UU P2SK memperluas tujuan BI dari tujuan tunggal (kestabilan nilai Rupiah) menjadi tiga stabilitas yang mendukung pertumbuhan ekonomi berkelanjutan.',
  },
  {
    id: 'bi-k02', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Sejak beralihnya fungsi pengawasan perbankan, lembaga yang mengawasi bank secara mikroprudensial (kesehatan bank per individu) adalah ...',
    opsi: ['Bank Indonesia', 'Otoritas Jasa Keuangan', 'Lembaga Penjamin Simpanan', 'Kementerian Keuangan', 'Badan Pemeriksa Keuangan'], kunci: 1,
    bahas: 'Berdasarkan UU No. 21 Tahun 2011, pengawasan mikroprudensial bank beralih ke OJK. BI memegang kebijakan makroprudensial.',
  },
  {
    id: 'bi-k03', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Susunan Dewan Gubernur Bank Indonesia terdiri atas ...',
    opsi: [
      'Gubernur dan 3 Deputi Gubernur',
      'Gubernur, Deputi Gubernur Senior, dan paling sedikit 4 serta paling banyak 7 Deputi Gubernur',
      'Gubernur, Wakil Gubernur, dan 5 Direktur',
      'Ketua, Wakil Ketua, dan anggota Dewan Komisioner',
      'Gubernur dan Menteri Keuangan',
    ], kunci: 1,
    bahas: 'Dewan Gubernur dipimpin Gubernur, dibantu Deputi Gubernur Senior sebagai wakil, dan 4 sampai 7 Deputi Gubernur.',
  },
  {
    id: 'bi-k04', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Masa jabatan anggota Dewan Gubernur Bank Indonesia adalah ...',
    opsi: [
      '4 tahun dan dapat diangkat kembali tanpa batas',
      '5 tahun dan dapat diangkat kembali untuk paling banyak satu kali masa jabatan berikutnya',
      '5 tahun dan tidak dapat diangkat kembali',
      '6 tahun dan dapat diangkat kembali satu kali',
      'Mengikuti masa jabatan Presiden',
    ], kunci: 1,
    bahas: 'Masa jabatannya 5 tahun dan dapat diangkat kembali untuk paling banyak satu kali masa jabatan berikutnya. Masa jabatan ini tidak mengikuti siklus Presiden, sebagai bagian dari independensi BI.',
  },
  {
    id: 'bi-k05', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Pernyataan yang tepat tentang independensi Bank Indonesia adalah ...',
    opsi: [
      'BI wajib mengikuti arahan Menteri Keuangan dalam menetapkan suku bunga',
      'Pihak lain dilarang campur tangan dalam pelaksanaan tugas BI, dan BI wajib menolak campur tangan tersebut',
      'BI merupakan bagian dari kabinet pemerintah',
      'DPR dapat membatalkan keputusan Rapat Dewan Gubernur',
      'BI dapat memberikan kredit kepada pemerintah tanpa batas',
    ], kunci: 1,
    bahas: 'Undang-undang menegaskan BI sebagai lembaga negara yang independen. Pihak lain dilarang campur tangan, dan BI wajib menolaknya. Akuntabilitas tetap dijalankan melalui laporan kepada DPR.',
  },
  {
    id: 'bi-k06', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Kerangka kebijakan moneter yang diterapkan Bank Indonesia sejak 2005 adalah ...',
    opsi: ['Monetary targeting', 'Exchange rate targeting', 'Inflation Targeting Framework (ITF)', 'Currency board', 'Nominal GDP targeting'], kunci: 2,
    bahas: 'Sejak Juli 2005, BI menerapkan ITF: inflasi menjadi sasaran akhir dan suku bunga kebijakan menjadi sinyal utama.',
  },
  {
    id: 'bi-k07', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Suku bunga kebijakan Bank Indonesia ditetapkan dalam ...',
    opsi: ['Rapat Umum Pemegang Saham', 'Sidang Kabinet', 'Rapat Dewan Gubernur (RDG)', 'Rapat Paripurna DPR', 'Rapat KSSK'], kunci: 2,
    bahas: 'Arah kebijakan moneter, termasuk suku bunga kebijakan, diputuskan dalam RDG yang dijadwalkan secara rutin setiap bulan.',
  },
  {
    id: 'bi-k08', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Sasaran inflasi di Indonesia ditetapkan oleh ...',
    opsi: ['Bank Indonesia sendiri', 'Pemerintah, setelah berkoordinasi dengan Bank Indonesia', 'DPR', 'OJK', 'Badan Pusat Statistik'], kunci: 1,
    bahas: 'Sasaran inflasi ditetapkan Pemerintah (melalui Peraturan Menteri Keuangan) setelah berkoordinasi dengan BI. BI lalu memakai kebijakannya untuk mencapai sasaran itu.',
  },
  {
    id: 'bi-k09', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Dampak yang umumnya diharapkan dari kenaikan suku bunga kebijakan adalah ...',
    opsi: [
      'Kredit makin murah dan konsumsi naik',
      'Permintaan agregat tertahan sehingga tekanan inflasi mereda',
      'Nilai tukar Rupiah langsung melemah',
      'Pengeluaran pemerintah meningkat',
      'Harga saham pasti naik',
    ], kunci: 1,
    bahas: 'Melalui jalur suku bunga, biaya pinjaman naik sehingga konsumsi dan investasi tertahan. Kenaikan suku bunga juga cenderung menarik modal masuk, yang menopang Rupiah.',
  },
  {
    id: 'bi-k10', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Untuk menyerap kelebihan likuiditas di pasar uang, Bank Indonesia dapat ...',
    opsi: [
      'Membeli surat berharga dari perbankan',
      'Menjual surat berharga BI, misalnya SRBI, melalui operasi moneter',
      'Menurunkan Giro Wajib Minimum',
      'Mencetak uang tambahan',
      'Memberikan kredit likuiditas kepada bank',
    ], kunci: 1,
    bahas: 'Operasi moneter kontraksi menyerap likuiditas, misalnya dengan menjual atau menerbitkan surat berharga BI. Membeli surat berharga dan menurunkan GWM justru menambah likuiditas.',
  },
  {
    id: 'bi-k11', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Giro Wajib Minimum (GWM) adalah ...',
    opsi: [
      'Modal minimum pendirian bank',
      'Dana minimum yang wajib dipelihara bank di BI sebesar persentase tertentu dari Dana Pihak Ketiga',
      'Simpanan nasabah yang dijamin LPS',
      'Batas maksimum pemberian kredit',
      'Setoran pajak minimum bank',
    ], kunci: 1,
    bahas: 'GWM adalah persentase DPK yang wajib ditempatkan bank di BI. Menaikkan GWM mengurangi likuiditas yang bisa disalurkan bank.',
  },
  {
    id: 'bi-k12', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Komponen inflasi yang dipengaruhi faktor fundamental seperti ekspektasi, nilai tukar, dan interaksi permintaan-penawaran disebut ...',
    opsi: ['Inflasi inti (core)', 'Inflasi harga bergejolak (volatile food)', 'Inflasi harga diatur pemerintah (administered prices)', 'Inflasi musiman', 'Deflasi'], kunci: 0,
    bahas: 'Inflasi inti cenderung persisten karena dipengaruhi faktor fundamental. Volatile food dipengaruhi pasokan pangan, sedangkan administered prices dipengaruhi kebijakan pemerintah, misalnya harga BBM.',
  },
  {
    id: 'bi-k13', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Forum koordinasi pengendalian inflasi di tingkat provinsi dan kabupaten/kota adalah ...',
    opsi: ['KSSK', 'TPID', 'RDG', 'OJK Daerah', 'Bappeda'], kunci: 1,
    bahas: 'TPID (Tim Pengendalian Inflasi Daerah) mempertemukan pemerintah daerah, BI, dan instansi terkait untuk menjaga pasokan dan harga di daerah.',
  },
  {
    id: 'bi-k14', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'QRIS merupakan singkatan dari ...',
    opsi: ['Quick Response Code Indonesian Standard', 'Quick Rupiah Instant System', 'QR Integrated Settlement', 'Quality Retail Indonesian System', 'Quick Remittance Interbank Service'], kunci: 0,
    bahas: 'QRIS adalah standar QR code pembayaran nasional yang diluncurkan BI pada 17 Agustus 2019. Satu kode QRIS bisa dipindai oleh aplikasi pembayaran mana pun.',
  },
  {
    id: 'bi-k15', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Infrastruktur sistem pembayaran ritel milik BI yang memungkinkan transfer dana secara real-time dan tersedia 24/7 adalah ...',
    opsi: ['BI-RTGS', 'SKNBI', 'BI-FAST', 'BI-SSSS', 'SWIFT'], kunci: 2,
    bahas: 'BI-FAST melayani transfer ritel secara seketika, kapan saja, dan dengan biaya rendah. BI-RTGS untuk transaksi bernilai besar, sedangkan SKNBI berbasis kliring.',
  },
  {
    id: 'bi-k16', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Tujuan utama Gerbang Pembayaran Nasional (GPN) adalah ...',
    opsi: [
      'Menggantikan uang tunai sepenuhnya',
      'Mewujudkan interkoneksi dan interoperabilitas pembayaran domestik sehingga transaksi diproses di dalam negeri',
      'Menetapkan kurs Rupiah',
      'Mengawasi perusahaan fintech',
      'Menjamin simpanan nasabah',
    ], kunci: 1,
    bahas: 'GPN menghubungkan berbagai instrumen dan kanal pembayaran sehingga transaksi domestik dapat diproses di dalam negeri secara efisien.',
  },
  {
    id: 'bi-k17', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Tujuan kebijakan makroprudensial adalah ...',
    opsi: [
      'Menilai kesehatan tiap bank secara individual',
      'Mencegah dan mengurangi risiko sistemik serta menjaga stabilitas sistem keuangan',
      'Menetapkan tarif pajak sektor keuangan',
      'Mengatur harga pangan',
      'Menjamin simpanan nasabah',
    ], kunci: 1,
    bahas: 'Makroprudensial melihat sistem keuangan secara menyeluruh untuk mencegah risiko sistemik. Kesehatan bank per individu (mikroprudensial) diawasi OJK.',
  },
  {
    id: 'bi-k18', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Yang merupakan instrumen kebijakan makroprudensial Bank Indonesia adalah ...',
    opsi: ['Tarif pajak penghasilan', 'Rasio Loan to Value (LTV) kredit properti', 'Tarif bea masuk', 'Subsidi BBM', 'Tingkat bunga penjaminan LPS'], kunci: 1,
    bahas: 'Contoh instrumen makroprudensial adalah rasio LTV/FTV, Countercyclical Capital Buffer (CCyB), Rasio Intermediasi Makroprudensial (RIM), dan Penyangga Likuiditas Makroprudensial (PLM).',
  },
  {
    id: 'bi-k19', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Yang BUKAN anggota Komite Stabilitas Sistem Keuangan (KSSK) adalah ...',
    opsi: ['Menteri Keuangan', 'Gubernur Bank Indonesia', 'Ketua Dewan Komisioner OJK', 'Ketua Dewan Komisioner LPS', 'Ketua Badan Pemeriksa Keuangan'], kunci: 4,
    bahas: 'KSSK beranggotakan Menteri Keuangan (koordinator), Gubernur BI, Ketua DK OJK, dan Ketua DK LPS. BPK tidak termasuk.',
  },
  {
    id: 'bi-k20', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Fungsi BI sebagai lender of the last resort diwujudkan antara lain melalui ...',
    opsi: ['Penjaminan simpanan', 'Pinjaman Likuiditas Jangka Pendek (PLJP) kepada bank yang mengalami kesulitan likuiditas', 'Penerbitan Surat Utang Negara', 'Penyertaan modal pada bank', 'Pemberian kredit usaha rakyat'], kunci: 1,
    bahas: 'PLJP diberikan kepada bank yang solven tetapi kesulitan likuiditas jangka pendek, dengan agunan yang memadai.',
  },
  {
    id: 'bi-k21', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Undang-undang yang mengatur tentang Mata Uang Rupiah adalah ...',
    opsi: ['UU No. 23 Tahun 1999', 'UU No. 7 Tahun 2011', 'UU No. 21 Tahun 2011', 'UU No. 24 Tahun 2004', 'UU No. 9 Tahun 2016'], kunci: 1,
    bahas: 'UU No. 7 Tahun 2011 mengatur Mata Uang. UU 23/1999 tentang BI, UU 21/2011 tentang OJK, UU 24/2004 tentang LPS, dan UU 9/2016 tentang PPKSK.',
  },
  {
    id: 'bi-k22', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Pencetakan uang Rupiah dilakukan oleh ...',
    opsi: ['Bank Indonesia secara langsung', 'Kementerian Keuangan', 'BUMN yang ditunjuk, yaitu Perum Peruri', 'Bank umum milik negara', 'Percetakan swasta yang memenangkan tender'], kunci: 2,
    bahas: 'BI berwenang merencanakan, mengeluarkan, mengedarkan, dan menarik Rupiah, sedangkan pencetakannya dilakukan oleh BUMN yang ditunjuk, yaitu Perum Peruri.',
  },
  {
    id: 'bi-k23', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Cara mengenali keaslian uang Rupiah yang dikampanyekan BI adalah ...',
    opsi: ['3M: Mencium, Meremas, Menyobek', '3D: Dilihat, Diraba, Diterawang', '3S: Senyum, Sapa, Salam', 'Dipindai dengan aplikasi saja', 'Dicocokkan nomor serinya dengan bank'], kunci: 1,
    bahas: 'Metode 3D: dilihat (warna, benang pengaman, gambar berubah warna), diraba (cetakan terasa kasar), dan diterawang (tanda air dan rectoverso).',
  },
  {
    id: 'bi-k24', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Menurut UU Mata Uang, transaksi dengan tujuan pembayaran di wilayah NKRI ...',
    opsi: ['Boleh memakai mata uang apa pun', 'Wajib menggunakan Rupiah', 'Wajib menggunakan dolar AS untuk nilai besar', 'Hanya boleh nontunai', 'Diatur oleh masing-masing daerah'], kunci: 1,
    bahas: 'Setiap transaksi dengan tujuan pembayaran di wilayah NKRI wajib menggunakan Rupiah, dengan pengecualian tertentu yang diatur undang-undang.',
  },

  // ---------------- English: Grammar ----------------
  {
    id: 'en-g01', modul: 'english', topik: 'Grammar',
    teks: 'If I ___ you, I would accept the offer.',
    opsi: ['am', 'was', 'were', 'be', 'had been'], kunci: 2,
    bahas: 'Conditional tipe 2 (situasi tidak nyata sekarang) memakai "were" untuk semua subjek dalam bahasa formal.',
  },
  {
    id: 'en-g02', modul: 'english', topik: 'Grammar',
    teks: 'She has worked at the central bank ___ 2019.',
    opsi: ['for', 'since', 'from', 'at', 'during'], kunci: 1,
    bahas: 'Present perfect dengan titik waktu awal memakai "since". Untuk rentang waktu dipakai "for", misalnya "for five years".',
  },
  {
    id: 'en-g03', modul: 'english', topik: 'Grammar',
    teks: 'Neither the manager nor the analysts ___ aware of the change.',
    opsi: ['was', 'were', 'is', 'has been', 'being'], kunci: 1,
    bahas: 'Pada "neither ... nor", kata kerja mengikuti subjek terdekat. "The analysts" jamak, jadi dipakai "were".',
  },
  {
    id: 'en-g04', modul: 'english', topik: 'Grammar',
    teks: 'The quarterly report ___ by the committee last week.',
    opsi: ['reviewed', 'was reviewed', 'has reviewed', 'is reviewing', 'were reviewed'], kunci: 1,
    bahas: 'Kalimat pasif bentuk lampau dengan subjek tunggal: was + past participle.',
  },
  {
    id: 'en-g05', modul: 'english', topik: 'Grammar',
    teks: 'By the time we arrived, the meeting ___.',
    opsi: ['already starts', 'has already started', 'had already started', 'is already starting', 'already start'], kunci: 2,
    bahas: 'Peristiwa yang terjadi sebelum peristiwa lampau lain memakai past perfect (had + V3).',
  },
  {
    id: 'en-g06', modul: 'english', topik: 'Grammar',
    teks: 'Each of the candidates (A) have submitted (B) their documents (C) before (D) the deadline.',
    opsi: ['A: Each of', 'B: have submitted', 'C: their documents', 'D: before', 'Tidak ada kesalahan'], kunci: 1,
    bahas: '"Each of the ..." diikuti kata kerja tunggal, jadi seharusnya "has submitted".',
  },
  {
    id: 'en-g07', modul: 'english', topik: 'Grammar',
    teks: 'Hardly ___ the office when it started to rain.',
    opsi: ['she had left', 'had she left', 'she left', 'did she left', 'has she left'], kunci: 1,
    bahas: 'Kata keterangan negatif di awal kalimat (hardly, never, seldom) menyebabkan inversi: had + subjek + V3.',
  },
  {
    id: 'en-g08', modul: 'english', topik: 'Grammar',
    teks: 'He is highly interested ___ monetary economics.',
    opsi: ['on', 'at', 'in', 'about', 'for'], kunci: 2,
    bahas: 'Pasangan preposisi yang benar adalah "interested in".',
  },

  // ---------------- English: Vocabulary ----------------
  {
    id: 'en-v01', modul: 'english', topik: 'Vocabulary',
    teks: 'The new regulation aims to mitigate financial risks. "Mitigate" is closest in meaning to ...',
    opsi: ['worsen', 'lessen', 'ignore', 'measure', 'predict'], kunci: 1,
    bahas: 'Mitigate berarti mengurangi dampak atau tingkat keparahan, jadi sinonimnya lessen.',
  },
  {
    id: 'en-v02', modul: 'english', topik: 'Vocabulary',
    teks: 'The committee took a prudent approach. "Prudent" means ...',
    opsi: ['careless', 'careful and sensible', 'aggressive', 'temporary', 'expensive'], kunci: 1,
    bahas: 'Prudent berarti berhati-hati dan bijaksana. Istilah ini sering muncul dalam "prudential regulation".',
  },
  {
    id: 'en-v03', modul: 'english', topik: 'Vocabulary',
    teks: 'Food prices have been volatile this year. "Volatile" means ...',
    opsi: ['stable', 'likely to change rapidly', 'decreasing slowly', 'regulated', 'cheap'], kunci: 1,
    bahas: 'Volatile berarti mudah dan cepat berubah. Istilah "volatile food" dipakai untuk komponen inflasi pangan bergejolak.',
  },
  {
    id: 'en-v04', modul: 'english', topik: 'Vocabulary',
    teks: 'The opposite of "scarce" is ...',
    opsi: ['rare', 'limited', 'abundant', 'expensive', 'hidden'], kunci: 2,
    bahas: 'Scarce berarti langka. Lawannya abundant (melimpah).',
  },
  {
    id: 'en-v05', modul: 'english', topik: 'Vocabulary',
    teks: 'The new policy will take effect next month. "Take effect" means ...',
    opsi: ['be cancelled', 'start to apply', 'be discussed', 'be delayed', 'become popular'], kunci: 1,
    bahas: 'Take effect berarti mulai berlaku.',
  },

  // ---------------- English: Reading ----------------
  {
    id: 'en-r01', modul: 'english', topik: 'Reading', bacaan: BACAAN_EN,
    teks: 'What is the passage mainly about?',
    opsi: ['The history of central banks', 'How central banks use interest rates to control inflation', 'Why inflation is always harmful', 'How households should save money', 'The role of governments in setting prices'], kunci: 1,
    bahas: 'Seluruh paragraf membahas cara bank sentral memakai suku bunga, jeda waktu kebijakan, dan komunikasi untuk mengendalikan inflasi.',
  },
  {
    id: 'en-r02', modul: 'english', topik: 'Reading', bacaan: BACAAN_EN,
    teks: 'According to the passage, higher interest rates tend to ...',
    opsi: ['increase spending', 'slow spending by households and firms', 'raise inflation immediately', 'weaken communication', 'shorten policy lags'], kunci: 1,
    bahas: 'Paragraf pertama: "Higher rates make borrowing more expensive, which tends to slow spending by households and firms."',
  },
  {
    id: 'en-r03', modul: 'english', topik: 'Reading', bacaan: BACAAN_EN,
    teks: 'Why must central banks act based on forecasts?',
    opsi: ['Because current data are never published', 'Because policy affects prices only after a delay', 'Because forecasts are always accurate', 'Because the public prefers forecasts', 'Because inflation targets change every month'], kunci: 1,
    bahas: 'Paragraf kedua menyebut kebijakan moneter bekerja dengan jeda (lag) satu sampai dua tahun, jadi bank sentral harus melihat ke depan.',
  },
  {
    id: 'en-r04', modul: 'english', topik: 'Reading', bacaan: BACAAN_EN,
    teks: 'The word "anchored" in the last paragraph is closest in meaning to ...',
    opsi: ['stable', 'rising', 'hidden', 'confused', 'forgotten'], kunci: 0,
    bahas: 'Ekspektasi yang "anchored" berarti tertambat atau stabil di sekitar target.',
  },
  {
    id: 'en-r05', modul: 'english', topik: 'Reading', bacaan: BACAAN_EN,
    teks: 'What can be inferred from the passage?',
    opsi: [
      'Interest rates have no effect on inflation',
      'A credible central bank finds it easier to control inflation',
      'Central banks should ignore public expectations',
      'Inflation always returns to target within a month',
      'Communication is less important than forecasts',
    ], kunci: 1,
    bahas: 'Paragraf terakhir: bila publik percaya komitmen bank sentral, ekspektasi inflasi tetap stabil dan pengendalian harga menjadi lebih mudah.',
  },

  // ---------------- Kebanksentralan dari bab Materi ----------------
  ...SOAL_MATERI,

  // ---------------- Pengetahuan Umum, English, dan TPD tambahan ----------------
  ...SOAL_LANJUTAN,
];

export const soalById = new Map(SOAL.map((s) => [s.id, s]));
export const soalModul = (m: ModulId) => SOAL.filter((s) => s.modul === m);
export const topikModul = (m: ModulId) => [...new Set(soalModul(m).map((s) => s.topik))];
