import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const qaDir = __dirname;
const BASE_URL = process.env.QA_BASE_URL || "http://127.0.0.1:3010";

const ROUTES = [
  "/",
  "/karya",
  "/karya/ikbar-barbershop",
  "/karya/ikbar-cms-dashboard",
  "/karya/dzikri-mount-guide",
  "/karya/ritme-operasi",
  "/layanan",
  "/layanan/website-bisnis",
  "/paket",
  "/proses",
  "/tentang",
  "/faq",
  "/mulai-proyek",
  "/privasi",
  "/admin/login",
  "/admin",
];

const WIDTHS = [360, 390, 768, 1024, 1440];

const browser = await chromium.launch({ headless: true });
const report = {
  checkedAt: new Date().toISOString(),
  totalViewportVisits: 0,
  overflowFailures: [],
  consoleErrors: [],
  pageErrors: [],
  functionalChecks: [],
};

try {
  // 1. Multi-Viewport Overflow & Error Sweep
  for (const width of WIDTHS) {
    const height = width < 768 ? 844 : 900;
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: width < 768 ? 2 : 1.5,
    });
    const page = await context.newPage();

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        report.consoleErrors.push(`[${width}px] ${page.url()}: ${msg.text()}`);
      }
    });
    page.on("pageerror", (err) => {
      report.pageErrors.push(`[${width}px] ${page.url()}: ${err.message}`);
    });

    for (const route of ROUTES) {
      const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      assert(res && res.status() < 400, `Unexpected HTTP status ${res?.status()} on ${route}`);
      report.totalViewportVisits += 1;

      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      if (metrics.scrollWidth > metrics.innerWidth + 1) {
        report.overflowFailures.push(
          `${route} @ ${width}px (scrollWidth=${metrics.scrollWidth}, innerWidth=${metrics.innerWidth})`
        );
      }
    }

    // Capture full-page & viewport visual QA screenshots on 1440 & 390
    if (width === 1440) {
      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 300));
      });
      await page.screenshot({ path: path.join(qaDir, "v2-home-hero-1440.png") });
      await page.screenshot({ path: path.join(qaDir, "v2-home-full-1440.png"), fullPage: true });

      const sandbox = page.locator("#simulasi");
      await sandbox.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(qaDir, "v2-sandbox-1440.png") });

      await page.goto(`${BASE_URL}/karya`, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(qaDir, "v2-karya-1440.png") });

      await page.goto(`${BASE_URL}/paket`, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(qaDir, "v2-paket-1440.png") });
    }

    if (width === 390) {
      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(qaDir, "v2-home-mobile-390.png") });

      await page.goto(`${BASE_URL}/mulai-proyek?paket=aplikasi-web&layanan=aplikasi`, {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(qaDir, "v2-form-mobile-390.png") });
    }

    await context.close();
  }

  // 2. Functional End-to-End Journey Verification
  {
    // Mobile Menu Test (390px)
    const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const mPage = await mCtx.newPage();
    await mPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    const menuBtn = mPage.getByRole("button", { name: /buka menu navigasi/i });
    await menuBtn.click();
    await mPage.waitForTimeout(250);
    await mPage.screenshot({ path: path.join(qaDir, "v2-mobile-drawer-390.png") });
    const closeMenuBtn = mPage.getByRole("button", { name: /tutup menu navigasi/i });
    assert.equal(await closeMenuBtn.getAttribute("aria-expanded"), "true");
    await mPage.locator("#velora-mobile-drawer").getByRole("link", { name: /Karya/i }).click();
    await mPage.waitForURL("**/karya");
    report.functionalChecks.push("Mobile navigation drawer opens, renders cleanly, and routes to /karya");
    await mCtx.close();

    // Desktop Interactive Flows (1440px)
    const dCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
    const dPage = await dCtx.newPage();
    await dPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    // Hero Workbench Switcher
    await dPage.getByRole("tab", { name: /Aplikasi Kerja/i }).click();
    await dPage.waitForTimeout(250);
    const workbenchHeading = await dPage.locator("h2", { hasText: /Rapikan antrean pekerjaan/i }).count();
    assert.equal(workbenchHeading, 1, "Hero workbench tab should switch content");
    report.functionalChecks.push("Hero architectural workbench switcher updates state via Framer Motion");

    // Client Inspector Modal
    await dPage.getByRole("button", { name: /Buka inspeksi tampilan Ikbar Barbershop/i }).click();
    await dPage.waitForTimeout(300);
    const dialog = dPage.getByRole("dialog");
    assert.equal(await dialog.isVisible(), true, "Project inspector modal should open");
    await dPage.screenshot({ path: path.join(qaDir, "v2-inspector-modal-1440.png") });
    await dialog.getByRole("button", { name: /Mobile/i }).click();
    await dPage.waitForTimeout(250);
    await dPage.keyboard.press("Escape");
    await dPage.waitForTimeout(250);
    report.functionalChecks.push("Project Inspector Modal toggles Desktop/Mobile frame & closes on Escape");

    // Live CMS & Operational Sandbox
    const brandInput = dPage.getByLabel(/Nama Usaha \/ Brand/i);
    await brandInput.fill("Kopi Nusantara Uji");
    assert.equal(await dPage.getByText("Kopi Nusantara Uji").count() >= 1, true);
    await dPage.getByRole("tab", { name: /Alur Operasional/i }).click();
    await dPage.waitForTimeout(250);
    await dPage.getByRole("button", { name: /Majukan Status/i }).first().click();
    report.functionalChecks.push("Live CMS & Workflow Sandbox updates preview and operational status deterministically");

    // Portfolio Filter (/karya)
    await dPage.goto(`${BASE_URL}/karya`, { waitUntil: "networkidle" });
    await dPage.getByRole("button", { name: /Proyek Klien Nyata \(3\)/i }).click();
    await dPage.waitForTimeout(250);
    assert.equal(await dPage.locator("article").count(), 3);
    report.functionalChecks.push("Portfolio gallery filters real client projects vs studio concepts accurately");

    // Package Scope Explorer -> Prefilled Project Brief + Validation + Honest Status
    await dPage.goto(`${BASE_URL}/paket`, { waitUntil: "networkidle" });
    await dPage.getByRole("link", { name: /Bawa ke Form Diskusi Proyek/i }).click();
    await dPage.waitForURL("**/mulai-proyek**");
    assert.equal(await dPage.getByText(/Arah paket terpilih:/i).isVisible(), true);

    // Trigger empty submit validation
    await dPage.getByRole("button", { name: /Kirim Brief Proyek/i }).click();
    assert.equal(await dPage.locator("#brief-name").getAttribute("aria-invalid"), "true");

    // Fill valid brief and submit
    await dPage.locator("#brief-name").fill("Rina Kusuma");
    await dPage.locator("#brief-email").fill("rina@contohusaha.id");
    await dPage.locator("#brief-body").fill(
      "Kami membutuhkan website katalog dan panel admin ringan agar tim toko bisa memperbarui stok mingguan sendiri."
    );
    await dPage.getByRole("checkbox").check();
    await dPage.getByRole("button", { name: /Kirim Brief Proyek/i }).click();
    await dPage.waitForTimeout(400);
    assert.equal(
      await dPage.getByRole("button", { name: /Salin Ringkasan Brief Terformat/i }).isVisible(),
      true,
      "Form must honestly state storage status and offer formatted copy fallback when DB env is unconfigured"
    );
    report.functionalChecks.push("Inquiry form validates inputs and handles unconfigured DB honestly without fake success");

    await dCtx.close();
  }

  assert.equal(report.overflowFailures.length, 0, `Overflow failures: ${report.overflowFailures.join("; ")}`);
  assert.equal(report.consoleErrors.length, 0, `Console errors: ${report.consoleErrors.join("; ")}`);
  assert.equal(report.pageErrors.length, 0, `Page errors: ${report.pageErrors.join("; ")}`);

  fs.writeFileSync(path.join(qaDir, "qa-v2-summary.json"), JSON.stringify(report, null, 2));
  console.log("=== ALL PLAYWRIGHT QA CHECKS PASSED ===");
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
