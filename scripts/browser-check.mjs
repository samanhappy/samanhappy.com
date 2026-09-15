import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
const base = process.env.CHECK_BASE_URL || "http://127.0.0.1:3100";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
fs.mkdirSync("reports", { recursive: true });
try {
  for (const locale of ["zh", "en"])
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of [
        "",
        "/projects",
        "/writing",
        "/projects/mcphub",
        "/writing/why-i-developed-selectly",
        "/about",
        "/now",
      ]) {
        const response = await page.goto(`${base}/${locale}${route}`);
        assert.equal(response.status(), 200);
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${locale}${route} overflows at ${width}`,
        );
        assert.equal(await page.locator("main h1").count(), 1);
        assert.equal(
          await page.locator("html").getAttribute("lang"),
          locale === "zh" ? "zh-CN" : "en",
        );
        if (!route)
          await page.screenshot({
            path: `reports/home-${locale}-${width}.png`,
            fullPage: true,
          });
      }
    }
  await page.goto(base + "/zh/writing?category=Building#main");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await page.waitForURL(base + "/en/writing?category=Building#main");
  assert.equal(await page.locator(".writing-row").count(), 1);
  await page.getByRole("link", { name: "Independent", exact: true }).click();
  await page.waitForURL("**category=Independent");
  await page.getByText("Still exploring. Notes to come.").waitFor();
  await page.getByRole("link", { name: "All writing", exact: true }).click();
  await page.waitForURL(base + "/en/writing");
  assert.equal(await page.locator(".writing-row").count(), 8);
  for (const route of [
    "/projects/selectly",
    "/writing/why-i-developed-selectly",
    "/about",
    "/now",
  ]) {
    await page.goto(base + "/zh" + route);
    await page.getByRole("link", { name: "Switch to English" }).click();
    await page.waitForURL(base + "/en" + route);
    await page.getByRole("link", { name: "切换到中文" }).click();
    await page.waitForURL(base + "/zh" + route);
  }
  await page.goto(base + "/en/projects/selectly");
  await page
    .locator('.prose a[href="/en/writing/why-i-developed-selectly"]')
    .click();
  await page.waitForURL(base + "/en/writing/why-i-developed-selectly");
  for (const locale of ["zh", "en"]) {
    await page.goto(`${base}/${locale}/feed.xml`);
    assert.equal(
      await page.evaluate(
        () =>
          new DOMParser()
            .parseFromString(
              document.documentElement.textContent,
              "application/xml",
            )
            .querySelectorAll("parsererror").length,
      ),
      0,
    );
  }
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const plain = await noJS.newPage();
  await plain.goto(base + "/en/projects/mcphub");
  assert.equal(await plain.locator("html").getAttribute("lang"), "en");
  await plain.getByRole("link", { name: "切换到中文" }).click();
  await plain.waitForURL(base + "/zh/projects/mcphub");
  await noJS.close();
  assert.deepEqual(errors, []);
  console.log(
    "PASS: 42 responsive pages, bilingual navigation, filters, query/hash preservation, RSS XML and no-JS switching.",
  );
} finally {
  await browser.close();
}
