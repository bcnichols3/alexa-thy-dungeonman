import endGame from "handlers/play/endGame";
import * as stateResponses from "responses/states";
import { Handler } from "shared/types/handlers";
import { updateSessionAttributes } from "shared/manipulators";
import { Session } from "shared/types/attributes";

const die: Handler = handlerInput => {
  const { attributesManager } = handlerInput;
  const { score } = attributesManager.getSessionAttributes() as Session;
  updateSessionAttributes(attributesManager, {
    score: score - 100,
  });
  return endGame(handlerInput, { speech: stateResponses.play.die.ssml });
};

export default die;
