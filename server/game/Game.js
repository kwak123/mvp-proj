var Player = require('./Player');
var IncomeManager = require('./income/IncomeManager');

module.exports = class Game {
  constructor(username, species) {
    this.player = new Player(username, species);
    this.incomeManager = new IncomeManager();
  }

  setShip(ship) {
    this.player.ship = ship;
  }

  spendCredits(mod) {
    if (this.player.credits + mod < 0) {
      return false;
    } else {
      this.player.credits += mod;
      return true;
    }
  }

  calculateTick() {
    this.player.credits += this.incomeManager.calculateIncome();
  }

}