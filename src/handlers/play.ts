import { ActionTypes, ItemTypes } from "shared/types/slots";
import { CustomHandler } from "shared/types/handlers";
import { RequestHandler } from "ask-sdk-core";
import { Session } from "shared/types/attributes";
import StateResponses from "responses/states";
import RoomResponses from "responses/rooms";
import { endGame, goToRoom, interact } from "handlers/common";
import { getSlot, simpleResponse } from "helpers/manipulators";
import validator from "helpers/validator";

/************** HANDLERS **************/

type ActionsHandlersMap = {
  [key in ActionTypes]: CustomHandler;
};

const actionsHandlerMap: ActionsHandlersMap = {
  go: goToRoom,
  take: interact,
  look: interact,
  give: interact,
  talk: interact,
  die(handlerInput) {
    return endGame(handlerInput, { speech: StateResponses.PLAY.die.ssml });
  },
  dance({ responseBuilder }) {
    return simpleResponse(responseBuilder, {
      speech: StateResponses.PLAY.dance.ssml,
      reprompt: StateResponses.PLAY.reprompt.ssml,
    });
  },
  smell({ responseBuilder }) {
    return simpleResponse(responseBuilder, {
      speech: StateResponses.PLAY.smell.ssml,
      reprompt: StateResponses.PLAY.reprompt.ssml,
    });
  },
};

const examine: CustomHandler = (
  { responseBuilder, attributesManager },
  { curRoom }
) => {
  const { inventory } = attributesManager.getSessionAttributes() as Session;
  if (!curRoom)
    return simpleResponse(responseBuilder, {
      speech: StateResponses.EXCEPTION.error.ssml,
    });

  let speech = curRoom.intro.look.ssml;

  const { intro } = curRoom;
  const triggerItem = Object.keys(intro.with).find(item =>
    inventory.includes(item as ItemTypes)
  );
  if (triggerItem) speech = curRoom.intro.with[triggerItem].ssml;
  return simpleResponse(responseBuilder, {
    speech,
    reprompt: StateResponses.PLAY.reprompt.ssml,
  });
};

const ActionIntent: RequestHandler = {
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
    const session = attributesManager.getSessionAttributes();
    const curRoom = RoomResponses[session.curRoom];

    const action = getSlot(requestEnvelope, "action").id;
    const thing = getSlot(requestEnvelope, "thing").id;

    if (!thing && action === "look")
      return examine(handlerInput, { inventory: session.inventory, curRoom });

    const handler = actionsHandlerMap[action];

    return handler
      ? handler(handlerInput, { action, thing, curRoom })
      : simpleResponse(responseBuilder, {
          speech: StateResponses.EXCEPTION.error.ssml,
        });
  },
};

export default [ActionIntent];
