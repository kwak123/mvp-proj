var BaseHardpoint = require('../BaseHardpoint');

module.exports = class Laser extends BaseHardpoint {
  constructor() {
    super('weapon', 15000, 50, 20);
  }
}