const promiseSimulator = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve(data), Math.random() * 4000);
  });
};

const getRandomScore = () => {
  return Math.floor(Math.random() * 1000);
};

module.exports = { promiseSimulator, getRandomScore };
