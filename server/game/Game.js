var Player = require('./Player');

module.exports = class Game {
  constructor(username, species) {
    this.player = new Player(username, species);
    this.incomeGenerators = [];
  }

  setShip(ship) {
    this.player.ship = ship;
  }

  spendCredits(mod) {
    if (this.player.credits - mod < 0) {
      return false;
    } else {
      this.player.credits -= mod;
      return true;
    }
  }

  calculateTick() {
    let income = incomeGenerators.reduce((a, b) => a + b.income, 0);
    this.player.credits += income;
  }

}