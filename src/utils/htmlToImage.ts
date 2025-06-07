import puppeteer from "puppeteer";

export const htmlToPng = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.evaluateHandle("document.fonts.ready");
  const element = await page.$(".ticket");
  if (!element) throw new Error("Ticket element not found");

  const screenshot = await element.screenshot({
    type: "png",
    omitBackground: true,
  });

  await browser.close();
  const buffer = Buffer.isBuffer(screenshot)
    ? screenshot
    : Buffer.from(screenshot as Uint8Array);
  return buffer;
};
