import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { ActionTypes, ThingTypes } from "shared/types/slots";
import { Session } from "shared/types/attributes";

export type PropsMaker = (
  session: Session,
  action?: ActionTypes,
  thing?: ThingTypes
) => any;

export type Handler = (input: HandlerInput) => Promise<Response> | Response;

export type CustomHandler<P = {}> = (
  handlerInput: HandlerInput,
  props: P
) => Response;
