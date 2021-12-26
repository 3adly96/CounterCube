var EnigmaCube = require("../CubeManager.js");
const { performance } = require('perf_hooks');

var enigmaCube = new EnigmaCube({
  onTick: (existingValue, newValue) => {
    if (!existingValue) return newValue;
    return existingValue + newValue;
  },
  onDestroy: (obj) => {
    console.log('_____________Cube Destroyed______________')
    console.log(obj)
    // console.log('_________________________________________\n')
  }
});

var reqCube = enigmaCube.createCube({
  name: "snapshot:userReqCounter:g",
  span: 3000,
  maxTicks: 1000000,
});

// setInterval(() => {
//   reqCube.tick('request', 1);
// }, 250);

// testCount();
// testCount();
// testCount();
// testIndexes();
// testIndexes();
// testIndexes();
var obcount = 0, lastelem = 1, maxcount = 10000;
horizontalObjects()

function horizontalObjects() {
  var x = 0;
  accessDurations = [];
  while (x < 5) {
    obcount = 0;
    lastelem = 1;
    var base = {};
    base = nestedObj();
    var startTime = performance.now()
    getLastElement(base['1'])
    var endTime = performance.now()
    accessDurations.push(endTime - startTime)
    x++
  }
  const reducer = (accumulator, curr) => accumulator + curr;
  console.log('Avg time ==> ' + ((accessDurations.reduce(reducer) / accessDurations.length).toFixed(3)))
}

function testIndexes() {
  var execTime = [];
  var startTime = 0;
  var endTime = 0;
  for (var i = 1; i < 1000001; i++) {
    startTime = performance.now()
    reqCube.tick(String(i), 1);
    endTime = performance.now()
    execTime.push(endTime - startTime)
  }
  var line = '';
  for (var i = 0; i < execTime.length;) {
    for (var j = 0; j < 20; j++) {
      line += execTime[i].toFixed(3) + ' '
      i++;
    }
    line += '\n'
  }
  console.log(line)
  const reducer = (accumulator, curr) => accumulator + curr;
  console.log('Avg time ==> ' + (execTime.reduce(reducer) / execTime.length).toFixed(3))
}

function testCount() {
  var execTime = [];
  var startTime = 0;
  var endTime = 0;
  for (var i = 1; i < 1000001; i++) {
    startTime = performance.now()
    reqCube.tick('1', 1);
    endTime = performance.now()
    execTime.push(endTime - startTime)
  }
  var line = '';
  for (var i = 0; i < execTime.length;) {
    for (var j = 0; j < 20; j++) {
      line += execTime[i].toFixed(3) + ' '
      i++;
    }
    line += '\n'
  }
  console.log(line)
  const reducer = (accumulator, curr) => accumulator + curr;
  console.log('Avg time ==> ' + (execTime.reduce(reducer) / execTime.length).toFixed(3))
}

function nestedObj() {
  if (obcount <= maxcount) {
    obcount++;
    return { '1': nestedObj() };
  }
  else {
    return 1;
  }
}

function getLastElement(base) {
  if (lastelem >= maxcount) {
    return base['1']
  }
  lastelem++;
  return getLastElement(base['1'])
}