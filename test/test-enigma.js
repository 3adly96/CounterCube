var EnigmaCube = require("../CubeManager.js");
const { performance } = require('perf_hooks');

var enigmaCube = new EnigmaCube({
  onTick:(existingValue, newValue) => {
    if (!existingValue) return newValue;
    return existingValue + newValue;
  },
  onDestroy:(obj) => {
  console.log('_____________Cube Destroyed______________')
  console.log(obj)
  console.log('_________________________________________\n')}
});

var reqCube = enigmaCube.createCube({
  name: "snapshot:userReqCounter:g",
  span: 2000,
  maxTicks: 500,
});

setInterval(() => {
  reqCube.tick('UserRequest', 1);
}, 250);