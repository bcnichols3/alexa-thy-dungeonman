const fs = require("fs");
const path = require("path");
const sections = path.resolve(__dirname, "sections");

const filter = require("lodash/filter");
const camelCase = require("lodash/camelCase");

const dirs = fs.readdirSync(sections);
const pattern = new RegExp(/[\w-]*\.js(on)?/);

const filtered = filter(dirs, fileName => pattern.test(fileName));
const responses = {};

filtered.forEach(file => {
  const fileName = camelCase(file.replace(/\.js(on)?/, ""));
  responses[fileName] = require(`./sections/${file}`);
});

module.exports = responses;
