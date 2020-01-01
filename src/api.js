const express = require("express");
const { getBrowser } = require("./utils");

const router = express.Router();

router.post("/htmltoimg", async (req, res, next) => {
  let url;
  let html;
  if (req.body.url) {
    url = req.body.url;
  } else if (req.body.html) {
    html = req.body.html;
  } else {
    throw new Error("Pass either url or html content.");
  }
  try {
    const browser = await getBrowser();
    const page = await browser.newPage();
    if (url) {
      await page.goto(url);
    } else {
      await page.setContent(html);
    }
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

module.exports = router;
