import { HandlerInput } from "ask-sdk-core";
import { Response, ui } from "ask-sdk-model";
import SsmlOutputSpeech = ui.SsmlOutputSpeech;
import { Session } from "shared/types/attributes";
import exceptionResponses from "responses/states/exception";

export default function capturePrevious(
  { requestEnvelope, attributesManager }: HandlerInput,
  response: Response = {}
) {
  if (!response.reprompt || response.shouldEndSession) return;

  const session = attributesManager.getSessionAttributes() as Session;

  const speechOutput = response.outputSpeech as SsmlOutputSpeech;
  const repromptOutput = response.reprompt.outputSpeech as SsmlOutputSpeech;

  session.previous = {
    speech: cleanSsml(speechOutput.ssml),
    reprompt: cleanSsml(repromptOutput.ssml),
    state: session.state,
  };
  attributesManager.setSessionAttributes(session);
}

/*  Alexa wraps the whole SSML response in <speech> tags for us.
    Nested speech tags will throw an error,
    so we must strip them out of our response before reusing them.
    Also, in case of users saying "repeat" multiple times,
    We also want to clear the repeat speech.
    */
const cleanSsml = (ssml: string) => {
  return ssml
    .replace(/<\/?speak>/g, "")
    .replace(exceptionResponses.repeat.ssml, "");
};
