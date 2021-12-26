var NanoTimer = require('nanotimer');
/**
 * TimeCube that holds a doc and 
 * update it on tick and returned on timeout 
 */

/**
 * @param currentDoc {object} represents the current doc if exists
 * @param incomingDoc {object} represents the doc passed on tick.
 */
const defaultCb = (existingDoc, newDoc) => { return existingDoc };

class Cube {
  /**
   * @param name {string} the cube name
   * @param span {number} milliseconds represents the cube life span
   * @param beforeTick {function} triggered before tick function
   * @param onTick {function} triggered after before tick
   * @param afterTick {function} triggered after onTick
   * @param onDetroy {function} tiggered at the end of the span
   */
  constructor({ name, span, beforeTick, onTick, afterTick, onDestroy, maxTicks }) {
    this.name = name || 'Unname Cube';
    this.span = span || 60000;
    this.tree = {};
    /** function that returns doc update */
    this.onTick = onTick || this._onTick || defaultCb;

    this.beforeTick = beforeTick || this._beforeTick || defaultCb;
    this.afterTick = afterTick || this._afterTick || defaultCb;
    /** cube life cycle the doc will be passed */
    this.onDestroy = onDestroy || this._onDestroy || defaultCb;

    this.cubeRunning = false;
    /** holds the timestamp for the current spin */
    this.timestamp = new Date().getTime();
    /** Maximum Ticks before destroying the cube */
    this.maxTicks = maxTicks || null
    /** Timeout object of Cube */
    this.myTimeout = {};
    this.tickCount = 0;

    this.timer = new NanoTimer();
  }

  /** records time stamp at the begging of span */
  _updateTimestamp() {
    this.timestamp = new Date().getTime();
  }

  _spin() {
    this.cubeRunning = true;
    this._reset();
    this._updateTimestamp();
    this._initTimer();
  }

  _reset() {
    this.tree = {};
  }

  tick(key, value) {
    if (!key) return;
    let currentDoc = this.tree[key];
    /* spin the cube if sleeping */
    if (!this.cubeRunning) this._spin();
    /** spin the cube if not running */
    currentDoc = this.beforeTick(currentDoc, value);
    /** update doc */
    currentDoc = this.onTick(currentDoc, value);
    this.tree[key] = currentDoc;
    currentDoc = this.afterTick(currentDoc, value);
    if (this.maxTicks) {
      if (this.tickCount >= this.maxTicks) {
        this._destroy();
      }
      this.tickCount++;
    }
  }

  _initTimer() {
    this.myTimeout = this.timer.setTimeout(() => {
      this._destroy();
    }, '', this.span + 'm');
  }

  _destroy() {
    this.cubeRunning = false;
    /** call destroy and pass clone */
    this.onDestroy(JSON.parse(JSON.stringify({
      timestamp: this.timestamp,
      tree: this.tree,
      name: this.name,
    })));
    this._reset();
    this.timer.clearTimeout(this.myTimeout);
  }
}

module.exports = Cube;
