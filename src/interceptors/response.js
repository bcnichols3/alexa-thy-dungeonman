const { trackAgent } = require("./analytics");
const saveAttributes = require("./attributes");
const createPrevious = require("./previous");
const responseInterceptor = [];

if (process.env.CHATBASE_KEY) {
  responseInterceptor.push({ process: trackAgent });
}
responseInterceptor.push({ process: createPrevious });
responseInterceptor.push({ process: saveAttributes });

module.exports = responseInterceptor;
