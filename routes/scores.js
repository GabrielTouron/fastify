const { fetchScoresPodium, fetchListScores } = require("../services/scores");

module.exports = function (fastify, opts, done) {
  fastify.get("/", async (request, reply) => {
    const { podium } = request.query;
    if (podium) {
      return await fetchScoresPodium();
    }

    return await fetchListScores();
  });

  done();
};
