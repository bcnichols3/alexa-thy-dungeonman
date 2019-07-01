require("dotenv").config({ path: `${__dirname}/.env` });

const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const alexa = require("../lambda/custom/index.js");
const app = express();
const Promise = require("bluebird");

alexaPromise = Promise.promisifyAll(alexa);

// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// routes
app.post("/", function(req, res) {
  alexa
    .handlerAsync(req.body, {})
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = app;
