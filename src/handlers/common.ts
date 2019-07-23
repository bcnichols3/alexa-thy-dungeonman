import { CustomHandler } from "shared/types/handlers";
import { initialSession, Session } from "shared/types/attributes";
import rooms from "responses/rooms";
import {
  ActionTypes,
  Items,
  ItemTypes,
  RoomTypes,
  ThingTypes,
} from "shared/types/slots";
import { ActionDialogMap } from "shared/types/rooms";
import inventoryDialogs from "responses/inventories/personal";
import globalDialogs from "responses/inventories/global";
import { AttributesManager } from "ask-sdk-core";
import stateResponses from "responses/states";
import invalid from "responses/inventories/invalid";
import { simpleResponse, updateSessionAttributes } from "shared/manipulators";

export const startNewGame: CustomHandler = (handlerInput, { speech }) => {
  const { attributesManager } = handlerInput;

  updateSessionAttributes(attributesManager, {
    ...initialSession,
  });

  return goToRoom(handlerInput, {
    speech,
    curRoom: rooms.parapets, // fake movement into the dungeon
    thing: "south",
  });
};

export const goToRoom: CustomHandler = (
  handlerInput,
  { thing, curRoom, speech = "" }
) => {
  const { attributesManager, responseBuilder } = handlerInput;

  if (!curRoom)
    return simpleResponse(responseBuilder, {
      speech: invalid.go.ssml,
    });

  const headedTo = thing ? (curRoom.connections[thing] as RoomTypes) : null;

  if (!headedTo)
    return simpleResponse(responseBuilder, {
      speech: invalid.go.ssml,
    });

  updateSessionAttributes(attributesManager, {
    curRoom: headedTo,
  });

  return simpleResponse(responseBuilder, {
    speech: speech + rooms[headedTo].intro.default.ssml,
    reprompt: stateResponses.PLAY.reprompt.ssml,
  });
};

export const interact: CustomHandler = (
  handlerInput,
  { speech = "", action = "take", thing = "flask" }
) => {
  const { attributesManager, responseBuilder } = handlerInput;
  const session = attributesManager.getSessionAttributes() as Session;

  const item = Items.includes(thing as ItemTypes)
    ? determineItem(thing as ItemTypes, session)
    : null;

  if (!item || !item[action]) {
    return simpleResponse(responseBuilder, {
      speech: stateResponses.PLAY.invalid[action].ssml,
      reprompt: stateResponses.PLAY.reprompt.ssml,
    });
  }

  updatePlayer(attributesManager, thing, item, action);

  if (item[action]!.endsGame) {
    speech += item[action]!.ssml;
    if (item[action]!.winsGame) speech += stateResponses.PLAY.win.ssml;
    return endGame(handlerInput, { speech });
  }

  return simpleResponse(responseBuilder, {
    speech: item[action]!.ssml,
    reprompt: stateResponses.PLAY.reprompt.ssml,
  });
};

export const endGame: CustomHandler = (handlerInput, { speech = "" }) => {
  const { attributesManager, responseBuilder } = handlerInput;

  updateSessionAttributes(attributesManager, {
    state: "GOODBYE",
  });

  const { score } = attributesManager.getSessionAttributes();

  return simpleResponse(responseBuilder, {
    speech: speech + `<p>Your score was ${score}</p>`,
    reprompt: stateResponses.GOODBYE.playAgain.ssml,
  });
};

export const sayGoodbye: CustomHandler = (handlerInput, { speech = "" }) => {
  const { responseBuilder } = handlerInput;

  speech += stateResponses.GOODBYE.final.ssml;

  const builder = responseBuilder.speak(speech).withShouldEndSession(true);

  return builder.getResponse();
};

/************** HELPER FUNCTIONS **************/

function determineItem(item: ItemTypes, { inventory, curRoom }: Session) {
  const doesPossessItem = inventory.includes(item);

  if (doesPossessItem) return inventoryDialogs[item];

  return rooms[curRoom].items[item] || globalDialogs[item] || null;
}

function updatePlayer(
  attributesManager: AttributesManager,
  thing: ThingTypes,
  item: ActionDialogMap,
  action: ActionTypes
) {
  const { inventory, score } = attributesManager.getSessionAttributes();
  const doesPossessItem = inventory.includes(thing);

  if (item[action] && item[action]!.score) {
    updateSessionAttributes(attributesManager, {
      score: score + item[action]!.score,
    });
  }

  if (action === "take" && !doesPossessItem) {
    updateSessionAttributes(attributesManager, {
      inventory: inventory.concat([thing]),
    });
  }
}
