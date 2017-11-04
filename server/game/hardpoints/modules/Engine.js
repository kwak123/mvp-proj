var BaseHardpoint = require('../BaseHardpoint');

module.exports = class Engine extends BaseHardpoint {
  constructor() {
    super('module', 70000, .1);
    this.effect = 1.0;
  }
}