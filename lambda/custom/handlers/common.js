const sample = require("lodash/sample");
const camelCase = require("lodash/camelCase");

const {
  simpleResponse,
  compileTemplate,
  updateSessionAttributes,
  createList,
  createSSML,
} = require("../helpers");
const { state } = require("../constants");
const { info, goodbye } = require("../responses");


/**
	Common 'handlers' are funcs that can be called inside actual handler
	functions, and are passed two arguments:
	@param {handlerInput} object to perform alexa functions, and
	@param {options} object contains preprompt, expected data, etc.
*/

const commonHandlers = {
  sayGoodbye,
};

/************** FREESTANDING HANDLE FUNCS **************/

function sayGoodbye(handlerInput, { speech = "", card, permissions }) {
  const { attributesManager, responseBuilder } = handlerInput;

  speech += sample(goodbye.final.speech).ssml;

  const builder = responseBuilder.speak(speech).withShouldEndSession(true);
  if (card) {
    const { title, content, smallImageUrl, largeImageUrl } = card;
    builder.withStandardCard(title, content, smallImageUrl, largeImageUrl);
  } else if (permissions) {
    builder.withAskForPermissionsConsentCard(permissions);
  }

  return builder.getResponse();
}


module.exports = commonHandlers;
