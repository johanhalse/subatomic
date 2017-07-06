var yaml = require("yamljs");
var changeCase = require("change-case");

class Namer {
  constructor() {
    this.naming = yaml.load("./naming.yml");
  }

  setOptions(options) {
    this.options = options;
  }

  name(rule) {
    return `${this.shortenedName(rule)}${this.expansionName(
      rule
    )}-${this.breakpointName(rule)}${this.valName(rule)}`;
  }

  shortenedName(rule) {
    return this.naming.names.hasOwnProperty(rule.prop) === true
      ? this.naming.names[rule.prop]
      : rule.prop;
  }

  expansionName(rule) {
    return this.naming.expansions.hasOwnProperty(rule.expansion) === true
      ? this.naming.expansions[rule.expansion]
      : "";
  }

  breakpointName(rule) {
    return rule.breakpoint === null ? "" : `${rule.breakpoint}-`;
  }

  valName(rule) {
    return this.naming.values.hasOwnProperty(rule.value) === true
      ? this.naming.values[rule.value]
      : this.trimUnits(rule);
  }

  trimUnits(rule) {
    const str = changeCase.camelCase(rule.value);

    if (rule.alias !== null) {
      return rule.alias;
    }

    if (this.options.unitNames === true) {
      return str;
    }
    // Not an exhaustive list but the ones we are likely to use
    return str.replace(/px$|em$|rem$|vw$|vh$/, "").replace(/\./g, "");
  }
}

module.exports = new Namer();
