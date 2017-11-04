var Player = require('./Player');
var Ship = require('./Ship');
var IncomeManager = require('./income/IncomeManager');

module.exports = class Game {
  constructor(username, species, planet) {
    let defaultShip = {
      name: 'Basic Ship',
      length: 5,
      cost: 0,
      hyperdrive: 0.1,
      mglt: 1
    }
    this.player = new Player(username, species);
    this.starship = new Ship(defaultShip);
    this.incomeManager = new IncomeManager();
    this.planet = planet;
    this.distance = planet.diameter;
    this.turns = 0;
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
    this.turns++;
    this.player.credits += this.incomeManager.calculateIncome();
    this.distance -= this.starship.mglt;
  }

  fetchData() {
    return {
      credits: this.player.credits,
      starship: this.starship,
      generators: this.incomeManager.fetchGenerators(),
      turns: this.turns,
      planet: this.planet,
      distance: this.distance
    };
  }

}