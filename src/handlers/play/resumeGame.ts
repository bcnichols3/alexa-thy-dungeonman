import { Session } from "shared/types/attributes";
import { go } from "handlers/play/gameActions";
import welcomeResponses from "responses/states/welcome";
import { Handler } from "shared/types/handlers";

const resumeGame: Handler = handlerInput => {
  const { attributesManager } = handlerInput;
  const { curRoom } = attributesManager.getSessionAttributes() as Session;
  return go(handlerInput, {
    speech: welcomeResponses.resume.ssml,
    headedTo: curRoom,
  });
};

export default resumeGame;
