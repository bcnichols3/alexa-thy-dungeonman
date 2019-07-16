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
const { state } = require("../constants");
const { rooms, goodbye, play } = require("../responses");

/**
	Common 'handlers' are funcs that can be called inside actual handler
	functions, and are passed two arguments:
	@param {handlerInput} object to perform alexa functions, and
	@param {options} object contains preprompt, expected data, etc.
*/

const commonHandlers = {
  killPlayer,
  goToRoom,
  lookAtItem,
  takeItem,
  sayGoodbye,
};

/************** FREESTANDING HANDLE FUNCS **************/

function goToRoom(handlerInput, { speech = "" }) {
  const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;

  const dirSlot = getSlot(requestEnvelope, "thing");

  console.log("direction", dirSlot.id);

  const curRoom = attributesManager.getSessionAttributes().curRoom || "dungeon";

  const headedTo = dirSlot.id
    ? rooms[curRoom].connections[dirSlot.id]
    : "dungeon";

  if (!headedTo)
    return simpleResponse(responseBuilder, {
      speech: play.invalid.go.ssml,
    });

  updateSessionAttributes(attributesManager, {
    curRoom: headedTo,
  });

  return simpleResponse(responseBuilder, {
    speech: speech + rooms[headedTo].intro.ssml,
    reprompt: play.reprompt.ssml,
  });
}

function takeItem(handlerInput, { speech = "" }) {
  const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;
  const thingSlot = getSlot(requestEnvelope, "thing");

  const session = attributesManager.getSessionAttributes();
  const curRoom = session.curRoom || "dungeon";
  const score = session.score || 0;

  if (thingSlot.id === "dagger") {
    updateSessionAttributes(attributesManager, {
      score: score + 25,
    });
    return simpleResponse(responseBuilder, {
      speech: play.dagger.ssml,
      reprompt: play.reprompt.ssml,
    });
  }

  const item = rooms[curRoom].items[thingSlot.id];

  if (!item || !item.take)
    return simpleResponse(responseBuilder, {
      speech: play.invalid.take.ssml,
      reprompt: play.reprompt.ssml,
    });

  if (item.isLethal)
    return killPlayer(handlerInput, { speech: speech + item.take.ssml });

  return simpleResponse(responseBuilder, {
    speech: speech + item.take.ssml,
    reprompt: play.reprompt.ssml,
  });
}

function lookAtItem(handlerInput, {}) {
  const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;
  const thingSlot = getSlot(requestEnvelope, "thing");

  const curRoom = attributesManager.getSessionAttributes().curRoom || "dungeon";

  const item = rooms[curRoom].items[thingSlot.id];

  if (!item || !item.look)
    return simpleResponse(responseBuilder, {
      speech: play.invalid.look.ssml,
      reprompt: play.reprompt.ssml,
    });

  return simpleResponse(responseBuilder, {
    speech: item.look.ssml,
    reprompt: play.reprompt.ssml,
  });
}

function killPlayer(handlerInput, { speech = "" }) {
  const { attributesManager, responseBuilder } = handlerInput;

  updateSessionAttributes(attributesManager, {
    state: state.GOODBYE,
  });

  const { score } = attributesManager.getSessionAttributes();

  return simpleResponse(responseBuilder, {
    speech: speech + `<p>Your score was ${score}</p>`,
    reprompt: goodbye.playAgain.ssml,
  });
}

function sayGoodbye(handlerInput, { speech = "", card, permissions }) {
  const { responseBuilder } = handlerInput;

  speech += goodbye.final.ssml;

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
