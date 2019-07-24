import { RequestHandler } from "ask-sdk-core";
import { Session, StateTypes } from "shared/types/attributes";
import validator from "shared/validator";
import { simpleResponse, updateSessionAttributes } from "shared/manipulators";
import * as stateResponses from "responses/states";
import startNewGame from "handlers/play/startNewGame";

const helpHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .helpIntent()
      .getValue();
  },
  handle({ attributesManager, responseBuilder }) {
    updateSessionAttributes(attributesManager, { state: "WELCOME" });
    return simpleResponse(responseBuilder, {
      speech: stateResponses.exception.help.ssml,
      reprompt: stateResponses.play.reprompt.ssml,
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
    const session = attributesManager.getSessionAttributes() as Session;
    const { speech, reprompt } = session.previous;
    return simpleResponse(responseBuilder, {
      speech: stateResponses.exception.repeat.ssml,
      reprompt: speech + reprompt,
    });
  },
};

const startOverHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput)
      .startOverIntent()
      .getValue();
  },
  handle(handlerInput) {
    return startNewGame(handlerInput, {
      speech: stateResponses.exception.startOver.ssml,
    });
  },
};

const fallbackHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput)
      .fallbackIntent()
      .getValue();
  },
  handle({ responseBuilder }) {
    return simpleResponse(responseBuilder, {
      speech: stateResponses.exception.error.ssml,
      reprompt: stateResponses.play.reprompt.ssml,
    });
  },
};

export default [helpHandler, repeatHandler, startOverHandler, fallbackHandler];
