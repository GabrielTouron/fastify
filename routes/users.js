const {
  fetchListUsers,
  fetchOneUser,
  updateOneUser,
  postOneUser,
  deleteOneUser,
  postOneUserScore,
} = require("../services/users");

const fetch = require("node-fetch");

module.exports = function (fastify, opts, done) {
  fastify.get("/", async (request, reply) => {
    const data = await fetchListUsers();
    return data;
  });

  fastify.get("/:userId", async (request, reply) => {
    const { userId } = request.params;
    const user = await fetchOneUser(+userId);
    return user;
  });

  fastify.put("/:userId", async (request, reply) => {
    const { userId } = request.params;
    const { name, username } = request.body;
    const user = await updateOneUser({ name, username }, +userId);
    return user;
  });

  fastify.post("/", async (request, reply) => {
    const { name, username } = request.body;
    const user = postOneUser({ name, username });
    return user;
  });

  fastify.post("/:userId/scores", async (request, reply) => {
    const { userId } = request.params;
    const { value } = request.body;
    const score = postOneUserScore(value, +userId);
    return score;
  });

  fastify.delete("/:userId", async (request, reply) => {
    const { userId } = request.params;
    const user = deleteOneUser(+userId);
    return user;
  });

  done();
};
