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
        output: 10,
        modifier: 1.0
      },
      SpiceFactories: {
        level: 1,
        count: 0,
        cost: 10000,
        output: 250,
        modifier: 1.0
      },
      SmugglerDens: {
        level: 1,
        count: 0,
        cost: 4000000,
        output: 2000,
        modifier: 1.0
      },      
      KingpinSeamus: {
        level: 1,
        count: 0,
        cost: 3000000000,
        output: 1,
        modifier: 1.0
      }
    };
  }

  levelUp(property) {
    this.incomeGenerators[property].level++;
    this.incomeGenerators[property].modifier += .1;
    return this.incomeGenerators[property].level++;
  }

  purchase(property) {
    return this.incomeGenerators[property].count++;
  }

  fetchCost(property) {
    return this.incomeGenerators[property].cost * this.incomeGenerators[property].level;
  }

  calculateIncome() {
    let result = 0;
    for (var key in this.properties) {
      let curr = this.incomeGenerators[key];
      result += curr.output * curr.modifier;
    }
    return result;
  }
}