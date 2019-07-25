import { RequestHandler, HandlerInput } from "ask-sdk-core";
import exceptionResponses from "responses/states/exception";
import validator from "shared/validator";
import { Session, StateTypes } from "shared/types/attributes";
import startNewGame from "handlers/play/startNewGame";
import {
  welcomeFirstTimeUser,
  welcomeInterruptedUser,
  welcomeReturningUser,
} from "handlers/welcome/welcomeUser";
import resumeGame from "handlers/play/resumeGame";

const welcomeHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .launchRequest()
      .getValue();
  },
  handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const {
      inventory,
      visits,
    } = attributesManager.getSessionAttributes() as Session;

    if (inventory.length) return welcomeInterruptedUser(handlerInput);
    if (visits > 0) return welcomeReturningUser(handlerInput);
    else return welcomeFirstTimeUser(handlerInput);
  },
};

const noDontResumeGameHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput)
      .noIntent()
      .state("WELCOME")
      .getValue();
  },
  handle(handlerInput) {
    return startNewGame(handlerInput, {
      speech: exceptionResponses.startOver.ssml,
    });
  },
};

const yesResumeGameHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput)
      .yesIntent()
      .state("WELCOME")
      .getValue();
  },
  handle(handlerInput: HandlerInput) {
    return resumeGame(handlerInput);
  },
};

export default [welcomeHandler, noDontResumeGameHandler, yesResumeGameHandler];
