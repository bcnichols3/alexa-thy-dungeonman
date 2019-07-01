const manipulators = require("./manipulators");
const validators = require("./validator");

const { allSubwayIds } = require("../constants");

const misc = {
  getLineIdFromSlot(routeSlot) {
    if (routeSlot.id === "W") return "NQR";

    for (let i = 0; i < allSubwayIds.length; i++) {
      const line = allSubwayIds[i];

      if (line === routeSlot.id || line.includes(routeSlot.id)) {
        return line;
      }
    }
    return undefined;
  },
};

module.exports = Object.assign(manipulators, validators, misc);
