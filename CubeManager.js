const Cube = require("./Cube");

const defaultCb = (existingDoc, newDoc) => { return existingDoc };

module.exports = class CubeManager {
  constructor({ onTick, onDestroy }) {
    this._onTick = onTick || defaultCb;
    this._onDestroy = onDestroy || defaultCb;
    this.cubes = {}
  }

  createCube({ name, span, maxTicks }) {
    this.cubes[name] = new Cube({
      name, span,
      maxTicks: maxTicks,
      onDestroy: this._onDestroy,
      onTick: this._onTick
    });
    return this.cubes[name]
  }

  getCube(name) {
    return this.cubes[name]
  }

  getCubes() {
    return this.cubes
  }

}