var BaseHardpoint = require('../BaseHardpoint');

module.exports = class IonCannon extends BaseHardpoint {
  constructor() {
    super('weapon', 80000, 150, 80);
  }
}