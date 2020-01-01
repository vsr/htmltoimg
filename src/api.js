const express = require("express");
const { getBrowser } = require("./utils");

const router = express.Router();

router.get("/htmltoimg", async (req, res, next) => {
  try {
    const browser = await getBrowser();
    const page = await browser.newPage();
    if (req.body.url) {
      await page.goto(req.body.url);
    } else if (req.body.html) {
      await page.setContent(req.body.html);
    } else {
      throw new Error("Pass either url or html content.");
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
