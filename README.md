# CounterCubes
# Current Version - 0.0.1

A cube that manages and counts the number of requests.

Instead of hitting the server for every increment of count the cube sends blocks of count.

## Usage

### Create a Cube
```js

var countercubes = require('countercubes');

var cubeManager = new countercubes();

var reqCube = cubeManager.createCube({ name: 'snapshot:userReqCounter:g', span: 2000, maxTicks: 60 });

```

### Get a Cube
```js

var countercubes = require('countercubes');

var cubeManager = new countercubes();

var reqCube = cubeManager.getCube('snapshot:userReqCounter:g');

```

### Get all Cubes
```js

var countercubes = require('countercubes');

var cubeManager = new countercubes();

var cubes = cubeManager.getCubes());

```

## .createCube({name, span, maxTicks})
* **name**
  * the Name of the cube
* **span**
  * Time in milliseconds that the cube will be destroy and send after.
  * Ex. 5000
* **maxTicks**
  * Number of times the cube will tick before destroying and sending count.

## .getCube(name)
* **name**
  * the Name of the cube that will be retrieved
