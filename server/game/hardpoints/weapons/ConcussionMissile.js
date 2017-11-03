var BaseHardpoint = require('../BaseHardpoint');

module.exports = class ConcussionMissile extends BaseHardpoint {
  constructor() {
    super('weapon', 200000, 400, 150);
  }
}