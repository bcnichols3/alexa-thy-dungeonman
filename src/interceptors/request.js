const { trackUser } = require("./analytics");
const createNewSession = require("./newSession");
const requestInterceptor = [];

if (process.env.CHATBASE_KEY) {
  requestInterceptor.push({ process: trackUser });
}

requestInterceptor.push({ process: createNewSession });

module.exports = requestInterceptor;
