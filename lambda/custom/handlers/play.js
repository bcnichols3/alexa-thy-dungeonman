const { play, exception } = require("../responses");
const { validator, simpleResponse, getSlot } = require("../helpers");
const { goToRoom, interact, endGame } = require("./common");

/************** HANDLERS **************/

const actionsHandlerMap = {
  go: goToRoom,
  take: interact,
  look: interact,
  die(handlerInput) {
    return endGame(handlerInput, { speech: play.die.ssml });
  },
  dance({ responseBuilder }) {
    return simpleResponse(responseBuilder, {
      speech: play.dance.ssml,
      reprompt: play.reprompt.ssml,
    });
  },
  smell({ responseBuilder }) {
    return simpleResponse(responseBuilder, {
      speech: play.smell.ssml,
      reprompt: play.reprompt.ssml,
    });
  },
};

module.exports = [
  {
    /** @param {"Go north OR Take ye flask ETC"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .intent("ActionIntent", "ActionOnlyIntent")
        .getValue();
    },
    handle(handlerInput) {
      const { requestEnvelope, responseBuilder } = handlerInput;
      const actionSlot = getSlot(requestEnvelope, "action");

      const handler = actionsHandlerMap[actionSlot.id];
      if (handler) return handler(handlerInput, {});
      return simpleResponse(responseBuilder, { speech: exception.error.ssml });
    },
  },
];
