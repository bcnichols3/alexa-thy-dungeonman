import { CustomHandler } from "shared/types/handlers";
import { simpleResponse, updateSessionAttributes } from "shared/manipulators";
import * as stateResponses from "responses/states";
import { newGame } from "shared/types/attributes";

type Props = {
  speech: string;
};

const endGame: CustomHandler<Props> = (handlerInput, { speech = "" }) => {
  const { attributesManager, responseBuilder } = handlerInput;

  const { score } = attributesManager.getSessionAttributes();

  updateSessionAttributes(attributesManager, {
    state: "GOODBYE",
    ...newGame,
  });

  return simpleResponse(responseBuilder, {
    speech: speech + `<p>Your score was ${score}.</p>`,
    reprompt: stateResponses.goodbye.playAgain.ssml,
  });
};

export default endGame;
