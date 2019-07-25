import { newPersist, Session } from "shared/types/attributes";
import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

const persistedKeys = Object.keys(newPersist);

export default async function saveAttributes(
  { requestEnvelope, attributesManager }: HandlerInput,
  response: Response = {}
) {
  if (!response.outputSpeech || !response.shouldEndSession) return;

  const session = attributesManager.getSessionAttributes() as Session;

  session.visits++;

  const persistedAttributes = persistedKeys.reduce(
    (persistedAttributes, key) => {
      persistedAttributes[key] = session[key];
      return persistedAttributes;
    },
    { ...newPersist }
  );

  attributesManager.setPersistentAttributes(persistedAttributes);
  await attributesManager.savePersistentAttributes();
}
