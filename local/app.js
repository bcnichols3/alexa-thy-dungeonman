require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const alexa = require("../lambda/custom/index.js");
const app = express();
const Promise = require("bluebird");

alexaPromise = Promise.promisifyAll(alexa);

// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// routes
app.post("/", (req, res) => {
  alexa
    .handlerAsync(req.body, {})
    .then(results => res.json(results))
    .catch(err => console.log(err));
});

module.exports = app;
