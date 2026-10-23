export type VeloraService = {
  slug: "website-bisnis" | "aplikasi-web" | "sistem-bisnis";
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  idealFor: string[];
  problemsSolved: string[];
  deliverables: Array<{ title: string; detail: string }>;
  cmsAndSystemNote: string;
  relatedProjectSlug: string;
  prefillServiceType: "website" | "aplikasi" | "sistem";
};

export const VELORA_SERVICES: VeloraService[] = [
  {
    slug: "website-bisnis",
    index: "01",
    title: "Website Bisnis & Kehadiran Digital Terarah",
    shortTitle: "Website Bisnis",
    tagline: "Menyusun pesan, bukti kualitas, dan jalur kontak agar calon pelanggan langsung paham nilai usaha Anda.",
    summary:
      "Kami merancang website perusahaan, landing page layanan, serta situs katalog yang tidak berhenti di tampilan rapi—tetapi membantu pengunjung memahami penawaran dan mengambil langkah nyata.",
    idealFor: [
      "UMKM & bisnis jasa lokal yang ingin tampil kredibel serta mudah dihubungi dari ponsel.",
      "Perusahaan atau praktisi spesialis yang butuh menjelaskan layanan kompleks dengan bahasa yang jernih.",
      "Pemilik usaha yang ingin mengelola pembaruan promo, harga, atau galeri secara mandiri melalui CMS.",
    ],
    problemsSolved: [
      "Informasi layanan tersebar di bio media sosial atau chat berulang sehingga calon pelanggan bingung memulai.",
      "Website lama lambat dibuka di HP, sulit diperbarui, atau tampak seperti template generik yang tidak mencerminkan karakter brand.",
      "Alur menuju konsultasi, reservasi, atau permintaan penawaran belum terstruktur dengan baik.",
    ],
    deliverables: [
      {
        title: "Arsitektur Konten & Copywriting Fungsional",
        detail: "Penyusunan urutan informasi, hierarki judul, dan pesan utama yang berangkat dari cara pelanggan mengambil keputusan.",
      },
      {
        title: "Desain Editorial Responsif (Mobile & Desktop)",
        detail: "Komposisi visual khas brand Anda yang diuji di layar sempit ponsel hingga monitor lebar tanpa elemen bertumpuk.",
      },
      {
        title: "Opsi Self-Service CMS Mandiri",
        detail: "Bila konten Anda rutin berubah, kami siapkan panel pengelola khusus seperti pada ekosistem Ikbar Barbershop.",
      },
      {
        title: "Fondasi SEO Teknis, Performa & Rilis",
        detail: "Metadata terstruktur, peta situs, optimasi gambar modern, serta deployment produksi disertai panduan serah terima.",
      },
    ],
    cmsAndSystemNote:
      "Tidak setiap website wajib memakai CMS kompleks. Kami merekomendasikan dashboard pengelola hanya ketika tim Anda benar-benar perlu memperbarui data secara berkala.",
    relatedProjectSlug: "ikbar-barbershop",
    prefillServiceType: "website",
  },
  {
    slug: "aplikasi-web",
    index: "02",
    title: "Aplikasi Web & Dashboard Pengelolaan",
    shortTitle: "Aplikasi Web",
    tagline: "Mengubah pekerjaan manual yang tercecer menjadi ruang kerja digital yang ringkas dan terukur.",
    summary:
      "Untuk tim atau pelaku usaha yang membutuhkan lebih dari halaman informasi: mulai dari panel manajemen konten kustom, portal internal, hingga MVP produk web yang dibangun di atas fondasi kode yang mudah dirawat.",
    idealFor: [
      "Pemilik usaha yang kewalahan mengelola data melalui kombinasi chat dan tabel terpisah.",
      "Founder atau tim yang ingin memvalidasi MVP aplikasi web dengan ruang lingkup inti yang tajam.",
      "Organisasi yang membutuhkan dashboard terbatas berbasis peran (admin, operator, pengelola).",
    ],
    problemsSolved: [
      "Perubahan data operasional sering salah versi karena dikerjakan manual tanpa validasi.",
      "Alat SaaS umum terlalu kaku atau justru terlalu rumit untuk alur kerja harian tim di lapangan.",
      "Kebutuhan otorisasi aman agar hanya personel tertentu yang dapat mengakses atau mengubah data sensitif.",
    ],
    deliverables: [
      {
        title: "Pemetaan Alur Pengguna & Model Data",
        detail: "Perumusan skema database relasional, hak akses peran, dan status data sebelum penulisan kode antarmuka.",
      },
      {
        title: "Antarmuka Aplikasi Berfokus Tugas",
        detail: "Komponen tabel, form tervalidasi, filter cepat, dan umpan balik status yang jelas tanpa dekorasi mengganggu.",
      },
      {
        title: "Autentikasi & Keamanan Server-Side",
        detail: "Perlindungan rute privat, validasi input di server, serta integrasi penyedia login resmi sesuai kebutuhan.",
      },
      {
        title: "Pengujian Alur & Dokumentasi Handover",
        detail: "Verifikasi skenario utama aplikasi dan dokumentasi teknis agar sistem siap dikembangkan di tahap berikutnya.",
      },
    ],
    cmsAndSystemNote:
      "Kami memprioritaskan fitur inti yang langsung memangkas pekerjaan berulang, sehingga aplikasi tetap lincah dan tidak membebani biaya pemeliharaan.",
    relatedProjectSlug: "ikbar-cms-dashboard",
    prefillServiceType: "aplikasi",
  },
  {
    slug: "sistem-bisnis",
    index: "03",
    title: "Sistem Bisnis, Booking & Workflow Operasional",
    shortTitle: "Sistem Bisnis",
    tagline: "Sistem yang mengikuti cara kerja nyata bisnis Anda—bukan memaksa tim menyesuaikan diri dengan template kaku.",
    summary:
      "Kami membantu merancang dan membangun sistem operasional terpadu seperti alur reservasi layanan, pelacakan pesanan, pengelolaan katalog dinamis, persetujuan internal, hingga pelaporan ringkas.",
    idealFor: [
      "Bisnis jasa, klinik/studio/barbershop, wisata, atau F&B dengan alur jadwal dan pesanan harian.",
      "Usaha multi-layanan yang ingin menyatukan halaman pelanggan publik dengan panel operasional belakang layar.",
      "Tim yang ingin menertibkan alur dari permintaan masuk hingga penyelesaian layanan.",
    ],
    problemsSolved: [
      "Jadwal booking sering bentrok atau lambat direspons karena belum ada pencatatan status terpusat.",
      "Pemilik sulit melihat ringkasan permintaan yang baru masuk, sedang diproses, atau sudah selesai hari ini.",
      "Website depan dan pencatatan internal berjalan sendiri-sendiri sehingga staf harus menyalin data dua kali.",
    ],
    deliverables: [
      {
        title: "Audit Proses & Blueprint Arsitektur",
        detail: "Penyelarasan alur kerja lapangan menjadi tahapan status digital yang masuk akal bagi staf maupun pelanggan.",
      },
      {
        title: "Ekosistem Terhubung (Publik + Operasional)",
        detail: "Integrasi mulus antara antarmuka pelanggan dan ruang kendali internal tim pengelola.",
      },
      {
        title: "Integrasi Pihak Ketiga Terukur",
        detail: "Penghubungan ke database cloud, notifikasi email, atau kanal komunikasi resmi bila ruang lingkupnya tervalidasi.",
      },
      {
        title: "Rilis Bertahap & Ruang Evolusi",
        detail: "Arsitektur modular yang memungkinkan penambahan modul baru seiring pertumbuhan pola operasional bisnis.",
      },
    ],
    cmsAndSystemNote:
      "Setiap sistem bisnis dimulai dari sesi discovery untuk memastikan hanya modul yang berdampak nyata yang dibangun.",
    relatedProjectSlug: "ritme-operasi",
    prefillServiceType: "sistem",
  },
];

export function getServiceBySlug(slug: string): VeloraService | undefined {
  return VELORA_SERVICES.find((s) => s.slug === slug);
}
