import { CustomSkillRequestInterceptor } from "ask-sdk-core/dist/dispatcher/request/interceptor/CustomSkillRequestInterceptor";
import createNewSession from "interceptors/createNewSession";

const requestInterceptors: CustomSkillRequestInterceptor[] = [
  { process: createNewSession },
];

export default requestInterceptors;
