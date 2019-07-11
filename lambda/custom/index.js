/* eslint-disable  func-names */
/* eslint-disable  no-console */

const AWS = require("aws-sdk");
const Alexa = require("ask-sdk");

exports.handler = Alexa.SkillBuilders.standard()
  .withDynamoDbClient(
    new AWS.DynamoDB({ apiVersion: "latest", region: "us-east-1" })
  )
  .addRequestHandlers(
    ...require("./handlers/welcome"),
    ...require("./handlers/goodbye"),
    ...require("./handlers/exception")
  )
  .addErrorHandlers(...require("./handlers/error"))
  // .addRequestInterceptors(...require("./interceptors/request"))
  // .addResponseInterceptors(...require("./interceptors/response"))
  .withTableName(process.env.DYNAMO_TABLE_NAME || "Thy_Dungeonman")
  .withAutoCreateTable(false)
  .lambda();
