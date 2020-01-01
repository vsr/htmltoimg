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

## TODO

- Add tests
- Accept image type, `png` or `jpeg`
-
