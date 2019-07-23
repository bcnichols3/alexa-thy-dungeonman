import { RequestHandler } from "ask-sdk-core";
import exception from "responses/states/exception";
import { startNewGame } from "handlers/common";
import { StateTypes } from "shared/types/attributes";
import validator from "helpers/validator";
import { simpleResponse, updateSessionAttributes } from "helpers/manipulators";

/************** HANDLERS **************/

const helpHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .helpIntent()
      .getValue();
  },
  handle({ attributesManager, responseBuilder }) {
    updateSessionAttributes(attributesManager, { state: "WELCOME" });
    return simpleResponse(responseBuilder, {
      speech: exception.help.ssml,
    });
  },
};

const repeatHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .repeatIntent()
      .getValue();
  },
  handle({ attributesManager, responseBuilder }) {
    const { reprompt } = attributesManager.getSessionAttributes();
    return simpleResponse(responseBuilder, {
      speech: exception.repeat.ssml,
      reprompt,
    });
  },
};

const startOverHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput)
      .startOverIntent()
      .state("PLAY")
      .getValue();
  },
  handle(handlerInput) {
    return startNewGame(handlerInput, {
      speech: exception.startOver.ssml,
    });
  },
};

const fallbackHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput)
      .fallbackIntent()
      .state("WELCOME", "GOODBYE")
      .getValue();
  },
  handle({ responseBuilder }) {
    return simpleResponse(responseBuilder, {
      speech: exception.error.ssml,
    });
  },
};

export default [helpHandler, repeatHandler, startOverHandler, fallbackHandler];
