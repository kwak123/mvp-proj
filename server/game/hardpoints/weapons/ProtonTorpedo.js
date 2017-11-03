var BaseHardpoint = require('../BaseHardpoint');

module.exports = class ProtonTorpedo extends BaseHardpoint {
  constructor() {
    super('weapon', 500000, 1500, 600);
  }
}