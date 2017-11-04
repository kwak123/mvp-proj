// Consider moving this out into separate classes one day

module.exports = class IncomeManager {
  constructor() {
    this.properties = {
      SOLAR_FARM: 'SolarFarms',
      SPICE_FACTORY: 'SpiceFactories',
      SMUGGLER_DEN: 'SmugglerDens',
      KINGPIN_SEAMUS: 'KingpinSeamus'
    };
    this.incomeGenerators = {
      SolarFarms: {
        level: 1,
        count: 0,
        cost: 500,
        output: 25,
        modifier: 1.0
      },
      SpiceFactories: {
        level: 1,
        count: 0,
        cost: 10000,
        output: 350,
        modifier: 1.0
      },
      SmugglerDens: {
        level: 1,
        count: 0,
        cost: 4000000,
        output: 20000,
        modifier: 1.0
      },      
      KingpinSeamus: {
        level: 1,
        count: 0,
        cost: 1000000000,
        output: 1,
        modifier: 1.0
      }
    };
  }

  levelUp(property) {
    this.incomeGenerators[property].level++;
    this.incomeGenerators[property].modifier += .1;
  }

  fetchLevelUpCost(property) {
    let prop = this.incomeGenerators[property];
    return prop.level * prop.cost / 2;
  }

  purchase(property) {
    return this.incomeGenerators[property].count++;
  }

  fetchCost(property) {
    return this.incomeGenerators[property].cost;
  }

  fetchGenerators() {
    let result = [];
    for (let key in this.properties) {
      let data = {};
      data.name = this.properties[key];
      data.count = this.incomeGenerators[this.properties[key]].count;
      result.push(data);
    }
    return result;
  }

  calculateIncome() {
    let result = 0;
    for (var key in this.properties) {
      let name = this.properties[key];
      let curr = this.incomeGenerators[name];
      result += Math.floor(curr.count * curr.output * curr.modifier);
    }
    return result;
  }
}