import { RequestHandler } from "ask-sdk-core";
import * as stateResponses from "responses/states";
import { getSlot, simpleResponse } from "shared/manipulators";
import validator from "shared/validator";
import gameActions from "handlers/play/gameActions";

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
    const action = getSlot(requestEnvelope, "action").id;
    const thing = getSlot(requestEnvelope, "thing").id;

    if (gameActions[action]) {
      const props = gameActions[action].makeProps(session, action, thing);
      return gameActions[action].handler(handlerInput, props);
    }

    return simpleResponse(responseBuilder, {
      speech: stateResponses.exception.error.ssml,
    });
  },
};

export default [ActionIntent];
