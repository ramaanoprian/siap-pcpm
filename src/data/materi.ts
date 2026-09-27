import { cariYt, KELOMPOK, yt, type Bab, type KelompokId, type Sumber, type Video } from './materi-dasar';
import { MATERI_LAIN } from './materi-lain';

// Ringkasan materi Kebanksentralan. Setiap fakta diambil dari sumber resmi yang dicantumkan di
// bagian `sumber` setiap bab (bi.go.id, teks undang-undang, ojk.go.id, lps.go.id, kemenkeu.go.id).
// Angka yang sering berubah (BI-Rate terbaru, inflasi bulanan) sengaja tidak ditulis: cek tautannya.
// `id` bab dipakai sebagai kunci progres baca, jadi jangan diganti.

export * from './materi-dasar';

const BI_CHANNEL: Video = { judul: 'Semua video Bank Indonesia Channel', url: 'https://www.youtube.com/c/BankIndonesiaChannel/videos', kanal: 'Bank Indonesia Channel' };

const UU_BI: Sumber = {
  nama: 'UU No. 23 Tahun 1999 tentang Bank Indonesia (teks resmi, arsip OJK)',
  url: 'https://ojk.go.id/waspada-investasi/id/regulasi/Documents/UU_No_23_1999_Bank_Indonesia.pdf',
};
const UU_BI_BPK: Sumber = {
  nama: 'JDIH BPK: status dan perubahan UU No. 23 Tahun 1999',
  url: 'https://peraturan.bpk.go.id/Details/45332/uu-no-23-tahun-1999',
};
const BI_GOVERNANCE: Sumber = {
  nama: 'Bank Indonesia: Governance',
  url: 'https://www.bi.go.id/id/tentang-bi/profil/governance/default.aspx',
};

const MATERI_BI: Bab[] = [
  {
    id: 'kelembagaan',
    kelompok: 'kebanksentralan',
    modul: 'kebanksentralan',
    topik: 'Kelembagaan',
    judul: 'Kelembagaan dan Tata Kelola BI',
    ringkas: 'Status, tujuan, tugas, Dewan Gubernur, dan dasar hukum Bank Indonesia.',
    menit: 8,
    bagian: [
      {
        judul: 'Status dan dasar hukum',
        isi: [
          'Bank Indonesia adalah bank sentral Republik Indonesia. UU No. 23 Tahun 1999 Pasal 4 menyebut BI sebagai lembaga negara yang independen, bebas dari campur tangan Pemerintah dan pihak lain. Pasal 9 melarang pihak lain mencampuri pelaksanaan tugas BI.',
          'UU No. 23 Tahun 1999 ditetapkan 17 Mei 1999 dan mencabut UU No. 13 Tahun 1968 tentang Bank Sentral. Undang-undang ini sudah beberapa kali diubah: UU No. 3 Tahun 2004, UU No. 6 Tahun 2009 (penetapan Perppu No. 2 Tahun 2008), Perppu No. 1 Tahun 2020, dan terakhir UU No. 4 Tahun 2023 tentang Pengembangan dan Penguatan Sektor Keuangan (UU P2SK).',
        ],
      },
      {
        judul: 'Tujuan BI',
        isi: [
          'Rumusan awal di Pasal 7 UU 23/1999: "mencapai dan memelihara kestabilan nilai rupiah".',
          'Setelah UU P2SK (UU 4/2023), tujuan BI diperluas menjadi: mencapai stabilitas nilai rupiah, memelihara stabilitas sistem pembayaran, dan turut menjaga stabilitas sistem keuangan, dalam rangka mendukung pertumbuhan ekonomi yang berkelanjutan.',
        ],
        poin: [
          'Stabilitas nilai rupiah punya dua sisi: stabil terhadap barang dan jasa (inflasi rendah dan stabil) dan stabil terhadap mata uang negara lain (nilai tukar).',
        ],
      },
      {
        judul: 'Tugas BI',
        isi: ['Pasal 8 UU 23/1999 menetapkan tiga tugas untuk mencapai tujuan tersebut:'],
        poin: [
          'Menetapkan dan melaksanakan kebijakan moneter.',
          'Mengatur dan menjaga kelancaran sistem pembayaran.',
          'Mengatur dan mengawasi bank. Tugas ini beralih ke OJK sejak 31 Desember 2013 sesuai UU No. 21 Tahun 2011. BI kini fokus pada kebijakan makroprudensial.',
        ],
      },
      {
        judul: 'Dewan Gubernur dan Rapat Dewan Gubernur',
        poin: [
          'Pasal 37: Dewan Gubernur terdiri atas seorang Gubernur, seorang Deputi Gubernur Senior, dan sekurang-kurangnya 4 atau sebanyak-banyaknya 7 Deputi Gubernur.',
          'Dewan Gubernur dipimpin Gubernur, dengan Deputi Gubernur Senior sebagai wakil.',
          'Pasal 43: Rapat Dewan Gubernur (RDG) diadakan sekurang-kurangnya sekali sebulan untuk menetapkan kebijakan umum moneter, dan sekurang-kurangnya sekali seminggu untuk evaluasi pelaksanaan kebijakan. Jadwal RDG bulanan diumumkan BI setiap tahun.',
        ],
      },
      {
        judul: 'Akuntabilitas dan tata kelola',
        isi: [
          'Pasal 58: BI menyampaikan evaluasi kebijakan moneter dan rencana kebijakan tahun berikutnya secara tertulis kepada Presiden dan DPR, serta kepada masyarakat melalui media massa.',
          'Tata kelola BI berpegang pada lima prinsip yang disingkat IKKAT: Independensi, Konsistensi, Koordinasi, Akuntabilitas, dan Transparansi.',
        ],
      },
    ],
    ingat: [
      'BI = lembaga negara independen (Pasal 4 UU 23/1999).',
      'Tujuan pasca UU P2SK: stabilitas nilai rupiah + stabilitas sistem pembayaran + turut menjaga stabilitas sistem keuangan.',
      'Pengawasan bank pindah ke OJK pada 31 Desember 2013.',
      'Dewan Gubernur: 1 Gubernur, 1 DGS, 4–7 Deputi Gubernur.',
      'Prinsip tata kelola: IKKAT.',
    ],
    video: [yt('BI Menjawab: Kupas Tuntas Peran Bank Sentral di Indonesia', '_HSH5ilP97o', 'YouTube'), yt('Bank Indonesia: Independensi dan Kepercayaan', 'T3GCWczs42E', 'YouTube'), BI_CHANNEL],
    sumber: [UU_BI, UU_BI_BPK, BI_GOVERNANCE],
  },
  {
    id: 'moneter',
    kelompok: 'kebanksentralan',
    modul: 'kebanksentralan',
    topik: 'Moneter',
    judul: 'Kebijakan Moneter',
    ringkas: 'Kerangka ITF, BI-Rate, sasaran operasional, jalur transmisi, dan pengendalian inflasi.',
    menit: 10,
    bagian: [
      {
        judul: 'Tujuan kebijakan moneter',
        isi: [
          'Kebijakan moneter diarahkan untuk mencapai stabilitas nilai rupiah: inflasi yang rendah dan stabil serta nilai tukar yang stabil.',
        ],
      },
      {
        judul: 'Inflation Targeting Framework (ITF)',
        isi: [
          'BI menerapkan Inflation Targeting Framework sejak 2005. Setelah krisis global 2008/2009, kerangka ini disempurnakan menjadi Flexible ITF.',
        ],
        poin: [
          'Strategi penargetan inflasi sebagai dasar kebijakan moneter.',
          'Integrasi kebijakan moneter dan makroprudensial untuk memperkuat transmisi kebijakan.',
          'Peran kebijakan nilai tukar dan pengelolaan arus modal.',
          'Koordinasi kebijakan dengan Pemerintah.',
          'Penguatan strategi komunikasi kebijakan.',
        ],
      },
      {
        judul: 'Sasaran inflasi',
        isi: [
          'Sasaran inflasi ditetapkan Pemerintah berkoordinasi dengan BI. Untuk 2024, 2025, dan 2026 sasarannya 2,5±1%. Realisasi inflasi terbaru bisa dicek di halaman statistik BI.',
        ],
      },
      {
        judul: 'BI-Rate dan sasaran operasional',
        poin: [
          'BI-Rate adalah suku bunga kebijakan BI yang didasarkan pada transaksi reverse repo tenor 7 hari.',
          'Mulai berlaku 19 Agustus 2016 dengan nama BI 7-Day Reverse Repo Rate (BI7DRR), menggantikan BI Rate lama. Tujuannya agar punya hubungan yang lebih kuat dengan suku bunga pasar uang.',
          'Sejak 21 Desember 2023 namanya diubah menjadi BI-Rate untuk memperkuat komunikasi kebijakan. Cara kerjanya tetap sama.',
          'Sasaran operasionalnya adalah IndONIA (Indonesia Overnight Index Average), suku bunga pasar uang antarbank overnight.',
          'BI-Rate diputuskan dalam RDG bulanan.',
        ],
      },
      {
        judul: 'Mekanisme transmisi',
        isi: ['Perubahan BI-Rate memengaruhi inflasi lewat beberapa jalur. Contoh ketika BI-Rate naik:'],
        poin: [
          'Jalur suku bunga: bunga kredit naik, permintaan kredit dan belanja turun, tekanan inflasi mereda.',
          'Jalur nilai tukar: selisih suku bunga dengan luar negeri melebar, modal masuk, rupiah menguat, harga barang impor lebih murah.',
          'Jalur harga aset: harga saham dan obligasi turun, kekayaan rumah tangga turun, konsumsi dan investasi melambat.',
          'Jalur ekspektasi: ekspektasi inflasi masyarakat dan dunia usaha ikut turun, sehingga kenaikan upah dan harga tertahan.',
        ],
      },
      {
        judul: 'Koordinasi pengendalian inflasi',
        isi: [
          'Berdasarkan Perpres No. 23 Tahun 2017, BI dan Pemerintah bekerja sama dalam Tim Pengendalian Inflasi di pusat (TPIP) dan daerah (TPID). Strateginya dikenal sebagai 4K: Keterjangkauan harga, Ketersediaan pasokan, Kelancaran distribusi, dan Komunikasi yang efektif.',
        ],
      },
    ],
    ingat: [
      'ITF sejak 2005, lalu Flexible ITF pasca krisis 2008/2009.',
      'BI-Rate = reverse repo 7 hari. Nama BI7DRR (19 Agustus 2016) diganti BI-Rate (21 Desember 2023).',
      'Sasaran operasional: IndONIA.',
      'Sasaran inflasi 2024–2026: 2,5±1%.',
      'Strategi 4K TPIP/TPID.',
    ],
    video: [yt('Mengenal Kebijakan Moneter Bank Indonesia', 'KMPnVroI2vE', 'Bank Indonesia Channel'), yt('[Bank Indonesia 101] Inflasi', '19l6NalTE4c', 'Bank Indonesia Channel'), cariYt('Bank Indonesia mekanisme transmisi kebijakan moneter')],
    sumber: [
      { nama: 'Bank Indonesia: Kebijakan Moneter', url: 'https://www.bi.go.id/id/fungsi-utama/moneter/default.aspx' },
      { nama: 'Bank Indonesia: BI-Rate', url: 'https://www.bi.go.id/id/fungsi-utama/moneter/bi-rate/default.aspx' },
      { nama: 'Bank Indonesia: Target Inflasi', url: 'https://www.bi.go.id/id/statistik/indikator/target-inflasi.aspx' },
      {
        nama: 'BI Institute: Mekanisme Transmisi Kebijakan Moneter di Indonesia',
        url: 'https://www.bi.go.id/id/bi-institute/policy-mix/core/Documents/Mekanisme_transmisi_kebijakan_moneter_di_Indonesia.pdf',
      },
    ],
  },
  {
    id: 'makroprudensial',
    kelompok: 'kebanksentralan',
    modul: 'kebanksentralan',
    topik: 'Makroprudensial & SSK',
    judul: 'Stabilitas Sistem Keuangan dan Makroprudensial',
    ringkas: 'Pengertian SSK, tujuan kebijakan makroprudensial, dan instrumen-instrumennya.',
    menit: 9,
    bagian: [
      {
        judul: 'Apa itu stabilitas sistem keuangan',
        isi: [
          'Stabilitas sistem keuangan (SSK) adalah kondisi sistem keuangan yang berfungsi secara efektif dan efisien serta mampu bertahan dari gejolak yang bersumber dari dalam maupun luar negeri.',
        ],
      },
      {
        judul: 'Kebijakan makroprudensial',
        isi: [
          'Kebijakan makroprudensial bertujuan turut menjaga SSK dengan mendorong intermediasi yang seimbang, berkualitas, dan berkelanjutan; memitigasi dan mengelola risiko sistemik; serta mendorong inklusi ekonomi dan keuangan. Sifatnya kontrasiklis: diperketat saat siklus keuangan memanas, dilonggarkan saat melemah.',
          'Beda dengan mikroprudensial (OJK) yang melihat kesehatan tiap lembaga, makroprudensial (BI) melihat sistem keuangan secara keseluruhan.',
        ],
      },
      {
        judul: 'Peran BI dalam SSK',
        poin: [
          'Pengaturan makroprudensial.',
          'Pengawasan makroprudensial lewat Dynamic Systemic Risk Surveillance (DSRS).',
          'Lender of last resort: pemberi pinjaman terakhir bagi bank yang kesulitan likuiditas.',
          'Koordinasi dengan otoritas lain, misalnya dengan OJK lewat Forum Koordinasi Makroprudensial–Mikroprudensial (FKMM).',
        ],
      },
      {
        judul: 'Instrumen makroprudensial BI',
        poin: [
          'KLM (Kebijakan Insentif Likuiditas Makroprudensial): insentif likuiditas agar bank menyalurkan kredit ke sektor prioritas.',
          'RPIM (Rasio Pembiayaan Inklusif Makroprudensial): mendorong pembiayaan ke UMKM, korporasi UMKM, dan perorangan berpenghasilan rendah.',
          'LTV/FTV dan uang muka: rasio nilai kredit terhadap nilai agunan properti, termasuk ketentuan uang muka kendaraan.',
          'CCyB (Countercyclical Capital Buffer): tambahan modal sebagai penyangga kerugian bila kredit tumbuh berlebihan.',
          'RIM/RIM Syariah (Rasio Intermediasi Makroprudensial): menjaga fungsi intermediasi bank sesuai kapasitas dan target pertumbuhan ekonomi.',
          'PLM/PLM Syariah (Penyangga Likuiditas Makroprudensial): cadangan likuiditas minimum dalam rupiah yang dipelihara bank dalam bentuk surat berharga.',
          'PLJP/PLJPS (Pinjaman Likuiditas Jangka Pendek): pinjaman bagi bank yang kesulitan likuiditas jangka pendek.',
          'PDN (Posisi Devisa Neto): membatasi risiko nilai tukar dan currency mismatch.',
          'RPLN (Rasio Pendanaan Luar Negeri Bank): mengelola pendanaan luar negeri jangka pendek bank.',
        ],
      },
    ],
    ingat: [
      'SSK = sistem keuangan berfungsi efektif, efisien, dan tahan gejolak.',
      'Makroprudensial (BI) melihat sistem; mikroprudensial (OJK) melihat tiap lembaga.',
      'CCyB = penyangga modal kontrasiklis; LTV = rasio kredit terhadap nilai agunan properti.',
      'PLJP = fungsi lender of last resort BI.',
    ],
    video: [yt('Mengenal Stabilitas Sistem Keuangan', 't_1coB08i6s', 'YouTube'), yt('Kebijakan Makroprudensial BI dan Stabilitas Sistem Keuangan', 'jIImH88NyVs', 'YouTube'), cariYt('Bank Indonesia kebijakan makroprudensial')],
    sumber: [
      { nama: 'Bank Indonesia: Ikhtisar Stabilitas Sistem Keuangan', url: 'https://www.bi.go.id/id/fungsi-utama/stabilitas-sistem-keuangan/ikhtisar/default.aspx' },
      { nama: 'Bank Indonesia: Instrumen Kebijakan Makroprudensial', url: 'https://www.bi.go.id/id/fungsi-utama/stabilitas-sistem-keuangan/instrumen-makroprudensial/default.aspx' },
      { nama: 'Bank Indonesia: Koordinasi BI dengan Lembaga/Otoritas Lain', url: 'https://www.bi.go.id/id/fungsi-utama/stabilitas-sistem-keuangan/koordinasi-bi-lainnya/default.aspx' },
    ],
  },
  {
    id: 'sistem-pembayaran',
    kelompok: 'kebanksentralan',
    modul: 'kebanksentralan',
    topik: 'Sistem Pembayaran',
    judul: 'Sistem Pembayaran',
    ringkas: 'Infrastruktur BI-RTGS, SKNBI, BI-SSSS, BI-FAST, QRIS, dan Blueprint Sistem Pembayaran Indonesia 2030.',
    menit: 9,
    bagian: [
      {
        judul: 'Peran BI',
        isi: [
          'Sistem pembayaran adalah sarana pemindahan dana untuk memenuhi kewajiban yang timbul dari kegiatan ekonomi. BI mengatur dan menjaga kelancarannya, sekaligus mengoperasikan infrastruktur utamanya.',
        ],
      },
      {
        judul: 'Infrastruktur yang dioperasikan BI',
        poin: [
          'BI-RTGS (Real Time Gross Settlement): penyelesaian transaksi bernilai besar secara real time, satu per satu (gross).',
          'SKNBI (Sistem Kliring Nasional BI): transaksi ritel bernilai lebih kecil yang diselesaikan secara kliring.',
          'BI-SSSS (Scripless Securities Settlement System): penatausahaan dan penyelesaian transaksi surat berharga tanpa warkat.',
          'BI-FAST: infrastruktur pembayaran ritel yang real time, aman, efisien, dan tersedia 24/7.',
        ],
      },
      {
        judul: 'BI-FAST',
        poin: [
          'Mulai diimplementasikan Desember 2021, diawali layanan transfer kredit individual.',
          'Biaya maksimal ke nasabah Rp2.500 per transaksi.',
          'Batas nominal Rp250 juta per transaksi pada tahap awal.',
          'Mendukung proxy address, yaitu nomor ponsel atau email sebagai pengganti nomor rekening.',
        ],
      },
      {
        judul: 'QRIS',
        poin: [
          'QRIS (Quick Response Code Indonesian Standard) adalah standar QR nasional agar pembayaran lintas penyelenggara bisa memakai satu kode.',
          'Diluncurkan 17 Agustus 2019 dan berlaku wajib secara nasional mulai 1 Januari 2020.',
          'MDR untuk usaha mikro (UMI): 0% untuk transaksi sampai Rp500.000 dan 0,3% untuk di atasnya.',
          'QRIS antarnegara sudah tersambung antara lain dengan Thailand, Malaysia, dan Singapura, dengan mengutamakan mata uang lokal.',
          'QRIS TUNTAS: layanan Tarik tunai, Transfer, dan Setor tunai dengan memindai QRIS.',
        ],
      },
      {
        judul: 'Blueprint Sistem Pembayaran Indonesia (BSPI) 2030',
        isi: [
          'BSPI 2030 melanjutkan BSPI 2025 untuk mempercepat ekonomi digital nasional. Isinya lima inisiatif: Infrastruktur, Industri (konsolidasi), Inovasi, Internasional, dan Rupiah Digital. Implementasinya bertahap dari 2025 sampai 2030.',
        ],
      },
    ],
    ingat: [
      'RTGS = nilai besar, real time, gross. SKNBI = ritel, kliring.',
      'BI-FAST: Desember 2021, 24/7, maks Rp2.500 ke nasabah.',
      'QRIS: diluncurkan 17 Agustus 2019; MDR UMI 0% sampai Rp500 ribu.',
      'BSPI 2030: Infrastruktur, Industri, Inovasi, Internasional, Rupiah Digital.',
    ],
    video: [yt('[Bank Indonesia 101] QRIS: Satu QR, Semua Bisa Bayar', '-DshsgueEU0', 'Bank Indonesia 101'), yt('Bank Indonesia 101: Uang Elektronik', 'aLVZEmvxfk8', 'Bank Indonesia 101'), yt('[Bank Indonesia 101] Alat Pembayaran Menggunakan Kartu (APMK)', '2SI3lKCGVbc', 'Bank Indonesia 101'), cariYt('BI-FAST Bank Indonesia')],
    sumber: [
      { nama: 'Bank Indonesia: Sistem Pembayaran & Pengelolaan Uang Rupiah', url: 'https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx' },
      { nama: 'Bank Indonesia: FAQ BI-FAST', url: 'https://www.bi.go.id/id/publikasi/ruang-media/news-release/Documents/FAQ_SP_2327021.pdf' },
      { nama: 'Bank Indonesia: QRIS', url: 'https://www.bi.go.id/en/fungsi-utama/sistem-pembayaran/ritel/kanal-layanan/QRIS/default.aspx' },
      { nama: 'Bank Indonesia: Blueprint Sistem Pembayaran Indonesia 2030', url: 'https://www.bi.go.id/id/publikasi/kajian/Pages/Blueprint-Sistem-Pembayaran-Indonesia-2030.aspx' },
    ],
  },
  {
    id: 'rupiah',
    kelompok: 'kebanksentralan',
    modul: 'kebanksentralan',
    topik: 'Rupiah',
    judul: 'Pengelolaan Uang Rupiah',
    ringkas: 'Siklus pengelolaan Rupiah menurut UU Mata Uang, ciri keaslian 3D, dan pemberantasan uang palsu.',
    menit: 7,
    bagian: [
      {
        judul: 'Dasar hukum',
        isi: [
          'Pengelolaan Rupiah diatur UU No. 7 Tahun 2011 tentang Mata Uang. BI punya tugas dan wewenang di seluruh siklusnya, dengan komitmen menyediakan Rupiah yang layak edar di seluruh wilayah Indonesia sesuai kebutuhan masyarakat.',
        ],
      },
      {
        judul: 'Tahapan pengelolaan',
        poin: [
          'Perencanaan: menentukan jumlah dan pecahan dengan memperhatikan inflasi, pertumbuhan ekonomi, tingkat pemalsuan, dan kebutuhan masyarakat.',
          'Pencetakan: dilakukan di dalam negeri oleh BUMN yang ditunjuk, yaitu Perum Peruri.',
          'Pengeluaran: BI menetapkan Rupiah baru sebagai alat pembayaran yang sah. Contohnya emisi 2016 (7 pecahan kertas dan 4 pecahan logam) dan uang peringatan 75 tahun kemerdekaan pecahan Rp75.000.',
          'Pengedaran: distribusi ke seluruh wilayah lewat Kantor Perwakilan BI sebagai depo kas, memakai jalur darat, laut, dan udara.',
          'Pencabutan dan penarikan: menyatakan uang tidak berlaku lagi. Pemegangnya tetap bisa menukarkan sesuai nilai nominal.',
          'Pemusnahan: uang tidak layak edar diracik (kertas) atau dilebur (logam) sehingga tidak menyerupai aslinya.',
        ],
      },
      {
        judul: 'Clean money policy',
        isi: ['Kebijakan untuk menjaga uang yang beredar tetap layak edar dengan mengganti uang lusuh atau rusak dengan uang baru.'],
      },
      {
        judul: 'Mengenali keaslian dan melawan pemalsuan',
        poin: [
          'Metode 3D: Dilihat, Diraba, Diterawang.',
          'Unsur pengaman antara lain benang pengaman, tanda air, rectoverso (gambar saling isi depan dan belakang), dan tinta berubah warna.',
          'Uang palsu menurut UU 7/2011: benda yang bahan, ukuran, warna, gambar, dan/atau desainnya menyerupai Rupiah yang dibuat secara melawan hukum.',
          'Botasupal (Badan Koordinasi Pemberantasan Rupiah Palsu) melibatkan BIN, Polri, Kejaksaan Agung, Kementerian Keuangan, dan BI.',
          'Jika menemukan uang yang diragukan: jangan diedarkan lagi, laporkan ke bank atau kepolisian.',
        ],
      },
    ],
    ingat: [
      'UU Mata Uang = UU No. 7 Tahun 2011.',
      'Siklus: perencanaan → pencetakan → pengeluaran → pengedaran → pencabutan & penarikan → pemusnahan.',
      'Pencetak Rupiah: Perum Peruri, di dalam negeri.',
      'Cek keaslian: 3D (dilihat, diraba, diterawang).',
    ],
    video: [yt('[Bank Indonesia 101] Ciri-ciri Keaslian Rupiah (CIKUR)', 'lveB_8RMD78', 'Bank Indonesia 101'), yt('Mengenal Ciri Keaslian Uang: Rectoverso dalam Rupiah', 'JAZirp8Y3l8', 'YouTube'), cariYt('Bank Indonesia Cinta Bangga Paham Rupiah')],
    sumber: [
      { nama: 'Bank Indonesia: Pengelolaan Uang Rupiah', url: 'https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/pengelolaan-rupiah/default.aspx' },
      { nama: 'Bank Indonesia: Pencegahan dan Pemberantasan Rupiah Palsu', url: 'https://www.bi.go.id/id/rupiah/pencegahan-rupiah-palsu/default.aspx' },
      { nama: 'Bank Indonesia: FAQ Ciri-Ciri Keaslian Uang Rupiah', url: 'https://www.bi.go.id/id/edukasi/Documents/FAQCiri2KeaslianUang.pdf' },
    ],
  },
  {
    id: 'jaring-pengaman',
    kelompok: 'kebanksentralan',
    modul: 'kebanksentralan',
    topik: 'Makroprudensial & SSK',
    judul: 'OJK, LPS, dan KSSK',
    ringkas: 'Pembagian peran antarotoritas keuangan dan jaring pengaman sistem keuangan.',
    menit: 7,
    bagian: [
      {
        judul: 'Otoritas Jasa Keuangan (OJK)',
        poin: [
          'Dibentuk dengan UU No. 21 Tahun 2011 (disahkan 22 November 2011) sebagai lembaga negara yang independen dengan fungsi pengaturan, pengawasan, pemeriksaan, dan penyidikan.',
          'Mengambil alih pengawasan pasar modal dan industri keuangan nonbank (IKNB) pada 31 Desember 2012, lalu pengawasan perbankan dari BI pada 31 Desember 2013.',
          'Fungsinya: pengaturan dan pengawasan terintegrasi di seluruh sektor jasa keuangan, turut menjaga stabilitas sistem keuangan, serta perlindungan konsumen dan masyarakat.',
          'Cakupan pengawasannya kini meliputi perbankan; pasar modal, derivatif keuangan, dan bursa karbon; perasuransian, penjaminan, dan dana pensiun; lembaga pembiayaan dan keuangan mikro; serta inovasi teknologi sektor keuangan dan aset kripto.',
        ],
      },
      {
        judul: 'Lembaga Penjamin Simpanan (LPS)',
        poin: [
          'Dasar hukumnya UU No. 24 Tahun 2004, terakhir diubah dengan UU No. 4 Tahun 2023 (P2SK).',
          'Fungsinya menjamin simpanan nasabah bank dan turut aktif menjaga stabilitas sistem perbankan sesuai kewenangannya.',
          'Nilai simpanan yang dijamin paling tinggi Rp2 miliar per nasabah per bank, berlaku sejak 13 Oktober 2008.',
          'Syarat 3T: Tercatat dalam pembukuan bank; Tingkat bunga tidak melebihi tingkat bunga penjaminan LPS; Tidak merugikan bank (misalnya tidak punya kredit macet atau terlibat fraud).',
        ],
      },
      {
        judul: 'Komite Stabilitas Sistem Keuangan (KSSK)',
        poin: [
          'Dibentuk dengan UU No. 9 Tahun 2016 tentang Pencegahan dan Penanganan Krisis Sistem Keuangan (PPKSK).',
          'Anggotanya empat lembaga: Kementerian Keuangan, Bank Indonesia, OJK, dan LPS.',
          'Lingkup UU PPKSK: pencegahan krisis lewat pemantauan dan pemeliharaan SSK, penanganan krisis sistem keuangan, dan penanganan bank sistemik dalam kondisi normal maupun krisis.',
        ],
      },
    ],
    ingat: [
      'OJK: UU 21/2011; pengawasan bank pindah dari BI pada 31 Desember 2013.',
      'LPS: jaminan maksimal Rp2 miliar per nasabah per bank; syarat 3T.',
      'KSSK: Kemenkeu, BI, OJK, LPS (UU 9/2016).',
    ],
    video: [
      { judul: 'Kanal resmi LPS (LPS_IDIC Official)', url: 'https://www.youtube.com/c/LPSIDICOfficial', kanal: 'LPS' },
      { judul: 'Kanal edukasi OJK (Sikapiuangmu)', url: 'https://www.youtube.com/@sikapiuangmu', kanal: 'OJK' },
      cariYt('KSSK Komite Stabilitas Sistem Keuangan penjelasan'),
    ],
    sumber: [
      { nama: 'OJK: UU No. 21 Tahun 2011 tentang OJK', url: 'https://www.ojk.go.id/id/regulasi/otoritas-jasa-keuangan/undang-undang/Pages/undang-undang-nomor-21-tahun-2011-tentang-otoritas-jasa-keuangan.aspx' },
      { nama: 'OJK: Tugas dan Fungsi', url: 'https://ojk.go.id/id/tentang-ojk/pages/tugas-dan-fungsi.aspx' },
      { nama: 'LPS: Simpanan yang Dijamin', url: 'https://lps.go.id/simpanan-yang-dijamin/' },
      { nama: 'LPS: FAQ', url: 'https://lps.go.id/faq/' },
      {
        nama: 'Kemenkeu (BKF): Sosialisasi UU PPKSK',
        url: 'https://fiskal.kemenkeu.go.id/baca/2016/06/21/08174576543668-sosialisasi-undang-undang-pencegahan-dan-penanganan-krisis-sistem-keuangan',
      },
    ],
  },
];

export const MATERI: Bab[] = [...MATERI_BI, ...MATERI_LAIN].sort(
  (a, b) => KELOMPOK.findIndex((k) => k.id === a.kelompok) - KELOMPOK.findIndex((k) => k.id === b.kelompok),
);

export const babById = (id: string | undefined) => MATERI.find((b) => b.id === id);
export const babKelompok = (k: KelompokId) => MATERI.filter((b) => b.kelompok === k);
