var BaseHardpoint = require('./hardpoints/BaseHardpoint');

module.exports = class Ship {
  constructor(length, hyperdrive, cost, mglt, modules) {
    this.maxHealth = length * 100;
    this.maxShields = this.maxHealth * hyperdrive;
    this.health = this.maxHealth;
    this.shields = this.maxShields;
    this.maxHardpoints = Math.max(5, Math.cbrt(length));
    this.cost = cost;
    this.mglt = mglt;
    this.pilot;
    this.hardpoints = {};
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

  addHardpoint(hardpoint) {
    if (hardpoint instanceof BaseHardpoint) {
      if (this.hardpoints.length < this.maxHardpoints) {
        this.hardpoints[hardpoint.name] = hardpoint;
        return true;
      } 
    }
    return false;
  }

  deleteHardpoint(hardpoint) {
    if (this.hardpoints.hasOwnProperty(hardpoint.name)) {
      delete this.hardpoints[hardpoint.name];
      return true;
    } else {
      return false;
    }
  }

  getHardpoints() {
    let result = [];
    for (let key in this.hardpoints) {
      result.push(this.hardpoints[key].name);
    }
    return result;
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