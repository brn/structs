/**
 * @fileoverview
 * @author Taketoshi Aono
 */

'use strict';

var defaultEqualityComparator = require('./default-equality-comprator');
module.exports = BinomialHeap;

var CHILDREN_SLOT = 0;
var PARENT_SLOT = 1;
var DEGREE_SLOT = 2;
var VALUE_SLOT = 3;
var MIN_SLOT = 4;


function createNode(value) {
  return [
    [],
    null,
    0,
    value,
    false
  ];
}


// var CHILD_SLOT = 0;
// var NEXT_SLOT = 1;
// var PARENT_SLOT = 2;
// var DEGREE_SLOT = 3;
// var VALUE_SLOT = 4;
// var MIN_SLOT = 5;


// function createNode(value) {
//   return [
//     null,
//     null,
//     null,
//     0,
//     value,
//     false
//   ];
// }




// /**
//  * Define binomial heap.
//  * @constructor
//  * @param {function(T, T):number} equalityComparator value comparison function.
//  * @template T
//  */
// function BinomialHeap(equalityComparator) {
//   /**
//    * @private {function(T, T):number}
//    */
//   this._equalityComparator = equalityComparator || defaultEqualityComparator;

//   /**
//    * @private {Node.<T>}
//    */
//   this._root = null;
// }


// /**
//  * Insert item.
//  * @param {T} value item
//  */
// BinomialHeap.prototype.insert = function(value) {
//   var node = createNode(value);
//   if (!this._root) {
//     this._root = node;
//     BinomialHeap.display(this);
//      console.log('')
//     return this;
//   }
//   this._doMerge(node, this._root, this);
//       BinomialHeap.display(this);
//      console.log('')
//   return this;
// };


// BinomialHeap.prototype.pop = function() {
//   var ret = this._most();
//   if (!ret) {
//     return null;
//   }

//   if (ret[1]) {
//     ret[1][NEXT_SLOT] = ret[0][NEXT_SLOT];
//   } else {
//     this._root = ret[0][NEXT_SLOT];
//   }

//   var child = ret[0][CHILD_SLOT];
//   var tmp;
//   if (child) {
//     while (child) {
//       tmp = child[NEXT_SLOT];
//       child[NEXT_SLOT] = null;
//       this._doMerge(child, this._root, this);
//       child = tmp;
//     }
//   }
  
//   return ret[0][VALUE_SLOT];
// };


// BinomialHeap.prototype.peek = function() {
//   var ret = this._most();
//   if (!ret) {
//     return null;
//   }
//   return ret[0][VALUE_SLOT];
// };


// BinomialHeap.prototype.merge = function(heap) {
//   var newHeap = new BinomialHeap(this._equalityComparator);
//   var rootA = heap._root;
//   var rootB = this._root;  
//   this._doMerge(rootA, rootB, newHeap);
//   return newHeap;
// };


// BinomialHeap.prototype.append = function(heap) {
//   if (!this._root) {
//     this._root = heap._root;
//     return this;
//   }
//   var rootA = heap._root;
//   var rootB = this._root;
//   this._root = null;
//   this._doMerge(rootA, rootB, this);
//   return this;
// };


// BinomialHeap.prototype._most = function() {
//   if (!this._root) return null;
//   var most = this._root;
//   var prev = most;
//   var root = most[NEXT_SLOT];
//   var cmp;
//   var mostPrev;
//   while (root) {
//     cmp = this._equalityComparator(most[VALUE_SLOT], root[VALUE_SLOT]);
//     if (cmp === 1) {
//       mostPrev = prev;
//       most = root;
//     }
//     prev = root;
//     root = root[NEXT_SLOT];
//   }

//   return [most, mostPrev];
// };


// BinomialHeap.prototype._link = function(a, b) {
//   b[PARENT_SLOT] = a;
//   b[NEXT_SLOT] = a[CHILD_SLOT];
//   a[CHILD_SLOT] = b;
//   a[DEGREE_SLOT]++;
// };


// BinomialHeap.prototype._doMerge = function(rootA, rootB, heap) {
//   var root = this._mergeRoots(rootA, rootB);
//   var tree = root;
//   var next = tree[NEXT_SLOT];
//   var prev = null;
  
//   while (next) {
//     if (tree[DEGREE_SLOT] != next[DEGREE_SLOT] || (next[NEXT_SLOT] && next[NEXT_SLOT][DEGREE_SLOT] === tree[DEGREE_SLOT])) {
//       prev = tree;
//       tree = next;
//     } else if (this._equalityComparator(tree[VALUE_SLOT], next[VALUE_SLOT]) === -1) {
//       tree[NEXT_SLOT] = next[NEXT_SLOT];
//       this._link(tree, next);
//     } else {
//       if (!prev) {
//         root = next;
//       } else {
//         prev[NEXT_SLOT] = next;
//       }
//       this._link(next, tree);
//       tree = next;
//     }
//     next = tree[NEXT_SLOT];
//   }
//   heap._root = root;
// };


// /**
//  * Return whether the tree is empty or not.
//  * @returns {boolean} 
//  */
// BinomialHeap.prototype.isEmpty = function() {
//   return !!this._root;
// };


// /**
//  * @private
//  * @param {Node.<T>} tree
//  */
// BinomialHeap.prototype._mergeRoots = function(treeA, treeB) {
//   if (!treeA) return treeB;
//   if (!treeB) return treeA;
//   var cmp = this._equalityComparator(treeA[DEGREE_SLOT], treeB[DEGREE_SLOT]);
//   var tree;
//   if (cmp === -1) {
//     tree = treeA;
//     treeA = treeA[NEXT_SLOT];
//   } else {
//     tree = treeB;
//     treeB = treeB[NEXT_SLOT];
//   }
//   var root = tree;
  
//   while (treeA && treeB) {
//     cmp = this._equalityComparator(treeA[DEGREE_SLOT], treeB[DEGREE_SLOT]);
//     if (cmp === -1) {
//       root[NEXT_SLOT] = treeA;
//       treeA = treeA[NEXT_SLOT];
//     } else {
//       root[NEXT_SLOT] = treeB;
//       treeB = treeB[NEXT_SLOT];
//     }
//     root = root[NEXT_SLOT];
//   }
//   if (treeB) {
//     root[NEXT_SLOT] = treeB;
//   } else {
//     root[NEXT_SLOT] = treeA;
//   }
//   return tree;
// };


// BinomialHeap.display = function(heap) {
//   var root = heap._root;
//   var ret = [];
//   function disp(root) {
//     var arr = [];
//     var tmp = root;
//     while (root) {
//       arr.push(root[VALUE_SLOT].toString() + '[' + root[DEGREE_SLOT] + ']' + (root[PARENT_SLOT]? ('[p:' + root[PARENT_SLOT][VALUE_SLOT] + ']'): ''));
//       root = root[NEXT_SLOT];
//     }
//     ret.push(arr.join('  -->  ') + '\n');
//     root = tmp;
//     while (root) {
//       if (root[CHILD_SLOT]) {
//         disp(root[CHILD_SLOT]);
//       }
//       root = root[NEXT_SLOT];
//     }
//   }
//   disp(root);
//   process.stdout.write(ret.join(''));
// };


function BinomialHeap(equalityComparator) {
  this._equalityComparator = equalityComparator || defaultEqualityComparator;
  this._roots = [];
}


BinomialHeap.prototype.insert = function(value) {
  var node = createNode(value);
  if (!this._roots.length) {
    this._roots[0] = node;
    return this;
  }
  this._doMerge([node], this._roots, this);
  return this;
};


BinomialHeap.prototype.pop = function() {  
  var ret = this._most();
  if (!ret) {
    return null;
  }

  this._roots.splice(ret[1], 1);

  var children = ret[0][CHILDREN_SLOT];

  if (children.length) {
    for (var i = 0, len = children.length; i < len; i++) {
      children[i][PARENT_SLOT] = null;
      this._doMerge([children[i]], this._roots, this);
    }
  }

  return ret[0][VALUE_SLOT];
};


BinomialHeap.prototype.merge = function(heap) {
  var newHeap = new BinomialHeap(this._equalityComparator);
  var rootsA = heap._roots;
  var rootsB = this._roots;  
  this._doMerge(rootsA, rootsB, newHeap);
  return newHeap;
};


BinomialHeap.prototype._most = function() {
  if (!this._roots.length) return null;
  var min = this._roots[0];
  var minIndex = 0;
  var cmp;
  for (var i = 1, len = this._roots.length; i < len; i++) {
    cmp = this._equalityComparator(min[VALUE_SLOT], this._roots[i][VALUE_SLOT]);
    if (cmp === 1) {
      min = this._roots[i];
      minIndex = i;
    }
  }
  return [min, minIndex];
};


BinomialHeap.prototype._mergeRoots = function(rootsA, rootsB) {
  if (!rootsA.length) return rootsB;
  if (!rootsB.length) return rootsA;
  var roots = rootsA.concat(rootsB);
  roots.sort(function(a, b) {
    var ad = a[DEGREE_SLOT];
    var bd = b[DEGREE_SLOT];
    return ad < bd? -1: ad === bd? 0: 1;
  }.bind(this));
  return roots;
};


BinomialHeap.prototype._doMerge = function(rootsA, rootsB, heap) {
  var roots = this._mergeRoots(rootsA, rootsB);
  var index = 0;
  var current = roots[index];
  var next = roots[index + 1];
  var nextNext = roots[index + 2];
  
  while (next) {
    if (current[DEGREE_SLOT] != next[DEGREE_SLOT] || (nextNext && nextNext[DEGREE_SLOT] === current[DEGREE_SLOT])) {
      current = next;
      index++;
    } else if (this._equalityComparator(current[VALUE_SLOT], next[VALUE_SLOT]) === -1) {
      this._link(current, next);
      roots.splice(index + 1, 1);
    } else {
      this._link(next, current);
      roots.splice(index, 1);
      current = next;
    }
    next = roots[index + 1];
    nextNext = roots[index + 2];
  }
  heap._roots = roots;
};


BinomialHeap.prototype._link = function(a, b) {
  b[PARENT_SLOT] = a;
  a[CHILDREN_SLOT].unshift(b);
  a[DEGREE_SLOT]++;
};


BinomialHeap.display = function(heap) {
  var roots = heap._roots;
  var ret = [];
  function disp(roots) {
    var arr = [];
    for (var i = 0; i < roots.length; i++) {
      arr.push(roots[i][VALUE_SLOT].toString() + '[' + roots[i][DEGREE_SLOT] + ']' + (roots[i][PARENT_SLOT]? ('[p:' + roots[i][PARENT_SLOT][VALUE_SLOT] + ']'): ''));
    }
    ret.push(arr.join('  -->  ') + '\n');
    for (i = 0; i < roots.length; i++) {
      if (roots[i][CHILDREN_SLOT].length) {
        disp(roots[i][CHILDREN_SLOT]);
      }
    }
  }
  disp(roots);
  process.stdout.write(ret.join(''));
};
