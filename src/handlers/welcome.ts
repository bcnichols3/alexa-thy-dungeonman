import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { CustomHandler } from "shared/types/handlers";
import welcomeResponses from "responses/states/welcome";
import { startNewGame } from "handlers/common";
import validator from "helpers/validator";

/************** HANDLERS **************/

const welcomeHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .launchRequest()
      .getValue();
  },
  handle(handlerInput: HandlerInput) {
    return firstTimeUser(handlerInput, {});
  },
};

export default [welcomeHandler];

/************** FREESTANDING HANDLE FUNCS **************/

const firstTimeUser: CustomHandler = handlerInput => {
  return startNewGame(handlerInput, {
    speech: welcomeResponses.firstTime.ssml,
  });
};

// function returningUser(handlerInput) {
//   return goToRoom(handlerInput, { speech: welcome.returning.ssml });
// }
