const fs = require("fs");
let namer = require("./namer");

class Writer {
  write(rules, config) {
    const breakpoints = [[null]].concat(
      Object.entries(config.rules.breakpoints)
    );
    const options = {
      unitNames: config.rules.noUnitNames !== true
    };

    namer.setOptions(options);
    return breakpoints.map(this.renderBreakpoint(options, rules)).join(" ");
  }

  renderBreakpoint(options, rules) {
    return breakpoint => {
      return breakpoint[0] === null
        ? `${this.rulesForBreakpoint(rules, breakpoint)}`
        : `@media (min-width: ${breakpoint[1]}) { ${this.rulesForBreakpoint(
            rules,
            breakpoint
          )} }`;
    };
  }

  rulesForBreakpoint(rules, breakpoint) {
    return rules
      .filter(this.isBreakpoint(breakpoint))
      .map(this.writeRule.bind(this))
      .join(" ");
  }

  isBreakpoint(breakpoint) {
    return rule => {
      return rule.breakpoint === breakpoint[0];
    };
  }

  writeRule(rule) {
    return `.${namer.name(rule)} { ${this.expandedProp(rule)}: ${rule.value} }`;
  }

  expandedProp(rule) {
    return rule.expansion === null
      ? rule.prop
      : `${rule.prop}-${rule.expansion}`;
  }
}

module.exports = new Writer();
