import * as stateResponses from "responses/states";
import { Handler } from "shared/types/handlers";

const sayGoodbye: Handler = handlerInput => {
  const { responseBuilder } = handlerInput;

  return responseBuilder
    .speak(stateResponses.goodbye.final.ssml)
    .withShouldEndSession(true)
    .getResponse();
};

export default sayGoodbye;
