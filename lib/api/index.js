const { getBrowser } = require("./utils");

module.exports = {
  name: "htmltoimgApi",
  version: "1.0.0",
  register: async function(server, options) {
    server.route({
      method: "POST",
      path: "/htmltoimg",
      handler: async function(request, h) {
        let url;
        let html;
        if (request.payload.url) {
          url = request.payload.url;
        } else if (request.payload.html) {
          html = request.payload.html;
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
          return h.response(screenshotData).type("image/png");
          // res
          //   .status(200)
          //   .type("png")
          //   .send(screenshotData)
          //   .end();
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });

    await getBrowser();
  }
};

// const express = require("express");
// const { getBrowser } = require("./utils");

// const router = express.Router();

// router.post("/htmltoimg", async (req, res, next) => {
//   let url;
//   let html;
//   if (req.body.url) {
//     url = req.body.url;
//   } else if (req.body.html) {
//     html = req.body.html;
//   } else {
//     throw new Error("Pass either url or html content.");
//   }
//   try {
//     const browser = await getBrowser();
//     const page = await browser.newPage();
//     if (url) {
//       await page.goto(url);
//     } else {
//       await page.setContent(html);
//     }
//     const screenshotData = await page.screenshot();
//     await page.close();
//     res
//       .status(200)
//       .type("png")
//       .send(screenshotData)
//       .end();
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// module.exports = router;
