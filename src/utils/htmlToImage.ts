import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const htmlToPng = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    const element = await page.$(".ticket");
    if (!element) throw new Error("Ticket element not found");

    const screenshot = await element.screenshot({
      type: "png",
      omitBackground: true,
    });

    return Buffer.isBuffer(screenshot) ? screenshot : Buffer.from(screenshot);
  } finally {
    await browser.close();
  }
};
