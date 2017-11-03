module.exports = class BaseHardpoint {
  constructor(type, cost, effect, increment) {
    this.type = type;
    this.cost = cost;
    this.effect = effect;
    this.increment = increment;
    this.level = 1;
    this.levelUpCost = this.level * this.cost;
    this.maxLevel = 5;
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.effect += this.increment;
      return true;
    } 
    return false;
  }

  getType() {
    return this.type;
  }

  getCost() {
    return this.cost;
  }
}