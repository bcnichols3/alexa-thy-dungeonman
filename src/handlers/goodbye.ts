import { RequestHandler } from "ask-sdk-core";
import { initialSession, StateTypes } from "shared/types/attributes";
import { goToRoom, sayGoodbye } from "handlers/common";
import { updateSessionAttributes } from "shared/manipulators";
import util from "util";
import validator from "shared/validator";
import goodbye from "responses/states/goodbye";

/************** HANDLERS **************/

const stopHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .cancelOrStopIntent()
      .getValue();
  },
  handle(handlerInput) {
    return sayGoodbye(handlerInput, {});
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
    const { attributesManager } = handlerInput;

    updateSessionAttributes(attributesManager, {
      ...initialSession,
    });

    return goToRoom(handlerInput, {
      speech: goodbye.playAgain.ssml,
    });
  },
};

const doNotPlayAgainHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator<StateTypes>(handlerInput)
      .state("GOODBYE")
      .noIntent()
      .getValue();
  },
  handle(handlerInput) {
    return sayGoodbye(handlerInput, {});
  },
};

const sessionEndHandler: RequestHandler = {
  canHandle(handlerInput) {
    return validator(handlerInput)
      .sessionEndedRequest()
      .getValue();
  },
  handle({ requestEnvelope, responseBuilder }) {
    console.log(
      `Session ending: ${util.inspect(requestEnvelope.request, {
        colors: true,
        depth: 3,
      })}`
    );

    return responseBuilder.getResponse();
  },
};

export default [
  stopHandler,
  yesPlayAgainHandler,
  doNotPlayAgainHandler,
  sessionEndHandler,
];
