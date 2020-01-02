const puppeteer = require("puppeteer");
const Joi = require("@hapi/joi");

let browser;

const getBrowserForced = async () => {
  browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  return browser;
};
const getBrowser = async () => {
  if (browser && browser.isConnected()) return browser;
  return getBrowserForced();
};

const validateRequest = {
  payload: Joi.object({
    url: Joi.string().uri(),
    html: Joi.string(),
    element: Joi.string(),
    type: Joi.string()
      .case("lower")
      .valid("png", "jpeg")
      .default("png"),
    fullPage: Joi.boolean(),
    clip: Joi.object({
      x: Joi.number(),
      y: Joi.number(),
      width: Joi.number(),
      height: Joi.number()
    }).and("x", "y", "width", "height"),
    omitBackground: Joi.boolean(),
    viewport: Joi.object({
      width: Joi.number().required(),
      height: Joi.number().required(),
      deviceScaleFactor: Joi.number(),
      isMobile: Joi.boolean(),
      isLandscape: Joi.boolean()
    })
  })
    .xor("url", "html")
    .without("fullPage", ["clip"])
};

const validateResponse = {
  status: {
    200: Joi.binary(),
    400: Joi.object({
      statusCode: Joi.number(),
      error: Joi.string(),
      message: Joi.string()
    })
  }
};

module.exports = {
  getBrowser,
  validateRequest,
  validateResponse
};
