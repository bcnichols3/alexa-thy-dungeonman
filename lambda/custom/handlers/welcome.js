const { state, newSession } = require("../constants");
const { welcome } = require("../responses");
const { validator, updateSessionAttributes } = require("../helpers");
const { goToRoom } = require("./common");

/************** HANDLERS **************/

module.exports = [
  {
    /** @param {"Alexa, open Thy Dungeonman"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .launchRequest()
        .getValue();
    },
    handle(handlerInput) {
      const {
        attributesManager,
        responseBuilder,
        requestEnvelope,
      } = handlerInput;

      updateSessionAttributes(attributesManager, {
        ...newSession,
      });

      return firstTimeUser(handlerInput);
    },
  },
];

/************** FREESTANDING HANDLE FUNCS **************/

function firstTimeUser(handlerInput) {
  return goToRoom(handlerInput, { speech: welcome.firstTime.ssml });
}

function returningUser(handlerInput) {
  return goToRoom(handlerInput, { speech: welcome.returning.ssml });
}
