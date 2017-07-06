#!/usr/bin/env node
const program = require("commander");
const yaml = require("yamljs");
const fs = require("fs");
const generator = require("./generator");
const writer = require("./writer");
const util = require("util");

let stream;
let config;

program
  .version("1.0.0")
  .usage("[options] <file ...>")
  .option("-o, --output [filename]", "Specify file to write to")
  .option("-j, --json", "Get rule list as JSON string")
  .parse(process.argv);

config = yaml.load(".subatomic.yml");

if (program.output !== undefined) {
  stream = fs.createWriteStream(program.output);
  stream.write(writer.write(generator.toJSON(config), config));
  stream.end();
  return;
}

if (program.json !== undefined) {
  process.stdout.write(JSON.stringify(generator.toJSON(config)));
  return;
}

process.stdout.write(writer.write(generator.toJSON(config), config));
