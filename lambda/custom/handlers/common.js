const sample = require("lodash/sample");
const camelCase = require("lodash/camelCase");

const {
  simpleResponse,
  compileTemplate,
  updateSessionAttributes,
  createList,
  createSSML,
  getSlot,
} = require("../helpers");
const { rooms, goodbye, exception } = require("../responses");

/**
	Common 'handlers' are funcs that can be called inside actual handler
	functions, and are passed two arguments:
	@param {handlerInput} object to perform alexa functions, and
	@param {options} object contains preprompt, expected data, etc.
*/

const commonHandlers = {
  interact,
  killPlayer,
  goToRoom,
  sayGoodbye,
};

/************** FREESTANDING HANDLE FUNCS **************/

function interact(handlerInput, options) {
  const { attributesManager, responseBuilder } = handlerInput;

  const { curRoom } = attributesManager.getSessionAttributes();
  const thingSlot = getSlot(requestEnvelope, "thing");

  const thing = rooms[curRoom].interactables[thingSlot.id];

  if (!thing) return simpleResponse(responseBuilder, exception.error);
  if (thing.handler) return thing.handler(handlerInput, options);
  if (thing.response) return simpleResponse(responseBuilder, thing.response);

  return simpleResponse(responseBuilder, exception.error);
}

function goToRoom(handlerInput, { speech = "" }) {
  const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;

  const dirSlot = getSlot(requestEnvelope, "direction");

  const curRoom = attributesManager.getSessionAttributes().curRoom || "dungeon";

  const headedTo = dirSlot.id
    ? rooms[curRoom].connections[dirSlot.id]
    : "dungeon";

  if (!headedTo) return simpleResponse(responseBuilder, exception.error);

  updateSessionAttributes(attributesManager, {
    curRoom: headedTo,
  });

  speech = speech + rooms[headedTo].intro.speech.ssml;
  const reprompt = rooms.reprompt[0].ssml;

  return simpleResponse(responseBuilder, { speech, reprompt });
}

function killPlayer(handlerInput, { speech = "" }) {
  const { attributesManager, responseBuilder } = handlerInput;

  updateSessionAttributes(attributesManager, {
    state: state.GOODBYE,
  });
  console.log("speech", speech);

  speech += goodbye.score.speech.ssml;
  const reprompt = goodbye.playAgain.speech.ssml;

  return simpleResponse(responseBuilder, { speech, reprompt });
}

function sayGoodbye(handlerInput, { speech = "", card, permissions }) {
  const { attributesManager, responseBuilder } = handlerInput;

  speech += sample(goodbye.final.speech).ssml;

  const builder = responseBuilder.speak(speech).withShouldEndSession(true);
  if (card) {
    const { title, content, smallImageUrl, largeImageUrl } = card;
    builder.withStandardCard(title, content, smallImageUrl, largeImageUrl);
  } else if (permissions) {
    builder.withAskForPermissionsConsentCard(permissions);
  }

  return builder.getResponse();
}

module.exports = commonHandlers;
