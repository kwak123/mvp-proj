var Engine = require('./hardpoints/modules/Engine')

module.exports = class Ship {
  constructor({ length, hyperdrive, cost, mglt, name }) {
    this.maxHealth = length * 100;
    this.maxShields = this.maxHealth * hyperdrive;
    this.health = this.maxHealth;
    this.shields = this.maxShields;
    this.engine = new Engine();
    this.cost = cost;
    this.base = mglt;
    this.mglt = this.base * this.engine.effect;
    this.name = name;
    this.functional = true;
  }

  modHealth(mod) {
    this.health += mod;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    } else if (this.health <= 0) {
      this.health = 0;
      this.shields = 0;
      this.destroy();
    }
  }

  modShields(mod) {
    let holder = this.shields + mod; // will only ever be negative if shield is less than mod
    this.shields += mod;
    if (this.shields > this.maxShields) {
      this.shields = this.maxShields;
    } else if (this.shields <= 0) {
      this.shields = 0;
      this.modHealth(holder);
    }
  }

  addPilot(pilot) {
    this.pilot = pilot;
  }

  fetchEngineCost() {
    return this.engine.levelUpCost;
  }

  levelUpEngine() {
    this.engine.levelUp();
    this.mglt = Math.floor(this.base * this.engine.effect);
  }

  repair() {
    this.health = this.maxHealth;
    this.shields = this.maxShields;
  }

  destroy() {
    if (this.pilot) { this.pilot.dead(); }
    this.health = 0;
    this.shields = 0;
    this.functional = false;
  }
}