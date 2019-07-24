import { CustomHandler } from "shared/types/handlers";
import { simpleResponse, updateSessionAttributes } from "shared/manipulators";
import * as stateResponses from "responses/states";

type Props = {
  speech: string;
};

const endGame: CustomHandler<Props> = (handlerInput, { speech = "" }) => {
  const { attributesManager, responseBuilder } = handlerInput;

  updateSessionAttributes(attributesManager, {
    state: "GOODBYE",
  });

  const { score } = attributesManager.getSessionAttributes();

  return simpleResponse(responseBuilder, {
    speech: speech + `<p>Your score was ${score}</p>`,
    reprompt: stateResponses.goodbye.playAgain.ssml,
  });
};

export default endGame;
