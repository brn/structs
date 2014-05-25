/**
 * @fileoverview
 * @author Taketoshi Aono
 */

'use strict';

var defaultEqualityComparator = require('./default-equality-comprator');
module.exports = BinomialHeap;

/**
 * Create heap node.
 * @constructor
 * @param {T} value
 * @template T
 */
function Node(value) {
  /**
   * @type {Node.<T>}
   */
  this.child = null;

  /**
   * @type {Node.<T>}
   */
  this.parent = null;

  /**
   * @type {Node.<T>}
   */
  this.next = null;
  
  /**
   * @type {number}
   */
  this.degree = 0;

  /**
   * @type {T}
   */
  this.value = value;
}


/**
 * Link new node.
 * @param {Node.<T>} node
 */
Node.prototype.link = function(node) {
  node.parent = this;
  node.next = this.child;
  this.child = node;
  this.degree++;
};



/**
 * Define binomial heap.
 * @constructor
 * @param {function(T, T):number} equalityComparator value comparison function.
 * @template T
 */
function BinomialHeap(equalityComparator) {
  /**
   * @private {function(T, T):number}
   */
  this._equalityComparator = equalityComparator || defaultEqualityComparator;

  /**
   * @private {Node.<T>}
   */
  this._root = null;
}


/**
 * Insert item.
 * @param {T} value item
 */
BinomialHeap.prototype.insert = function(value) {
  var node = new Node(value);
  if (!this._root) {
    this._root = node;
      BinomialHeap.display(this);
  console.log('');
    return this;
  }
  this._doMerge(node, this._root, this);
    BinomialHeap.display(this);
  console.log('');
  return this;
};


BinomialHeap.prototype.pop = function() {
  var root = this._root;
  var most;
  var cmp = root.value;
  while (root) {
    if (!root.next) {return root.value;}
    cmp = this._equalityComparator(most.value, root.next.value);
    if (cmp === 1) {
      most = root.next;
    }
    root = root.next();
  }
  return most;
};


BinomialHeap.prototype.merge = function(heap) {
  var newHeap = new BinomialHeap(this._equalityComparator);
  var rootA = heap._root;
  var rootB = this._root;  
  this._doMerge(rootA, rootB, newHeap);
  return newHeap;
};


BinomialHeap.prototype.append = function(heap) {
  if (!this._root) {
    this._root = heap._root;
    return this;
  }
  var rootA = heap._root;
  var rootB = this._root;
  this._root = null;
  this._doMerge(rootA, rootB, this);
  return this;
};


BinomialHeap.prototype._doMerge = function(rootA, rootB, heap) {
  var root = this._mergeRoots(rootA, rootB);
  var tree = root;
  var next = tree.next;
  var prev = null;
  
  while (next) {
    if (tree.degree != next.degree || (next.next && next.next.degree === tree.degree)) {
      prev = tree;
      tree = next;
    } else if (this._equalityComparator(tree.value, next.value) === -1) {
      tree.next = next.next;
      tree.link(next);
    } else {
      if (!prev) {
        root = next;
      } else {
        prev.next = next;
      }
      next.link(tree);
      tree = next;
    }
    next = tree.next;
    heap._root = root;
  }
};


/**
 * Return whether the tree is empty or not.
 * @returns {boolean} 
 */
BinomialHeap.prototype.isEmpty = function() {
  return !!this._root;
};


/**
 * @private
 * @param {Node.<T>} tree
 */
BinomialHeap.prototype._mergeRoots = function(treeA, treeB) {
  if (!treeA) return treeB;
  if (!treeB) return treeA;
  var cmp = this._equalityComparator(treeA.degree, treeB.degree);
  var tree;
  if (cmp === -1) {
    tree = treeA;
    treeA = treeA.next;
  } else {
    tree = treeB;
    treeB = treeB.next;
  }
  var root = tree;
  
  while (treeA && treeB) {
    cmp = this._equalityComparator(treeA.degree, treeB.degree);
    if (cmp === -1) {
      root.next = treeA;
      treeA = treeA.next;
    } else {
      root.next = treeB;
      treeB = treeB.next;
    }
    root = root.next;
  }
  if (treeB) {
    root.next = treeB;
  } else {
    root.next = treeA;
  }
   BinomialHeap.display(this);
  console.log("treeA = %s, treeB = %s, root = %s", treeA && treeA.value, treeB && treeB.value, root.value);
  return tree;
};


BinomialHeap.display = function(heap) {
  var root = heap._root;
  var ret = [];
  function disp(root) {
    var arr = [];
    var tmp = root;
    while (root) {
      arr.push(root.value.toString() + '[' + root.degree + ']');
      root = root.next;
    }
    ret.push(arr.join('  -->  ') + '\n');
    root = tmp;
    while (root) {
      if (root.child) {
        disp(root.child);
      }
      root = root.next;
    }
  }
  disp(root);
  process.stdout.write(ret.join(''));
};
