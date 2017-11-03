var BaseHardpoint = require('../BaseHardpoint');

module.exports = class Engine extends BaseHardpoint {
  constructor() {
    super('module', 70000);
    this.level = 1;
    this.levelUpCost = this.level * this.cost;
    this.effectType = 'mglt';
    this.effect = 1.1;
  }
  
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.effect += .1;
      return true;
    } 
    return false;
  }
}