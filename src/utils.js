const puppeteer = require("puppeteer");

let browser;

const getBrowserForced = async () => {
  browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  return browser;
};
const getBrowser = async () => {
  if (browser && browser.isConnected()) return browser;
  return getBrowserForced();
};

module.exports = {
  getBrowser
};
