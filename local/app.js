require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const alexa = require("../lambda/custom");
const Promise = require("bluebird");

alexaPromise = Promise.promisifyAll(alexa);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  alexa
    .handlerAsync(req.body, {})
    .then(results => res.json(results))
    .catch(err => console.log(err));
});

module.exports = app;
