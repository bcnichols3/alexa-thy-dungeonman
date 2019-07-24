import { CustomHandler } from "shared/types/handlers";
import { updateSessionAttributes } from "shared/manipulators";
import { Session } from "shared/types/attributes";
import go from "handlers/play/gameActions/go";

type Props = {
  speech: string;
};

const newGame: Partial<Session> = {
  state: "PLAY",
  score: 0,
  inventory: [],
  curRoom: "dungeon",
};

const startNewGame: CustomHandler<Props> = (handlerInput, { speech }) => {
  const { attributesManager } = handlerInput;

  updateSessionAttributes(attributesManager, {
    ...newGame,
  });

  return go(handlerInput, {
    speech,
    headedTo: "dungeon",
  });
};

export default startNewGame;
