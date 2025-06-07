import puppeteer from "puppeteer";

export const htmlToPng = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: ["--no-sandbox", "--use-gl=egl", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
  );
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
