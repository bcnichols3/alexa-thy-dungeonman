import { HandlerInput } from "ask-sdk-core";
import { Response, ui } from "ask-sdk-model";
import SsmlOutputSpeech = ui.SsmlOutputSpeech;
import { Session } from "shared/types/attributes";

export default function capturePrevious(
  { requestEnvelope, attributesManager }: HandlerInput,
  response: Response = {}
) {
  if (!response.reprompt || response.shouldEndSession) return;

  const session = attributesManager.getSessionAttributes() as Session;

  const outputSpeech = response.reprompt.outputSpeech as SsmlOutputSpeech;
  const reprompt = outputSpeech.ssml.replace(/<\/?speak>/g, "");
  session.previous = {
    reprompt,
    state: session.state,
  };
  attributesManager.setSessionAttributes(session);
}
