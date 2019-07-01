const sample = require("lodash/sample");
const util = require("util");

const { state, allSubwayIds } = require("../constants");
const { welcome, info } = require("../responses");
const {
  simpleResponse,
  validator,
  getSlot,
  updateSessionAttributes,
  getLineIdFromSlot,
} = require("../helpers");
const { sayGoodbye, setFavoriteLine } = require("./common");

/************** HANDLERS **************/

module.exports = [
  {
    /** @param {"Set my home line to __SUBWAY__."} */
    canHandle(handlerInput) {
      return (
        validator(handlerInput)
          .intent("SetFavoriteTrainIntent")
          .getValue() ||
        validator(handlerInput)
          .state(state.SETTINGS)
          .intent("TrainOnlyIntent")
          .getValue()
      );
    },
    handle(handlerInput) {
      const {
        attributesManager,
        responseBuilder,
        requestEnvelope,
      } = handlerInput;

      const routeSlot = getSlot(requestEnvelope, "route");
      const favoriteLineId = getLineIdFromSlot(routeSlot);

      if (favoriteLineId) {
        return setFavoriteLine(handlerInput, { favoriteLineId });
      } else {
        updateSessionAttributes(attributesManager, {
          state: state.SETTINGS,
        });

        const speech = info.setWhichFavorite.ssml;

        return simpleResponse(responseBuilder, { speech });
      }
    },
  },
  {
    /** @param {"Yes, set my home line to __SUBWAY__"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .state(state.SETTINGS)
        .yesIntent()
        .getValue();
    },
    handle(handlerInput) {
      const { attributesManager } = handlerInput;
      const { lineId } = attributesManager.getSessionAttributes();
      return setFavoriteLine(handlerInput, { favoriteLineId: lineId });
    },
  },
  {
    /** @param {"No, don't set my home line"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .state(state.SETTINGS)
        .noIntent()
        .getValue();
    },
    handle(handlerInput) {
      const speech = info.declineFavorite.ssml;
      return sayGoodbye(handlerInput, { speech });
    },
  },
];
