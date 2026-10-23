export type ProjectTier = "client" | "concept";
export type ProjectCategory = "website" | "aplikasi" | "sistem";

export type VeloraProject = {
  id: string;
  slug: string;
  index: string;
  tier: ProjectTier;
  tierBadge: string;
  category: ProjectCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  clientName: string | null;
  liveUrl: string | null;
  pairedSlug?: string;
  pairedLabel?: string;
  summary: string;
  coverDesktop: string;
  desktopGallery: string[];
  mobileGallery: string[];
  stack: string[];
  challenge: string;
  approach: string;
  architectureDecisions: string[];
  workflowSteps: string[];
  honestScopeNote: string;
};

export const VELORA_PROJECTS: VeloraProject[] = [
  {
    id: "ikbar-barbershop",
    slug: "ikbar-barbershop",
    index: "01",
    tier: "client",
    tierBadge: "Proyek Klien · Production Live",
    category: "website",
    categoryLabel: "Website Bisnis & Alur Booking",
    title: "Ikbar Barbershop",
    subtitle: "Pengalaman digital barbershop lokal dengan alur konsultasi gaya rambut & pemesanan langsung.",
    clientName: "Ikbar / Dinasti Barbershop",
    liveUrl: "https://ikbar-barbershop.vercel.app",
    pairedSlug: "ikbar-cms-dashboard",
    pairedLabel: "Terhubung dengan Ikbar CMS Dashboard",
    summary:
      "Website publik berkecepatan tinggi yang dirancang untuk memperjelas layanan cukur pria, menampilkan portofolio potongan nyata, dan memotong hambatan calon pelanggan menuju reservasi.",
    coverDesktop: "/projects/ikbar-hero-desktop.jpg",
    desktopGallery: [
      "/projects/ikbar-hero-desktop.jpg",
      "/projects/ikbar-section-desktop.jpg",
    ],
    mobileGallery: ["/projects/ikbar-hero-mobile.jpg"],
    stack: ["React", "Vite", "Tailwind CSS", "Supabase", "Responsive UI"],
    challenge:
      "Pelanggan lokal sering ragu datang sebelum melihat hasil potongan asli, daftar layanan, lokasi yang akurat, serta cara bertanya jadwal tanpa harus menebak-nebak jam buka.",
    approach:
      "Velora menyusun arsitektur halaman satu alur dari positioning visual yang maskulin dan bersih, galeri karya barber nyata, rincian layanan, hingga eskalasi reservasi instan di perangkat mobile.",
    architectureDecisions: [
      "Komposisi hero kontras gelap yang menempatkan foto karya asli sebagai titik fokus utama, bukan ilustrasi stok.",
      "Pemisahan data konten ke backend Supabase agar teks, layanan, dan galeri bisa diperbarui pemilik melalui panel CMS pendamping.",
      "Tata letak mobile-first mengingat mayoritas pengunjung lokal mengakses situs langsung dari ponsel.",
    ],
    workflowSteps: [
      "Discovery kebutuhan operasional barbershop & alur kedatangan pelanggan",
      "Penyusunan struktur informasi, tipografi editorial, dan galeri potongan",
      "Integrasi state data dinamis dengan panel CMS internal",
      "Pengujian lintas layar ponsel & perilisan produksi di Vercel",
    ],
    honestScopeNote:
      "Studi kasus klien nyata yang telah rilis publik. Metrik bisnis internal klien tidak dipublikasikan demi menjaga privasi pemilik usaha.",
  },
  {
    id: "ikbar-cms-dashboard",
    slug: "ikbar-cms-dashboard",
    index: "02",
    tier: "client",
    tierBadge: "Proyek Klien · Aplikasi Admin",
    category: "aplikasi",
    categoryLabel: "Aplikasi Web · Self-Service CMS",
    title: "Ikbar CMS Dashboard",
    subtitle: "Panel kendali mandiri bagi pemilik usaha untuk memperbarui isi website tanpa menyentuh kode.",
    clientName: "Ikbar / Dinasti Barbershop",
    liveUrl: "https://ikbar-barbershop-5rx3.vercel.app/dashboard",
    pairedSlug: "ikbar-barbershop",
    pairedLabel: "Mengelola konten Ikbar Barbershop",
    summary:
      "Aplikasi admin privat dengan autentikasi Google terproteksi agar pemilik barbershop dapat mengubah informasi layanan, foto karya, dan konten operasional kapan saja secara mandiri.",
    coverDesktop: "/projects/ikbar-cms-hero-desktop.jpg",
    desktopGallery: ["/projects/ikbar-cms-hero-desktop.jpg"],
    mobileGallery: ["/projects/ikbar-cms-hero-mobile.jpg"],
    stack: ["React", "TypeScript", "Supabase Database", "Google OAuth", "Protected Routes"],
    challenge:
      "Banyak website UMKM menjadi usang sebulan setelah rilis karena setiap perubahan harga, jam buka, atau foto mengharuskan pemilik menghubungi developer lagi.",
    approach:
      "Kami merancang panel manajemen khusus yang hanya menampilkan kontrol yang benar-benar dipakai pemilik sehari-hari, diamankan dengan pembatasan akun Google resmi milik pengelola.",
    architectureDecisions: [
      "Gerbang autentikasi Google OAuth dengan whitelist akses hanya untuk akun resmi pengelola Ikbar Barbershop.",
      "Antarmuka CRUD yang disederhanakan untuk penggunaan cepat lewat ponsel maupun laptop tanpa istilah teknis yang membingungkan.",
      "Sinkronisasi langsung ke basis data utama sehingga perubahan konten tampil di website publik tanpa rebuild manual.",
    ],
    workflowSteps: [
      "Pemetaan bagian konten yang paling sering diubah oleh pemilik usaha",
      "Perancangan skema tabel, aturan keamanan akses, dan Google OAuth",
      "Pembangunan antarmuka editor ringkas & validasi input",
      "Serah terima akses pengelola beserta panduan operasional singkat",
    ],
    honestScopeNote:
      "Halaman live menampilkan gerbang login terproteksi (akses dibatasi khusus pengelola Ikbar Barbershop untuk melindungi data operasional klien).",
  },
  {
    id: "dzikri-mount-guide",
    slug: "dzikri-mount-guide",
    index: "03",
    tier: "client",
    tierBadge: "Proyek Klien · Production Live",
    category: "website",
    categoryLabel: "Website Layanan & Katalog Rute",
    title: "Dzikri Mount Guide",
    subtitle: "Hub informasi pemandu & porter pendakian gunung dengan struktur paket rute yang transparan.",
    clientName: "Dzikri Mountain Guide",
    liveUrl: "https://dzikri-mount-guide.vercel.app",
    summary:
      "Platform layanan pendakian Gunung Ciremai, Papandayan, Prau, dan Merbabu yang menyajikan pilihan paket guide/porter, dokumentasi lapangan, serta FAQ keselamatan secara terstruktur.",
    coverDesktop: "/projects/dzikri-hero-desktop.jpg",
    desktopGallery: [
      "/projects/dzikri-hero-desktop.jpg",
      "/projects/dzikri-section-desktop.jpg",
      "/projects/dzikri-guide.jpg",
    ],
    mobileGallery: ["/projects/dzikri-hero-mobile.jpg"],
    stack: ["Semantic Web", "Custom CSS Architecture", "Interactive Filtering", "Mobile Optimization"],
    challenge:
      "Calon pendaki membutuhkan kepastian soal cakupan layanan porter/guide, jalur pendakian yang dilayani, dan gambaran biaya awal sebelum memulai diskusi perjalanan.",
    approach:
      "Velora membangun halaman bernuansa alam pegunungan yang tenang namun informatif: menggabungkan tabel perbandingan paket per wilayah, filter dokumentasi lapangan, dan FAQ persiapan fisik/cuaca.",
    architectureDecisions: [
      "Tabel perbandingan harga porter vs guide+porter yang diadaptasi menjadi kartu bertumpuk rapi saat dibuka di layar ponsel.",
      "Filter kategori galeri (Sunrise, Summit, Pendaki, Porter) agar calon pendaki melihat bukti pengalaman lapangan yang relevan.",
      "Aset ringan dan minim skrip berat supaya tetap cepat dibuka di area dengan sinyal seluler tidak stabil.",
    ],
    workflowSteps: [
      "Riset alur pertanyaan calon pendaki & pemetaan paket gunung",
      "Desain sistem warna organik & hierarki pembacaan paket trip",
      "Implementasi filter dokumentasi, akordion FAQ, dan optimasi performa seluler",
      "Deployment produksi & pengecekan keterbacaan di berbagai ukuran ponsel",
    ],
    honestScopeNote:
      "Proyek klien nyata yang aktif digunakan sebagai kanal informasi dan reservasi layanan pendakian.",
  },
  {
    id: "ritme-operasi",
    slug: "ritme-operasi",
    index: "04",
    tier: "concept",
    tierBadge: "Konsep · Eksplorasi Studio",
    category: "sistem",
    categoryLabel: "Sistem Bisnis & Visibilitas Alur Kerja",
    title: "Ritme Operasi",
    subtitle: "Eksplorasi ruang kendali operasional untuk memantau antrean pesanan dan keputusan lintas tim.",
    clientName: null,
    liveUrl: null,
    summary:
      "Studi desain internal Velora tentang bagaimana pemilik usaha dapat melihat pekerjaan yang sedang berjalan, tertahan, dan menunggu persetujuan tanpa tenggelam dalam spreadsheet terpisah.",
    coverDesktop: "",
    desktopGallery: [],
    mobileGallery: [],
    stack: ["System Design", "Workflow State", "Role Clarity", "Dashboard UX"],
    challenge:
      "Saat pesanan harian meningkat, koordinasi via grup chat sering membuat tugas penting terlewat karena tidak ada satu layar rujukan bersama.",
    approach:
      "Kami mengeksplorasi antarmuka berbasis status tanggung jawab—menampilkan hanya indikator yang memicu tindakan nyata, bukan grafik dekoratif.",
    architectureDecisions: [
      "Pengelompokan tugas ke dalam tiga status tegas: Aktif Dikerjakan, Menunggu Konfirmasi, dan Siap Serah Terima.",
      "Catatan keputusan kontekstual langsung di samping item pekerjaan agar riwayat diskusi tidak tercecer.",
      "Pengurangan elemen visual berlebih supaya staf lapangan langsung paham langkah berikutnya dalam hitungan detik.",
    ],
    workflowSteps: [
      "Eksplorasi pola masalah operasional umum pada tim bisnis kecil-menengah",
      "Penyusunan hierarki status & prototipe komponen ruang kerja",
      "Evaluasi keterbacaan antarmuka pada skenario penggunaan harian",
    ],
    honestScopeNote:
      "Eksplorasi konsep internal Velora Studio. Bukan proyek klien dan tidak mengklaim metrik bisnis terverifikasi.",
  },
  {
    id: "katalog-bumi-rasa",
    slug: "katalog-bumi-rasa",
    index: "05",
    tier: "concept",
    tierBadge: "Konsep · Eksplorasi Studio",
    category: "website",
    categoryLabel: "Website Katalog Produk Editorial",
    title: "Katalog Bumi Rasa",
    subtitle: "Eksplorasi presentasi katalog produk lokal dengan narasi asal-usul bahan dan alur pemesanan B2B/ritel.",
    clientName: null,
    liveUrl: null,
    summary:
      "Studi tata letak katalog digital bagi brand F&B atau kriya lokal yang ingin mengangkat kualitas cerita produk sekaligus memudahkan pembeli memilih varian.",
    coverDesktop: "",
    desktopGallery: [],
    mobileGallery: [],
    stack: ["Editorial Layout", "Product Storytelling", "Structured Catalog", "Conversion UX"],
    challenge:
      "Banyak katalog produk lokal hanya menumpuk kisi foto seragam tanpa menjelaskan keunggulan bahan, takaran, atau cara pemesanan grosir vs satuan.",
    approach:
      "Menggabungkan ritme halaman bergaya majalah editorial untuk produk unggulan dengan indeks spesifikasi teknis yang ringkas dan mudah dipindai.",
    architectureDecisions: [
      "Pemisahan jalur aksi antara pembeli satuan dan mitra kafe/reseller sejak paruh atas halaman.",
      "Kartu spesifikasi bahan & masa simpan yang dirancang jelas tanpa membebani estetika foto produk.",
      "Struktur konten siap dihubungkan ke CMS apabila katalog berkembang secara musiman.",
    ],
    workflowSteps: [
      "Studi arsitektur konten brand produk lokal",
      "Eksplorasi tipografi kontras dan tata letak kartu produk non-generik",
      "Validasi responsivitas struktur katalog di layar sempit",
    ],
    honestScopeNote:
      "Eksplorasi konsep internal Velora Studio untuk memperlihatkan pendekatan arsitektur konten produk.",
  },
  {
    id: "arus-kas",
    slug: "arus-kas",
    index: "06",
    tier: "concept",
    tierBadge: "Demo Internal · Aplikasi Web",
    category: "aplikasi",
    categoryLabel: "Aplikasi Pencatatan & Ringkasan Kas",
    title: "Arus Kas",
    subtitle: "Prototipe pencatatan kas masuk-keluar harian yang ringan untuk tim operasional kecil.",
    clientName: null,
    liveUrl: null,
    summary:
      "Eksplorasi antarmuka aplikasi web internal untuk merapikan rekap pemasukan cabang, pengeluaran operasional kecil, dan verifikasi penutupan hari.",
    coverDesktop: "",
    desktopGallery: [],
    mobileGallery: [],
    stack: ["Web App UI", "Form Ergonomics", "Period Summary", "Audit Trail"],
    challenge:
      "Aplikasi akuntansi penuh sering terasa terlalu rumit bagi staf kasir harian, sementara catatan manual di kertas menyulitkan pemilik meninjau kondisi mingguan.",
    approach:
      "Memfokuskan layar utama pada kecepatan input transaksi berulang, label kategori yang akrab, serta status rekonsiliasi tutup buku harian.",
    architectureDecisions: [
      "Input transaksi satu layar dengan validasi nominal jelas untuk meminimalkan salah ketik di jam sibuk.",
      "Ringkasan periode bersih yang membedakan kas operasional terverifikasi dan pengeluaran yang menunggu bukti nota.",
      "Desain komponen modular yang dapat diadaptasi ke alur kerja spesifik tiap usaha.",
    ],
    workflowSteps: [
      "Pemetaan friksi input kas harian pada usaha ritel/F&B kecil",
      "Perancangan alur input cepat & ringkasan verifikasi pemilik",
      "Uji interaksi keyboard & layar sentuh",
    ],
    honestScopeNote:
      "Demo eksplorasi internal Velora Studio. Ditampilkan secara transparan sebagai contoh rancangan antarmuka aplikasi.",
  },
];

export const CLIENT_PROJECTS = VELORA_PROJECTS.filter((p) => p.tier === "client");
export const CONCEPT_PROJECTS = VELORA_PROJECTS.filter((p) => p.tier === "concept");

export function getProjectBySlug(slug: string): VeloraProject | undefined {
  return VELORA_PROJECTS.find((item) => item.slug === slug);
}
