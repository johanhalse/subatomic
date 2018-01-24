import test from "ava";
const yaml = require("yamljs");
const config = yaml.load("test/.subatomic.test.yml");
const generator = require("../generator.js");

const generatedJSON = generator.toJSON(config);

const isFontFamilyRule = (rule) => { return rule.prop === "font-family"; }
const isFontSizeRule = (rule) => { return rule.prop === "font-size"; }
const isLineHeightRule = (rule) => { return rule.prop === "line-height"; }
const isWidthRule = (rule) => { return rule.prop === "width"; }
const isDisplayRule = (rule) => { return rule.prop === "display"; }
const isMarginRule = (rule) => { return rule.prop === "margin"; }



test("Generates correct number of rules", t => {
  t.is(generatedJSON.filter(isFontFamilyRule).length, 2);
  t.is(generatedJSON.filter(isFontSizeRule).length, 6);
  t.is(generatedJSON.filter(isLineHeightRule).length, 3);
  t.is(generatedJSON.filter(isWidthRule).length, 3);
  t.is(generatedJSON.filter(isDisplayRule).length, 2);
  t.is(generatedJSON.filter(isMarginRule).length, 12);
});

test("Generates expansions", t => {
  const marginRules = generatedJSON.filter(isMarginRule);
  t.is(marginRules[0].expansion, "top");
});
