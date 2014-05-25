/**
 * @fileoverview
 * @author Taketoshi Aono
 */

'use strict';


var defaultEqualityComparator = require('./default-equality-comprator');

module.exports = BinaryHeap;

/**
 * @constructor
 * @template T
 * @param {Function} equalityComparator
 */
function BinaryHeap(equalityComparator) {
  /**
   * @private {Array.<T>}
   */
  this._list = [];

  /**
   * @private {Function}
   */
  this._equalityComparator = equalityComparator || defaultEqualityComparator;


  /**
   * @private {number}
   */
  this.length = this._list.length;
}


/**
 * Insert new value.
 * @param {T} value
 * @returns {T} The value which is inserted.
 */
BinaryHeap.prototype.insert = function(value) {
  this.length++;
  if (this.length) {
    this._list.push(value);
    this._siftup(value);
  } else {
    this._list.push(value);
  }
  return value;
};



/**
 * Remove node from tree.
 * @param {T} value
 * @returns {T}  The value which is removed.
 */
BinaryHeap.prototype.remove = function(value) {
  var swapTmp;
  var ret;
  var cmp;
  var pos = 0;
  var left;
  var right;
  var posTmp;
  while (pos < this.length) {
    cmp = this._equalityComparator(value, this._list[pos]);
    if (!cmp) {
      var last = this._list.length - 1;
      swapTmp = this._list[pos];
      this._list[pos] = this._list[last];
      this._list[last] = swapTmp;
      this._list.pop();
      this.length--;
      this._siftdown(pos);
      return ret;
    }
    pos++;
  }
  return null;
};


/**
 * Get root value from heap.
 * @returns {T} The root.
 */
BinaryHeap.prototype.takeRoot = function() {
  var swapTmp;
  var ret;
  
  if (this.length === 2) {
    this.length--;
    return this._list.shift();
  }

  if (this.length === 1) {
    this.length--;
    return this._list.shift();
  }
  
  if (this.length) {
    swapTmp = this._list[0];
    this._list[0] = this._list[this.length - 1];
    this._list[this.length - 1] = swapTmp;
    ret = this._list.pop();
    this.length--;
    this._siftdown(0);
    return ret;
  }
  return null;
};



/**
 * Merge two heaps and return the new BinaryHeap instance.
 * @param {BinaryHeap} heap merge target.
 * @returns {BinaryHeap} The new BinaryHeap instance.
 */
BinaryHeap.prototype.merge = function(heap) {
  var list = heap._list;
  for (var i = 0, len = list.length; i < len; i++) {
    this.insert(list[i]);
  }
  var ret = new BinaryHeap(this._equalityComparator);
  ret._list = this._list;
  ret.length = this.length;
  return ret;
};



/**
 * Do upheap.
 * @param {T} value
 */
BinaryHeap.prototype._siftup = function(value) {
  var position = this.length - 1;
  var swapTmp;
  for (var i = 0; i <= position; i++) {
    var parentPosition = (position - 1) >>> 1;
    if (this._equalityComparator(value, this._list[parentPosition]) === 1) {
      swapTmp = this._list[parentPosition];
      this._list[parentPosition] = value;
      this._list[position] = swapTmp;
      position = parentPosition;
    } else {
      break;
    }
  }
};


/**
 * Do downheap
 * @param {number} position
 */
BinaryHeap.prototype._siftdown = function(position) {
  var len = this.length;
  var value;
  var left;
  var right;
  var posTmp;
  var leftValue;
  var rightValue;
  
  while (position < len) {
    value = this._list[position];
    posTmp = position << 1;
    left = posTmp + 1;
    right = posTmp + 2;
    leftValue = this._list[left];
    rightValue = this._list[right];

    var cmp = this._equalityComparator(leftValue, rightValue);
    if (cmp === 1 && leftValue && this._equalityComparator(leftValue, value) === 1) {
      this._list[position] = leftValue;
      this._list[left] = value;
      position = left;
    } else if (cmp === -1 && rightValue && this._equalityComparator(rightValue, value) === 1) {
      this._list[position] = rightValue;
      this._list[right] = value;
      position = right;
    } else {
      break;
    }
  }
};

