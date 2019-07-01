module.exports = Object.freeze({
  // States of the skill
  state: {
    WELCOME: "WELCOME",
    SETTINGS: "SETTINGS",
    GOODBYE: "GOODBYE",
  },
  allSubwayIds: [
    "7",
    "123",
    "456",
    "ACE",
    "BDFM",
    "G",
    "JZ",
    "L",
    "NQR",
    "S",
    "SIR",
  ],
  newPersist: {
    numVisits: 0,
    favoriteLineId: null,
    lastTrain: [null, null, {}],
    acceptedPermissions: [],
  },
});
