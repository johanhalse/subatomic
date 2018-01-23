import test from "ava";
const namer = require("../namer.js");
namer.setOptions({ unitNames: false });

const ffSansSerif = {
  "prop": "font-family",
  "breakpoint": null,
  "expansion": null,
  "alias": "sans-serif",
  "value": "Arial, Helvetica, sans-serif"
}

const marginTop10L = {
  "prop": "margin-top",
  "breakpoint": "l",
  "expansion": null,
  "alias": null,
  "value": "10px"
}

const marginBottom10L = {
  "prop": "margin",
  "breakpoint": "l",
  "expansion": "bottom",
  "alias": null,
  "value": "10px"
}

const backgroundRedM = {
  "prop": "background",
  "breakpoint": "m",
  "expansion": null,
  "alias": null,
  "value": "red"
}



test("ShortenedName reads from default .naming.yml", t => {
  t.is(namer.shortenedName(ffSansSerif), "ff");
});

test("Creates valid value names when unitNames set to false", t => {
  namer.setOptions({ unitNames: false });
  t.is(namer.valName(backgroundRedM), "red");
  t.is(namer.valName(ffSansSerif), "sans-serif");
  t.is(namer.valName(marginTop10L), "10");
});

test("Creates a valid alias value", t => {
  t.is(namer.name(ffSansSerif), "ff-sans-serif");
});

test("Creates a valid breakpoint and value name", t => {
  t.is(namer.name(backgroundRedM), "bg-m-red");
  t.is(namer.name(marginTop10L), "mt-l-10");
});

test("Creates a breakpoint and expansion name", t => {
  t.is(namer.name(marginBottom10L), "mb-l-10");
});

test("Creates valid value names when unitNames set to true", t => {
  namer.setOptions({ unitNames: true });
  t.is(namer.valName(backgroundRedM), "red");
  t.is(namer.valName(ffSansSerif), "sans-serif");
  t.is(namer.valName(marginTop10L), "10px");
});
