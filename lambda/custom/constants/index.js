module.exports = Object.freeze({
  // States of the skill
  state: {
    WELCOME: "WELCOME",
    GOODBYE: "GOODBYE",
  },
  newPersist: {
    numVisits: 0,
  },
  newSession: {
    curRoom: "dungeon",
    score: 0,
    state: "WELCOME",
    inventory: [],
  },
});
