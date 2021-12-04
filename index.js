const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  return { status: "active" };
});

fastify.get("/data", async (req, rep) => {
  return require("./data/users");
});

fastify.register(require("./routes/users"), { prefix: "/users" });
fastify.register(require("./routes/scores"), { prefix: "/scores" });

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
