import { CustomHandler, PropsMaker } from "shared/types/handlers";
import { Session } from "shared/types/attributes";
import { ActionTypes, Items, ItemTypes, RoomTypes } from "shared/types/slots";
import { simpleResponse, updateSessionAttributes } from "shared/manipulators";
import * as stateResponses from "responses/states";
import inventoryDialogs from "responses/inventories/personal";
import roomResponses from "responses/rooms";
import globalDialogs from "responses/inventories/global";
import { ActionDialog } from "shared/types/rooms";
import endGame from "handlers/play/endGame";

type Props = {
  item: ItemTypes;
  action: ActionTypes;
};

const interact: CustomHandler<Props> = (handlerInput, { action, item }) => {
  let speech = "";

  const { attributesManager, responseBuilder } = handlerInput;
  const session = attributesManager.getSessionAttributes() as Session;
  const { inventory, curRoom } = session;

  const actionDialog = determineActionDialog(item, action, inventory, curRoom);

  if (!actionDialog) {
    return simpleResponse(responseBuilder, {
      speech: stateResponses.exception[action].ssml,
      reprompt: stateResponses.play.reprompt.ssml,
    });
  }

  updateSessionAttributes(
    attributesManager,
    addActionToSession(session, item, action, actionDialog.score)
  );

  if (actionDialog.endsGame) {
    speech += actionDialog.ssml;
    if (actionDialog.winsGame) speech += stateResponses.play.win.ssml;
    return endGame(handlerInput, { speech });
  }

  return simpleResponse(responseBuilder, {
    speech: actionDialog.ssml,
    reprompt: stateResponses.play.reprompt.ssml,
  });
};

export const makeInteractProps: PropsMaker = (session, action, thing) => {
  return {
    // if user looks without a thing, we assume they mean to look at the room
    item: action === "look" && !thing ? session.curRoom : (thing as ItemTypes),
    action,
  };
};

/************** HELPERS **************/

function determineActionDialog(
  item: ItemTypes,
  action: ActionTypes,
  inventory: ItemTypes[],
  curRoom: RoomTypes
): ActionDialog | undefined {
  if (!item || !Items.includes(item)) return undefined;

  let actionDialogs: ActionDialog[] = [];

  if (inventory.includes(item) && inventoryDialogs[item]) {
    actionDialogs = inventoryDialogs[item]![action] || [];
  } else if (roomResponses[curRoom].items[item]) {
    actionDialogs = roomResponses[curRoom].items[item]![action] || [];
  } else if (globalDialogs[item]) {
    actionDialogs = globalDialogs[item]![action] || [];
  }

  return actionDialogs.find(
    ({ trigger }) =>
      inventory.includes(trigger as ItemTypes) ||
      curRoom === trigger ||
      !trigger
  );
}

function addActionToSession(
  { inventory, score }: Session,
  item: ItemTypes,
  action: ActionTypes,
  bonus: number = 0
) {
  const newSession = {
    score: score + bonus,
    inventory: inventory.slice(),
  };

  if (action === "take" && !inventory.includes(item)) {
    newSession.inventory.push(item);
  }

  return newSession;
}

export default interact;
