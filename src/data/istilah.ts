export interface Istilah {
  /** Kunci flashcard_progres.istilah_id. Jangan diganti setelah dipakai. */
  id: string;
  istilah: string;
  arti: string;
  kategori: 'Moneter' | 'Sistem Pembayaran' | 'Makroprudensial' | 'Kelembagaan' | 'Ekonomi';
}

export const ISTILAH: Istilah[] = [
  { id: 'itf', kategori: 'Moneter', istilah: 'Inflation Targeting Framework (ITF)', arti: 'Kerangka kebijakan moneter BI sejak 2005: inflasi sebagai sasaran akhir yang diumumkan ke publik, dengan suku bunga kebijakan sebagai sinyal.' },
  { id: 'bi-rate', kategori: 'Moneter', istilah: 'Suku bunga kebijakan BI', arti: 'Suku bunga yang ditetapkan RDG sebagai sinyal arah kebijakan moneter dan acuan operasi moneter.' },
  { id: 'rdg', kategori: 'Kelembagaan', istilah: 'Rapat Dewan Gubernur (RDG)', arti: 'Forum pengambilan keputusan tertinggi BI, termasuk penetapan suku bunga kebijakan. Diadakan rutin setiap bulan.' },
  { id: 'transmisi', kategori: 'Moneter', istilah: 'Mekanisme transmisi moneter', arti: 'Jalur pengaruh kebijakan moneter ke inflasi dan output: jalur suku bunga, kredit, nilai tukar, harga aset, dan ekspektasi.' },
  { id: 'om', kategori: 'Moneter', istilah: 'Operasi moneter', arti: 'Kegiatan BI mengelola likuiditas di pasar uang, baik ekspansi (menambah) maupun kontraksi (menyerap), agar suku bunga pasar sejalan dengan kebijakan.' },
  { id: 'srbi', kategori: 'Moneter', istilah: 'SRBI', arti: 'Sekuritas Rupiah Bank Indonesia: surat berharga BI berjangka pendek yang dipakai sebagai instrumen operasi moneter untuk pendalaman pasar uang.' },
  { id: 'gwm', kategori: 'Moneter', istilah: 'Giro Wajib Minimum (GWM)', arti: 'Dana minimum yang wajib dipelihara bank di BI sebesar persentase tertentu dari Dana Pihak Ketiga.' },
  { id: 'inflasi-inti', kategori: 'Moneter', istilah: 'Inflasi inti', arti: 'Komponen inflasi yang persisten dan dipengaruhi faktor fundamental, seperti ekspektasi, nilai tukar, dan kesenjangan output.' },
  { id: 'volatile-food', kategori: 'Moneter', istilah: 'Volatile food', arti: 'Komponen inflasi bahan pangan yang harganya bergejolak karena faktor pasokan, misalnya panen, cuaca, dan distribusi.' },
  { id: 'administered', kategori: 'Moneter', istilah: 'Administered prices', arti: 'Komponen inflasi dari harga yang diatur pemerintah, misalnya BBM bersubsidi, tarif listrik, dan tarif angkutan.' },
  { id: 'ekspektasi', kategori: 'Moneter', istilah: 'Ekspektasi inflasi', arti: 'Perkiraan pelaku ekonomi tentang inflasi ke depan. Ekspektasi yang terjangkar memudahkan bank sentral mencapai sasaran.' },
  { id: 'tpid', kategori: 'Moneter', istilah: 'TPID', arti: 'Tim Pengendalian Inflasi Daerah: forum koordinasi pemerintah daerah, BI, dan instansi terkait untuk menjaga harga di daerah.' },
  { id: 'qris', kategori: 'Sistem Pembayaran', istilah: 'QRIS', arti: 'Quick Response Code Indonesian Standard: standar QR pembayaran nasional sejak 2019. Satu kode QRIS bisa dipindai semua aplikasi pembayaran.' },
  { id: 'bi-fast', kategori: 'Sistem Pembayaran', istilah: 'BI-FAST', arti: 'Infrastruktur pembayaran ritel BI untuk transfer seketika, 24/7, dengan biaya rendah.' },
  { id: 'bi-rtgs', kategori: 'Sistem Pembayaran', istilah: 'BI-RTGS', arti: 'Sistem transfer dana bernilai besar yang diselesaikan seketika per transaksi (real time gross settlement).' },
  { id: 'sknbi', kategori: 'Sistem Pembayaran', istilah: 'SKNBI', arti: 'Sistem Kliring Nasional BI untuk transfer ritel dan warkat yang diselesaikan secara berkala (batch).' },
  { id: 'gpn', kategori: 'Sistem Pembayaran', istilah: 'Gerbang Pembayaran Nasional (GPN)', arti: 'Sistem yang menghubungkan berbagai instrumen dan kanal pembayaran agar transaksi domestik interoperabel dan diproses di dalam negeri.' },
  { id: 'bspi', kategori: 'Sistem Pembayaran', istilah: 'Blueprint Sistem Pembayaran Indonesia (BSPI)', arti: 'Arah kebijakan BI untuk mengembangkan sistem pembayaran di era digital, termasuk integrasi ekonomi-keuangan digital.' },
  { id: 'makropru', kategori: 'Makroprudensial', istilah: 'Kebijakan makroprudensial', arti: 'Kebijakan untuk mencegah dan mengurangi risiko sistemik dengan melihat sistem keuangan secara menyeluruh.' },
  { id: 'risiko-sistemik', kategori: 'Makroprudensial', istilah: 'Risiko sistemik', arti: 'Risiko gangguan yang menyebar dan membuat sebagian besar sistem keuangan tidak berfungsi, sehingga berdampak pada perekonomian.' },
  { id: 'ccyb', kategori: 'Makroprudensial', istilah: 'Countercyclical Capital Buffer (CCyB)', arti: 'Tambahan modal yang dibentuk bank saat kredit tumbuh berlebihan, lalu dapat dilepas saat krisis untuk menyerap kerugian.' },
  { id: 'ltv', kategori: 'Makroprudensial', istilah: 'Loan to Value (LTV)', arti: 'Rasio maksimum kredit terhadap nilai agunan properti. Dipakai untuk mengendalikan risiko kredit properti.' },
  { id: 'rim', kategori: 'Makroprudensial', istilah: 'Rasio Intermediasi Makroprudensial (RIM)', arti: 'Instrumen yang mendorong fungsi intermediasi bank tetap seimbang: tidak terlalu rendah dan tidak berlebihan.' },
  { id: 'plm', kategori: 'Makroprudensial', istilah: 'Penyangga Likuiditas Makroprudensial (PLM)', arti: 'Cadangan likuiditas bank dalam bentuk surat berharga yang dapat dipakai saat terjadi tekanan likuiditas.' },
  { id: 'kssk', kategori: 'Kelembagaan', istilah: 'KSSK', arti: 'Komite Stabilitas Sistem Keuangan: Menteri Keuangan (koordinator), Gubernur BI, Ketua DK OJK, dan Ketua DK LPS.' },
  { id: 'pljp', kategori: 'Makroprudensial', istilah: 'PLJP', arti: 'Pinjaman Likuiditas Jangka Pendek dari BI bagi bank solven yang mengalami kesulitan likuiditas. Ini wujud fungsi lender of the last resort.' },
  { id: 'p2sk', kategori: 'Kelembagaan', istilah: 'UU P2SK', arti: 'UU No. 4 Tahun 2023 tentang Pengembangan dan Penguatan Sektor Keuangan, yang antara lain memperluas tujuan BI.' },
  { id: 'independensi', kategori: 'Kelembagaan', istilah: 'Independensi BI', arti: 'BI bebas dari campur tangan pihak lain dalam melaksanakan tugasnya, dengan akuntabilitas kepada DPR dan publik.' },
  { id: 'dewan-gubernur', kategori: 'Kelembagaan', istilah: 'Dewan Gubernur', arti: 'Pimpinan BI: Gubernur, Deputi Gubernur Senior, dan 4 sampai 7 Deputi Gubernur. Masa jabatan 5 tahun, maksimal dua periode.' },
  { id: 'peruri', kategori: 'Kelembagaan', istilah: 'Perum Peruri', arti: 'BUMN yang ditunjuk untuk mencetak uang Rupiah atas pesanan BI.' },
  { id: '3d', kategori: 'Kelembagaan', istilah: '3D (Dilihat, Diraba, Diterawang)', arti: 'Cara sederhana mengenali ciri keaslian uang Rupiah.' },
  { id: 'neraca-pembayaran', kategori: 'Ekonomi', istilah: 'Neraca Pembayaran Indonesia', arti: 'Catatan transaksi ekonomi Indonesia dengan luar negeri: transaksi berjalan, transaksi modal, dan transaksi finansial.' },
  { id: 'cadev', kategori: 'Ekonomi', istilah: 'Cadangan devisa', arti: 'Aset valuta asing yang dikelola BI untuk menjaga stabilitas nilai tukar dan memenuhi kewajiban luar negeri.' },
  { id: 'output-gap', kategori: 'Ekonomi', istilah: 'Output gap', arti: 'Selisih antara PDB aktual dan PDB potensial. Output gap positif mengindikasikan tekanan inflasi dari sisi permintaan.' },
  { id: 'stagflasi', kategori: 'Ekonomi', istilah: 'Stagflasi', arti: 'Kondisi ketika inflasi tinggi terjadi bersamaan dengan pertumbuhan ekonomi yang lemah dan pengangguran tinggi.' },
  { id: 'eksi', kategori: 'Ekonomi', istilah: 'Ekonomi dan keuangan syariah', arti: 'Salah satu fokus pengembangan BI melalui penguatan rantai nilai halal dan instrumen keuangan syariah.' },
];

export const istilahById = new Map(ISTILAH.map((i) => [i.id, i]));

/** Jarak ulang (hari) untuk tiap kotak Leitner. */
export const JARAK_KOTAK: Record<number, number> = { 1: 1, 2: 3, 3: 7 };
