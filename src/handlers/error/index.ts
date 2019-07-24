import { CustomSkillErrorHandler } from "ask-sdk-core/dist/dispatcher/error/handler/CustomSkillErrorHandler";
import exceptionResponses from "responses/states/exception";
import { simpleResponse } from "shared/manipulators";
import { ResponseBuilder } from "ask-sdk-core";

const errorHandler: CustomSkillErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    if (process.env.NODE_ENV === "local") console.log("ERROR", error);

    const { responseBuilder } = handlerInput;

    return simpleResponse((responseBuilder as unknown) as ResponseBuilder, {
      speech: exceptionResponses.error.ssml,
    });
  },
};

export default [errorHandler];
