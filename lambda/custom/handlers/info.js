const sample = require("lodash/sample");
const util = require("util");

const { state } = require("../constants");
const { welcome, info } = require("../responses");
const {
  simpleResponse,
  validator,
  getSlot,
  updateSessionAttributes,
  getLineIdFromSlot,
} = require("../helpers");
const {
  sayGoodbye,
  giveAnnouncements,
  giveArrivals,
  setFavoriteLine,
} = require("./common");

const stationsById = require("../mta-gtfs/stationsById");

/************** HANDLERS **************/

module.exports = [
  {
    /** @param {"Give me information on the __SUBWAY__."} */
    canHandle(handlerInput) {
      return (
        validator(handlerInput)
          .intent("TrainIntent", "TrainOnlyIntent")
          .getValue() ||
        validator(handlerInput)
          .state(state.INFO)
          .intent("TrainOnlyIntent")
          .getValue()
      );
    },
    handle(handlerInput) {
      const { attributesManager, requestEnvelope } = handlerInput;

      const routeSlot = getSlot(requestEnvelope, "route");
      const lineId = getLineIdFromSlot(routeSlot);

      if (lineId) {
        return giveAnnouncements(handlerInput, { lineId });
      } else {
        updateSessionAttributes(attributesManager, {
          state: state.INFO,
        });
        return askForSubway(handlerInput);
      }
    },
  },
  {
    /** @param {"Next __DIRECTION__ __SUBWAY__ trains at __STATION__"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .intent("ArrivalsIntent")
        .getValue();
    },
    handle(handlerInput) {
      const {
        attributesManager,
        responseBuilder,
        requestEnvelope,
      } = handlerInput;

      const session = attributesManager.getSessionAttributes();

      const input = {
        stationId: null,
        dirId: null,
        stationSlot: getSlot(requestEnvelope, "station"),
        directionSlot: getSlot(requestEnvelope, "direction"),
        boroughSlot: getSlot(requestEnvelope, "borough"),
        routeSlot: getSlot(requestEnvelope, "route"),
      };

      const AMBIGUOUS_STATION = !input.stationSlot.id.includes("||");

      const stationId = determineStationId(input);
      const dirId = determineNorthSouth(input);

      // if (!stationId && AMBIGUOUS_STATION) {
      // 	return requestStationClarification(handlerInput, input);
      // }
      // else if (!stationId) {
      // 	return requestStation(handlerInput, input);
      // }
      // else if (!dirId) {
      // 	return requestDirection(handlerInput, input);
      // }

      const fetchArrivalsArguments = [
        stationId,
        dirId,
        {
          route: input.routeSlot.id,
        },
      ];

      session.lastTrain = fetchArrivalsArguments;
      attributesManager.setSessionAttributes(session);

      return giveArrivals(handlerInput, { fetchArrivalsArguments });
    },
  },
];

/************** FREESTANDING HANDLE FUNCS **************/

function askForSubway({ attributesManager, responseBuilder }) {
  const speech = sample(welcome.returning.reprompt).ssml;
  return simpleResponse(responseBuilder, { speech });
}

// manages requests e.g. "Downtown trains at 8th Avenue"
// responds e.g. "8th Avenue in Manhattan or Brooklyn?"
function requestStationClarification(handlerInput, input) {}

// manages requests e.g. "Downtown Four trains"
// responds e.g. "Downtown Four trains at which station?"
function requestStation(handlerInput, input) {}

// manages requests e.g. "Four trains at Union Square"
// responds e.g. "Four trains at Union Square in which direction?"
function requestDirection(handlerInput, input) {}

/************** UNIQUE HELPERS **************/

function determineStationId({ stationSlot, routeSlot }) {
  if (!stationSlot.id) return false;
  let possibleStations = stationSlot.id.split("||");
  if (possibleStations.length === 1) return possibleStations[0];

  possibleStations = possibleStations.filter(stationId => {
    const curStation = stationsById[stationId];
    if (!curStation.daytimeRoutes.includes(routeSlot.id)) {
      return false;
    }

    return true;
  });

  if (possibleStations.length === 1) return possibleStations[0];

  return false;
}

function determineNorthSouth(directionSlot, boroughSlot) {
  if ((directionSlot && directionSlot.id === "N") || directionSlot.id === "S") {
    return directionSlot.id;
  } else if (boroughSlot) {
    return "N";
  } else {
    return false;
  }
}
