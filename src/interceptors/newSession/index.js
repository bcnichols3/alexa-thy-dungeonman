const { newPersist, newSession } = require("../../constants");

module.exports = async function createNewSession(handlerInput) {
  const { requestEnvelope, attributesManager } = handlerInput;

  if (!requestEnvelope.session.new) return;

  const persist = await attributesManager.getPersistentAttributes();

  const session = Object.assign({}, newPersist, persist, newSession);

  attributesManager.setSessionAttributes(session);
};
