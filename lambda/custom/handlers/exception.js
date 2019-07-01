const { state } = require("../constants");
const { exception } = require("../responses");
const {
  validator,
  simpleResponse,
  addBodyTemplate,
  updateSessionAttributes,
} = require("../helpers");

const { startNewGame, sayGoodbye } = require("./common");

/************** HANDLERS **************/

module.exports = [
  {
    /** @param {"Help"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .helpIntent()
        .getValue();
    },
    handle({ attributesManager, responseBuilder }) {
      updateSessionAttributes(attributesManager, { state: state.WELCOME });
      return simpleResponse(responseBuilder, exception.help);
    },
  },
  {
    /** @param {"Stop"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .cancelOrStopIntent()
        .getValue();
    },
    handle(handlerInput) {
      return sayGoodbye(handlerInput, {});
    },
  },
  {
    /** @param {"Repeat"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .repeatIntent()
        .getValue();
    },
    handle({ attributesManager, responseBuilder }) {
      const { speech } = exception.repeat;
      const { reprompt } = attributesManager.getSessionAttributes();
      return simpleResponse(responseBuilder, { speech, reprompt });
    },
  },
  {
    /** @param {"Start over"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .startOverIntent()
        .state(state.PLAY)
        .getValue();
    },
    handle(handlerInput) {
      const { speech } = exception.startOver;
      return startNewGame(handlerInput, { speech });
    },
  },
  {
    /** @param {Fallback} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .fallbackIntent()
        .state(state.WELCOME, state.GOODBYE, state.NOTIFICATIONS)
        .getValue();
    },
    handle({ responseBuilder }) {
      return simpleResponse(responseBuilder, exception.error);
    },
  },
];
