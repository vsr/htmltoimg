module.exports = (req, res, next) => {
  res.type("text").send(`
        htmltoimg
        API for generating image for given url or html.

        Make a POST request to "/api/htmltoimg" with either "url" or "html" parameters to get an image.
        Checkout https://github.com/vsr/htmltoimg for detailed information.
    `);
};
