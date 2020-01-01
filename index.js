const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

let browser;
const getBrowser = async () => {
  if (browser) return browser;
  browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  return browser;
};

app.get("/", async (req, res, next) => {
  try {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto("https://google.com");
    const screenshotData = await page.screenshot();
    await page.close();
    res
      .status(200)
      .type("png")
      .send(screenshotData)
      .end();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await getBrowser();
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;
