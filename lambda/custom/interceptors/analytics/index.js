"use strict";

const request = require("request-promise");
const camelCase = require("lodash/camelCase");

module.exports = {
  // Logs user interactions to chatbase.
  trackUser: function(handlerInput, options = {}) {
    const body = setAlexaBody(handlerInput);

    if (typeof options.message !== "string") options.message = false;

    // Because Alexa does not allow us access to a user's inputs, we only pass a message if slots are supplied on the options object
    body.message = options.message || resolveSlots(handlerInput);
    body.type = "user";
    body.not_handled =
      options.unhandled || /unhandled|fallback/gi.test(body.intent) || false;

    postChatbaseMsg(body)
      // .then(ok => {
      // 	console.log(`>> WRITE #${ok.message_id} OK!`, body.intent, body.message);
      // })
      .catch(err => {
        console.log(`>> ${body.intent} WRITE ERR!`, err);
      });
  },
  // Logs agent interactions to chatbase. SSML tags are stripped out and any audio files are captioned by filename
  // e.g.: "[welcome_tracks/welcome1.mp3]"
  trackAgent: function(handlerInput, response) {
    if (!response || !response.outputSpeech) return;

    const body = setAlexaBody(handlerInput);

    // resolve for plain text or ssml
    body.message =
      response.outputSpeech.type === "PlainText"
        ? response.outputSpeech.text
        : stripSSML(response.outputSpeech.ssml);
    body.not_handled = false;
    body.type = "agent";

    postChatbaseMsg(body)
      // .then(ok => {
      // 	console.log(`WRITE #${ok.message_id} OK!`, body.intent, body.message);
      // })
      .catch(err => {
        console.log(`>> ${body.intent} WRITE ERR!`, err);
      });
  },
  // Custom events API. This func was written in March '18, based off of these docs: https://chatbase.com/documentation/events, but this API will likely change in the future so be aware of that. Takes one argument, a props object that has keys and values. NOTE all values must be a primitive, or will be coerced to false during the formatting process
  trackEvent: function(handlerInput, props) {
    const body = setAlexaBody(handlerInput);
    body.properties = formatChatbaseProps(props);

    const flag = Object.values(body.properties[0]);

    postChatbaseEvt(body)
      // .then(ok => {
      // 	console.log(`>> EVT WRITE OK! ${flag[0]}::${flag[1]}`);
      // })
      .catch(err => {
        console.log(`>> ${body.intent} WRITE ERR!`, err);
      });
  },
};

// ======== HELPER FUNCTIONS

function dotCamel() {
  return Array.from(arguments)
    .map(flag => camelCase(flag))
    .join(".");
}

function postChatbaseMsg(body) {
  body.api_key = process.env.CHATBASE_KEY;
  body.time_stamp = Date.now();

  if (!process.env.CHATBASE_KEY) {
    return Promise.reject(new Error("No Chatbase API Key set"));
  }

  return request({
    method: "POST",
    uri: "https://chatbase.com/api/message",
    body,
    timeout: 15000,
    json: true,
  });
}

function postChatbaseEvt(body) {
  if (!body.properties || !body.properties.length) {
    throw new Error("Chatbase events require at least one property");
  }

  if (!process.env.CHATBASE_KEY) {
    return Promise.reject(new Error("No Chatbase API Key set"));
  }

  body.api_key = process.env.CHATBASE_KEY;
  body.timestamp_millis = Date.now();

  return request({
    method: "POST",
    uri: "https://api.chatbase.com/apis/v1/events/insert",
    body,
    timeout: 15000,
    json: true,
  });
}

function formatChatbaseProps(props) {
  let property;
  return Object.keys(props).map(prop => {
    property = { property_name: prop };
    switch (typeof props[prop]) {
      case "string":
        property.string_value = props[prop];
        break;
      case "number":
        props[prop] % 1 === 0
          ? (property.integer_value = props[prop])
          : (property.float_value = props[prop]);
        break;
      case "boolean":
        property.bool_value = props[prop];
        break;
      default:
        property.bool_value = false;
        break;
    }
    return property;
  });
}

function setAlexaBody({ requestEnvelope }) {
  const user_id = requestEnvelope.context.System.user.userId;
  // Intent is passed by name; if not avialable (e.g. during a launch event) use the event type
  const request = requestEnvelope.request;
  const intent = request.intent ? request.intent.name : request.type;
  const body = {
    platform: "Alexa",
    version: process.env.APP_VERSION || "local",
    user_id,
    intent,
  };

  if (requestEnvelope.session) {
    body.session_id = requestEnvelope.session.sessionId;
  }

  return body;
}

function resolveSlots({ requestEnvelope }) {
  const { intent } = requestEnvelope.request;
  if (!intent || !intent.slots) return null;

  let message = "";
  return Object.keys(intent.slots)
    .map(key => {
      return intent.slots[key].value;
    })
    .join(" ");
}

// This regex will be used to strip most SSML markup out of alexa's speech output. We will leave break and audio tags as they cannot be transcribed easily.
const tags = /<\/?(speak|p|s|w|prosody[^>]*|emphasis[^>]*|phoneme[^>]*|say-as[^>]*|sub[^>]*|amazon:effect[^>]*)>/g;

// This regex will, where available, strip audio SSML down to the alt text.
const audio = /<audio.*(src=[\"\'].*audio\/(.+\.mp3).*[\"\']).*\/?>(?:<\/audio)?/g;

function stripSSML(ssml) {
  return ssml
    .replace(tags, " ") // remove ssml tags
    .replace(audio, "[$2]") // replace <audio> with [filename.mp3]
    .replace(/\s+/g, " ") // normalize white space
    .trim();
}
