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

function goToRoom(handlerInput, { thing, room, speech = "" }) {
  const { attributesManager, responseBuilder } = handlerInput;

  const direction = thing;

  const headedTo = direction ? room.connections[direction] : "dungeon";

  if (!headedTo)
    return simpleResponse(responseBuilder, {
      speech: play.invalid.go.ssml,
    });

  updateSessionAttributes(attributesManager, {
    curRoom: headedTo,
  });

  return simpleResponse(responseBuilder, {
    speech: speech + rooms[headedTo].intro.default.ssml,
    reprompt: play.reprompt.ssml,
  });
}

function interact(handlerInput, { speech = "", action = "take", thing }) {
  const { attributesManager, responseBuilder } = handlerInput;
  const session = attributesManager.getSessionAttributes();

  const item = determineItem(thing, session);

  if (!item || !item[action]) {
    return simpleResponse(responseBuilder, {
      speech: play.invalid[action].ssml,
      reprompt: play.reprompt.ssml,
    });
  }

  updatePlayer(handlerInput, { thing, item, action });

  if (item[action].endsGame) {
    speech += item[action].ssml;
    if (item[action].winsGame) speech += play.win.ssml;
    return endGame(handlerInput, { speech });
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

function determineItem(thing, { curRoom, inventory }) {
  const doesPossessItem = inventory.includes(thing);

  if (doesPossessItem) return rooms.inventory[thing];

  return rooms[curRoom].items[thing] || rooms.global.items[thing] || null;
}

function updatePlayer({ attributesManager }, { thing, item, action }) {
  const { inventory, score } = attributesManager.getSessionAttributes();
  const doesPossessItem = inventory.includes(thing);

  if (item[action].score !== undefined) {
    updateSessionAttributes(attributesManager, {
      score: score + item[action].score,
    });
  }

  if (action === "take" && !doesPossessItem) {
    updateSessionAttributes(attributesManager, {
      inventory: inventory.concat([thing]),
    });
  }
}
