const Hapi = require("@hapi/hapi");

const home = require("./lib/home");
const api = require("./lib/api");

const init = async () => {
  const PORT = process.env.PORT || 8080;
  const ENV = process.env.NODE_ENV || "local";
  const HOST = ENV === "production" ? "0.0.0.0" : "localhost";
  const server = Hapi.server({
    port: PORT,
    host: HOST
  });

  server.route(home);
  await server.register(api, {
    routes: {
      prefix: "/api"
    }
  });
  await server.start();
  console.log(`Server running on port ${PORT}`);
};

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

init();
