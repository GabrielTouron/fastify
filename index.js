const fastify = require("fastify")({
  logger: true,
});

// fastify.get("/", async (request, reply) => {
//   return { status: "active" };
// });

fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

fastify.register(require("./routes/users"), { prefix: "/users" });
fastify.register(require("./routes/scores"), { prefix: "/scores" });
fastify.register(require("./routes/views"));

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
