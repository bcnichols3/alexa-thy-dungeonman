import * as stateResponses from "responses/states";
import { Handler } from "shared/types/handlers";

const sayGoodbye: Handler = handlerInput => {
  const { responseBuilder } = handlerInput;

  const speech = stateResponses.goodbye.final.ssml;

  const builder = responseBuilder.speak(speech).withShouldEndSession(true);

  return builder.getResponse();
};

export default sayGoodbye;
