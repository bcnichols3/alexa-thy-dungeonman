import { CustomHandler, PropsMaker } from "shared/types/handlers";
import { Session } from "shared/types/attributes";
import { ActionTypes, ItemTypes } from "shared/types/slots";
import { simpleResponse, updateSessionAttributes } from "shared/manipulators";
import * as stateResponses from "responses/states";
import endGame from "handlers/play/endGame";
import determineActionDialog from "handlers/play/gameActions/interact/determineActionDialog";
import makeNewSession from "handlers/play/gameActions/interact/makeNewSession";

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
    makeNewSession(session, item, action, actionDialog.score)
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

export default interact;
