var Ship = require('../../game/Ship');
var expect = require('chai').expect;

describe('Game units', function() {
  describe('Ship', function() {
    let newShip;

    beforeEach(function() {
      let length = 10;
      let hyperdrive = 1;
      let cost = 1000;
      let mglt = 100;
      newShip = new Ship(length, hyperdrive, cost, mglt);
    });

    it('should have max health/shield, health/shield, cost, and MGLT', function() {
      expect(newShip.maxHealth).to.equal(1000);
      expect(newShip.maxShields).to.equal(1000);
      expect(newShip.health).to.equal(1000);
      expect(newShip.shields).to.equal(1000);
      expect(newShip.cost).to.equal(1000);
      expect(newShip.mglt).to.equal(100);
    });

    it('should be able to receive a pilot', function() {
      let stubbedPilot = {
        stub: 'stubby pilot', 
        dead: () => console.log('dead')
      };
      newShip.addPilot(stubbedPilot);
      expect(newShip.pilot).to.not.equal(undefined);
    });

    it('should be able to take damage and restore health, up to a maximum', function() {
      newShip.modHealth(-100);
      expect(newShip.health).to.equal(900);
      newShip.modHealth(200);
      expect(newShip.health).to.equal(1000);
    });

    it('should be able to take damage and restore shields, up to a maximum', function() {
      newShip.modShields(-100);
      expect(newShip.shields).to.equal(900);
      newShip.modShields(200);
      expect(newShip.shields).to.equal(1000)
    });

    it('should have damage overage on shields transferred to its health instead', function() {
      newShip.modShields(-1100);
      expect(newShip.shields).to.equal(0);
      expect(newShip.health).to.equal(900);
    });

    it('should be non-functional after being destroyed', function() {
      newShip.destroy();
      expect(newShip.shields).to.equal(0);
      expect(newShip.health).to.equal(0);
      expect(newShip.functional).to.equal(false);
    });

    it('should destroy itself if hp reduces to 0', function() {
      newShip.modHealth(-1000);
      expect(newShip.shields).to.equal(0);
      expect(newShip.health).to.equal(0);
      expect(newShip.functional).to.equal(false);
    });

    it('should never have negative hp or shields, even when destroyed', function() {
      newShip.modShields(-2500);
      expect(newShip.shields).to.equal(0);
      expect(newShip.health).to.equal(0);
      expect(newShip.functional).to.equal(false);
    });

    //TODO - add module tests
  });
});