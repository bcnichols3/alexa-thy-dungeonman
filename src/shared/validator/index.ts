import { HandlerInput } from "ask-sdk-core";
import errMsg from "shared/validator/errorMessages";
import { getSlot } from "shared/manipulators";
import { IntentRequest } from "ask-sdk-model";

type Options = {
  log: boolean;
};

class Validator<S> {
  alexa: HandlerInput;
  log: boolean;
  isValid: {
    [Key: string]: boolean;
  };

  constructor(alexa: HandlerInput, options: Options = { log: false }) {
    if (!alexa) throw new Error(errMsg.noHandlerInput);

    this.alexa = alexa;
    this.log = options.log;
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

  _requestType(...types: string[]) {
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

  _intent(...intents: string[]) {
    if (intents.length < 1) throw new Error(errMsg.noIntentNames);
    const result = {};
    const failure = {};

    const request = this.alexa.requestEnvelope.request as IntentRequest;

    if (!request.intent) return { "TYPE IntentRequest": false };

    for (let i = 0; i < intents.length; i++) {
      if (typeof intents[i] !== "string") {
        throw new Error(errMsg.typeError);
      }
      const targetIntent = intents[i].trim();
      if (request.intent.name === targetIntent) {
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

  requestType(...types: string[]) {
    Object.assign(this.isValid, this._requestType(...types));
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
  intent(...intents: string[]) {
    Object.assign(this.isValid, this._intent(...intents));
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

  requestAttributes(key: string, callback?: (value: any) => boolean) {
    const value = this.alexa.attributesManager.getRequestAttributes()[key];

    this.isValid[`ATTR ${key}`] = callback ? callback(value) : !!value;
    return this;
  }

  sessionAttributes(key: string, callback?: (value: any) => boolean) {
    const value = this.alexa.attributesManager.getSessionAttributes()[key];

    this.isValid[`ATTR ${key}`] = callback ? callback(value) : !!value;
    return this;
  }

  state(...validStates: S[]) {
    const { state } = this.alexa.attributesManager.getSessionAttributes();
    const invalids = {};
    let didPass = false;
    for (let i = 0; i < validStates.length; i++) {
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

  /************** SLOT VALUES **************/
  slot(key: string, callback?: (value: any) => boolean) {
    const { requestEnvelope } = this.alexa;
    const slot = getSlot(requestEnvelope, key);
    if (callback) this.isValid[`SLOT ${key}`] = callback(slot);
    else this.isValid[`SLOT ${key}`] = !!slot.value;
    return this;
  }
}

/************** VALIDATOR FUNC **************/

export default function validator<S>(
  handlerInput: HandlerInput,
  options?: Options
) {
  return new Validator<S>(handlerInput, options);
}

export function statefulValidator<S>(state: S) {
  return (handlerInput: HandlerInput, options?: Options) => {
    return new Validator<S>(handlerInput, options).state(state);
  };
}
