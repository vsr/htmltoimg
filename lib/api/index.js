const Boom = require("@hapi/boom");
const { getBrowser, validateRequest, validateResponse } = require("./utils");

const CONTENT_TYPES = {
  png: "image/png",
  jpeg: "image/jpeg"
};

module.exports = {
  name: "htmltoimgApi",
  version: "1.0.0",
  register: async function(server, options) {
    server.route({
      method: "POST",
      path: "/htmltoimg",
      options: { validate: validateRequest },
      handler: async function(request, h) {
        const url = request.payload.url;
        const html = request.payload.html;
        const type = request.payload.type;
        const fullPage = request.payload.fullPage;
        const clip = request.payload.clip;
        const omitBackground = request.payload.omitBackground;
        const viewport = request.payload.viewport;
        const element = request.payload.element;
        try {
          const browser = await getBrowser();
          const page = await browser.newPage();
          if (viewport) {
            await page.setViewport(viewport);
          }
          if (url) {
            await page.goto(url);
          } else {
            await page.setContent(html);
          }
          const screenshotOptions = { type, fullPage, clip, omitBackground };
          console.log(screenshotOptions);
          let screenshotSource = page;
          let $el = null;
          if (element) {
            $el = await page.$(element);
            if ($el) {
              screenshotSource = $el;
            }
          }

          const screenshotData = await screenshotSource.screenshot(
            screenshotOptions
          );
          await page.close();
          return h.response(screenshotData).type(CONTENT_TYPES[type]);
        } catch (err) {
          console.log("error", err);
          return Boom.badImplementation(
            "Something went wrong while generating image. :("
          );
        }
      }
    });

    await getBrowser();
  }
};
