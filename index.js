const fastify = require("fastify")({
  logger: true,
});

let users = require("./data/users");

fastify.get("/", async (request, reply) => {
  return { status: "active" };
});

fastify.get("/users", async (request, reply) => {
  const data = await fetchListUsers();
  return data;
});

fastify.get("/users/:userId", async (request, reply) => {
  const { userId } = request.params;
  const user = await fetchOneUser(+userId);
  return user;
});

fastify.put("/users/:userId", async (request, reply) => {
  const { userId } = request.params;
  const { name, username } = request.body;
  const user = await updateOneUser({ name, username }, +userId);
  return user;
});

fastify.post("/users", async (request, reply) => {
  const { name, username } = request.body;
  const user = await postOneUser({ name, username });
  return user;
});

fastify.delete("/users/:userId", async (request, reply) => {
  const { userId } = request.params;
  const user = await deleteOneUser(+userId);
  return user;
});

const fetchListUsers = () => {
  const data = users;
  return promiseSimulator(data);
};

const fetchOneUser = (id) => {
  const user = users.find((user) => user.id === id);
  return promiseSimulator(user);
};

const updateOneUser = (payload, id) => {
  const usersCopy = [...users];
  const userToUpdate = usersCopy.find((user) => user.id === id);
  const updatedUser = { ...userToUpdate, ...payload };
  const userToUpdateIndex = usersCopy.findIndex((item) => item.id === id);
  usersCopy[userToUpdateIndex] = updatedUser;
  users = usersCopy;

  return promiseSimulator(updatedUser);
};

const postOneUser = (payload) => {
  const usersCopy = [...users];
  const id = usersCopy[usersCopy.length - 1].id + 1;
  const newUser = { id, ...payload };
  usersCopy.push(newUser);

  users = usersCopy;

  return promiseSimulator(newUser);
};

const deleteOneUser = (id) => {
  const usersCopy = [...users];
  const userToDeleteIndex = usersCopy.findIndex((item) => item.id === id);
  usersCopy.splice(userToDeleteIndex, 1);

  users = usersCopy;

  return promiseSimulator({
    message: `User ${id} deleted successfully`,
  });
};

const promiseSimulator = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      resolve({
        data,
      }),
      Math.random() * 1000
    );
  });
};

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
