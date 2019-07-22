function createPrev({ requestEnvelope, attributesManager }, response = {}) {
  if (!response.outputSpeech || response.shouldEndSession) return;

  const session = attributesManager.getSessionAttributes();

  const { ssml } = response.reprompt.outputSpeech;
  const reprompt = ssml.replace(/<\/?speak>/g, "");
  session.previous = {
    reprompt,
    state: session.state,
  };
  attributesManager.setSessionAttributes(session);
}

module.exports = createPrev;
