# htmltoimg

Generates image for given url or html.

## Setting up and running locally

```sh
npm i
npm start
```

## API

Path: `/api/htmltoimg`
Method: `POST`
Parameters:
_ `url`: url of the page
_ `html`: html content of page (pass in either one of `url` or `html`) \* `type`: image type, can be either `png` or `jpeg`

```js
{
    url: "https://google.com",
    html: "html content", // pass in either url or html
    type: "png", // jpeg or png
}
```

The Joi validation object:

```js
Joi.object({
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
  .without("fullPage", ["clip"]);
```

## TODO

- Add tests
- Accept image type, `png` or `jpeg`
-
