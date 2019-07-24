import { simpleResponse } from "shared/manipulators";
import * as stateResponses from "responses/states";
import { Handler } from "shared/types/handlers";

const dance: Handler = ({ responseBuilder }) => {
  return simpleResponse(responseBuilder, {
    speech: stateResponses.play.dance.ssml,
    reprompt: stateResponses.play.reprompt.ssml,
  });
};

export default dance;
