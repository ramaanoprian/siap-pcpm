import { cariYt, yt, type Bab, type Sumber } from './materi-dasar';

// Bab di luar Kebanksentralan: tahapan seleksi, Tes Potensi Dasar, Pengetahuan Umum, Bahasa Inggris,
// serta psikologi, LGD, dan wawancara. Fakta tentang BI dan ekonomi diambil dari situs resmi
// (bi.go.id, bps.go.id, jdih.kemenkeu.go.id). Materi bahasa dan penalaran merujuk pada lembaga
// tepercaya (Badan Bahasa, British Council, Khan Academy). Bagian "tips" ditandai sebagai saran
// belajar, bukan ketentuan resmi. `id` bab dipakai sebagai kunci progres baca, jadi jangan diganti.

const FAQ_PCPM: Sumber = {
  nama: 'Bank Indonesia: FAQ Rekrutmen PCPM Angkatan 35',
  url: 'https://www.bi.go.id/id/karier/Documents/FAQ-Rekrutmen-PCPM-35.pdf',
};
const KBBI: Sumber = { nama: 'KBBI VI Daring (Badan Bahasa)', url: 'https://kbbi.kemendikdasmen.go.id/Beranda' };
const EYD: Sumber = { nama: 'EYD Edisi V (Badan Bahasa)', url: 'https://ejaan.kemendikdasmen.go.id/' };
const BC_GRAMMAR: Sumber = { nama: 'British Council LearnEnglish: Grammar', url: 'https://learnenglish.britishcouncil.org/grammar' };

export const MATERI_LAIN: Bab[] = [
  // ================= Tahapan seleksi =================
  {
    id: 'peta-seleksi',
    kelompok: 'seleksi',
    judul: 'Peta Seleksi PCPM',
    ringkas: 'Tujuh tahap seleksi PCPM, persyaratan umum, dan apa yang perlu disiapkan di tiap tahap.',
    menit: 6,
    bagian: [
      {
        judul: 'Apa itu PCPM',
        isi: [
          'PCPM adalah Pendidikan Calon Pegawai Asisten Manajer, jalur rekrutmen Bank Indonesia untuk lulusan S1/S2. Peserta yang lulus seleksi mengikuti pendidikan sebelum diangkat menjadi pegawai.',
        ],
      },
      {
        judul: 'Tujuh tahap seleksi',
        isi: ['FAQ resmi rekrutmen PCPM Angkatan 35 menyebut tahapan berikut. Detail bisa berubah tiap angkatan, jadi selalu cek pengumuman angkatan yang kamu ikuti.'],
        poin: [
          '1. Seleksi administrasi: verifikasi dokumen dan kelengkapan persyaratan.',
          '2. Tes Potensi Dasar (TPD) dan Person-Organization Fit (POF).',
          '3. Seleksi pengetahuan: Tes Pengetahuan Umum (TPU), Tes Pengetahuan Kebanksentralan (TPK), dan tes bahasa Inggris.',
          '4. Seleksi psikologi: psikotes, Leaderless Group Discussion (LGD), dan wawancara psikologi.',
          '5. Seleksi kesehatan: tes kesehatan dan tes psikiatri.',
          '6. Wawancara akhir.',
          '7. Leadership Forum.',
        ],
      },
      {
        judul: 'Persyaratan umum (contoh Angkatan 40)',
        poin: [
          'Warga Negara Indonesia, sehat jasmani dan rohani.',
          'Usia maksimal 26 tahun untuk S1 dan 28 tahun untuk S2 (per tanggal yang ditetapkan di pengumuman).',
          'IPK minimal 3,00 dan pendidikan minimal S1.',
          'Tidak sedang terikat ikatan dinas.',
          'Pendaftaran Angkatan 40 dibuka 7–12 September 2025 lewat portal resmi yang diumumkan BI.',
        ],
      },
      {
        judul: 'Waspada rekrutmen palsu',
        isi: [
          'BI rutin mengingatkan adanya rekrutmen palsu yang mengatasnamakan BI. Informasi resmi hanya dari bi.go.id dan portal yang ditautkan di sana. BI tidak memungut biaya dalam proses rekrutmen.',
        ],
      },
      {
        judul: 'Cara memakai aplikasi ini per tahap',
        poin: [
          'TPD: bab Verbal, Numerik, Logika, lalu latihan Potensi Dasar. Soal hitungan dan logika selalu baru.',
          'Seleksi pengetahuan: bab Pengetahuan Umum, Kebanksentralan, dan Bahasa Inggris, lalu latihan modul Pengetahuan dan English.',
          'Psikologi, LGD, dan wawancara: bab di kelompok Psikologi, lalu menu Wawancara dan Psikologi untuk latihan.',
        ],
      },
    ],
    ingat: [
      'Urutan: administrasi → TPD & POF → pengetahuan (TPU, TPK, English) → psikologi & LGD → kesehatan → wawancara akhir → Leadership Forum.',
      'IPK minimal 3,00; usia maksimal 26 (S1) / 28 (S2) untuk Angkatan 40.',
      'Info resmi hanya dari bi.go.id; rekrutmen BI tidak berbayar.',
    ],
    sumber: [
      FAQ_PCPM,
      { nama: 'Bank Indonesia: Seleksi Penerimaan PCPM Angkatan 40', url: 'https://www.bi.go.id/id/karier/Pages/Seleksi-Penerimaan-PCPM-Angkatan-40.aspx' },
      { nama: 'BI Bicara: Hoaks rekrutmen mengatasnamakan BI', url: 'https://bicara131.bi.go.id/knowledgebase/article/KA-01092/en-us' },
    ],
    video: [cariYt('PCPM Bank Indonesia tahapan seleksi'), cariYt('pengalaman tes PCPM Bank Indonesia')],
  },

  // ================= Tes Potensi Dasar =================
  {
    id: 'tpd-verbal',
    kelompok: 'tpd',
    modul: 'potensi-dasar',
    topik: 'Verbal',
    judul: 'Verbal: Sinonim, Antonim, Analogi, Bacaan',
    ringkas: 'Jenis soal verbal yang paling sering muncul dan cara cepat mengerjakannya.',
    menit: 9,
    bagian: [
      {
        judul: 'Sinonim (padanan kata)',
        isi: [
          'Cari kata yang maknanya paling dekat, bukan sekadar berhubungan. Ukurannya adalah makna di KBBI. Contoh: KONKLUSI = kesimpulan (bukan ringkasan); ASUMSI = anggapan; ABSURD = mustahil/tidak masuk akal.',
        ],
        poin: [
          'Buat kalimat pendek dengan kata soal, lalu ganti dengan tiap opsi. Opsi yang maknanya tidak berubah adalah jawabannya.',
          'Waspadai opsi yang berkaitan tapi tidak sama makna (misalnya KONKLUSI → ringkasan).',
        ],
      },
      {
        judul: 'Antonim (lawan kata)',
        isi: ['Cari lawan makna yang paling tepat dalam konteks yang sama. Contoh: EKSPLISIT >< implisit; KONKRET >< abstrak; SPORADIS >< kerap; PROGRESIF >< regresif.'],
      },
      {
        judul: 'Analogi (padanan hubungan)',
        isi: ['Rumuskan hubungan pasangan kata pertama dalam satu kalimat, lalu uji ke setiap opsi.'],
        poin: [
          'Fungsi/alat: PISAU : MEMOTONG = PENA : MENULIS.',
          'Pelaku dan tugas: BANK SENTRAL : KEBIJAKAN MONETER = PEMERINTAH : KEBIJAKAN FISKAL.',
          'Bagian dan keseluruhan: RODA : MOBIL = DAUN : POHON.',
          'Sebab-akibat, tingkatan (gerimis : hujan : badai), dan bahan-hasil (kapas : benang).',
          'Urutan kata harus sama. Kalau hubungan di soal "A untuk B", opsi yang terbalik "B untuk A" salah.',
        ],
      },
      {
        judul: 'Pemahaman bacaan',
        poin: [
          'Baca pertanyaan dulu, baru teksnya, supaya tahu apa yang dicari.',
          'Ide pokok biasanya ada di kalimat pertama atau terakhir paragraf.',
          'Jawaban harus didukung teks. Opsi yang benar secara umum tetapi tidak disebut di teks biasanya salah.',
          'Soal simpulan: pilih yang paling aman (tidak melebihi isi teks).',
        ],
      },
      {
        judul: 'Ejaan dan kata baku',
        isi: [
          'Beberapa tes memuat kata baku dan ejaan. Rujukannya KBBI dan EYD Edisi V. Contoh baku: analisis, praktik, sistem, kualitas, risiko, apotek, izin, objek.',
        ],
      },
    ],
    ingat: [
      'Sinonim = makna sama; bukan sekadar berkaitan.',
      'Analogi: rumuskan hubungan dalam satu kalimat, jaga urutannya.',
      'Bacaan: jawaban harus ada dasarnya di teks.',
      'Rujukan kata baku: KBBI dan EYD Edisi V.',
    ],
    sumber: [KBBI, EYD],
    video: [cariYt('tips soal sinonim antonim analogi tes potensi dasar'), cariYt('tes verbal analogi pembahasan')],
  },
  {
    id: 'tpd-numerik',
    kelompok: 'tpd',
    modul: 'potensi-dasar',
    topik: 'Numerik',
    judul: 'Numerik: Deret, Persen, Perbandingan, Soal Cerita',
    ringkas: 'Rumus inti dan pola yang paling sering keluar di tes numerik, lengkap dengan contoh.',
    menit: 12,
    bagian: [
      {
        judul: 'Deret angka',
        poin: [
          'Aritmetika: selisih tetap. 3, 7, 11, 15 → +4. Suku ke-n = a + (n − 1)b.',
          'Geometri: rasio tetap. 2, 6, 18, 54 → ×3. Suku ke-n = a·r^(n−1).',
          'Bertingkat: selisihnya membentuk deret. 2, 6, 12, 20, 30 → selisih 4, 6, 8, 10, jadi berikutnya 42.',
          'Campuran: ×2 + 1 → 1, 3, 7, 15, 31.',
          'Selang-seling: dua deret digabung. 1, 10, 3, 20, 5, 30 → ganjil 1, 3, 5 dan genap 10, 20, 30.',
          'Kuadrat/kubik: 1, 4, 9, 16 (n²); 1, 8, 27 (n³).',
          'Langkah cepat: cek selisih → cek rasio → cek selang-seling → cek kuadrat.',
        ],
      },
      {
        judul: 'Persen',
        poin: [
          'x% dari A = x/100 × A.',
          'Naik p% lalu turun q%: kalikan (1 + p/100)(1 − q/100). Tidak bisa langsung dikurangkan.',
          'Diskon bertingkat 20% + 10% = 1 − 0,8 × 0,9 = 28%, bukan 30%.',
          'Persentase perubahan = (baru − lama) ÷ lama × 100%.',
        ],
      },
      {
        judul: 'Perbandingan',
        poin: [
          'Senilai: A : B = 2 : 3 dan jumlah 150 → satu bagian = 150 ÷ 5 = 30; A = 60.',
          'Berbalik nilai (pekerja dan waktu): 6 orang × 10 hari = 60 orang-hari; 12 orang → 5 hari.',
        ],
      },
      {
        judul: 'Soal cerita klasik',
        poin: [
          'Jarak = kecepatan × waktu. Ubah menit ke jam (÷ 60).',
          'Kerja bersama: 1/T = 1/A + 1/B. A 6 hari, B 12 hari → T = 4 hari.',
          'Rata-rata: jumlah = rata-rata × banyak data. Untuk data baru, bandingkan jumlah sebelum dan sesudah.',
          'Bunga tunggal: bunga = pokok × r × t (t dalam tahun).',
          'Inflasi dari IHK: (IHK baru − IHK lama) ÷ IHK lama × 100%.',
        ],
      },
      {
        judul: 'Trik hemat waktu',
        poin: [
          'Lihat opsi dulu. Sering cukup memperkirakan angka depan atau digit terakhir.',
          'Jangan terjebak satu soal lebih dari dua kali waktu rata-rata; tandai lalu lanjut.',
        ],
      },
    ],
    ingat: [
      'Deret: cek selisih, rasio, selang-seling, lalu kuadrat.',
      'Persen bertingkat dikalikan, bukan dijumlah.',
      'Kerja bersama: 1/T = 1/A + 1/B.',
      'Jarak = v × t (ubah menit ke jam).',
    ],
    sumber: [
      { nama: 'Khan Academy: Arithmetic and geometric sequences', url: 'https://www.khanacademy.org/math/algebra-1-tx/x36b5a29ce1c3a684:arithmetic-and-geometric-sequences-tx-teks' },
      { nama: 'Khan Academy: Unit rates and percentages', url: 'https://www.khanacademy.org/math/6th-grade-illustrative-math/unit-3-unit-rates-and-percentages' },
      { nama: 'Khan Academy: Proportional relationships and percentages', url: 'https://www.khanacademy.org/math/7th-grade-illustrative-math/unit-4-proportional-relationships-and-percentages' },
    ],
    video: [cariYt('trik cepat deret angka tes potensi dasar'), cariYt('soal cerita perbandingan kecepatan pekerjaan pembahasan'), cariYt('Khan Academy Indonesia persen')],
  },
  {
    id: 'tpd-logika',
    kelompok: 'tpd',
    modul: 'potensi-dasar',
    topik: 'Logika',
    judul: 'Logika: Silogisme, Implikasi, Ingkaran, Analitis',
    ringkas: 'Aturan penarikan kesimpulan yang harus hafal, plus cara mengerjakan soal penalaran analitis.',
    menit: 11,
    bagian: [
      {
        judul: 'Silogisme kategoris',
        poin: [
          'Semua A adalah B. Semua B adalah C. → Semua A adalah C.',
          'Semua A adalah B. Sebagian C adalah A. → Sebagian C adalah B.',
          'Semua A adalah B. Tidak ada B yang C. → Tidak ada A yang C.',
          'Kebalikannya tidak otomatis benar: "Semua analis teliti" tidak berarti "semua yang teliti adalah analis".',
          'Dua premis "sebagian" tidak menghasilkan kesimpulan pasti.',
        ],
      },
      {
        judul: 'Implikasi (jika–maka)',
        poin: [
          'Modus ponens: jika p maka q; p benar → q.',
          'Modus tollens: jika p maka q; bukan q → bukan p.',
          'Silogisme: jika p maka q; jika q maka r → jika p maka r.',
          'Kesalahan umum: "jika p maka q; q benar → p" tidak sah. Begitu juga "bukan p → bukan q".',
          'Kontraposisi setara: "jika p maka q" ≡ "jika bukan q maka bukan p".',
        ],
      },
      {
        judul: 'Ingkaran (negasi)',
        poin: [
          'Ingkaran "semua A adalah B" adalah "ada A yang bukan B".',
          'Ingkaran "ada A yang B" adalah "semua A bukan B" (tidak ada A yang B).',
          'Ingkaran "p dan q" adalah "bukan p atau bukan q".',
          'Ingkaran "p atau q" adalah "bukan p dan bukan q".',
          'Ingkaran "jika p maka q" adalah "p dan bukan q".',
        ],
      },
      {
        judul: 'Penalaran analitis (urutan, posisi, jadwal)',
        poin: [
          'Tulis semua syarat dalam simbol singkat, misalnya A > B (A lebih tinggi), C ≠ 1.',
          'Mulai dari syarat yang paling mengikat (posisi pasti), lalu isi sisanya.',
          'Gambar tabel atau garis urutan. Hampir semua soal jadi jelas setelah digambar.',
          'Untuk soal "yang pasti benar", jawaban harus benar di semua kemungkinan susunan.',
        ],
      },
    ],
    ingat: [
      'Modus tollens: p → q, ¬q ⊢ ¬p.',
      'Ingkaran "semua" = "ada yang tidak"; ingkaran "jika p maka q" = "p dan bukan q".',
      'Kebalikan (q → p) dan invers (¬p → ¬q) tidak sah.',
      'Analitis: simbolkan, mulai dari syarat pasti, gambar.',
    ],
    sumber: [
      { nama: 'Stanford Encyclopedia of Philosophy: Classical Logic', url: 'https://plato.stanford.edu/entries/logic-classical/' },
      { nama: 'Khan Academy: LSAT Logical Reasoning (latihan gratis)', url: 'https://www.khanacademy.org/prep/lsat' },
    ],
    video: [cariYt('silogisme modus ponens modus tollens tes potensi dasar'), cariYt('penalaran analitis soal urutan posisi pembahasan')],
  },
  {
    id: 'tpd-pof',
    kelompok: 'tpd',
    judul: 'Person-Organization Fit dan Nilai BI',
    ringkas: 'Apa yang dinilai di POF dan cara mengenali visi-misi BI sebelum tes.',
    menit: 5,
    bagian: [
      {
        judul: 'Apa itu Person-Organization Fit',
        isi: [
          'Person-Organization Fit (POF) diuji bersama TPD pada tahap kedua. Secara umum, POF melihat kesesuaian nilai, sikap, dan preferensi kerja kandidat dengan organisasi. Bentuknya biasanya pernyataan sikap tanpa jawaban benar-salah yang pasti.',
        ],
      },
      {
        judul: 'Visi dan misi BI',
        isi: [
          'Visi BI: menjadi bank sentral digital terdepan dengan tata kelola kuat yang berkontribusi nyata terhadap perekonomian nasional.',
          'Misinya antara lain mencapai stabilitas Rupiah lewat kebijakan moneter, menjaga sistem pembayaran dan pengelolaan Rupiah, menjaga stabilitas sistem keuangan lewat kebijakan makroprudensial, mendukung stabilitas makroekonomi lewat koordinasi, pendalaman pasar keuangan, inklusi keuangan dan perlindungan konsumen, serta menjadi bank sentral berbasis digital dengan tata kelola yang profesional.',
        ],
      },
      {
        judul: 'Saran mengerjakan (tips, bukan ketentuan resmi)',
        poin: [
          'Jawab jujur dan konsisten. Pernyataan yang mirip sering muncul lagi dengan kalimat berbeda.',
          'Kenali prinsip tata kelola BI (IKKAT: Independensi, Konsistensi, Koordinasi, Akuntabilitas, Transparansi) sebagai gambaran nilai organisasi.',
          'Latihan refleksi diri di menu Psikologi membantu mengenali pola jawabanmu sendiri.',
        ],
      },
    ],
    ingat: ['POF = kesesuaian nilai diri dengan organisasi; jawab jujur dan konsisten.', 'Visi BI: bank sentral digital terdepan, tata kelola kuat, kontribusi nyata bagi perekonomian.'],
    sumber: [FAQ_PCPM, { nama: 'Bank Indonesia: Profil (visi dan misi)', url: 'https://www.bi.go.id/id/tentang-bi/profil/default.aspx' }],
    video: [cariYt('person organization fit test tips')],
  },

  // ================= Pengetahuan Umum =================
  {
    id: 'pu-makro',
    kelompok: 'pengetahuan',
    modul: 'kebanksentralan',
    topik: 'Ekonomi Makro',
    judul: 'Ekonomi Makro: PDB, Inflasi, Neraca Pembayaran',
    ringkas: 'Indikator makro yang wajib dipahami: cara membaca PDB, jenis inflasi, dan isi neraca pembayaran.',
    menit: 12,
    bagian: [
      {
        judul: 'Produk Domestik Bruto (PDB)',
        isi: [
          'PDB adalah data ekonomi untuk menilai kinerja pembangunan ekonomi suatu negara. BPS menyajikannya atas dasar harga berlaku dan harga konstan (tahun dasar 2010). Pertumbuhan ekonomi dihitung dari PDB harga konstan agar pengaruh kenaikan harga dikeluarkan.',
        ],
        poin: [
          'Pendekatan pengeluaran (7 komponen BPS): konsumsi rumah tangga, konsumsi LNPRT, konsumsi pemerintah, pembentukan modal tetap bruto (PMTB/investasi), perubahan inventori, ekspor, dikurangi impor.',
          'Rumus ringkas: PDB = C + I + G + (X − M).',
          'PDB juga bisa dihitung dari sisi lapangan usaha (produksi) dan pendapatan.',
        ],
      },
      {
        judul: 'Inflasi',
        isi: ['Inflasi adalah kenaikan harga barang dan jasa secara umum dan terus-menerus dalam periode tertentu. Kebalikannya deflasi. Di Indonesia diukur dengan Indeks Harga Konsumen (IHK) yang dihitung BPS.'],
        poin: [
          'Inflasi inti (core): dipengaruhi faktor fundamental seperti interaksi permintaan-penawaran, nilai tukar, harga komoditas internasional, dan ekspektasi inflasi.',
          'Inflasi bahan makanan bergejolak (volatile food): dipengaruhi kejutan di bahan makanan seperti panen, bencana, dan harga pangan dunia.',
          'Inflasi harga diatur pemerintah (administered prices): misalnya BBM bersubsidi, tarif listrik, dan tarif angkutan.',
          'Demand-pull: permintaan agregat melebihi kapasitas ekonomi.',
          'Cost-push: tekanan dari sisi penawaran, seperti depresiasi rupiah, inflasi impor, kenaikan harga diatur pemerintah, dan gangguan distribusi.',
        ],
      },
      {
        judul: 'Neraca Pembayaran Indonesia (NPI)',
        poin: [
          'Transaksi berjalan: neraca barang (ekspor − impor barang), jasa, pendapatan primer (misalnya bunga dan keuntungan investasi), dan pendapatan sekunder (misalnya remitansi pekerja migran).',
          'Transaksi modal: nilainya biasanya kecil.',
          'Transaksi finansial: investasi langsung (jangka panjang), investasi portofolio (saham dan surat utang), dan investasi lainnya (pinjaman, simpanan).',
          'Cadangan devisa: aset valas yang dikuasai BI untuk menjaga ketahanan eksternal. Kecukupannya sering diukur dalam bulan impor dan pembayaran utang luar negeri pemerintah.',
        ],
      },
    ],
    ingat: [
      'PDB = C + I + G + (X − M); pertumbuhan pakai harga konstan.',
      'Inflasi: inti, volatile food, administered prices.',
      'Demand-pull vs cost-push.',
      'NPI: transaksi berjalan + modal + finansial → perubahan cadangan devisa.',
    ],
    sumber: [
      { nama: 'BPS: PDB Indonesia Menurut Pengeluaran 2021–2025', url: 'https://www.bps.go.id/id/publication/2026/05/29/886e884e5eae75d0ca7a438b/produk-domestik-bruto-indonesia-menurut-pengeluaran-2021-2025.html' },
      { nama: 'Bank Indonesia: Inflation', url: 'https://www.bi.go.id/en/fungsi-utama/moneter/inflasi/default.aspx' },
      { nama: 'Bank Indonesia: Laporan Perekonomian Indonesia 2018, Bab Neraca Pembayaran', url: 'https://www.bi.go.id/id/publikasi/laporan/Documents/5_LPI2018_BAB%203.pdf' },
    ],
    video: [
      yt('[Bank Indonesia 101] Inflasi', '19l6NalTE4c', 'Bank Indonesia Channel'),
      yt('[Bank Indonesia 101] Cadangan Devisa', 'vzYkXCKyGFg', 'Bank Indonesia 101'),
      cariYt('produk domestik bruto pendekatan pengeluaran penjelasan'),
    ],
  },
  {
    id: 'pu-fiskal',
    kelompok: 'pengetahuan',
    modul: 'kebanksentralan',
    topik: 'Fiskal',
    judul: 'Kebijakan Fiskal dan APBN',
    ringkas: 'Beda fiskal dan moneter, struktur APBN, dan batas defisit serta utang menurut aturan.',
    menit: 7,
    bagian: [
      {
        judul: 'Fiskal vs moneter',
        poin: [
          'Kebijakan fiskal dijalankan Pemerintah lewat penerimaan (pajak, PNBP, hibah) dan belanja negara dalam APBN.',
          'Kebijakan moneter dijalankan BI lewat suku bunga, likuiditas, dan nilai tukar.',
          'Keduanya dikoordinasikan, misalnya dalam pengendalian inflasi (TPIP/TPID) dan KSSK.',
          'Kebijakan fiskal ekspansif: belanja naik atau pajak turun. Kontraktif: sebaliknya.',
        ],
      },
      {
        judul: 'APBN',
        isi: [
          'APBN adalah rencana keuangan tahunan pemerintah yang ditetapkan dengan undang-undang. Dasar hukum pengelolaan keuangan negara adalah UU No. 17 Tahun 2003 tentang Keuangan Negara.',
        ],
        poin: [
          'Pendapatan negara: penerimaan perpajakan, penerimaan negara bukan pajak (PNBP), dan hibah.',
          'Belanja negara: belanja pemerintah pusat serta transfer ke daerah.',
          'Pembiayaan: menutup defisit, misalnya lewat penerbitan Surat Berharga Negara.',
        ],
      },
      {
        judul: 'Batas defisit dan utang',
        poin: [
          'PP No. 23 Tahun 2003 Pasal 4: jumlah kumulatif defisit APBN dan APBD tidak melebihi 3% dari PDB tahun bersangkutan.',
          'Jumlah kumulatif pinjaman pemerintah pusat dan daerah tidak melebihi 60% dari PDB.',
        ],
      },
    ],
    ingat: ['Fiskal = Pemerintah (APBN); moneter = BI.', 'Defisit maks 3% PDB; utang maks 60% PDB (PP 23/2003).', 'UU Keuangan Negara = UU 17/2003.'],
    sumber: [
      { nama: 'JDIH Kemenkeu: PP No. 23 Tahun 2003', url: 'https://jdih.kemenkeu.go.id/api/download/fulltext/2003/23TAHUN2003PP.htm' },
      { nama: 'Kemenkeu: Portal Data APBN', url: 'https://www.data-apbn.kemenkeu.go.id/' },
    ],
    video: [cariYt('APBN Kita Kementerian Keuangan penjelasan'), cariYt('perbedaan kebijakan fiskal dan moneter')],
  },
  {
    id: 'pu-syariah-umkm',
    kelompok: 'pengetahuan',
    modul: 'kebanksentralan',
    topik: 'Syariah & UMKM',
    judul: 'Ekonomi Syariah dan UMKM',
    ringkas: 'Peran BI dalam pengembangan ekonomi dan keuangan syariah serta UMKM.',
    menit: 6,
    bagian: [
      {
        judul: 'Ekonomi dan keuangan syariah',
        isi: [
          'BI mendorong ekonomi dan keuangan syariah sebagai bagian dari upaya menjaga stabilitas moneter, stabilitas sistem keuangan, dan kesejahteraan masyarakat. Arahnya dituangkan dalam cetak biru pengembangan, didukung edukasi dan sosialisasi.',
          'Sejak 2014 BI menyelenggarakan Indonesia Sharia Economic Festival (ISEF) setiap tahun, berisi forum ekonomi syariah dan pameran (Sharia Fair).',
          'Instrumen makroprudensial dan moneter BI juga punya versi syariah, misalnya RIM Syariah, PLM Syariah, dan PLJP Syariah (PLJPS).',
        ],
      },
      {
        judul: 'Pengembangan UMKM',
        poin: [
          'Tujuan: memperluas akses keuangan UMKM serta meningkatkan kapasitas, manajemen SDM, dan inovasi.',
          'Peta jalan BI: UMKM potensial → siap pasar/siap akses keuangan → UMKM digital → UMKM ekspor.',
          'Fokusnya pada akses keuangan, akses pasar, pengetahuan, dan inovasi.',
          'Dari sisi makroprudensial, RPIM mendorong bank menyalurkan pembiayaan inklusif ke UMKM.',
        ],
      },
    ],
    ingat: ['ISEF diselenggarakan BI sejak 2014.', 'Peta jalan UMKM: potensial → siap akses → digital → ekspor.', 'RPIM = instrumen makroprudensial untuk pembiayaan inklusif.'],
    sumber: [
      { nama: 'Bank Indonesia: Ekonomi dan Keuangan Syariah', url: 'https://www.bi.go.id/id/fungsi-utama/moneter/pengembangan-ekonomi/default.aspx' },
      { nama: 'Bank Indonesia: Pengembangan UMKM', url: 'https://www.bi.go.id/id/fungsi-utama/stabilitas-sistem-keuangan/pengembangan-umkm/default.aspx' },
      { nama: 'Bank Indonesia: Blueprint Kebijakan Ekonomi dan Keuangan Syariah 2030', url: 'https://www.bi.go.id/id/publikasi/kajian/Pages/Blueprint-Kebijakan-Ekonomi-dan-Keuangan-Syariah-2030.aspx' },
    ],
    video: [cariYt('ISEF Bank Indonesia ekonomi syariah'), cariYt('Bank Indonesia pengembangan UMKM')],
  },

  // ================= Bahasa Inggris =================
  {
    id: 'en-grammar',
    kelompok: 'english',
    modul: 'english',
    topik: 'Grammar',
    judul: 'Grammar Essentials',
    ringkas: 'Tenses, subject-verb agreement, conditionals, passive voice, and error identification.',
    menit: 12,
    bagian: [
      {
        judul: 'Tenses you must master',
        poin: [
          'Present simple: habits and facts. "The central bank sets the policy rate every month."',
          'Present perfect: past action with present relevance, often with since/for/already/yet. "Inflation has fallen since March."',
          'Past simple: finished time. "BI raised the rate in 2022."',
          'Past perfect: earlier past. "Prices had risen before the policy took effect."',
          'Future: will / be going to / present continuous for arrangements.',
        ],
      },
      {
        judul: 'Subject-verb agreement',
        poin: [
          '"Each of the analysts HAS submitted..." (each/every/either/neither = singular).',
          '"The number of loans IS rising" vs "A number of banks ARE merging".',
          'Uncountable nouns take singular verbs: information, evidence, equipment, advice.',
          'The verb agrees with the real subject, not the nearest noun: "The list of items IS on the desk."',
        ],
      },
      {
        judul: 'Conditionals',
        poin: [
          'Zero: If + present, present (general truth). "If rates rise, borrowing costs increase."',
          'First: If + present, will + verb (real future). "If inflation rises, BI will act."',
          'Second: If + past, would + verb (unreal present). "If I were the governor, I would..."',
          'Third: If + past perfect, would have + V3 (unreal past). "If they had saved, they would have survived."',
        ],
      },
      {
        judul: 'Passive voice and other traps',
        poin: [
          'Passive = be + past participle: "The report was published yesterday."',
          'Gerund vs infinitive: enjoy/avoid/consider + -ing; decide/plan/agree + to + verb.',
          'Parallel structure: "analyzing, forecasting, and reporting" (same form).',
          'Comparatives: "more efficient than", not "more efficienter".',
        ],
      },
      {
        judul: 'Strategy for error identification',
        poin: [
          'Check the verb first (tense and agreement), then pronouns, then prepositions and word forms.',
          'Read the whole sentence; the error often depends on a word far from the underlined part.',
          'If everything is correct, choose "no error" confidently.',
        ],
      },
    ],
    ingat: [
      'Each/every/neither + singular verb.',
      'A number of + plural; the number of + singular.',
      'Second conditional uses "were" for all subjects.',
      'Enjoy/avoid + -ing; decide/plan + to V.',
    ],
    sumber: [
      BC_GRAMMAR,
      { nama: 'British Council: Conditionals (zero, first, second)', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-zero-first-second' },
      { nama: 'British Council: Conditionals (third and mixed)', url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-2' },
    ],
    video: [cariYt('BBC Learning English grammar'), cariYt('TOEFL structure and written expression tips'), cariYt('subject verb agreement explained')],
  },
  {
    id: 'en-reading',
    kelompok: 'english',
    modul: 'english',
    topik: 'Reading',
    judul: 'Reading and Vocabulary',
    ringkas: 'Strategies for main idea, detail, inference, and vocabulary-in-context questions.',
    menit: 8,
    bagian: [
      {
        judul: 'Question types',
        poin: [
          'Main idea: what the whole passage is about. Look at the first and last paragraphs.',
          'Detail: the answer is stated in the text. Scan for keywords from the question.',
          'Inference: implied, not stated. Choose the option the text supports most safely.',
          'Vocabulary in context: replace the word with each option and reread the sentence.',
          'Reference: "it/they/this" usually points to the nearest suitable noun before it.',
        ],
      },
      {
        judul: 'Economic vocabulary that often appears',
        poin: [
          'Inflation, deflation, monetary policy, fiscal policy, interest rate, exchange rate.',
          'Tighten (hawkish) vs ease (dovish) policy; anchor expectations; lag.',
          'Surplus, deficit, current account, capital inflow/outflow, depreciation/appreciation.',
          'Resilient, sustainable, prudent, robust, volatile, mitigate.',
        ],
      },
      {
        judul: 'Build vocabulary daily',
        poin: [
          'Read one short economic news article in English every day (for example central bank press releases in English on bi.go.id).',
          'Write down 5 new words with an example sentence and review them in Flashcard style.',
        ],
      },
    ],
    ingat: ['Main idea: first and last paragraphs.', 'Inference: the safest option supported by the text.', 'Vocabulary in context: substitute and reread.'],
    sumber: [
      { nama: 'British Council LearnEnglish: Reading', url: 'https://learnenglish.britishcouncil.org/skills/reading' },
      { nama: 'Bank Indonesia (English): Press releases', url: 'https://www.bi.go.id/en/publikasi/ruang-media/news-release/default.aspx' },
    ],
    video: [cariYt('TOEFL reading strategies main idea inference'), cariYt('economic vocabulary English central bank')],
  },

  // ================= Psikologi, LGD, wawancara =================
  {
    id: 'psikotes',
    kelompok: 'psikologi',
    judul: 'Psikotes dan Wawancara Psikologi',
    ringkas: 'Gambaran seleksi psikologi dan cara menyiapkan diri tanpa "menebak jawaban".',
    menit: 6,
    bagian: [
      {
        judul: 'Apa yang ada di tahap ini',
        isi: ['FAQ PCPM menyebut seleksi psikologi terdiri atas psikotes, Leaderless Group Discussion (LGD), dan wawancara psikologi. Rincian alat tesnya tidak diumumkan, jadi materi di bawah adalah saran persiapan umum, bukan bocoran.'],
      },
      {
        judul: 'Persiapan (tips)',
        poin: [
          'Tidur cukup dan datang lebih awal. Psikotes panjang menguras konsentrasi.',
          'Tes kepribadian: jawab jujur dan konsisten. Berusaha tampil "sempurna" justru sering terlihat tidak konsisten.',
          'Tes yang memakai waktu (misalnya hitung cepat atau ketelitian): stabilitas tempo sama pentingnya dengan kecepatan.',
          'Wawancara psikologi biasanya menggali pengalaman nyata. Siapkan 5–6 cerita pengalaman memakai kerangka STAR.',
        ],
      },
    ],
    ingat: ['Seleksi psikologi = psikotes + LGD + wawancara psikologi.', 'Jawab jujur dan konsisten; siapkan cerita STAR.'],
    sumber: [FAQ_PCPM],
    video: [cariYt('persiapan psikotes rekrutmen tips'), cariYt('tes kraepelin pauli tips')],
  },
  {
    id: 'lgd',
    kelompok: 'psikologi',
    judul: 'Leaderless Group Discussion (LGD)',
    ringkas: 'Cara berperan efektif di diskusi kelompok tanpa pemimpin.',
    menit: 6,
    bagian: [
      {
        judul: 'Apa itu LGD',
        isi: ['Diskusi kelompok tanpa ketua yang ditunjuk. Peserta diberi kasus lalu harus mencapai kesimpulan bersama dalam waktu terbatas. Yang diamati umumnya cara berpikir, komunikasi, kerja sama, dan inisiatif, bukan siapa yang paling banyak bicara.'],
      },
      {
        judul: 'Kerangka yang bisa dipakai (tips)',
        poin: [
          'Buka dengan menyepakati tujuan dan pembagian waktu, misalnya 5 menit pahami kasus, 15 menit diskusi, 5 menit simpulan.',
          'Bawa argumen dengan data dari kasus, lalu kaitkan ke dampak (misalnya stabilitas harga, masyarakat, UMKM).',
          'Dengarkan dan rangkum pendapat orang lain sebelum menanggapi. Beri ruang untuk yang belum bicara.',
          'Jika buntu, tawarkan kriteria penilaian bersama (biaya, dampak, risiko, waktu).',
          'Tutup dengan simpulan yang jelas dan rencana tindak lanjut.',
        ],
      },
      {
        judul: 'Hindari',
        poin: ['Memotong pembicaraan atau mendominasi.', 'Diam sepanjang diskusi.', 'Berdebat soal hal kecil sampai waktu habis.'],
      },
    ],
    ingat: ['Sepakati tujuan dan waktu di awal.', 'Argumen berbasis data kasus.', 'Rangkum, libatkan, simpulkan.'],
    sumber: [FAQ_PCPM],
    video: [cariYt('leaderless group discussion tips'), cariYt('LGD tes BUMN bank tips simulasi')],
  },
  {
    id: 'wawancara-akhir',
    kelompok: 'psikologi',
    judul: 'Wawancara Akhir dan Leadership Forum',
    ringkas: 'Menyusun jawaban STAR dan menunjukkan pemahaman peran BI.',
    menit: 7,
    bagian: [
      {
        judul: 'Kerangka STAR',
        poin: [
          'Situation: konteks singkat (1–2 kalimat).',
          'Task: tanggung jawabmu.',
          'Action: apa yang KAMU lakukan (bagian terpanjang).',
          'Result: hasil terukur dan pelajaran.',
        ],
      },
      {
        judul: 'Pertanyaan yang hampir pasti muncul (tips)',
        poin: [
          'Mengapa ingin bergabung dengan BI? Kaitkan dengan tujuan BI (stabilitas nilai rupiah, sistem pembayaran, sistem keuangan) dan pengalamanmu.',
          'Ceritakan kegagalan atau konflik dan apa yang kamu pelajari.',
          'Isu ekonomi terkini dan pendapatmu. Baca siaran pers hasil RDG terbaru di bi.go.id sebelum wawancara.',
          'Kesediaan ditempatkan di seluruh Indonesia.',
        ],
      },
      {
        judul: 'Latihan',
        isi: ['Pakai menu Wawancara di aplikasi ini: tulis jawaban dengan kolom STAR, lalu latih bicara dengan stopwatch 2 menit per jawaban.'],
      },
    ],
    ingat: ['STAR: Situation, Task, Action (paling panjang), Result.', 'Baca hasil RDG terbaru sebelum wawancara.'],
    sumber: [FAQ_PCPM, { nama: 'Bank Indonesia: Siaran pers', url: 'https://www.bi.go.id/id/publikasi/ruang-media/news-release/default.aspx' }],
    video: [cariYt('STAR method interview answers'), cariYt('wawancara kerja bank sentral tips')],
  },
  {
    id: 'kesehatan',
    kelompok: 'psikologi',
    judul: 'Tes Kesehatan dan Psikiatri',
    ringkas: 'Apa yang biasanya disiapkan menjelang tes kesehatan.',
    menit: 3,
    bagian: [
      {
        judul: 'Isi tahap ini',
        isi: ['FAQ PCPM menyebut seleksi kesehatan terdiri atas tes kesehatan dan tes psikiatri. Ikuti instruksi persiapan yang dikirim panitia karena itu yang berlaku.'],
      },
      {
        judul: 'Persiapan umum (tips)',
        poin: ['Tidur cukup dan hindari begadang beberapa hari sebelumnya.', 'Ikuti aturan puasa bila diminta untuk tes laboratorium.', 'Bawa dokumen dan obat rutin bila ada, dan sampaikan riwayat kesehatan dengan jujur.'],
      },
    ],
    ingat: ['Tahap kesehatan = tes kesehatan + tes psikiatri.', 'Ikuti instruksi panitia.'],
    sumber: [FAQ_PCPM],
  },
];
