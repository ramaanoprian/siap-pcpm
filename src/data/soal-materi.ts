import type { Soal } from './soal';

// Soal Kebanksentralan yang disusun dari bab Materi (src/data/materi.ts). Setiap fakta punya sumber
// resmi di bab terkait. Soal latihan buatan sendiri, bukan soal resmi PCPM. Jangan ganti `id`.

export const SOAL_MATERI: Soal[] = [
  // ---------------- Kelembagaan ----------------
  {
    id: 'bi-m01', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Undang-undang yang dicabut ketika UU No. 23 Tahun 1999 tentang Bank Indonesia ditetapkan adalah ...',
    opsi: ['UU No. 7 Tahun 1992 tentang Perbankan', 'UU No. 13 Tahun 1968 tentang Bank Sentral', 'UU No. 24 Tahun 2004 tentang LPS', 'UU No. 3 Tahun 2004', 'UU No. 21 Tahun 2011 tentang OJK'], kunci: 1,
    bahas: 'UU 23/1999 (ditetapkan 17 Mei 1999) mencabut UU No. 13 Tahun 1968 tentang Bank Sentral. UU 3/2004 justru mengubah UU 23/1999.',
  },
  {
    id: 'bi-m02', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Perubahan terakhir atas UU No. 23 Tahun 1999 tentang Bank Indonesia dilakukan melalui ...',
    opsi: ['UU No. 3 Tahun 2004', 'UU No. 6 Tahun 2009', 'Perppu No. 1 Tahun 2020', 'UU No. 4 Tahun 2023 (P2SK)', 'UU No. 9 Tahun 2016 (PPKSK)'], kunci: 3,
    bahas: 'Urutan perubahan: UU 3/2004, UU 6/2009 (penetapan Perppu 2/2008), Perppu 1/2020, lalu UU 4/2023 tentang Pengembangan dan Penguatan Sektor Keuangan.',
  },
  {
    id: 'bi-m03', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Menurut Pasal 43 UU Bank Indonesia, Rapat Dewan Gubernur untuk menetapkan kebijakan umum di bidang moneter diadakan ...',
    opsi: ['Sekurang-kurangnya sekali seminggu', 'Sekurang-kurangnya sekali sebulan', 'Setiap triwulan', 'Setiap semester', 'Hanya bila diminta Presiden'], kunci: 1,
    bahas: 'RDG kebijakan moneter sekurang-kurangnya sebulan sekali. RDG mingguan dipakai untuk evaluasi pelaksanaan kebijakan.',
  },
  {
    id: 'bi-m04', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Prinsip tata kelola Bank Indonesia yang disingkat IKKAT adalah ...',
    opsi: [
      'Integritas, Kompetensi, Kolaborasi, Akuntabilitas, Transparansi',
      'Independensi, Konsistensi, Koordinasi, Akuntabilitas, Transparansi',
      'Independensi, Kepatuhan, Kehati-hatian, Aksesibilitas, Tanggung jawab',
      'Inovasi, Konsistensi, Kredibilitas, Adaptif, Tangguh',
      'Integritas, Kemandirian, Kewajaran, Akuntabilitas, Tanggung jawab',
    ], kunci: 1,
    bahas: 'Tata kelola BI berpegang pada Independensi, Konsistensi, Koordinasi, Akuntabilitas, dan Transparansi (IKKAT).',
  },
  {
    id: 'bi-m05', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Evaluasi pelaksanaan kebijakan moneter dan rencana kebijakan tahun berikutnya disampaikan BI secara tertulis kepada ...',
    opsi: ['Menteri Keuangan saja', 'Presiden dan DPR', 'Badan Pemeriksa Keuangan', 'OJK dan LPS', 'Mahkamah Konstitusi'], kunci: 1,
    bahas: 'Pasal 58 UU BI: disampaikan tertulis kepada Presiden dan DPR, serta diumumkan ke masyarakat melalui media massa.',
  },
  {
    id: 'bi-m06', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Tugas Bank Indonesia menurut Pasal 8 UU No. 23 Tahun 1999 yang kini telah dialihkan ke lembaga lain adalah ...',
    opsi: [
      'Menetapkan dan melaksanakan kebijakan moneter',
      'Mengatur dan menjaga kelancaran sistem pembayaran',
      'Mengatur dan mengawasi bank',
      'Mengelola uang Rupiah',
      'Menetapkan suku bunga kebijakan',
    ], kunci: 2,
    bahas: 'Fungsi mengatur dan mengawasi bank beralih ke OJK pada 31 Desember 2013 berdasarkan UU No. 21 Tahun 2011.',
  },

  // ---------------- Moneter ----------------
  {
    id: 'bi-m07', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'BI-Rate adalah suku bunga kebijakan yang didasarkan pada transaksi ...',
    opsi: ['Repo tenor 1 bulan', 'Reverse repo tenor 7 hari', 'Deposit facility overnight', 'SBI tenor 1 tahun', 'Pinjaman antarbank 3 bulan'], kunci: 1,
    bahas: 'BI-Rate mengacu pada reverse repo tenor 7 hari. Sebelum 21 Desember 2023 namanya BI 7-Day Reverse Repo Rate (BI7DRR).',
  },
  {
    id: 'bi-m08', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'BI 7-Day Reverse Repo Rate pertama kali berlaku sebagai suku bunga kebijakan pada ...',
    opsi: ['1 Juli 2005', '19 Agustus 2016', '21 Desember 2023', '31 Desember 2013', '17 Agustus 2019'], kunci: 1,
    bahas: 'BI7DRR berlaku 19 Agustus 2016 dan pada 21 Desember 2023 berganti nama menjadi BI-Rate tanpa mengubah cara kerjanya.',
  },
  {
    id: 'bi-m09', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Sasaran operasional kebijakan moneter Bank Indonesia saat ini adalah ...',
    opsi: ['Jumlah uang beredar (M2)', 'Base money', 'IndONIA', 'JIBOR 3 bulan', 'Cadangan devisa'], kunci: 2,
    bahas: 'Sasaran operasionalnya IndONIA (Indonesia Overnight Index Average), suku bunga pasar uang antarbank overnight.',
  },
  {
    id: 'bi-m10', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Sasaran inflasi Indonesia untuk tahun 2024 sampai 2026 adalah ...',
    opsi: ['3±1%', '2,5±1%', '3,5±1%', '4±1%', '2±0,5%'], kunci: 1,
    bahas: 'Sasaran inflasi 2024, 2025, dan 2026 adalah 2,5±1%, sesuai data target inflasi di bi.go.id.',
  },
  {
    id: 'bi-m11', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Berikut ini termasuk elemen Flexible ITF, KECUALI ...',
    opsi: [
      'Integrasi kebijakan moneter dan makroprudensial',
      'Peran kebijakan nilai tukar dan arus modal',
      'Koordinasi kebijakan dengan Pemerintah',
      'Penetapan APBN oleh Bank Indonesia',
      'Penguatan strategi komunikasi kebijakan',
    ], kunci: 3,
    bahas: 'APBN disusun Pemerintah dan disetujui DPR. Elemen Flexible ITF: penargetan inflasi, integrasi moneter-makroprudensial, nilai tukar dan arus modal, koordinasi dengan Pemerintah, dan komunikasi.',
  },
  {
    id: 'bi-m12', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Ketika BI-Rate naik, rupiah cenderung menguat karena selisih suku bunga menarik modal asing masuk. Jalur transmisi ini disebut jalur ...',
    opsi: ['Suku bunga', 'Nilai tukar', 'Harga aset', 'Ekspektasi', 'Kredit'], kunci: 1,
    bahas: 'Jalur nilai tukar: selisih suku bunga dalam dan luar negeri memengaruhi arus modal, lalu nilai tukar, lalu harga barang impor.',
  },
  {
    id: 'bi-m13', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Strategi 4K dalam pengendalian inflasi oleh TPIP dan TPID terdiri atas ...',
    opsi: [
      'Keterjangkauan harga, Ketersediaan pasokan, Kelancaran distribusi, Komunikasi efektif',
      'Kebijakan, Koordinasi, Kolaborasi, Komunikasi',
      'Konsumsi, Kredit, Kurs, Kepercayaan',
      'Ketahanan pangan, Kestabilan harga, Kelancaran pembayaran, Kepatuhan',
      'Kuantitas, Kualitas, Kontinuitas, Kompetisi',
    ], kunci: 0,
    bahas: 'Strategi 4K: Keterjangkauan harga, Ketersediaan pasokan, Kelancaran distribusi, dan Komunikasi efektif (Perpres No. 23 Tahun 2017).',
  },

  // ---------------- Makroprudensial & SSK ----------------
  {
    id: 'bi-m14', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Tambahan modal yang berfungsi sebagai penyangga untuk mengantisipasi kerugian apabila terjadi pertumbuhan kredit berlebihan disebut ...',
    opsi: ['Capital Conservation Buffer', 'Countercyclical Capital Buffer (CCyB)', 'Giro Wajib Minimum', 'Posisi Devisa Neto', 'Rasio Intermediasi Makroprudensial'], kunci: 1,
    bahas: 'CCyB adalah penyangga modal kontrasiklis: ditambah saat kredit tumbuh berlebihan agar bank siap menyerap kerugian ketika siklus berbalik.',
  },
  {
    id: 'bi-m15', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Rasio antara nilai kredit yang diberikan bank terhadap nilai agunan properti pada saat pemberian kredit disebut ...',
    opsi: ['Loan to Deposit Ratio (LDR)', 'Loan to Value (LTV)', 'Capital Adequacy Ratio (CAR)', 'Net Interest Margin (NIM)', 'Non Performing Loan (NPL)'], kunci: 1,
    bahas: 'LTV (untuk syariah: FTV) membandingkan nilai kredit dengan nilai agunan properti. Ini instrumen makroprudensial BI.',
  },
  {
    id: 'bi-m16', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Instrumen makroprudensial BI yang mendorong pembiayaan kepada UMKM dan perorangan berpenghasilan rendah adalah ...',
    opsi: ['RPIM', 'PDN', 'RPLN', 'PLM', 'CCyB'], kunci: 0,
    bahas: 'Rasio Pembiayaan Inklusif Makroprudensial (RPIM) mendorong pembiayaan inklusif untuk UMKM, korporasi UMKM, dan perorangan berpenghasilan rendah.',
  },
  {
    id: 'bi-m17', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Cadangan likuiditas minimum dalam Rupiah yang wajib dipelihara bank dalam bentuk surat berharga untuk tujuan makroprudensial disebut ...',
    opsi: ['Giro Wajib Minimum', 'Penyangga Likuiditas Makroprudensial (PLM)', 'Kebijakan Insentif Likuiditas Makroprudensial (KLM)', 'Pinjaman Likuiditas Jangka Pendek (PLJP)', 'Rasio Pendanaan Luar Negeri Bank'], kunci: 1,
    bahas: 'PLM adalah cadangan likuiditas minimum dalam Rupiah berupa surat berharga. KLM justru insentif likuiditas untuk mendorong kredit ke sektor prioritas.',
  },
  {
    id: 'bi-m18', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Instrumen makroprudensial untuk mengendalikan risiko nilai tukar dan mengatasi currency mismatch yang berlebihan adalah ...',
    opsi: ['Posisi Devisa Neto (PDN)', 'Loan to Value', 'Rasio Pembiayaan Inklusif Makroprudensial', 'Countercyclical Capital Buffer', 'QRIS'], kunci: 0,
    bahas: 'PDN membatasi selisih aset dan kewajiban valas bank sehingga risiko nilai tukar dan currency mismatch terkendali.',
  },
  {
    id: 'bi-m19', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Stabilitas sistem keuangan menurut BI adalah kondisi ketika sistem keuangan ...',
    opsi: [
      'Tidak mengalami inflasi sama sekali',
      'Berfungsi secara efektif dan efisien serta mampu bertahan dari gejolak dalam dan luar negeri',
      'Seluruh bank memperoleh laba',
      'Suku bunga kredit selalu turun',
      'Nilai tukar rupiah dipatok terhadap dolar AS',
    ], kunci: 1,
    bahas: 'Definisi BI: sistem keuangan yang berfungsi efektif dan efisien serta mampu bertahan dari gejolak yang bersumber dari dalam maupun luar negeri.',
  },
  {
    id: 'bi-m20', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Forum koordinasi antara BI dan OJK di bidang pengaturan dan pengawasan makroprudensial-mikroprudensial disebut ...',
    opsi: ['KSSK', 'FKMM', 'TPID', 'Botasupal', 'RDG'], kunci: 1,
    bahas: 'Forum Koordinasi Makroprudensial–Mikroprudensial (FKMM) mempertemukan BI dan OJK. KSSK melibatkan empat lembaga.',
  },

  // ---------------- OJK, LPS, KSSK ----------------
  {
    id: 'bi-m21', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Nilai simpanan yang dijamin LPS paling tinggi sebesar ...',
    opsi: ['Rp100 juta per nasabah per bank', 'Rp500 juta per nasabah per bank', 'Rp1 miliar per rekening', 'Rp2 miliar per nasabah per bank', 'Tidak terbatas'], kunci: 3,
    bahas: 'Sejak 13 Oktober 2008, LPS menjamin simpanan paling tinggi Rp2 miliar per nasabah per bank.',
  },
  {
    id: 'bi-m22', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Syarat simpanan dijamin LPS dikenal dengan istilah 3T, yaitu ...',
    opsi: [
      'Tercatat, Tingkat bunga tidak melebihi bunga penjaminan, Tidak merugikan bank',
      'Tunai, Tepat waktu, Terverifikasi',
      'Tabungan, Tagihan, Titipan',
      'Transparan, Terdaftar, Terpercaya',
      'Tercatat, Tanpa agunan, Tidak dipindahtangankan',
    ], kunci: 0,
    bahas: '3T: Tercatat dalam pembukuan bank, Tingkat bunga tidak melebihi tingkat bunga penjaminan LPS, dan Tidak melakukan tindakan yang merugikan bank.',
  },
  {
    id: 'bi-m23', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Pengawasan sektor pasar modal dan industri keuangan nonbank beralih ke OJK pada ...',
    opsi: ['22 November 2011', '31 Desember 2012', '31 Desember 2013', '1 Januari 2014', '12 Januari 2023'], kunci: 1,
    bahas: 'Pasar modal dan IKNB beralih ke OJK pada 31 Desember 2012; perbankan menyusul pada 31 Desember 2013.',
  },
  {
    id: 'bi-m24', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Komite Stabilitas Sistem Keuangan (KSSK) dibentuk berdasarkan ...',
    opsi: ['UU No. 23 Tahun 1999', 'UU No. 21 Tahun 2011', 'UU No. 9 Tahun 2016', 'UU No. 7 Tahun 2011', 'Perpres No. 23 Tahun 2017'], kunci: 2,
    bahas: 'KSSK dibentuk dengan UU No. 9 Tahun 2016 tentang Pencegahan dan Penanganan Krisis Sistem Keuangan (PPKSK).',
  },

  // ---------------- Sistem Pembayaran ----------------
  {
    id: 'bi-m25', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Infrastruktur BI untuk penyelesaian transaksi bernilai besar secara real time dan satu per satu adalah ...',
    opsi: ['SKNBI', 'BI-RTGS', 'BI-SSSS', 'GPN', 'QRIS'], kunci: 1,
    bahas: 'BI-RTGS (Real Time Gross Settlement) menyelesaikan transaksi nilai besar secara real time dan gross. SKNBI melayani transaksi ritel lewat kliring.',
  },
  {
    id: 'bi-m26', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Sistem BI yang digunakan untuk penatausahaan dan penyelesaian transaksi surat berharga tanpa warkat adalah ...',
    opsi: ['BI-SSSS', 'BI-FAST', 'SKNBI', 'BI-RTGS', 'SIPS'], kunci: 0,
    bahas: 'BI-SSSS adalah Bank Indonesia Scripless Securities Settlement System.',
  },
  {
    id: 'bi-m27', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Biaya maksimal transfer BI-FAST yang dapat dikenakan bank kepada nasabah adalah ...',
    opsi: ['Rp1.000', 'Rp2.500', 'Rp4.000', 'Rp6.500', 'Gratis tanpa pengecualian'], kunci: 1,
    bahas: 'BI menetapkan biaya maksimal BI-FAST ke nasabah Rp2.500 per transaksi.',
  },
  {
    id: 'bi-m28', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Fitur BI-FAST yang memungkinkan transfer cukup dengan nomor ponsel atau email sebagai pengganti nomor rekening disebut ...',
    opsi: ['Virtual account', 'Proxy address', 'Bulk credit', 'Direct debit', 'Request to pay'], kunci: 1,
    bahas: 'Proxy address memetakan nomor ponsel atau email ke rekening tujuan.',
  },
  {
    id: 'bi-m29', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'QRIS diluncurkan oleh Bank Indonesia pada ...',
    opsi: ['17 Agustus 2019', '1 Januari 2020', 'Desember 2021', '19 Agustus 2016', '17 Agustus 2020'], kunci: 0,
    bahas: 'QRIS diluncurkan pada 17 Agustus 2019 dan berlaku wajib secara nasional mulai 1 Januari 2020.',
  },
  {
    id: 'bi-m30', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'MDR QRIS untuk usaha mikro (UMI) pada transaksi sampai dengan Rp500.000 adalah ...',
    opsi: ['0%', '0,3%', '0,7%', '1%', '2%'], kunci: 0,
    bahas: 'MDR QRIS UMI 0% untuk transaksi sampai Rp500.000 dan 0,3% untuk transaksi di atasnya.',
  },
  {
    id: 'bi-m31', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Layanan QRIS TUNTAS mencakup ...',
    opsi: ['Tabungan, Unit link, Tunai', 'Tarik tunai, Transfer, Setor tunai', 'Top up, Tagihan, Tiket', 'Transaksi lintas negara saja', 'Tukar valuta asing'], kunci: 1,
    bahas: 'QRIS TUNTAS = Tarik tunai, Transfer, dan Setor tunai dengan memindai QRIS.',
  },
  {
    id: 'bi-m32', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Berikut ini termasuk lima inisiatif Blueprint Sistem Pembayaran Indonesia 2030, KECUALI ...',
    opsi: ['Infrastruktur', 'Industri', 'Inovasi', 'Rupiah Digital', 'Inflasi'], kunci: 4,
    bahas: 'Lima inisiatif BSPI 2030: Infrastruktur, Industri, Inovasi, Internasional, dan Rupiah Digital.',
  },

  // ---------------- Rupiah ----------------
  {
    id: 'bi-m33', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Urutan tahapan pengelolaan uang Rupiah yang benar adalah ...',
    opsi: [
      'Pencetakan, perencanaan, pengedaran, pengeluaran, pemusnahan',
      'Perencanaan, pencetakan, pengeluaran, pengedaran, pencabutan dan penarikan, pemusnahan',
      'Perencanaan, pengeluaran, pencetakan, pemusnahan, pengedaran',
      'Pengeluaran, pengedaran, perencanaan, pencetakan, pemusnahan',
      'Perencanaan, pencetakan, pemusnahan, pengeluaran, pengedaran',
    ], kunci: 1,
    bahas: 'Siklus menurut UU Mata Uang dan BI: perencanaan, pencetakan, pengeluaran, pengedaran, pencabutan dan penarikan, lalu pemusnahan.',
  },
  {
    id: 'bi-m34', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Kebijakan BI untuk menjaga uang yang beredar tetap layak edar dengan mengganti uang lusuh atau rusak disebut ...',
    opsi: ['Tight money policy', 'Clean money policy', 'Cashless policy', 'Easy money policy', 'Redenominasi'], kunci: 1,
    bahas: 'Clean money policy menjaga kualitas uang beredar dengan menarik uang tidak layak edar dan menggantinya dengan uang baru.',
  },
  {
    id: 'bi-m35', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Pemegang uang Rupiah yang sudah dicabut dan ditarik dari peredaran ...',
    opsi: [
      'Kehilangan haknya sama sekali',
      'Dapat menukarkannya sesuai nilai nominal',
      'Hanya dapat menukarkan setengah nilainya',
      'Wajib melapor ke kepolisian',
      'Dapat tetap memakainya untuk transaksi',
    ], kunci: 1,
    bahas: 'Uang yang dicabut tidak berlaku lagi sebagai alat pembayaran, tetapi pemegangnya tetap bisa menukarkannya sesuai nilai nominal.',
  },
  {
    id: 'bi-m36', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Unsur pengaman Rupiah berupa gambar yang terpotong di sisi depan dan belakang, lalu tampak utuh saat diterawang, disebut ...',
    opsi: ['Benang pengaman', 'Tanda air', 'Rectoverso', 'Mikroteks', 'Tinta berubah warna'], kunci: 2,
    bahas: 'Rectoverso adalah gambar saling isi antara sisi depan dan belakang yang terlihat utuh bila diterawang.',
  },
  {
    id: 'bi-m37', modul: 'kebanksentralan', topik: 'Rupiah',
    teks: 'Uang peringatan kemerdekaan yang diterbitkan BI untuk memperingati 75 tahun kemerdekaan RI bernilai ...',
    opsi: ['Rp17.000', 'Rp45.000', 'Rp75.000', 'Rp100.000', 'Rp175.000'], kunci: 2,
    bahas: 'BI menerbitkan Uang Peringatan Kemerdekaan 75 Tahun RI pecahan Rp75.000.',
  },
];
