const { newPersist } = require("../../constants");

const persistedKeys = Object.keys(newPersist);

async function saveAttributes(
  { requestEnvelope, attributesManager },
  response = {}
) {
  if (!response.outputSpeech || !response.shouldEndSession) return;

  const session = attributesManager.getSessionAttributes();

  session.numVisits++;

  const attributes = persistedKeys.reduce((attrs, key) => {
    if (session[key] !== undefined && session[key] !== "") {
      attrs[key] = session[key];
    }
    return attrs;
  }, newPersist);

  attributesManager.setPersistentAttributes(attributes);
  await attributesManager.savePersistentAttributes(attributes);
}

module.exports = saveAttributes;
