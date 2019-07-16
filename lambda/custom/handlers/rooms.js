const { rooms, exception } = require("../responses");
const {
  validator,
  simpleResponse,
  updateSessionAttributes,
  getSlot,
} = require("../helpers");
const { goToRoom, killPlayer, sayGoodbye } = require("./common");

/************** HANDLERS **************/

module.exports = [
  {
    /** @param {"Go {direction}"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .intent("GoIntent")
        .getValue();
    },
    handle(handlerInput) {
      return goToRoom(handlerInput, {});
    },
  },
  {
    /** @param {"Take {thing}"} */
    canHandle(handlerInput) {
      return validator(handlerInput, { log: true })
        .intent("TakeIntent")
        .getValue();
    },
    handle(handlerInput) {
      const {
        requestEnvelope,
        attributesManager,
        responseBuilder,
      } = handlerInput;
      const thingSlot = getSlot(requestEnvelope, "thing");

      const curRoom =
        attributesManager.getSessionAttributes().curRoom || "dungeon";

      console.log("curRoom", curRoom);

      const itemToTake = rooms[curRoom].items[thingSlot.id];

      if (!itemToTake) return simpleResponse(responseBuilder, exception.error);
      console.log("found item");

      const speech = itemToTake.speech.ssml;
      const reprompt = rooms.reprompt[0].ssml;

      if (itemToTake.isLethal) return killPlayer(handlerInput, { speech });

      return simpleResponse(responseBuilder, { speech, reprompt });
    },
  },
];
