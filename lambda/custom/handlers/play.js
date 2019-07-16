const { rooms, play, exception } = require("../responses");
const {
  validator,
  simpleResponse,
  updateSessionAttributes,
  getSlot,
} = require("../helpers");
const { goToRoom, takeItem, killPlayer, lookAtItem } = require("./common");

/************** HANDLERS **************/

const actionsHandlerMap = {
  go: goToRoom,
  take: takeItem,
  look: lookAtItem,
  die(handlerInput) {
    return killPlayer(handlerInput, { speech: play.die.ssml });
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
