export type FaqItem = {
  id: string;
  category: "Layanan & Scope" | "Biaya & Waktu" | "Teknis & Handover";
  question: string;
  answer: string;
};

export const VELORA_FAQS: FaqItem[] = [
  {
    id: "hanya-website-atau-sistem",
    category: "Layanan & Scope",
    question: "Apakah Velora Studio hanya mengerjakan website company profile, atau bisa sampai sistem internal?",
    answer:
      "Keduanya. Kami mengerjakan mulai dari website bisnis yang fokus pada kejelasan penawaran dan konversi, aplikasi web dengan Custom CMS mandiri (seperti studi kasus Ikbar Barbershop + Dashboard), hingga sistem operasional khusus yang menyesuaikan alur kerja usaha Anda.",
  },
  {
    id: "kenapa-harga-tidak-dipukul-rata",
    category: "Biaya & Waktu",
    question: "Mengapa halaman Paket tidak mencantumkan angka harga tunggal yang dipukul rata?",
    answer:
      "Kebutuhan website statis lima halaman sangat berbeda dengan sistem yang memiliki database, login aman, dan panel admin mandiri. Agar jujur dan tidak menyembunyikan asumsi, kami menggunakan arah paket sebagai titik awal diskusi, lalu memberikan estimasi tertulis yang transparan setelah ruang lingkupnya jelas.",
  },
  {
    id: "apakah-bisa-edit-sendiri",
    category: "Teknis & Handover",
    question: "Setelah website rilis, apakah saya bisa mengganti harga, promo, atau foto sendiri dari HP?",
    answer:
      "Sangat bisa apabila proyek Anda menyertakan modul Self-Service Custom CMS. Kami merancang halaman admin yang bersih dan mudah dipahami orang non-teknis, sehingga Anda tidak perlu bergantung pada developer untuk pembaruan konten harian.",
  },
  {
    id: "persiapan-sebelum-mulai",
    category: "Layanan & Scope",
    question: "Apa saja yang perlu saya siapkan sebelum mengirim brief di halaman Mulai Proyek?",
    answer:
      "Anda tidak perlu menyiapkan dokumen teknis rumit. Cukup ceritakan bidang usaha Anda, masalah utama yang ingin dibereskan, siapa yang akan memakai website/sistem tersebut, contoh referensi bila ada, serta perkiraan waktu yang diharapkan.",
  },
  {
    id: "berapa-lama-pengerjaan",
    category: "Biaya & Waktu",
    question: "Berapa lama rata-rata waktu pengerjaan proyek di Velora Studio?",
    answer:
      "Durasi ditentukan oleh kedalaman fitur, kesiapan materi konten/foto, dan kecepatan review tiap tahap. Setelah sesi discovery singkat, kami menyusun jadwal tahapan (Discovery, Design, Development, Launch) yang realistis dan dapat dipantau bersama.",
  },
  {
    id: "domain-hosting-maintenance",
    category: "Biaya & Waktu",
    question: "Apakah biaya domain, hosting, database cloud, dan maintenance bulanan sudah otomatis termasuk?",
    answer:
      "Infrastruktur pihak ketiga seperti nama domain resmi, paket cloud/database berbayar, serta pemeliharaan rutin pasca-rilis dibahas secara terbuka sejak awal supaya kepemilikan akun tetap jelas di tangan Anda dan tidak ada biaya tersembunyi.",
  },
  {
    id: "perbedaan-karya-klien-dan-konsep",
    category: "Layanan & Scope",
    question: "Apakah semua portofolio yang ditampilkan di situs ini merupakan proyek klien asli?",
    answer:
      "Kami memisahkan secara transparan: Ikbar Barbershop, Ikbar CMS Dashboard, dan Dzikri Mount Guide adalah proyek klien nyata yang sudah berjalan di produksi. Adapun Ritme Operasi, Katalog Bumi Rasa, dan Arus Kas diberi label eksplisit Konsep / Demo Internal untuk memperlihatkan cara kami merancang sistem bisnis.",
  },
  {
    id: "serah-terima-dan-dukungan",
    category: "Teknis & Handover",
    question: "Bagaimana proses serah terima dan dukungan jika ada kendala setelah peluncuran?",
    answer:
      "Setiap proyek ditutup dengan proses deployment rapi, penyerahan akses sesuai kesepakatan, dan dokumentasi penggunaan. Jika bisnis Anda membutuhkan pendampingan berkala atau pengembangan fitur fase berikutnya, skemanya dapat disepakati secara fleksibel.",
  },
];
