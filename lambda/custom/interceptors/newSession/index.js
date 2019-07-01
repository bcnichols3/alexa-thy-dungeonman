const { state, newPersist } = require("../../constants");

const { fetchSubwayAnnouncements } = require("../../mta-gtfs");

module.exports = async function createNewSession(handlerInput) {
  const { requestEnvelope, attributesManager } = handlerInput;

  if (!requestEnvelope.session.new) return;

  const persist = await attributesManager.getPersistentAttributes();

  const subwayInfo = await fetchSubwayAnnouncements();

  const session = Object.assign({}, newPersist, persist, {
    state: state.WELCOME,
    subwayInfo,
  });

  attributesManager.setSessionAttributes(session);
};
