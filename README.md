# EnigmaCube

# Current Version - 0.0.3

A cube that manages and counts the number of requests.

Instead of hitting the server for every increment of count the cube sends blocks of count.

## Usage

### Create a Cube

```js

var EnigmaCube = require('enigmacube');

var enigmaCube = new EnigmaCube({
  onTick:(existingValue, newValue) => {
    if (!existingValue) return newValue;
    return existingValue + newValue;
  },
  onDestroy:(obj) => {
  console.log('_____________Cube Destroyed______________')
  console.log(obj);
  console.log('_________________________________________\n')
  }
});

var reqCube = enigmaCube.createCube({ name: 'snapshot:userReqCounter:g', span: 2000, maxTicks: 60 });

```

### Get a Cube

```js
var EnigmaCube = require("enigmacube");

var enigmaCube = new EnigmaCube({
  onTick:(existingValue, newValue) => {
    if (!existingValue) return newValue;
    return existingValue + newValue;
  },
  onDestroy:(obj) => {
  console.log('_____________Cube Destroyed______________')
  console.log(obj);
  console.log('_________________________________________\n')
  }
});

var reqCube = enigmaCube.getCube("snapshot:userReqCounter:g");

```

### Get all Cubes

```js

var EnigmaCube = require('enigmacube');

var enigmaCube = new EnigmaCube({
  onTick:(existingValue, newValue) => {
    if (!existingValue) return newValue;
    return existingValue + newValue;
  },
  onDestroy:(obj) => {
  console.log('_____________Cube Destroyed______________')
  console.log(obj);
  console.log('_________________________________________\n')
  }
});

var cubes = enigmaCube.getCubes());

```

### Full Example

```js

var EnigmaCube = require("enigmacube");

var enigmaCube = new EnigmaCube({
  onTick:(existingValue, newValue) => {
    if (!existingValue) return newValue;
    return existingValue + newValue;
  },
  onDestroy:(obj) => {
  console.log('_____________Cube Destroyed______________')
  console.log(obj);
  console.log('_________________________________________\n')
  }
});

var reqCube = enigmaCube.createCube({
  name: "snapshot:userReqCounter:g",
  span: 2000,
  maxTicks: 60,
});

setInterval(() => {
  reqCube.tick('request', 1);
}, 250);

```
# EnigmaCube Instance
## EnigmaCube({onTick, onDestroy})
- **onTick**
  - The function that will be executed whenever **cube.tick** is called.
- **onDestroy**
  - The function that will be executed whenever the cube gets destroyed.
#### Returns
  Instance of EnigmaCube that can create cubes with onTick and onDestroy functionalities.
## .createCube({name, span, maxTicks})
- **name**
  - the Name of the cube.
- **span**
  - Time in milliseconds that the cube will be destroy and send after.
  - Ex. 5000
- **maxTicks**
  - Number of times the cube will tick before destroying and sending count.
#### Returns
  Instance of cube.
## .getCube(name)
- **name**
  - the Name of the cube that will be retrieved.
#### Returns
  Instance of cube.
# Cube Instance
## .tick(key,value)
- **key**
  - The name of the index inside the cube.
- **value**
  - The value in the cube that will be added in that **key**.