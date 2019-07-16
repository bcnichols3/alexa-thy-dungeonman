const errMsg = require("./errorMessages");
const { getSlot } = require("../manipulators");

class Validator {
  constructor(alexa, options = {}) {
    if (!alexa) throw new Error(errMsg.noHandlerInput);

    this.alexa = alexa;
    this.log = !!options.log;
    this.isValid = {};
  }

  getValue() {
    const LOG = [];
    let isValid = true;

    const keys = Object.keys(this.isValid);

    for (let i = 0; i < keys.length; i++) {
      LOG.push(`>> ${keys[i]} was ${this.isValid[keys[i]]}`);
      if (!this.isValid[keys[i]]) isValid = false;
    }

    if (this.log) console.log("\n", LOG.join("\n"));

    return isValid;
  }
  /************** PRIVATE METHODS **************/

  _requestType() {
    if (arguments.length < 1) throw new Error(errMsg.noIntentNames);

    const result = {};
    const failure = {};

    for (let i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] !== "string") {
        throw new Error(errMsg.typeError);
      }
      const targetType = arguments[i].trim();
      if (this.alexa.requestEnvelope.request.type === targetType) {
        result[`TYPE ${targetType}`] = true;
      } else {
        failure[`TYPE ${targetType}`] = false;
      }
    }

    // send back the success
    if (Object.keys(result).length) return result;
    // or all failures individually
    else return failure;
  }

  _intent() {
    if (arguments.length < 1) throw new Error(errMsg.noIntentNames);
    const result = {};
    const failure = {};

    if (!this.alexa.requestEnvelope.request.intent) {
      return { "TYPE IntentRequest": false };
    }

    const intentName = this.alexa.requestEnvelope.request.intent.name;

    for (let i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] !== "string") {
        throw new Error(errMsg.typeError);
      }
      const targetIntent = arguments[i].trim();
      if (intentName === targetIntent) {
        result[`INTENT ${targetIntent}`] = true;
      } else {
        failure[`INTENT ${targetIntent}`] = false;
      }
    }

    // send back the success
    if (Object.keys(result).length) return result;
    // or all failures individually
    else return failure;
  }

  /************** REQUEST TYPES **************/

  requestType() {
    Object.assign(this.isValid, this._requestType(...arguments));
    return this;
  }
  launchRequest() {
    return this.requestType("LaunchRequest");
  }
  linkResultRequest() {
    return this.requestType("LinkResultRequest");
  }
  sessionEndedRequest() {
    return this.requestType("SessionEndedRequest");
  }
  intentRequest() {
    return this.requestType("IntentRequest");
  }

  /************** INTENT NAMES **************/
  intent() {
    Object.assign(this.isValid, this._intent(...arguments));
    return this;
  }
  cancelIntent() {
    return this.intent("AMAZON.CancelIntent");
  }
  cancelOrStopIntent() {
    return this.intent("AMAZON.CancelIntent", "AMAZON.StopIntent");
  }
  fallbackIntent() {
    return this.intent("AMAZON.FallbackIntent");
  }
  helpIntent() {
    return this.intent("AMAZON.HelpIntent");
  }
  nextIntent() {
    return this.intent("AMAZON.NextIntent");
  }
  noIntent() {
    return this.intent("AMAZON.NoIntent");
  }
  pauseIntent() {
    return this.intent("AMAZON.PauseIntent");
  }
  repeatIntent() {
    return this.intent("AMAZON.RepeatIntent");
  }
  resumeIntent() {
    return this.intent("AMAZON.ResumeIntent");
  }
  startOverIntent() {
    return this.intent("AMAZON.StartOverIntent");
  }
  stopIntent() {
    return this.intent("AMAZON.StopIntent");
  }
  yesIntent() {
    return this.intent("AMAZON.YesIntent");
  }
  yesOrNoIntent() {
    return this.intent("AMAZON.YesIntent", "AMAZON.NoIntent");
  }
  /************** ATTRIBUTES VALUES **************/

  requestAttributes(key, func) {
    const value = this.alexa.attributesManager.getRequestAttributes()[key];

    this.isValid[`ATTR ${key}`] = func ? !!func(value) : !!value;
    return this;
  }

  sessionAttributes(key, func) {
    const value = this.alexa.attributesManager.getSessionAttributes()[key];

    this.isValid[`ATTR ${key}`] = func ? !!func(value) : !!value;
    return this;
  }

  state(target) {
    const { state } = this.alexa.attributesManager.getSessionAttributes();
    let match, str;
    const invalids = {};
    let didPass = false;
    for (let i = 0; i < arguments.length; i++) {
      let str = arguments[i];
      if (state === str) {
        didPass = true;
        this.isValid[`STATE ${str}`] = true;
      } else {
        invalids[`STATE ${str}`] = false;
      }
    }
    if (!didPass) Object.assign(this.isValid, invalids);
    return this;
  }

  pointer(target) {
    const { pointer } = this.alexa.attributesManager.getSessionAttributes();
    this.isValid[`POINTER ${target}`] = pointer === target;
    return this;
  }

  /************** SLOT VALUES **************/
  slot(key, func) {
    const { requestEnvelope } = this.alexa;
    const slot = getSlot(requestEnvelope, key);
    if (func) this.isValid[`SLOT ${key}`] = func(slot);
    else this.isValid[`SLOT ${key}`] = !!slot.value;
    return this;
  }
}

/************** VALIDATOR FUNC **************/

function validator(handlerInput, options) {
  return new Validator(handlerInput, options);
}

function statefulVaidator(state) {
  return (handlerInput, options) => {
    return new Validator(handlerInput, options).state(state);
  };
}

module.exports = {
  validator,
  statefulVaidator,
};
