declare module "ask-sdk-model" {
  interface FixedSlot extends Slot {
    id?: string;
  }
}

import { Session } from "shared/types/attributes";
import { ResponseBuilder, AttributesManager } from "ask-sdk-core";
import { IntentRequest, RequestEnvelope, FixedSlot } from "ask-sdk-model";

export function updateSessionAttributes(
  attributesManager: AttributesManager,
  newSession: Partial<Session>
) {
  const session = attributesManager.getSessionAttributes();
  attributesManager.setSessionAttributes(Object.assign(session, newSession));
}

export function createPrompt(
  speech: string,
  reprompt = "",
  shouldCombine = true
) {
  return { speech: shouldCombine ? speech + reprompt : speech, reprompt };
}

type ResolvedSlot = {
  id: string;
  raw: string;
  value: string;
};

export function getSlot(
  requestEnvelope: RequestEnvelope,
  slotStr: string
): ResolvedSlot {
  const request = requestEnvelope.request as IntentRequest;
  const OBJ = { id: "", raw: "", value: "" } as ResolvedSlot;

  const SLOT =
    request.intent &&
    request.intent.slots &&
    (request.intent.slots[slotStr] as FixedSlot);

  if (!SLOT) return OBJ;

  // Get id and raw value
  if (SLOT.id) OBJ.id = SLOT.id;
  if (SLOT.value) OBJ.raw = OBJ.value = SLOT.value;

  const RESOLUTIONS =
    SLOT.resolutions && SLOT.resolutions.resolutionsPerAuthority;
  if (!RESOLUTIONS) return OBJ;

  // Prioritize dynamic values over native values
  const NATIVE_RESOLUTION = RESOLUTIONS[0];
  const DYNAMIC_RESOLUTION = RESOLUTIONS[1];
  let resolution = null;
  if (
    DYNAMIC_RESOLUTION &&
    DYNAMIC_RESOLUTION.status.code === "ER_SUCCESS_MATCH"
  ) {
    resolution = DYNAMIC_RESOLUTION;
  } else if (NATIVE_RESOLUTION.status.code === "ER_SUCCESS_MATCH") {
    resolution = NATIVE_RESOLUTION;
  }

  // Where available, use root synonym as the value
  if (resolution) {
    OBJ.id = resolution.values[0].value.id;
    OBJ.value = resolution.values[0].value.name;
  }

  return OBJ;
}

type Prompt = {
  speech: string;
  reprompt?: string;
};

type Card = {
  title: string;
  body: string;
  smallImageUrl?: string;
  largeImageUrl?: string;
};

export function simpleResponse(
  response: ResponseBuilder,
  { speech, reprompt }: Prompt,
  card?: Card
) {
  const speechText = createPrompt(speech, reprompt);
  response.speak(speechText.speech);

  response.reprompt(speechText.reprompt);

  if (card) {
    response.withStandardCard(
      card.title,
      card.body,
      card.smallImageUrl,
      card.largeImageUrl
    );
  }

  return response.getResponse();
}
