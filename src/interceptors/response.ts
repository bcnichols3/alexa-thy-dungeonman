import { CustomSkillResponseInterceptor } from "ask-sdk-core/dist/dispatcher/request/interceptor/CustomSkillResponseInterceptor";
import capturePrevious from "interceptors/capturePrevious";
import saveAttributes from "interceptors/saveAttributes";

const responseInterceptors: CustomSkillResponseInterceptor[] = [
  { process: capturePrevious },
  { process: saveAttributes },
];

export default responseInterceptors;
