import type { Soal } from './soal';

// Soal Pengetahuan Umum (TPU), English, dan TPD tambahan. Fakta PU mengikuti bab Materi terkait
// (pu-makro, pu-fiskal, pu-syariah-umkm) yang punya tautan sumber resmi. Soal latihan buatan
// sendiri, bukan soal resmi PCPM. Jangan ganti `id` setelah dipakai.

const BACAAN_DIGITAL = `Digital payments have spread quickly in Indonesia over the past few years. A single national QR code standard allows customers to pay any participating merchant with the app of their choice, whether it comes from a bank or a non-bank provider. For small shops, this means they no longer need a separate sticker for every payment app.

The benefits go beyond convenience. Each digital transaction leaves a record, and over time these records can help small businesses show their sales history to lenders. A shop owner who previously had no formal financial track record may therefore find it easier to obtain credit.

Nevertheless, challenges remain. Some merchants worry about fees, while others lack reliable internet access. Consumers, meanwhile, must stay alert to fraud, such as fake QR codes placed over genuine ones. Policymakers therefore combine infrastructure development with consumer education.`;

const BACAAN_HIJAU = `Climate change is increasingly seen as a risk to financial stability. Floods, droughts and other extreme weather events can damage property and disrupt production, leaving borrowers unable to repay their loans. These are known as physical risks.

A second category, transition risks, arises as economies shift toward low-carbon activities. New regulations, changing technology and shifting consumer preferences may reduce the value of assets tied to fossil fuels. Banks with large exposures to such sectors could face unexpected losses.

In response, many central banks and supervisors have begun to assess climate-related risks in the financial system. Some also encourage green financing, for example by giving incentives for loans to environmentally friendly projects. Critics argue that central banks should not stray too far from their core mandates, while supporters reply that ignoring climate risk would itself threaten stability.`;

export const SOAL_LANJUTAN: Soal[] = [
  // ---------------- Pengetahuan Umum: Ekonomi Makro ----------------
  {
    id: 'pu-e01', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Rumus PDB menurut pendekatan pengeluaran adalah ...',
    opsi: ['C + I + G + (X − M)', 'C + S + T', 'Upah + sewa + bunga + laba', 'Output − input antara', 'C + I − G + X'], kunci: 0,
    bahas: 'Pendekatan pengeluaran menjumlahkan konsumsi (C), investasi (I), belanja pemerintah (G), dan ekspor neto (X − M). Upah + sewa + bunga + laba adalah pendekatan pendapatan.',
  },
  {
    id: 'pu-e02', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Pertumbuhan ekonomi dihitung dari PDB atas dasar harga konstan karena ...',
    opsi: ['Datanya lebih cepat terbit', 'Pengaruh kenaikan harga dikeluarkan sehingga yang terukur adalah perubahan volume', 'Nilainya selalu lebih besar', 'Diwajibkan UU Bank Indonesia', 'Sudah termasuk inflasi'], kunci: 1,
    bahas: 'PDB harga konstan memakai harga tahun dasar (BPS: 2010), jadi perubahannya mencerminkan pertambahan barang dan jasa, bukan kenaikan harga.',
  },
  {
    id: 'pu-e03', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Di Indonesia, inflasi diukur dengan Indeks Harga Konsumen yang dihitung oleh ...',
    opsi: ['Bank Indonesia', 'Kementerian Keuangan', 'Badan Pusat Statistik', 'Otoritas Jasa Keuangan', 'Kementerian Perdagangan'], kunci: 2,
    bahas: 'IHK dihitung dan dirilis BPS. BI memakai data itu untuk menilai pencapaian sasaran inflasi.',
  },
  {
    id: 'pu-e04', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Kenaikan tarif listrik dan harga BBM bersubsidi termasuk kelompok inflasi ...',
    opsi: ['Inti', 'Volatile food', 'Administered prices', 'Demand-pull', 'Imported core'], kunci: 2,
    bahas: 'Harga yang ditetapkan pemerintah, seperti BBM bersubsidi, tarif listrik, dan tarif angkutan, masuk kelompok administered prices.',
  },
  {
    id: 'pu-e05', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Harga cabai melonjak karena gagal panen akibat cuaca ekstrem. Tekanan ini masuk kelompok inflasi ...',
    opsi: ['Inti', 'Volatile food', 'Administered prices', 'Ekspektasi', 'Nilai tukar'], kunci: 1,
    bahas: 'Volatile food dipengaruhi kejutan di bahan makanan seperti panen, bencana, dan harga pangan dunia.',
  },
  {
    id: 'pu-e06', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Komponen inflasi yang paling mencerminkan faktor fundamental seperti ekspektasi dan interaksi permintaan-penawaran adalah ...',
    opsi: ['Volatile food', 'Administered prices', 'Inflasi inti', 'Deflasi musiman', 'Inflasi impor pangan'], kunci: 2,
    bahas: 'Inflasi inti dipengaruhi faktor fundamental: interaksi permintaan-penawaran, nilai tukar, harga komoditas internasional, dan ekspektasi inflasi.',
  },
  {
    id: 'pu-e07', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Permintaan agregat tumbuh jauh melampaui kapasitas produksi sehingga harga naik. Jenis inflasi ini disebut ...',
    opsi: ['Cost-push inflation', 'Demand-pull inflation', 'Imported inflation', 'Stagflasi', 'Deflasi'], kunci: 1,
    bahas: 'Demand-pull terjadi saat permintaan agregat melebihi kapasitas ekonomi. Cost-push berasal dari sisi penawaran atau biaya.',
  },
  {
    id: 'pu-e08', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Rupiah terdepresiasi sehingga bahan baku impor lebih mahal dan produsen menaikkan harga jual. Ini contoh ...',
    opsi: ['Demand-pull inflation', 'Cost-push inflation', 'Deflasi', 'Disinflasi', 'Hiperinflasi'], kunci: 1,
    bahas: 'Depresiasi rupiah dan inflasi impor adalah tekanan dari sisi penawaran (biaya), jadi termasuk cost-push.',
  },
  {
    id: 'pu-e09', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Kondisi ketika inflasi tinggi terjadi bersamaan dengan pertumbuhan ekonomi yang mandek dan pengangguran tinggi disebut ...',
    opsi: ['Resesi', 'Stagflasi', 'Deflasi', 'Ekspansi', 'Disinflasi'], kunci: 1,
    bahas: 'Stagflasi = stagnasi + inflasi. Kondisi ini sulit karena kebijakan untuk menekan inflasi bisa memperlambat ekonomi lebih jauh.',
  },
  {
    id: 'pu-e10', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Inflasi turun dari 5% menjadi 3%, tetapi harga masih naik. Kondisi ini disebut ...',
    opsi: ['Deflasi', 'Disinflasi', 'Stagflasi', 'Reflasi', 'Hiperinflasi'], kunci: 1,
    bahas: 'Disinflasi adalah melambatnya laju inflasi. Deflasi berarti harga umum benar-benar turun (inflasi negatif).',
  },
  {
    id: 'pu-e11', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Kiriman uang pekerja migran Indonesia (remitansi) dicatat dalam Neraca Pembayaran pada ...',
    opsi: ['Neraca barang', 'Pendapatan primer', 'Pendapatan sekunder', 'Transaksi modal', 'Investasi portofolio'], kunci: 2,
    bahas: 'Remitansi pekerja migran masuk pendapatan sekunder di transaksi berjalan. Pendapatan primer berisi bunga dan keuntungan investasi.',
  },
  {
    id: 'pu-e12', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Pembelian surat utang pemerintah Indonesia oleh investor asing dicatat dalam NPI sebagai ...',
    opsi: ['Investasi langsung', 'Investasi portofolio', 'Transaksi modal', 'Neraca jasa', 'Pendapatan sekunder'], kunci: 1,
    bahas: 'Transaksi saham dan surat utang masuk investasi portofolio di transaksi finansial. Investasi langsung bersifat jangka panjang dengan kepemilikan pengendali.',
  },
  {
    id: 'pu-e13', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Tiga komponen utama Neraca Pembayaran Indonesia adalah ...',
    opsi: ['Transaksi berjalan, transaksi modal, transaksi finansial', 'Ekspor, impor, cadangan devisa', 'APBN, APBD, utang luar negeri', 'Neraca barang, jasa, pajak', 'Moneter, fiskal, sektor riil'], kunci: 0,
    bahas: 'NPI terdiri atas transaksi berjalan, transaksi modal, dan transaksi finansial. Hasil akhirnya tercermin pada perubahan cadangan devisa.',
  },
  {
    id: 'pu-e14', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Kecukupan cadangan devisa sering dinyatakan dalam ...',
    opsi: ['Persen terhadap APBN', 'Bulan impor dan pembayaran utang luar negeri pemerintah', 'Jumlah uang kartal', 'Rasio kredit terhadap DPK', 'Persen terhadap IHK'], kunci: 1,
    bahas: 'BI biasa menyatakan cadangan devisa setara berapa bulan impor dan pembayaran utang luar negeri pemerintah, dibandingkan standar kecukupan internasional sekitar 3 bulan impor.',
  },
  {
    id: 'pu-e15', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Jika rupiah terdepresiasi terhadap dolar AS, dampak langsung yang paling mungkin adalah ...',
    opsi: ['Harga barang impor menjadi lebih murah', 'Produk ekspor Indonesia menjadi relatif lebih murah bagi pembeli luar negeri', 'Utang luar negeri dalam dolar menjadi lebih ringan', 'Inflasi pasti turun', 'Cadangan devisa otomatis naik'], kunci: 1,
    bahas: 'Depresiasi membuat harga produk Indonesia lebih murah dalam mata uang asing, tetapi impor dan beban utang valas dalam rupiah menjadi lebih mahal.',
  },
  {
    id: 'pu-e16', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Kurva Phillips menggambarkan hubungan jangka pendek antara ...',
    opsi: ['Suku bunga dan investasi', 'Inflasi dan pengangguran', 'Pajak dan penerimaan negara', 'Ekspor dan nilai tukar', 'Tabungan dan konsumsi'], kunci: 1,
    bahas: 'Kurva Phillips menunjukkan hubungan terbalik jangka pendek: pengangguran rendah cenderung disertai inflasi lebih tinggi, dan sebaliknya.',
  },
  {
    id: 'pu-e17', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Jika marginal propensity to consume (MPC) = 0,8, angka pengganda (multiplier) belanja adalah ...',
    opsi: ['0,2', '1,25', '4', '5', '8'], kunci: 3,
    bahas: 'Multiplier = 1 / (1 − MPC) = 1 / 0,2 = 5. Tambahan belanja Rp1 berpotensi menaikkan pendapatan hingga Rp5.',
  },
  {
    id: 'pu-e18', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Seorang lulusan baru sedang mencari pekerjaan yang sesuai keahliannya dan belum mendapatkannya. Jenis pengangguran ini adalah ...',
    opsi: ['Struktural', 'Friksional', 'Musiman', 'Siklikal', 'Terselubung'], kunci: 1,
    bahas: 'Pengangguran friksional muncul karena proses mencari dan berpindah kerja. Struktural terjadi karena ketidakcocokan keahlian dengan kebutuhan industri.',
  },
  {
    id: 'pu-e19', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Tingkat Pengangguran Terbuka (TPT) dihitung sebagai ...',
    opsi: ['Pengangguran dibagi jumlah penduduk', 'Pengangguran dibagi angkatan kerja', 'Pengangguran dibagi penduduk usia kerja', 'Pekerja dibagi angkatan kerja', 'Pengangguran dibagi bukan angkatan kerja'], kunci: 1,
    bahas: 'BPS menghitung TPT sebagai persentase pengangguran terhadap angkatan kerja (penduduk usia kerja yang bekerja atau mencari kerja).',
  },
  {
    id: 'pu-e20', modul: 'kebanksentralan', topik: 'Ekonomi Makro',
    teks: 'Di antara komponen PDB Indonesia menurut pengeluaran, porsi terbesar biasanya berasal dari ...',
    opsi: ['Konsumsi pemerintah', 'Konsumsi rumah tangga', 'Ekspor neto', 'Perubahan inventori', 'Konsumsi LNPRT'], kunci: 1,
    bahas: 'Konsumsi rumah tangga menyumbang lebih dari separuh PDB Indonesia, sehingga daya beli masyarakat sangat menentukan pertumbuhan.',
  },

  // ---------------- Pengetahuan Umum: Fiskal ----------------
  {
    id: 'pu-f01', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Otoritas yang menjalankan kebijakan fiskal di Indonesia adalah ...',
    opsi: ['Bank Indonesia', 'Pemerintah melalui APBN', 'OJK', 'LPS', 'DPR saja'], kunci: 1,
    bahas: 'Kebijakan fiskal dijalankan Pemerintah lewat penerimaan dan belanja dalam APBN. BI menjalankan kebijakan moneter.',
  },
  {
    id: 'pu-f02', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Berdasarkan PP No. 23 Tahun 2003, jumlah kumulatif defisit APBN dan APBD tidak boleh melebihi ...',
    opsi: ['1% PDB', '2% PDB', '3% PDB', '5% PDB', '60% PDB'], kunci: 2,
    bahas: 'Batas defisit kumulatif 3% PDB tahun bersangkutan. Angka 60% PDB adalah batas kumulatif pinjaman.',
  },
  {
    id: 'pu-f03', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Batas jumlah kumulatif pinjaman pemerintah pusat dan daerah menurut PP No. 23 Tahun 2003 adalah ...',
    opsi: ['3% PDB', '30% PDB', '50% PDB', '60% PDB', '100% PDB'], kunci: 3,
    bahas: 'PP 23/2003 membatasi pinjaman kumulatif pemerintah pusat dan daerah maksimal 60% PDB.',
  },
  {
    id: 'pu-f04', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Undang-undang yang menjadi dasar pengelolaan keuangan negara, termasuk APBN, adalah ...',
    opsi: ['UU No. 23 Tahun 1999', 'UU No. 17 Tahun 2003', 'UU No. 21 Tahun 2011', 'UU No. 24 Tahun 2004', 'UU No. 7 Tahun 2011'], kunci: 1,
    bahas: 'UU No. 17 Tahun 2003 tentang Keuangan Negara. UU 7/2011 adalah tentang Mata Uang.',
  },
  {
    id: 'pu-f05', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Untuk mendorong ekonomi saat perlambatan, pemerintah menaikkan belanja infrastruktur dan memberi insentif pajak. Kebijakan ini disebut ...',
    opsi: ['Fiskal kontraktif', 'Fiskal ekspansif', 'Moneter ketat', 'Moneter longgar', 'Makroprudensial ketat'], kunci: 1,
    bahas: 'Menaikkan belanja atau menurunkan pajak adalah kebijakan fiskal ekspansif. Kontraktif adalah kebalikannya.',
  },
  {
    id: 'pu-f06', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Tiga kelompok pendapatan negara dalam APBN adalah ...',
    opsi: ['Pajak, PNBP, dan hibah', 'Pajak, utang, dan hibah', 'Pajak, SBN, dan PNBP', 'Bea cukai, pajak, dan SBN', 'Hibah, utang, dan dividen BI'], kunci: 0,
    bahas: 'Pendapatan negara terdiri atas penerimaan perpajakan, penerimaan negara bukan pajak (PNBP), dan hibah. Utang dan SBN masuk pembiayaan, bukan pendapatan.',
  },
  {
    id: 'pu-f07', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Penerbitan Surat Berharga Negara untuk menutup defisit APBN dicatat pada pos ...',
    opsi: ['Pendapatan negara', 'Belanja negara', 'Pembiayaan', 'Transfer ke daerah', 'Hibah'], kunci: 2,
    bahas: 'Defisit ditutup lewat pembiayaan, misalnya penerbitan SBN atau pinjaman.',
  },
  {
    id: 'pu-f08', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Surat Berharga Negara (SBN) terdiri atas ...',
    opsi: ['SUN dan SBSN', 'SBI dan SUN', 'SRBI dan SBSN', 'Obligasi korporasi dan saham', 'SBI dan sukuk BI'], kunci: 0,
    bahas: 'SBN terdiri atas Surat Utang Negara (SUN) dan Surat Berharga Syariah Negara (SBSN/sukuk negara). SBI dan SRBI adalah instrumen Bank Indonesia.',
  },
  {
    id: 'pu-f09', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Pajak Pertambahan Nilai (PPN) termasuk jenis pajak ...',
    opsi: ['Langsung', 'Tidak langsung', 'Daerah', 'Progresif', 'Retribusi'], kunci: 1,
    bahas: 'PPN dibebankan kepada konsumen lewat harga barang, bukan langsung kepada wajib pajak yang menanggungnya, sehingga termasuk pajak tidak langsung.',
  },
  {
    id: 'pu-f10', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Tarif pajak yang persentasenya makin tinggi saat penghasilan kena pajak makin besar disebut tarif ...',
    opsi: ['Proporsional', 'Regresif', 'Progresif', 'Tetap', 'Degresif'], kunci: 2,
    bahas: 'Tarif progresif naik seiring besarnya dasar pengenaan pajak, seperti pada PPh orang pribadi.',
  },
  {
    id: 'pu-f11', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Keseimbangan primer dalam APBN adalah ...',
    opsi: ['Pendapatan dikurangi seluruh belanja', 'Pendapatan dikurangi belanja di luar pembayaran bunga utang', 'Ekspor dikurangi impor', 'Pembiayaan dikurangi defisit', 'Pajak dikurangi subsidi'], kunci: 1,
    bahas: 'Keseimbangan primer mengeluarkan pembayaran bunga utang dari belanja. Nilainya menunjukkan kemampuan membayar bunga tanpa menambah utang baru.',
  },
  {
    id: 'pu-f12', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Kenaikan belanja pemerintah yang dibiayai utang mendorong suku bunga naik dan mengurangi investasi swasta. Fenomena ini disebut ...',
    opsi: ['Crowding in', 'Crowding out', 'Multiplier effect', 'Automatic stabilizer', 'Fiscal drag'], kunci: 1,
    bahas: 'Crowding out: pinjaman pemerintah bersaing dengan swasta untuk dana, sehingga investasi swasta tersisih.',
  },
  {
    id: 'pu-f13', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Saat ekonomi melambat, penerimaan pajak turun dan bantuan sosial naik tanpa keputusan baru. Mekanisme ini disebut ...',
    opsi: ['Automatic stabilizer', 'Kebijakan diskresioner', 'Quantitative easing', 'Crowding out', 'Burden sharing'], kunci: 0,
    bahas: 'Automatic stabilizer bekerja otomatis meredam siklus ekonomi tanpa perlu kebijakan baru.',
  },
  {
    id: 'pu-f14', modul: 'kebanksentralan', topik: 'Fiskal',
    teks: 'Forum koordinasi untuk pencegahan dan penanganan krisis sistem keuangan di Indonesia beranggotakan ...',
    opsi: ['Menkeu, Gubernur BI, Ketua DK OJK, Ketua DK LPS', 'Presiden, DPR, BI, OJK', 'Menkeu, BPS, BI, Bappenas', 'BI, OJK, BEI, KPK', 'Menko Perekonomian, BI, BPK, LPS'], kunci: 0,
    bahas: 'Komite Stabilitas Sistem Keuangan (KSSK) beranggotakan Menteri Keuangan (koordinator), Gubernur BI, Ketua Dewan Komisioner OJK, dan Ketua Dewan Komisioner LPS.',
  },

  // ---------------- Pengetahuan Umum: Syariah & UMKM ----------------
  {
    id: 'pu-s01', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Akad jual beli barang dengan harga pokok ditambah margin keuntungan yang disepakati disebut ...',
    opsi: ['Mudharabah', 'Musyarakah', 'Murabahah', 'Ijarah', 'Wadiah'], kunci: 2,
    bahas: 'Murabahah adalah jual beli dengan margin yang disepakati, banyak dipakai untuk pembiayaan konsumtif dan modal kerja di bank syariah.',
  },
  {
    id: 'pu-s02', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Kerja sama usaha ketika seluruh modal berasal dari pemilik dana dan pengelola menyumbang keahlian, dengan keuntungan dibagi sesuai nisbah, disebut ...',
    opsi: ['Musyarakah', 'Mudharabah', 'Murabahah', 'Ijarah', 'Qardh'], kunci: 1,
    bahas: 'Mudharabah: shahibul maal menyediakan modal, mudharib mengelola. Pada musyarakah, kedua pihak sama-sama menyetor modal.',
  },
  {
    id: 'pu-s03', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Akad sewa-menyewa manfaat suatu barang dalam keuangan syariah disebut ...',
    opsi: ['Ijarah', 'Wadiah', 'Salam', 'Istishna', 'Hawalah'], kunci: 0,
    bahas: 'Ijarah adalah akad pemindahan hak guna atas barang atau jasa dengan pembayaran sewa.',
  },
  {
    id: 'pu-s04', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Akad titipan, misalnya pada produk giro atau tabungan syariah, disebut ...',
    opsi: ['Ijarah', 'Wadiah', 'Musyarakah', 'Murabahah', 'Kafalah'], kunci: 1,
    bahas: 'Wadiah adalah akad titipan. Bank dapat memberi bonus secara sukarela, bukan bunga yang diperjanjikan.',
  },
  {
    id: 'pu-s05', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Tiga unsur yang dilarang dalam transaksi keuangan syariah adalah ...',
    opsi: ['Riba, gharar, maysir', 'Zakat, infak, sedekah', 'Margin, nisbah, ujrah', 'Mudharabah, musyarakah, ijarah', 'Sukuk, wakaf, qardh'], kunci: 0,
    bahas: 'Riba (tambahan yang tidak sah), gharar (ketidakjelasan berlebihan), dan maysir (spekulasi/judi) dilarang dalam transaksi syariah.',
  },
  {
    id: 'pu-s06', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Festival tahunan ekonomi syariah yang diselenggarakan Bank Indonesia sejak 2014 adalah ...',
    opsi: ['FEKDI', 'ISEF', 'KKI', 'BIRAMA', 'IIMS'], kunci: 1,
    bahas: 'Indonesia Sharia Economic Festival (ISEF) digelar BI setiap tahun sejak 2014, berisi forum ekonomi syariah dan Sharia Fair.',
  },
  {
    id: 'pu-s07', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Instrumen makroprudensial BI yang mendorong bank menyalurkan pembiayaan ke UMKM dan perorangan berpenghasilan rendah adalah ...',
    opsi: ['PLM', 'CCyB', 'RPIM', 'PDN', 'LTV'], kunci: 2,
    bahas: 'RPIM (Rasio Pembiayaan Inklusif Makroprudensial) mendorong pembiayaan inklusif, termasuk ke UMKM.',
  },
  {
    id: 'pu-s08', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Urutan peta jalan pengembangan UMKM Bank Indonesia yang tepat adalah ...',
    opsi: [
      'UMKM ekspor → UMKM digital → UMKM potensial',
      'UMKM potensial → siap akses keuangan → UMKM digital → UMKM ekspor',
      'UMKM digital → UMKM potensial → UMKM ekspor',
      'Siap akses keuangan → UMKM ekspor → UMKM potensial',
      'UMKM potensial → UMKM ekspor → UMKM digital',
    ], kunci: 1,
    bahas: 'Peta jalan BI bergerak dari UMKM potensial, siap pasar atau siap akses keuangan, UMKM digital, hingga UMKM ekspor.',
  },
  {
    id: 'pu-s09', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Surat berharga negara yang diterbitkan berdasarkan prinsip syariah disebut ...',
    opsi: ['SUN', 'SBSN (sukuk negara)', 'SRBI', 'SBI', 'Obligasi ritel'], kunci: 1,
    bahas: 'Surat Berharga Syariah Negara (SBSN) atau sukuk negara diterbitkan dengan akad syariah dan didasari aset (underlying asset).',
  },
  {
    id: 'pu-s10', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Standar QR code nasional yang membantu UMKM menerima pembayaran dari berbagai aplikasi dengan satu kode adalah ...',
    opsi: ['BI-FAST', 'QRIS', 'GPN', 'SKNBI', 'SNAP'], kunci: 1,
    bahas: 'QRIS (QR Code Indonesian Standard) menyatukan QR berbagai penyelenggara, sehingga pedagang cukup memasang satu kode.',
  },
  {
    id: 'pu-s11', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Akad pinjaman kebajikan tanpa imbalan yang wajib dikembalikan sebesar pokoknya disebut ...',
    opsi: ['Qardh', 'Ijarah', 'Murabahah', 'Istishna', 'Salam'], kunci: 0,
    bahas: 'Qardh adalah pinjaman kebajikan. Peminjam hanya mengembalikan pokok pinjaman.',
  },
  {
    id: 'pu-s12', modul: 'kebanksentralan', topik: 'Syariah & UMKM',
    teks: 'Instrumen likuiditas makroprudensial versi syariah yang wajib dipelihara bank syariah adalah ...',
    opsi: ['PLM Syariah', 'BI-Rate Syariah', 'SUN Syariah', 'CCyB Syariah', 'LTV Syariah'], kunci: 0,
    bahas: 'Penyangga Likuiditas Makroprudensial (PLM) punya versi syariah untuk bank umum syariah dan unit usaha syariah.',
  },

  // ---------------- Kebanksentralan tambahan ----------------
  {
    id: 'bi-x01', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Jika BI ingin meredam tekanan inflasi dari permintaan yang terlalu kuat, langkah yang paling sesuai adalah ...',
    opsi: ['Menurunkan BI-Rate', 'Menaikkan BI-Rate', 'Menambah uang beredar', 'Melonggarkan LTV', 'Menurunkan PLM'], kunci: 1,
    bahas: 'Menaikkan BI-Rate membuat kredit lebih mahal, belanja melambat, dan tekanan inflasi mereda (jalur suku bunga).',
  },
  {
    id: 'bi-x02', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Jalur transmisi yang bekerja ketika pengumuman BI membuat masyarakat yakin inflasi akan turun sehingga kenaikan upah dan harga tertahan adalah jalur ...',
    opsi: ['Suku bunga', 'Nilai tukar', 'Harga aset', 'Ekspektasi', 'Kredit'], kunci: 3,
    bahas: 'Jalur ekspektasi: bila ekspektasi inflasi turun, pelaku usaha dan pekerja menahan kenaikan harga dan upah.',
  },
  {
    id: 'bi-x03', modul: 'kebanksentralan', topik: 'Moneter',
    teks: 'Strategi pengendalian inflasi TPIP dan TPID yang dikenal dengan 4K terdiri atas ...',
    opsi: [
      'Keterjangkauan harga, Ketersediaan pasokan, Kelancaran distribusi, Komunikasi efektif',
      'Kredibilitas, Konsistensi, Koordinasi, Komunikasi',
      'Kualitas, Kuantitas, Kontinuitas, Kolaborasi',
      'Kebijakan, Kelembagaan, Keuangan, Komunikasi',
      'Ketahanan, Kemandirian, Kedaulatan, Keberlanjutan',
    ], kunci: 0,
    bahas: 'Strategi 4K: Keterjangkauan harga, Ketersediaan pasokan, Kelancaran distribusi, dan Komunikasi yang efektif.',
  },
  {
    id: 'bi-x04', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Sifat kebijakan makroprudensial yang diperketat saat kredit tumbuh berlebihan dan dilonggarkan saat ekonomi lesu disebut ...',
    opsi: ['Prosiklis', 'Kontrasiklis', 'Asimetris', 'Diskresioner fiskal', 'Mikroprudensial'], kunci: 1,
    bahas: 'Makroprudensial bersifat kontrasiklis, melawan arah siklus keuangan untuk meredam risiko sistemik.',
  },
  {
    id: 'bi-x05', modul: 'kebanksentralan', topik: 'Makroprudensial & SSK',
    teks: 'Otoritas yang mengawasi kesehatan masing-masing bank (mikroprudensial) sejak 31 Desember 2013 adalah ...',
    opsi: ['Bank Indonesia', 'OJK', 'LPS', 'Kementerian Keuangan', 'BPK'], kunci: 1,
    bahas: 'Pengawasan bank beralih dari BI ke OJK sesuai UU 21/2011. BI fokus pada makroprudensial.',
  },
  {
    id: 'bi-x06', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Transfer antarbank Rp500 juta yang harus langsung efektif pada hari yang sama paling tepat diproses melalui ...',
    opsi: ['BI-FAST', 'BI-RTGS', 'SKNBI', 'QRIS', 'BI-SSSS'], kunci: 1,
    bahas: 'BI-RTGS untuk transaksi bernilai besar yang diselesaikan real time dan satu per satu. BI-FAST pada tahap awal dibatasi Rp250 juta per transaksi.',
  },
  {
    id: 'bi-x07', modul: 'kebanksentralan', topik: 'Sistem Pembayaran',
    teks: 'Fitur BI-FAST yang memungkinkan transfer cukup dengan nomor ponsel atau email disebut ...',
    opsi: ['Proxy address', 'Virtual account', 'Direct debit', 'Tokenisasi', 'Open API'], kunci: 0,
    bahas: 'Proxy address memungkinkan nomor ponsel atau email dipakai sebagai pengganti nomor rekening.',
  },
  {
    id: 'bi-x08', modul: 'kebanksentralan', topik: 'Kelembagaan',
    teks: 'Sejak berlakunya UU P2SK, tujuan Bank Indonesia TIDAK mencakup ...',
    opsi: ['Stabilitas nilai rupiah', 'Stabilitas sistem pembayaran', 'Turut menjaga stabilitas sistem keuangan', 'Mendukung pertumbuhan ekonomi berkelanjutan', 'Mengawasi kesehatan masing-masing bank'], kunci: 4,
    bahas: 'Pengawasan bank secara individu (mikroprudensial) adalah tugas OJK. Empat pilihan lain tercantum dalam rumusan tujuan BI pasca UU 4/2023.',
  },

  // ---------------- English: Grammar ----------------
  {
    id: 'en-g11', modul: 'english', topik: 'Grammar',
    teks: 'Neither the manager nor the analysts ___ aware of the new regulation.',
    opsi: ['was', 'were', 'is', 'has been', 'being'], kunci: 1,
    bahas: 'With neither...nor, the verb agrees with the nearer subject ("the analysts", plural), so "were".',
  },
  {
    id: 'en-g12', modul: 'english', topik: 'Grammar',
    teks: 'The number of digital transactions ___ significantly over the last five years.',
    opsi: ['have increased', 'has increased', 'are increasing', 'increase', 'were increased'], kunci: 1,
    bahas: '"The number of" is singular, and "over the last five years" calls for the present perfect: "has increased".',
  },
  {
    id: 'en-g13', modul: 'english', topik: 'Grammar',
    teks: 'If the central bank had acted earlier, inflation ___ so high.',
    opsi: ['would not be', 'will not be', 'would not have been', 'had not been', 'was not'], kunci: 2,
    bahas: 'Third conditional (unreal past): If + past perfect, would have + past participle.',
  },
  {
    id: 'en-g14', modul: 'english', topik: 'Grammar',
    teks: 'The committee avoided ___ a decision until all the data were available.',
    opsi: ['to make', 'make', 'making', 'made', 'to making'], kunci: 2,
    bahas: '"Avoid" is followed by a gerund (-ing): "avoided making".',
  },
  {
    id: 'en-g15', modul: 'english', topik: 'Grammar',
    teks: 'The new payment system ___ by millions of users since its launch.',
    opsi: ['has used', 'has been used', 'is using', 'used', 'was using'], kunci: 1,
    bahas: 'Passive present perfect: has been + past participle. The system is the receiver of the action.',
  },
  {
    id: 'en-g16', modul: 'english', topik: 'Grammar',
    teks: 'By the time the report is published, the team ___ the data for three months.',
    opsi: ['analyzes', 'will have analyzed', 'has analyzed', 'analyzed', 'would analyze'], kunci: 1,
    bahas: 'Future perfect (will have + V3) for an action completed before a future point.',
  },
  {
    id: 'en-g17', modul: 'english', topik: 'Grammar',
    teks: 'Choose the sentence with correct parallel structure.',
    opsi: [
      'The job requires analyzing data, to write reports, and presentation.',
      'The job requires analyzing data, writing reports, and giving presentations.',
      'The job requires to analyze data, writing reports, and presentations.',
      'The job requires analysis data, write reports, and presenting.',
      'The job requires analyze data, wrote reports, and presented.',
    ], kunci: 1,
    bahas: 'All items in the list use the same form (-ing): analyzing, writing, giving.',
  },
  {
    id: 'en-g18', modul: 'english', topik: 'Grammar',
    teks: 'Identify the error: "Each of the (A) participants (B) have (C) submitted their (D) proposals on time (E)."',
    opsi: ['A', 'B', 'C', 'D', 'E'], kunci: 2,
    bahas: '"Each of the..." takes a singular verb, so "have" should be "has".',
  },
  {
    id: 'en-g19', modul: 'english', topik: 'Grammar',
    teks: 'I wish I ___ more time to prepare for the interview.',
    opsi: ['have', 'had', 'will have', 'am having', 'has'], kunci: 1,
    bahas: 'A wish about the present uses the past simple: "I wish I had".',
  },
  {
    id: 'en-g20', modul: 'english', topik: 'Grammar',
    teks: 'This year\'s growth rate is ___ than last year\'s.',
    opsi: ['more high', 'highest', 'higher', 'more higher', 'the higher'], kunci: 2,
    bahas: 'One-syllable adjectives take -er in the comparative: "higher than". "More higher" is a double comparative.',
  },
  {
    id: 'en-g21', modul: 'english', topik: 'Grammar',
    teks: 'The documents ___ on the table belong to the governor.',
    opsi: ['lie', 'lying', 'lain', 'lay', 'are lie'], kunci: 1,
    bahas: 'A reduced relative clause: "The documents (that are) lying on the table" uses the present participle.',
  },
  {
    id: 'en-g22', modul: 'english', topik: 'Grammar',
    teks: 'Not only ___ the target, but it also exceeded market expectations.',
    opsi: ['the bank met', 'did the bank meet', 'the bank did meet', 'met the bank', 'does the bank met'], kunci: 1,
    bahas: 'When a sentence starts with "Not only", use inversion: "Not only did the bank meet...".',
  },
  {
    id: 'en-g23', modul: 'english', topik: 'Grammar',
    teks: 'She suggested that the meeting ___ postponed until Monday.',
    opsi: ['is', 'be', 'was', 'will be', 'being'], kunci: 1,
    bahas: 'After "suggest that", formal English uses the subjunctive (base form): "be postponed".',
  },

  // ---------------- English: Vocabulary ----------------
  {
    id: 'en-v11', modul: 'english', topik: 'Vocabulary',
    teks: 'The word "mitigate" is closest in meaning to ...',
    opsi: ['worsen', 'reduce', 'ignore', 'predict', 'measure'], kunci: 1,
    bahas: 'To mitigate is to make something less severe, i.e. reduce (e.g. mitigate risk).',
  },
  {
    id: 'en-v12', modul: 'english', topik: 'Vocabulary',
    teks: 'The opposite of "scarce" is ...',
    opsi: ['rare', 'limited', 'abundant', 'expensive', 'short'], kunci: 2,
    bahas: 'Scarce means in short supply; abundant means plentiful.',
  },
  {
    id: 'en-v13', modul: 'english', topik: 'Vocabulary',
    teks: '"The policy had an adverse effect on small businesses." The word "adverse" means ...',
    opsi: ['positive', 'harmful', 'neutral', 'immediate', 'unexpected'], kunci: 1,
    bahas: 'Adverse means harmful or unfavourable.',
  },
  {
    id: 'en-v14', modul: 'english', topik: 'Vocabulary',
    teks: 'A synonym for "robust" in "robust economic growth" is ...',
    opsi: ['weak', 'strong', 'slow', 'uncertain', 'temporary'], kunci: 1,
    bahas: 'Robust growth is strong and resilient growth.',
  },
  {
    id: 'en-v15', modul: 'english', topik: 'Vocabulary',
    teks: 'The word "curb" in "measures to curb inflation" means ...',
    opsi: ['encourage', 'restrain', 'measure', 'forecast', 'publish'], kunci: 1,
    bahas: 'To curb is to restrain or limit something.',
  },
  {
    id: 'en-v16', modul: 'english', topik: 'Vocabulary',
    teks: '"Prudent" is closest in meaning to ...',
    opsi: ['careless', 'careful', 'generous', 'quick', 'bold'], kunci: 1,
    bahas: 'Prudent means acting with care and good judgment, as in "prudent risk management".',
  },
  {
    id: 'en-v17', modul: 'english', topik: 'Vocabulary',
    teks: 'Choose the correct word: "The bank will ___ a new policy next month."',
    opsi: ['implement', 'implication', 'implementing', 'implemental', 'implicit'], kunci: 0,
    bahas: 'After "will" we need a base verb: "implement".',
  },
  {
    id: 'en-v18', modul: 'english', topik: 'Vocabulary',
    teks: 'The antonym of "surplus" is ...',
    opsi: ['excess', 'profit', 'deficit', 'balance', 'reserve'], kunci: 2,
    bahas: 'A surplus is an excess; a deficit is a shortfall.',
  },
  {
    id: 'en-v19', modul: 'english', topik: 'Vocabulary',
    teks: '"The data are consistent with our forecast." The phrase "consistent with" means ...',
    opsi: ['in line with', 'opposed to', 'separate from', 'better than', 'worse than'], kunci: 0,
    bahas: 'Consistent with = in agreement with, in line with.',
  },
  {
    id: 'en-v20', modul: 'english', topik: 'Vocabulary',
    teks: 'Which word best completes the sentence? "Exports rose sharply, ___ imports fell."',
    opsi: ['whereas', 'because', 'therefore', 'unless', 'so that'], kunci: 0,
    bahas: '"Whereas" shows contrast between two facts.',
  },

  // ---------------- English: Reading (digital payments) ----------------
  {
    id: 'en-r11', modul: 'english', topik: 'Reading', bacaan: BACAAN_DIGITAL,
    teks: 'What is the main idea of the passage?',
    opsi: ['Digital payments are too risky for small shops', 'A national QR standard brings benefits and challenges for merchants and consumers', 'Banks should stop issuing payment apps', 'Internet access is available everywhere', 'Fraud has made QR payments illegal'], kunci: 1,
    bahas: 'The passage describes the standard, its benefits (convenience, credit records) and its challenges (fees, internet, fraud).',
  },
  {
    id: 'en-r12', modul: 'english', topik: 'Reading', bacaan: BACAAN_DIGITAL,
    teks: 'According to the passage, how can digital payments help small businesses obtain credit?',
    opsi: ['By lowering interest rates', 'By creating a record of sales that lenders can review', 'By removing the need for loans', 'By giving free stickers', 'By replacing banks'], kunci: 1,
    bahas: 'Paragraph 2: transaction records "can help small businesses show their sales history to lenders".',
  },
  {
    id: 'en-r13', modul: 'english', topik: 'Reading', bacaan: BACAAN_DIGITAL,
    teks: 'The word "genuine" in the last paragraph is closest in meaning to ...',
    opsi: ['fake', 'real', 'expensive', 'new', 'digital'], kunci: 1,
    bahas: 'Fake QR codes are placed over genuine (real, authentic) ones.',
  },
  {
    id: 'en-r14', modul: 'english', topik: 'Reading', bacaan: BACAAN_DIGITAL,
    teks: 'Why do policymakers combine infrastructure development with consumer education?',
    opsi: ['Because merchants prefer cash', 'Because risks such as fraud remain even with good infrastructure', 'Because education is cheaper', 'Because the law requires it', 'Because internet access is perfect'], kunci: 1,
    bahas: 'The final paragraph lists remaining challenges, including fraud, and concludes that policymakers therefore also educate consumers.',
  },

  // ---------------- English: Reading (climate risk) ----------------
  {
    id: 'en-r21', modul: 'english', topik: 'Reading', bacaan: BACAAN_HIJAU,
    teks: 'According to the passage, "physical risks" refer to ...',
    opsi: ['New climate regulations', 'Damage from extreme weather that affects borrowers', 'Changes in consumer preferences', 'Falling prices of green assets', 'Central bank mandates'], kunci: 1,
    bahas: 'Paragraph 1 defines physical risks as damage from floods, droughts and extreme weather that leaves borrowers unable to repay.',
  },
  {
    id: 'en-r22', modul: 'english', topik: 'Reading', bacaan: BACAAN_HIJAU,
    teks: 'Which of the following is an example of a transition risk?',
    opsi: ['A flood destroys a factory', 'A drought ruins a harvest', 'A new rule lowers the value of coal-related assets', 'A storm damages houses', 'Heat waves reduce working hours'], kunci: 2,
    bahas: 'Transition risks arise from the shift to a low-carbon economy, e.g. regulations that reduce the value of fossil-fuel assets.',
  },
  {
    id: 'en-r23', modul: 'english', topik: 'Reading', bacaan: BACAAN_HIJAU,
    teks: 'The word "exposures" in paragraph 2 is closest in meaning to ...',
    opsi: ['holdings or lending that carry risk', 'public announcements', 'photographs', 'profits', 'regulations'], kunci: 0,
    bahas: 'In finance, exposure means the amount of lending or investment at risk in a sector.',
  },
  {
    id: 'en-r24', modul: 'english', topik: 'Reading', bacaan: BACAAN_HIJAU,
    teks: 'What is the author\'s attitude toward central banks addressing climate risk?',
    opsi: ['Strongly opposed', 'Strongly in favour', 'Balanced, presenting both views', 'Uninterested', 'Mocking'], kunci: 2,
    bahas: 'The last paragraph presents both critics and supporters without taking a side.',
  },

  // ---------------- Potensi Dasar: Verbal tambahan ----------------
  {
    id: 'pd-v11', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'PETANI : CANGKUL = PENULIS : ...',
    opsi: ['Buku', 'Pena', 'Kertas', 'Cerita', 'Penerbit'], kunci: 1,
    bahas: 'Hubungan pelaku dengan alat utama kerjanya: petani memakai cangkul, penulis memakai pena. Buku dan cerita adalah hasil, bukan alat.',
  },
  {
    id: 'pd-v12', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'AIR : HAUS = MAKANAN : ...',
    opsi: ['Kenyang', 'Lapar', 'Piring', 'Dapur', 'Nasi'], kunci: 1,
    bahas: 'Air menghilangkan haus; makanan menghilangkan lapar.',
  },
  {
    id: 'pd-v13', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Penulisan yang sesuai EYD adalah ...',
    opsi: ['Di karenakan', 'Dikarenakan', 'Dikare-nakan', 'di-karenakan', 'Di-karenakan'], kunci: 1,
    bahas: 'Di- sebagai awalan pembentuk kata kerja pasif ditulis serangkai: dikarenakan. Di sebagai kata depan (di rumah) ditulis terpisah.',
  },
  {
    id: 'pd-v14', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Kata baku di antara pilihan berikut adalah ...',
    opsi: ['Apotik', 'Analisa', 'Kwitansi', 'Risiko', 'Jadual'], kunci: 3,
    bahas: 'Bentuk baku menurut KBBI: apotek, analisis, kuitansi, risiko, jadwal.',
  },
  {
    id: 'pd-v15', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Kata baku di antara pilihan berikut adalah ...',
    opsi: ['Praktek', 'Sistim', 'Kualitas', 'Nasehat', 'Obyek'], kunci: 2,
    bahas: 'Bentuk baku: praktik, sistem, kualitas, nasihat, objek.',
  },

  // ---------------- Potensi Dasar: Logika tambahan ----------------
  {
    id: 'pd-l11', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Ingkaran dari "Semua pegawai hadir rapat" adalah ...',
    opsi: ['Semua pegawai tidak hadir rapat', 'Ada pegawai yang tidak hadir rapat', 'Tidak ada pegawai yang hadir rapat', 'Beberapa pegawai hadir rapat', 'Pegawai hadir rapat'], kunci: 1,
    bahas: 'Ingkaran "semua A adalah B" adalah "ada A yang bukan B".',
  },
  {
    id: 'pd-l12', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Ingkaran dari "Jika hujan, maka jalan basah" adalah ...',
    opsi: ['Jika tidak hujan, jalan tidak basah', 'Hujan dan jalan tidak basah', 'Tidak hujan dan jalan basah', 'Jika jalan basah, maka hujan', 'Hujan atau jalan basah'], kunci: 1,
    bahas: 'Ingkaran p → q adalah p ∧ ¬q: hujan dan jalan tidak basah.',
  },
  {
    id: 'pd-l13', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Pernyataan yang setara dengan "Jika rajin belajar, maka lulus" adalah ...',
    opsi: ['Jika lulus, maka rajin belajar', 'Jika tidak lulus, maka tidak rajin belajar', 'Jika tidak rajin belajar, maka tidak lulus', 'Rajin belajar dan tidak lulus', 'Tidak rajin belajar dan lulus'], kunci: 1,
    bahas: 'p → q setara dengan kontraposisinya ¬q → ¬p. Konvers dan invers tidak setara.',
  },
  {
    id: 'pd-l14', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Rina lebih tinggi dari Sari. Sari lebih tinggi dari Tia. Dewi lebih pendek dari Tia. Siapa yang paling pendek?',
    opsi: ['Rina', 'Sari', 'Tia', 'Dewi', 'Tidak dapat ditentukan'], kunci: 3,
    bahas: 'Urutan: Rina > Sari > Tia > Dewi, jadi Dewi paling pendek.',
  },
  {
    id: 'pd-l15', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Lima orang duduk berjajar. A di ujung kiri. B tepat di sebelah kanan A. C di ujung kanan. D tidak bersebelahan dengan C. Di mana E duduk?',
    opsi: ['Posisi 2', 'Posisi 3', 'Posisi 4', 'Posisi 5', 'Tidak dapat ditentukan'], kunci: 2,
    bahas: 'A=1, B=2, C=5. Sisa posisi 3 dan 4. D tidak boleh di 4 (bersebelahan dengan C), jadi D=3 dan E=4.',
  },
  // ---------------- Pembaruan Oktober 2026 ----------------
  {
    id: 'pd-v16', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'Antonim dari EKSPANSIF adalah ...',
    opsi: ['Agresif', 'Kontraktif', 'Progresif', 'Inklusif', 'Produktif'], kunci: 1,
    bahas: 'Ekspansif berarti bersifat meluas atau melonggarkan. Lawannya kontraktif, misalnya kebijakan moneter kontraktif lawan ekspansif.',
  },
  {
    id: 'pd-v17', modul: 'potensi-dasar', topik: 'Verbal',
    teks: 'REGULATOR : ATURAN = ... : ...',
    opsi: ['Hakim : putusan', 'Nasabah : rekening', 'Pasien : obat', 'Penonton : film', 'Siswa : sekolah'], kunci: 0,
    bahas: 'Regulator menetapkan aturan; hakim menetapkan putusan. Pasangan lain bukan hubungan pembuat dan hasil.',
  },
  {
    id: 'pd-l16', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Semua penyelenggara berstatus PSP Utama boleh menjalankan paket 1A. PT X tidak boleh menjalankan paket 1A. Kesimpulan yang tepat adalah ...',
    opsi: ['PT X adalah PSP Utama', 'PT X bukan PSP Utama', 'PT X adalah bank', 'Sebagian PSP Utama tidak boleh menjalankan paket 1A', 'Tidak dapat disimpulkan'], kunci: 1,
    bahas: 'Modus tollens: jika PSP Utama maka boleh 1A. PT X tidak boleh 1A, jadi PT X bukan PSP Utama.',
  },
  {
    id: 'pd-l17', modul: 'potensi-dasar', topik: 'Logika',
    teks: 'Jika sebuah bank menaikkan suku bunga deposito, maka dana pihak ketiganya bertambah. Dana pihak ketiga Bank Y tidak bertambah. Kesimpulan yang sah adalah ...',
    opsi: ['Bank Y menaikkan suku bunga deposito', 'Bank Y tidak menaikkan suku bunga deposito', 'Bank Y menurunkan suku bunga kredit', 'Dana pihak ketiga Bank Y berkurang', 'Tidak dapat disimpulkan'], kunci: 1,
    bahas: 'Modus tollens: jika P maka Q; tidak Q; maka tidak P. Pilihan D tidak pasti karena "tidak bertambah" bisa berarti tetap.',
  },
  {
    id: 'en-v21', modul: 'english', topik: 'Vocabulary',
    teks: 'The central bank decided to keep its policy rate unchanged. The word "unchanged" is closest in meaning to ...',
    opsi: ['Increased', 'Steady', 'Reduced', 'Abolished', 'Reversed'], kunci: 1,
    bahas: '"Unchanged" berarti tidak berubah, paling dekat dengan "steady" (tetap/stabil).',
  },
  {
    id: 'en-v22', modul: 'english', topik: 'Vocabulary',
    teks: 'New rules require financial influencers to avoid misleading content. "Misleading" means ...',
    opsi: ['Giving a wrong impression', 'Very popular', 'Hard to read', 'Officially approved', 'Free of charge'], kunci: 0,
    bahas: '"Misleading" berarti menyesatkan, yaitu memberi kesan yang keliru.',
  },
];
