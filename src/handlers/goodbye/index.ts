import { RequestHandler } from "ask-sdk-core";
import { StateTypes } from "shared/types/attributes";
import util from "util";
import validator from "shared/validator";
import sayGoodbye from "handlers/goodbye/sayGoodbye";
import startNewGame from "handlers/play/startNewGame";
import exceptionResponses from "responses/states/exception";

const stopHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .cancelOrStopIntent()
      .getValue();
  },
  handle(handlerInput) {
    return sayGoodbye(handlerInput);
  },
};

const yesPlayAgainHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput)
      .state("GOODBYE")
      .yesIntent()
      .getValue();
  },
  handle(handlerInput) {
    return startNewGame(handlerInput, {
      speech: exceptionResponses.startOver.ssml,
    });
  },
};

const doNotPlayAgainHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput, { log: true })
      .state("GOODBYE")
      .noIntent()
      .getValue();
  },
  handle(handlerInput) {
    return sayGoodbye(handlerInput);
  },
};

const sessionEndedHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .sessionEndedRequest()
      .getValue();
  },
  handle({ requestEnvelope, responseBuilder }) {
    if (process.env.NODE_ENV === "local") {
      console.log(
        `Session ending: ${util.inspect(requestEnvelope.request, {
          colors: true,
          depth: 3,
        })}`
      );
    }

    return responseBuilder.getResponse();
  },
};

export default [
  stopHandler,
  yesPlayAgainHandler,
  doNotPlayAgainHandler,
  sessionEndedHandler,
];
