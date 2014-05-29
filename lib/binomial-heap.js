/**
 * @fileoverview
 * @author Taketoshi Aono
 */

'use strict';

var defaultEqualityComparator = require('./default-equality-comprator');
module.exports = BinomialHeap;


/**
 * Create Node for Binomial tree.
 * @param {*} value
 * @returns {Object} 
 */
function createNode(value) {
  return {
    children: [],
    parent: null,
    degree: 0,
    value: value
  };
}


var SENTINEL_NODE = createNode(null);


/**
 * Link two nodes that are have same degree[j] and create node which has the j + 1 degree node.
 * @param {Object} a Parent node
 * @param {Object} b Child node.
 * @returns {Object} degree[a] + 1 node.
 */
function link(a, b) {
  b.parent = a;
  a.children[b.degree] = b;
  a.degree++;
  return a.degree;
};


/**
 * Merge each nodes that are have same degree.  
 * For example.  
 * [1] [1] [2] [3] =>  
 * [2] [2] [3] =>  
 * [3] [4]
 * 
 * @param {function(*,*):number} equalityComparator Compare function.
 * @param {Array.<Object>} roots The root set.
 * @param {Object} node The node which is inserted.
 * @param {Object} nodeOnRoot The node which is inserted before.
 * @returns {number} 
 */
function foldTree(equalityComparator, roots, node, nodeOnRoot) {
  var currentDegree = 0;
  while (nodeOnRoot && nodeOnRoot !== SENTINEL_NODE) {
    roots[node.degree] = SENTINEL_NODE;
    var cmp = equalityComparator(nodeOnRoot.value, node.value);
    if (cmp === -1) {
      currentDegree = link(nodeOnRoot, node);
      node = nodeOnRoot;
    } else {
      currentDegree = link(node, nodeOnRoot);
    }
    nodeOnRoot = roots[currentDegree];
  }
  roots[node.degree] = node;
  return currentDegree;
};


/**
 * Return most min/max node from the root set.
 * @param {number} max Max degree
 * @param {Array.<Object>} roots The root set
 * @param {function(*,*):number} equalityComparator Compare function.
 * @returns {Object} 
 */
function most(max, roots, equalityComparator) {
  var min = null;
  var cmp;
  if (max === 0) return roots[0];
  for (var i = 0, len = max; i <= len; i++) {
    var node = roots[i];
    if (node && node !== SENTINEL_NODE) {
      cmp = min? equalityComparator(min.value, node.value): 1;
      if (cmp === 1) {
        min = node;
      }
    }
  }
  if (!min) return null;
  return min;
}




/**
 * Create a binomial heap.  
 * amortized time.  
 * insert => O(1)/O(log n)
 * pop => O(log n)
 * merge => O(log n)
 * @constructor
 * @param {function(*,*):number} equalityComparator The value comparison function.
 */
function BinomialHeap(equalityComparator) {
  /**
   * @private
   */
  this._equalityComparator = equalityComparator || defaultEqualityComparator;

  /**
   * The root nodes set.  
   * User as sparse array for constant time access by degree.
   * @private
   * @type {Array.<Object>}
   */
  this._roots = [];

  /**
   * Max degree.
   * @private
   * @type {number}
   */
  this._max = 0;

  /**
   * Node length.
   * @type {number}
   */
  this.length = 0;
}


/**
 * Insert new value to binomial heap.
 * @param {*} value The value which is inserted.
 * @returns {*} Inserted value.
 */
BinomialHeap.prototype.insert = function(value) {
  var currentDegree = foldTree(this._equalityComparator, this._roots, createNode(value), this._roots[0]);
  this.length++;
  if (this._max < currentDegree) {
    this._max = currentDegree;
  }
  return value;
};


/**
 * Extract min/max value from the root set.
 * @returns {*} The min/max value.
 */
BinomialHeap.prototype.pop = function() {
  var ret = most(this._max, this._roots, this._equalityComparator);
  if (!ret) {
    return null;
  }

  this.length--;

  var children = ret.children;
  var degree = ret.degree;

  // Remove children.
  ret.children = [];
  
  if (degree) {
    // Remove node from the root set.
    this._roots[degree] = SENTINEL_NODE;

    // Merge all children as new root.
    for (var i = 0; i <= degree; i++) {
      var child = children[i];
      if (child && child !== SENTINEL_NODE) {
        var currentDegree = foldTree(this._equalityComparator, this._roots, children[i], this._roots[children[i].degree]);
        // Update degree.
        if (this._max < currentDegree) {
          this._max = currentDegree;
        }
      }
    }
  } else if (degree === 0) {
    this._roots[degree] = SENTINEL_NODE;
  }
  return ret.value;
};


/**
 * Merge two heaps with destructively.
 * @param {BinomialHeap} heap
 * @returns {BinomialHeap} 
 */
BinomialHeap.prototype.merge = function(heap) {
  if (this._max === null) {
    return heap;
  }

  if (heap._max === null) {
    return this;
  }
  
  var rootsA = heap._roots;
  var rootsB = this._roots;
  var rootsAMax = heap._max;
  var rootsBMax = this._max;
  var currentDegree = 0;
  var newRoots;
  var srcRoots;
  var srcMax;
  var newNode;

  // Decide base heap by degree.
  if (rootsAMax >= rootsBMax) {
    newRoots = rootsA;
    srcRoots = rootsB;
    srcMax = rootsBMax;
  } else {
    newRoots = rootsB;
    srcRoots = rootsA;
    srcMax = rootsAMax;
  }

  // Insert and merge all nodes of srcNode.
  for (var i = 0; i <= srcMax; i++) {
    newNode = srcRoots[i];
    if (newNode && newNode !== SENTINEL_NODE) {
      currentDegree = foldTree(this._equalityComparator, newRoots, newNode, newRoots[i]);
      // Update degree value.
      if (this._max < currentDegree) {
        this._max = currentDegree;
      }
    }
  }
  
  this._roots = newRoots;
  this.length += heap.length;
  
  return this;
};


BinomialHeap.display = function(heap) {
  var roots = heap._roots;
  var ret = [];
  function disp(roots, max) {
    var arr = [];
    for (var i = 0; i <= max; i++) {
      if (roots[i] && roots[i] !== SENTINEL_NODE) {
        arr.push(roots[i].value.toString() + '[' + roots[i].degree + ']' + (roots[i].parent? ('[p:' + roots[i].parent.value + ']'): ''));
      }
    }
    ret.push(arr.join('  -->  ') + '\n');
    for (i = 0; i <= max; i++) {
      if (roots[i] && roots[i].degree > 0) {
        disp(roots[i].children, roots[i].degree);
      }
    }
  }
  disp(roots, heap._max);
  process.stdout.write(ret.join('') + '\n');
};
