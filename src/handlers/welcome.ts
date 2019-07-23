import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { CustomHandler } from "shared/types/handlers";
import welcomeResponses from "responses/states/welcome";
import { startNewGame } from "handlers/common";
import validator from "shared/validator";
import { Session } from "shared/types/attributes";

/************** HANDLERS **************/

const welcomeHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .launchRequest()
      .getValue();
  },
  handle(handlerInput: HandlerInput) {
    const { attributesManager } = handlerInput;
    const { visits } = attributesManager.getSessionAttributes() as Session;

    if (visits > 0) return returningUser(handlerInput, {});
    else return firstTimeUser(handlerInput, {});
  },
};

export default [welcomeHandler];

/************** FREESTANDING HANDLE FUNCS **************/

const firstTimeUser: CustomHandler = handlerInput => {
  return startNewGame(handlerInput, {
    speech: welcomeResponses.firstTime.ssml,
  });
};

const returningUser: CustomHandler = handlerInput => {
  return startNewGame(handlerInput, {
    speech: welcomeResponses.returning.ssml,
  });
};
