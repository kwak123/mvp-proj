var BaseHardpoint = require('../base');

module.exports = class MassDriver extends BaseHardpoint {
  constructor() {
    super('weapon', 30000, 80, 40);
  }
}