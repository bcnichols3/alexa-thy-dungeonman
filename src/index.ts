/* eslint-disable  func-names */
/* eslint-disable  no-console */

require("app-module-path").addPath(__dirname);

import { SkillBuilders } from "ask-sdk-core";
import { DynamoDbPersistenceAdapter } from "ask-sdk-dynamodb-persistence-adapter";
import welcome from "handlers/welcome";
import play from "handlers/play";
import goodbye from "handlers/goodbye";
import exception from "handlers/exception";
import error from "handlers/error";

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(...welcome, ...play, ...goodbye, ...exception)
  .addErrorHandlers(...error)
  // .addRequestInterceptors(...require("./interceptors/request"))
  // .addResponseInterceptors(...require("./interceptors/response"))
  .withPersistenceAdapter(
    new DynamoDbPersistenceAdapter({
      tableName: process.env.DYNAMO_TABLE_NAME || "Thy_Dungeonman",
      createTable: false,
    })
  )
  .lambda();
