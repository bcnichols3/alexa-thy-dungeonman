const crypto = require("crypto");
const request = require("request-promise");

module.exports = {
  serveNotification(handlerInput) {
    const { requestEnvelope } = handlerInput;
    if (requestEnvelope.request.type === "Messaging.MessageReceived") {
      const body = createNotificationBody(request.message);
      const token = requestEnvelope.context.System.apiAccessToken;

      return sendNotification(body, token);
    }
  },
};

function createNotificationBody({ displayInfo, spokenInfo }) {
  if (!spokenInfo.text && !spokenInfo.ssml) {
    throw new Error("Notification has no spoken text");
  }
  return {
    displayInfo: {
      content: [displayInfo],
    },
    referenceId: crypto.randomBytes(16).toString("hex"),
    expiryTime: setExpiryTime(),
    spokenInfo: {
      content: [spokenInfo],
    },
  };
}

function sendNotification(body, token) {
  return request({
    uri: "https://api.amazonalexa.com/v2/notifications",
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body,
    json: true,
  }).catch(err => {
    console.log("USER NOTIFICATION SEND ERR", err.message);
    return [];
  });
}

function setExpiryTime(expiresAfterSeconds = 60) {
  const expiry = new Date();
  expiry.setTime(expiry.getTime() + expiresAfterSeconds * 1000);
  return expiry.toISOString();
}
