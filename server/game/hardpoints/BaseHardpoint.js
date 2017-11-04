module.exports = class BaseHardpoint {
  constructor(type, cost, increment) {
    this.type = type;
    this.cost = cost;
    this.increment = increment;
    this.level = 0;
    this.levelUpCost = this.level * this.cost || this.cost;
  }

  levelUp() {
    this.level++;
    this.effect += this.increment;
    this.levelUpCost = this.level * this.cost;
  }
}