const sample = require("lodash/sample");
const util = require("util");

const { state, newPersist, allSubwayIds } = require("../constants");
const { welcome } = require("../responses");
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
    /** @param {"Alexa, open Train Chomp"} */
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


    },
  },
];

/************** FREESTANDING HANDLE FUNCS **************/

function firstTimeUser({ responseBuilder }) {
  const speech = welcome.firstTime.speech[0].ssml;
  const reprompt = sample(welcome.returning.reprompt).ssml;

  return simpleResponse(responseBuilder, { speech, reprompt });
}

function returningUser({ responseBuilder }) {
  const speech = sample(welcome.returning.speech).ssml;
  const reprompt = sample(welcome.returning.reprompt).ssml;

  return simpleResponse(responseBuilder, { speech, reprompt });
}

function powerUser(handlerInput, { favoriteLineId }) {
  return giveAnnouncements(handlerInput, { lineId: favoriteLineId });
}
