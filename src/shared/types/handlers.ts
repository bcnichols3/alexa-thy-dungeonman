import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { ActionTypes, ItemTypes, ThingTypes } from "shared/types/slots";
import { Room } from "shared/types/rooms";

export type CustomHandlerOptions = {
  speech?: string;
  reprompt?: string;
  thing?: ThingTypes;
  curRoom?: Room;
  action?: ActionTypes;
  inventory?: ItemTypes[];
};

export type CustomHandler = (
  handlerInput: HandlerInput,
  options: CustomHandlerOptions
) => Response;
