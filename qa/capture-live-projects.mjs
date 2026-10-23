import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public/projects");

async function revealAll(page) {
  await page.evaluate(async () => {
    const step = 450;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 350));
  });
}

const browser = await chromium.launch({ headless: true });

try {
  // 1. Ikbar Barbershop Desktop + Section + Mobile
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
    const page = await ctx.newPage();
    await page.goto("https://ikbar-barbershop.vercel.app", { waitUntil: "networkidle", timeout: 30000 });
    await revealAll(page);
    await page.screenshot({ path: path.join(outDir, "ikbar-hero-desktop.jpg"), type: "jpeg", quality: 88 });
    await page.evaluate(() => window.scrollTo(0, 920));
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(outDir, "ikbar-section-desktop.jpg"), type: "jpeg", quality: 88 });
    await ctx.close();

    const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const mPage = await mCtx.newPage();
    await mPage.goto("https://ikbar-barbershop.vercel.app", { waitUntil: "networkidle", timeout: 30000 });
    await revealAll(mPage);
    await mPage.screenshot({ path: path.join(outDir, "ikbar-hero-mobile.jpg"), type: "jpeg", quality: 88 });
    await mCtx.close();
  }

  // 2. Ikbar CMS Dashboard Desktop + Mobile
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
    const page = await ctx.newPage();
    await page.goto("https://ikbar-barbershop-5rx3.vercel.app/dashboard", { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "ikbar-cms-hero-desktop.jpg"), type: "jpeg", quality: 88 });
    await ctx.close();

    const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const mPage = await mCtx.newPage();
    await mPage.goto("https://ikbar-barbershop-5rx3.vercel.app/dashboard", { waitUntil: "networkidle", timeout: 30000 });
    await mPage.waitForTimeout(500);
    await mPage.screenshot({ path: path.join(outDir, "ikbar-cms-hero-mobile.jpg"), type: "jpeg", quality: 88 });
    await mCtx.close();
  }

  // 3. Dzikri Mount Guide Desktop + Section + Mobile
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
    const page = await ctx.newPage();
    await page.goto("https://dzikri-mount-guide.vercel.app", { waitUntil: "networkidle", timeout: 30000 });
    await revealAll(page);
    await page.screenshot({ path: path.join(outDir, "dzikri-hero-desktop.jpg"), type: "jpeg", quality: 88 });
    await page.evaluate(() => {
      const target = Array.from(document.querySelectorAll("h2, section")).find((el) =>
        /paket|layanan|galeri/i.test(el.textContent || "")
      );
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      else window.scrollTo(0, 1800);
    });
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(outDir, "dzikri-section-desktop.jpg"), type: "jpeg", quality: 88 });
    await ctx.close();

    const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const mPage = await mCtx.newPage();
    await mPage.goto("https://dzikri-mount-guide.vercel.app", { waitUntil: "networkidle", timeout: 30000 });
    await revealAll(mPage);
    await mPage.screenshot({ path: path.join(outDir, "dzikri-hero-mobile.jpg"), type: "jpeg", quality: 88 });
    await mCtx.close();
  }

  console.log("Captured all crisp live client screenshots successfully!");
} finally {
  await browser.close();
}
