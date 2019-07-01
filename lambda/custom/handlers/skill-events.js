const { validator } = require("../helpers");
const { trackEvent } = require("../interceptors/analytics");
const { newPersist } = require("../constants");

const util = require("util");

module.exports = [
  {
    /** @param {"Enable Skill"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .requestType("AlexaSkillEvent.SkillEnabled")
        .getValue();
    },
    handle(handlerInput) {
      if (process.env.CHATBASE_KEY) {
        trackEvent(handlerInput, { event_type: "skill_enabled" });
      }
    },
  },
  {
    /** @param {"Permissions First Enabled"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .requestType("AlexaSkillEvent.SkillPermissionAccepted")
        .getValue();
    },
    handle(handlerInput) {
      return handlePermissionChange(handlerInput, "permission_accepted");
    },
  },
  {
    /** @param {"Permissions Changed"} */
    canHandle(handlerInput) {
      return validator(handlerInput)
        .requestType("AlexaSkillEvent.SkillPermissionChanged")
        .getValue();
    },
    handle(handlerInput) {
      return handlePermissionChange(handlerInput, "permission_changed");
    },
  },
];

async function handlePermissionChange(handlerInput, event_type) {
  const { requestEnvelope, attributesManager } = handlerInput;

  const newPermissions = requestEnvelope.request.body.acceptedPermissions;

  let persist = await attributesManager.getPersistentAttributes();

  persist = Object.assign({}, newPersist, persist, {
    acceptedPermissions: newPermissions.map(permit => permit.scope),
  });

  if (process.env.CHATBASE_KEY) trackEvent(handlerInput, { event_type });

  attributesManager.setPersistentAttributes(persist);
  await attributesManager.savePersistentAttributes(persist);
}
