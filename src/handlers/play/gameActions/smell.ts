import { simpleResponse } from "shared/manipulators";
import * as stateResponses from "responses/states";
import { Handler } from "shared/types/handlers";

const smell: Handler = ({ responseBuilder }) => {
  return simpleResponse(responseBuilder, {
    speech: stateResponses.play.smell.ssml,
    reprompt: stateResponses.play.reprompt.ssml,
  });
};

export default smell;
