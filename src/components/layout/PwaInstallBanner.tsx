"use client";

import { Download, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "velora_pwa_dismissed_v2";

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const dismissed = window.sessionStorage.getItem(DISMISS_KEY);
    if (dismissed === "1") return;

    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(() => null);
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    window.sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && deferredPrompt && (
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-label="Pasang aplikasi web Velora Studio"
          className="fixed right-4 bottom-4 left-4 z-40 mx-auto max-w-md rounded-xl border border-white/14 bg-[#141325]/96 p-4 text-[#f7f6fb] shadow-xl backdrop-blur-md sm:left-auto"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#7fa3ff]">
                Akses Cepat
              </p>
              <p className="text-sm font-semibold text-white">
                Sematkan Velora Studio ke layar utama perangkat
              </p>
              <p className="text-xs leading-relaxed text-[#b1adc7]">
                Buka katalog karya dan formulir brief lebih cepat layaknya aplikasi ringan.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Tutup pemberitahuan instalasi"
              className="rounded-md p-1 text-[#b1adc7] hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#b1adc7] hover:text-white"
            >
              Nanti saja
            </button>
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#4638d2] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#5344e6]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Pasang</span>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
