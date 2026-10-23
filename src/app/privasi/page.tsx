import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi & Pengelolaan Data Brief",
  description:
    "Penjelasan transparan mengenai informasi apa yang dikumpulkan melalui formulir proyek Velora Studio dan bagaimana data tersebut dilindungi.",
};

export default function PrivasiPage() {
  return (
    <>
      <section className="studio-grid-dark border-b border-white/10 py-16 text-[#f7f6fb] md:py-22">
        <div className="editorial-container max-w-4xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7fa3ff]">
            KEBIJAKAN PRIVASI
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Penggunaan informasi brief secara wajar dan bertanggung jawab.
          </h1>
          <p className="text-base leading-relaxed text-[#b9b5ce]">
            Kami hanya meminta informasi yang benar-benar diperlukan untuk memahami kebutuhan
            proyek dan menghubungi Anda kembali.
          </p>
        </div>
      </section>

      <section className="bg-[#faf9fc] py-16 md:py-24">
        <div className="editorial-container max-w-4xl space-y-8">
          <div className="space-y-6 rounded-2xl border border-[#dad6e8] bg-white p-7 text-sm leading-relaxed text-[#433f59] sm:p-10 sm:text-base">
            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#151324]">
                1. Informasi yang Anda kirimkan
              </h2>
              <p>
                Saat Anda mengisi formulir Mulai Proyek, kami memproses nama, alamat email,
                nomor WhatsApp (bila diisi), nama usaha, kategori layanan, serta ringkasan
                kebutuhan proyek yang Anda tulis secara sukarela.
              </p>
            </div>

            <div className="space-y-2 border-t border-[#e2dfec] pt-6">
              <h2 className="font-display text-xl font-bold text-[#151324]">
                2. Tujuan pemrosesan
              </h2>
              <p>
                Informasi tersebut digunakan semata-mata oleh pengelola Velora Studio untuk
                meninjau kelayakan teknis, membalas pertanyaan Anda, dan menyiapkan proposal
                ruang lingkup kerja. Kami tidak menjual, menyewakan, atau membagikan isi brief
                Anda ke pengiklan maupun analitik pihak ketiga.
              </p>
            </div>

            <div className="space-y-2 border-t border-[#e2dfec] pt-6">
              <h2 className="font-display text-xl font-bold text-[#151324]">
                3. Penyimpanan &amp; keamanan akses
              </h2>
              <p>
                Ketika penyimpanan server diaktifkan, data brief disimpan pada basis data
                PostgreSQL dengan Row-Level Security aktif dan hanya dapat diakses melalui
                kredensial server terproteksi milik pengelola Velora Studio. Jangan pernah
                mengirimkan kata sandi akun, kunci rahasia API, atau nomor kartu pembayaran di
                dalam formulir publik.
              </p>
            </div>

            <div className="space-y-2 border-t border-[#e2dfec] pt-6">
              <h2 className="font-display text-xl font-bold text-[#151324]">
                4. Retensi &amp; permintaan penghapusan
              </h2>
              <p>
                Anda dapat meminta pembaruan atau penghapusan catatan brief proyek yang pernah
                dikirimkan kapan saja dengan menghubungi kanal komunikasi resmi Velora Studio
                disertai alamat email pengirim atau kode referensi brief (`VLR-...`).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
