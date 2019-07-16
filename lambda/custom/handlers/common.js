const {
  simpleResponse,
  updateSessionAttributes,
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

/************** FREESTANDING HANDLE FUNCS **************/

function goToRoom(handlerInput, { speech = "" }) {
  const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;

  const dirSlot = getSlot(requestEnvelope, "thing");
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

function interact(handlerInput, { speech = "", action = "take" }) {
  const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;
  const thingSlot = getSlot(requestEnvelope, "thing");

  const session = attributesManager.getSessionAttributes();

  const curRoom = session.curRoom || "dungeon";

  const item =
    rooms[curRoom].items[thingSlot.id] || rooms.global.items[thingSlot.id];

  if (!item || !item[action]) {
    return simpleResponse(responseBuilder, {
      speech: play.invalid.look.ssml,
      reprompt: play.reprompt.ssml,
    });
  }

  if (item[action].score) {
    updateSessionAttributes(attributesManager, {
      score: session.score + item.score,
    });
  }

  if (item[action].endsGame) {
    return endGame(handlerInput, { speech: speech + item[action].ssml });
  }

  return simpleResponse(responseBuilder, {
    speech: item[action].ssml,
    reprompt: play.reprompt.ssml,
  });
}

function endGame(handlerInput, { speech = "" }) {
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

module.exports = {
  endGame,
  goToRoom,
  interact,
  sayGoodbye,
};
