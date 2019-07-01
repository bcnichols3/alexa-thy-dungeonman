const Alexa = require("ask-sdk");

const util = require("util");
const template = require("lodash/template");
const _ = require("lodash");

function supportsDisplay(requestEnvelope) {
  return (
    requestEnvelope.context &&
    requestEnvelope.context.System &&
    requestEnvelope.context.System.device &&
    requestEnvelope.context.System.device.supportedInterfaces &&
    requestEnvelope.context.System.device.supportedInterfaces.Display
  );
}

const makeSSML = str => `<p>${str}</p>`;
const makeAudio = str => `<audio src="${str}" />`;

function addBodyTemplate(handlerInput, options) {
  const { requestEnvelope, responseBuilder } = handlerInput;

  if (!supportsDisplay(requestEnvelope)) return responseBuilder;

  if (typeof options.textContent === "string") {
    const XML = createXML(options.textContent);

    options.textContent = new Alexa.RichTextContentHelper()
      .withPrimaryText(XML)
      .getTextContent();
  }
  if (options.listItems) {
    options.listItems = options.listItems.map(item => {
      if (typeof item === "string") {
        return new Alexa.RichTextContentHelper()
          .withPrimaryText(item)
          .getTextContent();
      } else {
        return item;
      }
    });
  }

  const template = Object.assign({}, options);
  return responseBuilder.addRenderTemplateDirective(template);
}

const specialCharsMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\n": "<br/>",
};

function createXML(str, fontSize = 5) {
  if (str[0] === "<") return str;
  str = str.replace(/&|<|>|\n/gi, match => specialCharsMap[match]);

  return `<font size=\"${fontSize}\">${str}</font>`;
}

function compileTemplate(strTemplate, vars) {
  const tpl = template(strTemplate);
  return tpl(vars);
}

function updateSessionAttributes(attributesManager, obj) {
  const session = attributesManager.getSessionAttributes();
  attributesManager.setSessionAttributes(Object.assign(session, obj));
}

function createPrompt(speech, reprompt, inverse) {
  let p, r;
  // has prompt
  if (speech) {
    p = speech;
    // and reprompt
    if (reprompt) {
      r = reprompt;
      if (inverse) {
        p = reprompt + " " + p;
      } else {
        p += " " + reprompt;
      }
    } else {
      r = speech;
    }
  } else if (reprompt) {
    // has only reprompt
    p = reprompt;
    r = reprompt;
  }
  return { speech: p, reprompt: r };
}

// a custom lodash function for creating lists of words
function createList(list, andOr = "and") {
  if (list.length === 1) return list[0];

  const newList = list.slice(0, list.length - 2);
  newList.push(`${andOr} ${list[list.length - 1]}`);
  return newList.join(", ");
}

function getSlot({ request }, slotStr) {
  const OBJ = { id: null, raw: null, value: null };

  const SLOT =
    request.intent && request.intent.slots && request.intent.slots[slotStr];

  if (!SLOT) return OBJ;

  // Get id and raw value
  if (SLOT.id) OBJ.id = SLOT.id;
  if (SLOT.value) OBJ.raw = OBJ.value = SLOT.value;

  const RESOLUTIONS =
    SLOT.resolutions && SLOT.resolutions.resolutionsPerAuthority;
  if (!RESOLUTIONS) return OBJ;

  console.log(">>> SLOT BEFORE RESOLUTIONS", OBJ);

  // Prioritize dynamic values over native values
  const NATIVE_RESOLUTION = RESOLUTIONS[0];
  const DYNAMIC_RESOLUTION = RESOLUTIONS[1];
  let resolution = null;
  if (
    DYNAMIC_RESOLUTION &&
    DYNAMIC_RESOLUTION.status.code === "ER_SUCCESS_MATCH"
  ) {
    resolution = DYNAMIC_RESOLUTION;
    console.log(
      ">>>DYN SUCCESS",
      util.inspect(DYNAMIC_RESOLUTION.values, { colors: true, depth: 5 })
    );
  } else if (NATIVE_RESOLUTION.status.code === "ER_SUCCESS_MATCH") {
    resolution = NATIVE_RESOLUTION;
    console.log(
      ">>>NAT SUCCESS",
      util.inspect(NATIVE_RESOLUTION.values, { colors: true, depth: 5 })
    );
  }

  // Where available, use root synonym as the value
  if (resolution) {
    OBJ.id = resolution.values[0].value.id;
    OBJ.value = resolution.values[0].value.name;
  }

  return OBJ;
}

function simpleResponse(response, { speech, reprompt }, card) {
  const speechText = createPrompt(speech, reprompt);
  response.speak(speechText.speech);

  response.reprompt(speechText.reprompt);

  if (card) {
    response.withSimpleCard(
      card.title,
      card.body,
      card.imageSmall,
      card.imageLarge
    );
  }

  return response.getResponse();
}

function updateDynamicSlotValues(responseBuilder, types) {
  if (!types || !types.length) {
    return responseBuilder.addDirective({
      type: "Dialog.UpdateDynamicEntities",
      updateBehavior: "CLEAR",
    });
  }
  const directive = {
    type: "Dialog.UpdateDynamicEntities",
    updateBehavior: "REPLACE",
    types,
  };
  return responseBuilder.addDirective(directive);
}

module.exports = {
  updateSessionAttributes,
  updateDynamicSlotValues,
  simpleResponse,
  compileTemplate,
  createPrompt,
  createList,
  getSlot,
  addBodyTemplate,
  makeSSML,
  makeAudio,
};
