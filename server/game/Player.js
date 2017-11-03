module.exports = class Player {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.ship;
    this.credits = 1000;
    this.alive = true;
  }

  modCredits(mod) {
    this.credits += mod;
  }

  setShip(ship) {
    this.ship = ship;
  }

  dead() {
    this.alive = false;
  }
}