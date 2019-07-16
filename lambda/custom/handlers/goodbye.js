const sample = require("lodash/sample");

const { exception, goodbye } = require("../responses");
const { validator, updateSessionAttributes } = require("../helpers");
const { state } = require("../constants");

const { sayGoodbye, goToRoom } = require("./common");

/************** HANDLERS **************/

module.exports = [
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
    /** @param {"Yes, play again"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .state(state.GOODBYE)
        .yesIntent()
        .getValue();
    },
    handle(handlerInput) {
      const { attributesManager } = handlerInput;

      updateSessionAttributes(attributesManager, {
        state: state.WELCOME,
        curRoom: "dungeon",
      });

      return goToRoom(handlerInput, {});
    },
  },
  {
    /** @param {"No, I don't want to do that"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .state(state.GOODBYE, state.NOTIFICATIONS)
        .noIntent()
        .getValue();
    },
    handle(handlerInput) {
      return sayGoodbye(handlerInput, {});
    },
  },
  {
    /** @param {"Session End"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .sessionEndedRequest()
        .getValue();
    },
    handle({ attributesManager, requestEnvelope, responseBuilder }) {
      // console.log(`Session ending with reason: ${requestEnvelope.request.reason}`);

      // if (requestEnvelope.request.error) {
      // 	const {error} = requestEnvelope.request;
      // 	console.log(error.message);
      // }

      return responseBuilder.getResponse();
    },
  },
];
