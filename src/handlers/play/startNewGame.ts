import { CustomHandler } from "shared/types/handlers";
import { updateSessionAttributes } from "shared/manipulators";
import { newGame } from "shared/types/attributes";
import go from "handlers/play/gameActions/go";

type Props = {
  speech: string;
};

const startNewGame: CustomHandler<Props> = (handlerInput, { speech }) => {
  const { attributesManager } = handlerInput;

  updateSessionAttributes(attributesManager, {
    state: "PLAY",
    ...newGame,
  });

  return go(handlerInput, {
    speech,
    headedTo: "dungeon",
  });
};

export default startNewGame;
