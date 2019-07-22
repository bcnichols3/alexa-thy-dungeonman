const { play, rooms, exception } = require("../responses");
const { validator, simpleResponse, getSlot } = require("../helpers");
const { goToRoom, interact, endGame } = require("./common");

/************** HANDLERS **************/

const actionsHandlerMap = {
  go: goToRoom,
  take: interact,
  look: interact,
  give: interact,
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
      const {
        requestEnvelope,
        attributesManager,
        responseBuilder,
      } = handlerInput;
      const { inventory, curRoom } = attributesManager.getSessionAttributes();
      const room = rooms[curRoom];

      const action = getSlot(requestEnvelope, "action").id;
      const thing = getSlot(requestEnvelope, "thing").id;

      if (!thing && action === "look")
        return examine(handlerInput, { inventory, room });


      const handler = actionsHandlerMap[action];
      if (handler) {
        console.log("USING HANDLER MAP", action, thing);

        return handler(handlerInput, { action, thing, room });
      }

      console.log("COULDN'T MATCH ACTION");
      return simpleResponse(responseBuilder, { speech: exception.error.ssml });
    },
  },
];

function examine({ responseBuilder }, { inventory, room }) {
  let speech = room.intro.look.ssml;

  const { intro } = room;
  const triggerItem = Object.keys(intro.with).find(item =>
    inventory.includes(item)
  );
  if (triggerItem) speech = room.intro.with[triggerItem].ssml;
  return simpleResponse(responseBuilder, {
    speech,
    reprompt: play.reprompt.ssml,
  });
}
