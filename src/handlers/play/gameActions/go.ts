import { CustomHandler, PropsMaker } from "shared/types/handlers";
import { simpleResponse, updateSessionAttributes } from "shared/manipulators";
import { DirectionTypes, RoomTypes } from "shared/types/slots";
import roomResponses from "responses/rooms";
import * as stateResponses from "responses/states";

type Props = {
  speech: string;
  headedTo: RoomTypes | undefined;
};

const go: CustomHandler<Props> = (handlerInput, { speech = "", headedTo }) => {
  const { attributesManager, responseBuilder } = handlerInput;

  if (!headedTo) {
    return simpleResponse(responseBuilder, {
      speech: stateResponses.exception.go.ssml,
    });
  }

  updateSessionAttributes(attributesManager, {
    state: "PLAY",
    curRoom: headedTo,
  });

  return simpleResponse(responseBuilder, {
    speech: speech + roomResponses[headedTo].intro.ssml,
    reprompt: stateResponses.play.reprompt.ssml,
  });
};

/************** HELPERS **************/

export const determineHeading: PropsMaker = ({ curRoom }, _, thing): Props => {
  if (roomResponses[curRoom].connections[thing as DirectionTypes]) {
    return {
      speech: "",
      headedTo: roomResponses[curRoom].connections[thing as DirectionTypes],
    };
  }

  return { speech: "", headedTo: undefined };
};

export default go;
