const expect = require("chai").expect;
const util = require("util");

const validators = require("./validator");
const errMsg = require("./errorMessages");

const launchRequest = {
  requestEnvelope: {
    request: { type: "LaunchRequest" },
  },
};

const intentRequest = {
  requestEnvelope: {
    request: { type: "IntentRequest" },
  },
};

const sessionEndedRequest = {
  requestEnvelope: {
    request: { type: "SessionEndedRequest" },
  },
};

describe("validators", () => {
  describe("requestType", () => {
    it("detects launchRequest", () => {
      expect(validators.launchRequest(launchRequest).to.be.true);
      expect(validators.launchRequest(intentRequest).to.be.false);
      expect(validators.launchRequest(sessionEndedRequest).to.be.false);
    });
  });
});
