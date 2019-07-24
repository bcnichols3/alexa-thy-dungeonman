import { Handler } from "shared/types/handlers";
import welcomeResponses from "responses/states/welcome";
import { simpleResponse } from "shared/manipulators";
import startNewGame from "handlers/play/startNewGame";

export const welcomeFirstTimeUser: Handler = handlerInput => {
  return startNewGame(handlerInput, {
    speech: welcomeResponses.firstTime.ssml,
  });
};

export const welcomeReturningUser: Handler = handlerInput => {
  return startNewGame(handlerInput, {
    speech: welcomeResponses.returning.ssml,
  });
};

export const welcomeInterruptedUser: Handler = ({ responseBuilder }) => {
  return simpleResponse(responseBuilder, {
    speech: welcomeResponses.returning.ssml,
    reprompt: welcomeResponses.interrupted.ssml,
  });
};
