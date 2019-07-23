require("app-module-path").addPath(__dirname);

import { SkillBuilders } from "ask-sdk-core";
import { DynamoDB } from "aws-sdk";
import { DynamoDbPersistenceAdapter } from "ask-sdk-dynamodb-persistence-adapter";
import welcome from "handlers/welcome";
import play from "handlers/play";
import goodbye from "handlers/goodbye";
import exception from "handlers/exception";
import error from "handlers/error";
import requestInterceptors from "interceptors/request";
import responseInterceptors from "interceptors/response";

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(...welcome, ...play, ...goodbye, ...exception)
  .addErrorHandlers(...error)
  .addRequestInterceptors(...requestInterceptors)
  .addResponseInterceptors(...responseInterceptors)
  .withPersistenceAdapter(
    new DynamoDbPersistenceAdapter({
      tableName: process.env.DYNAMO_TABLE_NAME || "Thy_Dungeonman",
      createTable: false,
      dynamoDBClient: new DynamoDB({
        apiVersion: "latest",
        region: "us-east-1",
      }),
    })
  )
  .lambda();
