let users = require("../data/users");
const { promiseSimulator } = require("../utils");

const fetchScoresPodium = async () => {
  let listPodiumUsers = [];

  for (let i = 0; i < users.length; i++) {
    listPodiumUsers.push(createPodiumUser(users[i]));
  }

  const scorePodium = await promiseSimulator(
    getThreeBestScores(listPodiumUsers)
  );

  return {
    data: scorePodium,
    type: "scores",
    metadatas: "some metadatas",
  };
};

createPodiumUser = (user) => {
  const totalScore = user.scores.reduce((acc, curr) => acc + curr.value, 0);
  const parties = user.scores.length + 1;
  return {
    userId: user.id,
    username: user.username,
    totalScore,
    parties,
  };
};

const fetchListScores = () => {
  const listScores = users.map((user) =>
    user.scores.map((score) => {
      return {
        userId: user.id,
        username: user.username,
        scoreId: score.id,
        value: score.value,
        date: score.date,
      };
    })
  );
  const data = [].concat(...listScores);
  return promiseSimulator(data);
};

const getThreeBestScores = (listPodiumUsers) => {
  return listPodiumUsers
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);
};

module.exports = {
  fetchScoresPodium,
  fetchListScores,
};
