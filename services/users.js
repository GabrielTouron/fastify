let usersDb = require("../data/users");
const { promiseSimulator } = require("../utils");
const createUserScore = require("../domain/score");

const fetchListUsers = async () => {
  const users = await promiseSimulator(usersDb);

  return {
    data: users,
    type: "users",
    metadatas: "some metadatas",
  };
};

const fetchOneUser = async (id) => {
  const fetchOneUser = usersDb.find((user) => user.id === id);
  const user = await promiseSimulator(fetchOneUser);

  return {
    data: user,
    type: "users",
    metadatas: "some metadatas",
  };
};

const updateOneUser = async (payload, id) => {
  const usersCopy = [...usersDb];
  const userToUpdate = usersCopy.find((user) => user.id === id);
  const updatedUser = { ...userToUpdate, ...payload };
  const userToUpdateIndex = usersCopy.findIndex((item) => item.id === id);
  usersCopy[userToUpdateIndex] = updatedUser;
  usersDb = usersCopy;

  const userUpdated = await promiseSimulator(updatedUser);

  return {
    data: userUpdated,
    type: "users",
    metadatas: "some metadatas",
  };
};

const postOneUser = (payload) => {
  const usersCopy = [...usersDb];

  const id = usersCopy[usersCopy.length - 1].id + 1;
  const newUser = { id, ...payload };
  usersCopy.push(newUser);

  usersDb = usersCopy;

  return {
    data: newUser,
    type: "users",
    metadatas: "some metadatas",
  };
};

const deleteOneUser = (id) => {
  const usersCopy = [...usersDb];
  const userToDeleteIndex = usersCopy.findIndex((item) => item.id === id);
  usersCopy.splice(userToDeleteIndex, 1);

  usersDb = usersCopy;

  return {
    data: `User ${id} deleted successfully`,
    type: "users",
    metadatas: "some metadatas",
  };
};

const postOneUserScore = (value, id) => {
  const usersCopy = [...usersDb];
  const userToUpdate = usersCopy.find((user) => user.id === id);
  const scoreId = userToUpdate.scores[userToUpdate.scores.length - 1].id + 1;
  const userToUpdateIndex = usersCopy.findIndex((item) => item.id === id);
  const userScore = createUserScore(scoreId, value);
  usersCopy[userToUpdateIndex].scores.push(userScore);
  usersCopy[userToUpdateIndex].scores.push(userScore);
  usersDb = usersCopy;

  return {
    data: userScore,
    type: "scores",
    metadatas: "some metadatas",
  };
};

module.exports = {
  fetchListUsers,
  fetchOneUser,
  updateOneUser,
  postOneUser,
  deleteOneUser,
  postOneUserScore,
};
