import {
  newPersist,
  newSession,
  Persist,
  Session,
} from "shared/types/attributes";
import { HandlerInput } from "ask-sdk-core";

const createNewSession = async (handlerInput: HandlerInput) => {
  const { requestEnvelope, attributesManager } = handlerInput;

  if (!requestEnvelope.session || !requestEnvelope.session.new) return;

  const persist = (await attributesManager.getPersistentAttributes()) as Persist;

  const session: Session = { ...newPersist, ...newSession, ...persist };

  attributesManager.setSessionAttributes(session);
};

export default createNewSession;
