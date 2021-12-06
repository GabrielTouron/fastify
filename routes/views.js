const { fetchListUsers, fetchOneUser } = require("../services/users");
const { fetchScoresPodium } = require("../services/scores");

module.exports = function (fastify, opts, done) {
  fastify.get("/home", async (request, reply) => {
    const { data: users } = await fetchListUsers();
    const { data: podium } = await fetchScoresPodium();

    users.forEach((user) => {
      user.link = `http://localhost:3000/user/${user.id}`;
    });

    const params = {
      users,
      podium,
    };

    reply.view("./views/index.hbs", params);
  });

  fastify.get("/user/:userId", async (request, reply) => {
    const { userId } = request.params;

    const { data: user } = await fetchOneUser(+userId);

    const params = {
      user,
    };

    reply.view("./views/user.hbs", params);
  });

  fastify.get("/", async (request, reply) => {
    reply.redirect("/home");
  });

  done();
};
