import { CustomSkillErrorHandler } from "ask-sdk-core/dist/dispatcher/error/handler/CustomSkillErrorHandler";
import exception from "responses/states/exception";
import { simpleResponse } from "helpers/manipulators";
import { ResponseBuilder } from "ask-sdk-core";

/************** HANDLERS **************/

const errorHandler: CustomSkillErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log("ERROR", error);
    const { responseBuilder } = handlerInput;

    return simpleResponse((responseBuilder as unknown) as ResponseBuilder, {
      speech: exception.error.ssml,
    });
  },
};

export default [errorHandler];
