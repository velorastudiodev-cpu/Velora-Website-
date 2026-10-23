export type PackageDirection = {
  id: "website-bisnis" | "aplikasi-web" | "sistem-bisnis";
  index: string;
  name: string;
  eyebrow: string;
  priceStatusLabel: string;
  summary: string;
  bestFor: string;
  coreDeliverables: string[];
  typicalExclusions: string[];
  recommended?: boolean;
  serviceType: "website" | "aplikasi" | "sistem";
};

export type ScopeAddon = {
  id: string;
  label: string;
  category: string;
  description: string;
};

export const PACKAGE_DIRECTIONS: PackageDirection[] = [
  {
    id: "website-bisnis",
    index: "01",
    name: "Fondasi Website Bisnis",
    eyebrow: "Kehadiran & Konversi",
    priceStatusLabel: "Estimasi berdasarkan ruang lingkup halaman & konten",
    summary:
      "Untuk pemilik usaha yang membutuhkan website profesional, cepat, dan meyakinkan agar calon pelanggan memahami layanan serta mudah menghubungi Anda.",
    bestFor: "Company profile modern, landing page layanan, katalog produk/jasa terarah.",
    coreDeliverables: [
      "Sesi discovery singkat & pemetaan arsitektur konten",
      "Desain UI/UX editorial orisinal (bukan modifikasi template pasif)",
      "Implementasi responsif penuh di ponsel, tablet, dan desktop",
      "Fondasi SEO teknis, sitemap, optimasi gambar, & deployment produksi",
      "Dokumentasi serah terima yang mudah dipahami",
    ],
    typicalExclusions: [
      "Biaya sewa domain tahunan & layanan pihak ketiga berbayar",
      "Sistem login multi-peran atau logika transaksi kompleks",
    ],
    serviceType: "website",
  },
  {
    id: "aplikasi-web",
    index: "02",
    name: "Website + Custom CMS / Aplikasi Web",
    eyebrow: "Kemandirian & Pengelolaan",
    priceStatusLabel: "Estimasi setelah pemetaan alur & model data",
    summary:
      "Untuk bisnis yang ingin memperbarui isi website secara mandiri dari panel admin khusus, atau membutuhkan aplikasi web terfokus untuk mendukung kerja tim.",
    bestFor: "Ekosistem website + dashboard admin (seperti studi kasus Ikbar), portal internal, MVP terfokus.",
    coreDeliverables: [
      "Seluruh standar kualitas desain & performa Velora Studio",
      "Perancangan skema database PostgreSQL & validasi input server-side",
      "Panel pengelola terproteksi untuk update konten/katalog/status secara mandiri",
      "Autentikasi aman untuk pengelola resmi",
      "Pengujian alur end-to-end & panduan operasional bagi tim klien",
    ],
    typicalExclusions: [
      "Kuota infrastruktur cloud skala besar di luar batas tier standar",
      "Integrasi ERP korporat warisan tanpa dokumentasi API",
    ],
    recommended: true,
    serviceType: "aplikasi",
  },
  {
    id: "sistem-bisnis",
    index: "03",
    name: "Sistem Operasional & Workflow Khusus",
    eyebrow: "Arsitektur Kustom",
    priceStatusLabel: "Proposal khusus berdasarkan discovery alur kerja",
    summary:
      "Untuk organisasi yang memerlukan penyatuan alur pemesanan pelanggan, pelacakan status pekerjaan, pengelolaan jadwal, hingga ringkasan operasional lintas peran.",
    bestFor: "Sistem reservasi terintegrasi, workflow pesanan/inventori, dashboard multi-peran.",
    coreDeliverables: [
      "Audit mendalam alur kerja lapangan & penyusunan blueprint teknis",
      "Pengembangan bertahap (milestone review) agar setiap keputusan teruji",
      "Antarmuka pelanggan publik + ruang kendali internal dalam satu ekosistem",
      "Keamanan akses berbasis peran & perlindungan data server-side",
      "Rencana pemeliharaan dan ruang pengembangan lanjutan pasca-rilis",
    ],
    typicalExclusions: [
      "Perubahan ruang lingkup besar di luar blueprint yang telah disepakati bersama",
      "Dukungan siaga 24/7 tanpa kesepakatan SLA pemeliharaan terpisah",
    ],
    serviceType: "sistem",
  },
];

export const CONFIGURABLE_ADDONS: ScopeAddon[] = [
  {
    id: "self-service-cms",
    label: "Panel Custom CMS Mandiri",
    category: "Konten",
    description: "Ubah teks promo, layanan, harga, dan foto langsung dari HP/laptop tanpa koding.",
  },
  {
    id: "booking-flow",
    label: "Alur Reservasi / Booking Terstruktur",
    category: "Konversi",
    description: "Formulir penjadwalan pelanggan dengan pencatatan status permintaan yang rapi.",
  },
  {
    id: "catalog-filter",
    label: "Katalog Layanan / Produk Berfilter",
    category: "Katalog",
    description: "Pencarian dan pengelompokan item agar pengunjung cepat menemukan pilihan yang relevan.",
  },
  {
    id: "admin-inbox",
    label: "Kotak Masuk Brief / Pesanan Internal",
    category: "Operasional",
    description: "Ruang tinjau permintaan masuk lengkap dengan pembaruan status dan catatan tim.",
  },
  {
    id: "pwa-installable",
    label: "Dukungan Web App Installable (PWA)",
    category: "Akses",
    description: "Memungkinkan staf atau pelanggan menyematkan ikon aplikasi langsung di layar utama ponsel.",
  },
  {
    id: "ongoing-care",
    label: "Opsi Pendampingan & Pemeliharaan Berkala",
    category: "Dukungan",
    description: "Diskusikan skema dukungan pasca-rilis untuk pembaruan minor dan pemantauan teknis.",
  },
];

export const COMPARISON_ROWS = [
  {
    aspect: "Tujuan Utama",
    website: "Memperjelas nilai bisnis & mengarahkan kontak",
    aplikasi: "Kemandirian kelola konten / aplikasi kerja terfokus",
    sistem: "Menyatukan workflow pelanggan & operasi tim",
  },
  {
    aspect: "Pengelolaan Data Harian",
    website: "Konten relatif stabil / update berkala terencana",
    aplikasi: "Dapat diedit mandiri lewat dashboard terproteksi",
    sistem: "Transaksi status, jadwal, atau alur lintas peran",
  },
  {
    aspect: "Basis Data & Server",
    website: "Ringan (fokus halaman publik + form kontak)",
    aplikasi: "Database relasional + autentikasi pengelola",
    sistem: "Model data khusus sesuai proses lapangan",
  },
  {
    aspect: "Cara Memulai Scope",
    website: "Brief singkat & pemetaan halaman prioritas",
    aplikasi: "Pemetaan daftar konten/fitur yang perlu dikelola",
    sistem: "Sesi discovery workflow sebelum estimasi dikunci",
  },
];
