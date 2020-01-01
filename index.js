const express = require("express");

const { getBrowser } = require("./src/utils");
const home = require("./src/home");
const api = require("./src/api");

const app = express();
app.use(express.json());

app.get("/", home);
app.use("/api", api);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await getBrowser();
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;
