let namer = require("./namer");

class Venerator {
  toJSON(config) {
    namer.setOptions({
      unitNames: config.rules.noUnitNames !== true
    });

    return this.parseRules(config);
  }

  parseRules(config) {
    return [].concat.apply(
      [],
      Object.entries(config.rules.atoms).map(this.parseRule.bind(this))
    );
  }

  parseRule(rule) {
    let r = [];
    const breakpoints = [null].concat(rule[1].breakpoints || []);
    const expansions = [null].concat(rule[1].expansions || []);
    const values = rule[1].values || rule[1];
    const aliases = rule[1].aliases || this.nullArray(values.length);

    for (var i = 0; i < breakpoints.length; i++) {
      for (var j = 0; j < expansions.length; j++) {
        for (var k = 0; k < values.length; k++) {
          r.push(
            this.buildRule(
              rule,
              breakpoints[i],
              expansions[j],
              values[k],
              aliases[k]
            )
          );
        }
      }
    }

    return r;
  }

  buildRule(rule, breakpoint, expansion, value, alias) {
    let r = {
      prop: rule[0],
      breakpoint: breakpoint,
      expansion: expansion,
      alias: alias,
      value: value
    };

    r.name = namer.name(r);
    return r;
  }

  nullArray(len) {
    return Array.from(new Array(len)).map(a => {
      return null;
    });
  }
}

module.exports = new Venerator();
