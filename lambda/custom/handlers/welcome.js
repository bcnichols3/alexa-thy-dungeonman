const sample = require("lodash/sample");

const { state, newPersist } = require("../constants");
const { welcome, rooms } = require("../responses");
const {
  simpleResponse,
  compileTemplate,
  validator,
  getSlot,
  addBodyTemplate,
} = require("../helpers");
const { giveAnnouncements, sayGoodbye } = require("./common");

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

      return firstTimeUser(handlerInput);
    },
  },
];

/************** FREESTANDING HANDLE FUNCS **************/

function firstTimeUser({ responseBuilder }) {
  const speech =
    welcome.firstTime.speech.ssml + rooms.dungeon.intro.speech.ssml;
  const reprompt = rooms.reprompt[0].ssml;

  return simpleResponse(responseBuilder, { speech, reprompt });
}

function returningUser(handlerInput) {
  const speech = sample(welcome.returning.speech).ssml;

  return goToRoom(handlerInput, { speech });
}

function powerUser(handlerInput, { favoriteLineId }) {
  return giveAnnouncements(handlerInput, { lineId: favoriteLineId });
}
