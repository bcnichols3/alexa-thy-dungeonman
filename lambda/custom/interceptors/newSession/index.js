const { state, newPersist } = require("../../constants");


module.exports = async function createNewSession(handlerInput) {
  const { requestEnvelope, attributesManager } = handlerInput;

  if (!requestEnvelope.session.new) return;

  const persist = await attributesManager.getPersistentAttributes();

  const session = Object.assign({}, newPersist, persist, {
    state: state.WELCOME,
  });

  attributesManager.setSessionAttributes(session);
};
