require("dotenv").config({ path: ".env" });

const express = require("express");
const bodyParser = require("body-parser");
const alexa = require("../lambda/custom");
const Promise = require("bluebird");

alexaPromise = Promise.promisifyAll(alexa);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  alexa
    .handlerAsync(req.body, {})
    .then(results => res.json(results))
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(
    `Express server listening on port ${PORT}`,
    `\nALEXA SKILL ID: ${process.env.ALEXA_APP_ID}`,
    `\nDYNAMO TABLE NAME: ${process.env.DYNAMO_TABLE_NAME}`,
  );
});
