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

const {
  fetchSubwayAnnouncements,
  fetchStationArrivals,
} = require("../mta-gtfs");

/**
	Common 'handlers' are funcs that can be called inside actual handler
	functions, and are passed two arguments:
	@param {handlerInput} object to perform alexa functions, and
	@param {options} object contains preprompt, expected data, etc.
*/

const commonHandlers = {
  giveAnnouncements,
  giveArrivals,
  setFavoriteLine,
  sayGoodbye,
};

/************** FREESTANDING HANDLE FUNCS **************/

async function giveAnnouncements(handlerInput, { lineId }) {
  const { responseBuilder, attributesManager } = handlerInput;

  const session = attributesManager.getSessionAttributes();

  if (!session.subwayInfo) {
    session.subwayInfo = await fetchSubwayAnnouncements();
  }

  const subwayLine = session.subwayInfo[lineId];
  const status = camelCase(subwayLine.status);

  const template = sample(info.statuses[status]);
  let speech = compileTemplate(template.ssml, {
    subwayLine: subwayLine.spokenName,
  });

  let retortsArray = info.retorts[status] || [];

  if (status !== "goodService") {
    retortsArray = retortsArray.concat(info.retorts.badService);
  }
  speech += sample(retortsArray).ssml;

  if (session.numVisits % 5 === 0 && !session.favoriteLineId) {
    updateSessionAttributes(attributesManager, {
      state: state.SETTINGS,
      lineId,
    });
    const reprompt = compileTemplate(info.setFavorite.ssml, {
      subwayLine: subwayLine.spokenName,
    });
    return simpleResponse(responseBuilder, { speech, reprompt });
  } else {
    if (session.numVisits < 7 && status !== "goodService") {
      speech += info.moreInfo.ssml;
    }

    return responseBuilder
      .speak(speech)
      .withShouldEndSession(true)
      .getResponse();
  }
}

async function giveArrivals(handlerInput, { fetchArrivalsArguments }) {
  const { responseBuilder } = handlerInput;

  const data = await fetchStationArrivals(...fetchArrivalsArguments);

  let speech;
  if (data) {
    const { template } = info.arrivals;

    speech = compileTemplate(template, {
      route: data.route || data.station.daytimeRoutes,
      station: data.station.spokenName,
      arrivalTimes: createArrivalsArray(data.arrivals),
    });
  } else {
    speech = info.cannotReachMTA.ssml;
  }

  return responseBuilder
    .speak(speech)
    .withShouldEndSession(true)
    .getResponse();
}

function setFavoriteLine(handlerInput, { favoriteLineId }) {
  const { attributesManager, responseBuilder } = handlerInput;

  const { lineId } = attributesManager.getSessionAttributes();

  favoriteLineId = favoriteLineId || lineId;

  updateSessionAttributes(attributesManager, { favoriteLineId });

  const speech = compileTemplate(info.favoriteLineIsSet.ssml, {
    subwayLine: favoriteLineId,
  });

  return responseBuilder
    .speak(speech)
    .withShouldEndSession(true)
    .getResponse();
}

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

/************** UNIQUE HELPERS **************/

function createArrivalsArray(arrivals) {
  const nowInSeconds = Date.now() / 1000;

  const arrayOfTimes = arrivals.map(arrival => {
    const arrivesInMinutes = Math.floor(
      (arrival.arrivalTime - nowInSeconds) / 60
    );

    if (arrivesInMinutes === 1) return `${arrivesInMinutes} minute`;
    else return `${arrivesInMinutes} minutes`;
  });

  return createList(arrayOfTimes);
}

module.exports = commonHandlers;
