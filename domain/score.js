const createScore = (id, value) => {
  return {
    id,
    value,
    date: Date.now(),
  };
};

module.exports = createScore;
