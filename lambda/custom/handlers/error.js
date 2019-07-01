const { simpleResponse } = require("../helpers");
const { exception } = require("../responses");
const { trackUser } = require("../interceptors/analytics");

/************** HANDLERS **************/

module.exports = [
  {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      const { requestEnvelope, responseBuilder } = handlerInput;

      // console.log('>>STACK TRACE', error);

      if (process.env.CHATBASE_KEY) {
        trackUser(handlerInput, { not_handled: true });
      }

      return simpleResponse(responseBuilder, exception.error);
    },
  },
];
