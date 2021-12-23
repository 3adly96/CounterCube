const Cube = require("./Cube");

module.exports = class CubeManager {
  constructor(){
    this.cubes = {}
  }

  _onDestroy(obj){
  console.log('_____________Cube Destroyed______________')
  console.log(obj)
  console.log('_________________________________________\n')
  }
  
  _onTick(existingValue, newValue){
    if (!existingValue) return newValue;
    return existingValue + newValue;
  }

  createCube({name, span, maxTicks}){
    this.cubes[name] =  new Cube({
      name, span, 
      maxTicks: maxTicks,
      onDestroy: this._onDestroy,
      onTick: this._onTick });
    return this.cubes[name]
  }

  getCube(name) {
    return this.cubes[name]
  }

  getCubes() {
    return this.cubes
  }

}