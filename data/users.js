const { getRandomScore } = require("../utils");

let users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    scores: [
      {
        id: 1,
        value: getRandomScore(),
        date: new Date("December 1, 2021 15:24:00"),
      },
      {
        id: 2,
        value: getRandomScore(),
        date: new Date("December 2, 2021 15:24:00"),
      },
    ],
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    scores: [
      {
        id: 1,
        value: getRandomScore(),
        date: new Date("December 1, 2021 15:24:00"),
      },
      {
        id: 2,
        value: getRandomScore(),
        date: new Date("December 2, 2021 15:24:00"),
      },
    ],
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    scores: [
      {
        id: 1,
        value: getRandomScore(),
        date: new Date("December 1, 2021 15:24:00"),
      },
      {
        id: 2,
        value: getRandomScore(),
        date: new Date("December 2, 2021 15:24:00"),
      },
    ],
  },
  {
    id: 4,
    name: "Alta Barryh",
    username: "Tali",
    scores: [
      {
        id: 1,
        value: getRandomScore(),
        date: new Date("December 1, 2021 15:24:00"),
      },
      {
        id: 2,
        value: getRandomScore(),
        date: new Date("December 2, 2021 15:24:00"),
      },
    ],
  },
];

module.exports = users;
