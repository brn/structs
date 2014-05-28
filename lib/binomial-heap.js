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
  this._max = null;
}


BinomialHeap.prototype.insert = function(value) {
  var node = createNode(value);
  if (this._max === null) {
    this._roots[0] = node;
    this._max = 0;
    return value;
  }
  if (this._roots[0]) {
    var nodeOnNewHeap = this._roots[0];
    var currentDegree = 0;
    while (nodeOnNewHeap) {
      this._roots[node[DEGREE_SLOT]] = null;
      if (this._equalityComparator(nodeOnNewHeap[VALUE_SLOT], node[VALUE_SLOT]) === -1) {
        currentDegree = this._link(nodeOnNewHeap, node);
        node = nodeOnNewHeap;
      } else {
        currentDegree = this._link(node, nodeOnNewHeap);
      }
      nodeOnNewHeap = this._roots[currentDegree];
    }
    this._roots[currentDegree] = node;
    if (this._max < currentDegree) {
      this._max = currentDegree;
    }
  } else {
    this._roots[0] = node;
  }
  // var ret = this._doMerge([node], this._roots, 0, this._max, []);
  // this._roots = ret[0];
  // this._max = ret[1];
  return value;
};


BinomialHeap.prototype.pop = function() {
  var ret = this._most();
  if (!ret) {
    return null;
  }

  var children = ret[CHILDREN_SLOT];
  var degree = ret[DEGREE_SLOT];
  ret[CHILDREN_SLOT] = [];
  if (degree) {
    this._roots[degree] = null;
    var tmp = this._doMerge(children, this._roots, degree? degree - 1: 0, this._max, []);
    this._roots = tmp[0];
    this._max = tmp[1];
  } else if (degree === 0) {
    this._roots[degree] = null;
  }
  
  return ret[VALUE_SLOT];
};


BinomialHeap.prototype.merge = function(heap) {
  var newHeap = new BinomialHeap(this._equalityComparator);

  if (this._max === null && heap._max === null) {
    return newHeap;
  }

  if (this._max === null) {
    newHeap._roots = heap._roots;
    newHeap._max = heap._max;
    return newHeap;
  }

  if (heap._max === null) {
    newHeap._roots = this._roots;
    newHeap._max = this._max;
    return newHeap;
  }
  
  var rootsA = heap._roots;
  var rootsB = this._roots;  
  var ret = this._doMerge(rootsA, rootsB, heap._max, this._max, []);
  newHeap._roots = ret[0];
  newHeap._max = ret[1];
  return newHeap;
};


BinomialHeap.prototype._most = function() {
  if (this._max === null) return null;
  if (this._max === 0) return this._roots[0];
  var min = null;
  var cmp;
  for (var i = 0, len = this._max; i <= len; i++) {
    if (this._roots[i]) {
      cmp = min? this._equalityComparator(min[VALUE_SLOT], this._roots[i][VALUE_SLOT]): 1;
      if (cmp === 1) {
        min = this._roots[i];
      }
    }
  }
  if (!min) return null;
  return min;
};


BinomialHeap.prototype._doMerge = function(rootsA, rootsB, rootsAMax, rootsBMax, newRoots) {
  var index = 0;
  var aIndex = 0;
  var bIndex = 0;
  var nodeA = rootsA[0];
  var nodeB = rootsB[0];
  var aDegree = 0;
  var bDegree = 0;
  var currentDegree = 0;
  var nodeOnNewHeap;
  var newNode;
  
  while (aIndex <= rootsAMax || bIndex <= rootsBMax) {
    if (nodeA && nodeB) {
      var cmp = this._equalityComparator(nodeA[VALUE_SLOT], nodeB[VALUE_SLOT]);
      if (cmp === -1) {
        currentDegree = this._link(nodeA, nodeB);
        nodeOnNewHeap = newRoots[currentDegree];
        newNode = nodeA;
      } else {
        currentDegree = this._link(nodeB, nodeA);
        nodeOnNewHeap = newRoots[currentDegree];
        newNode = nodeB;
      }
    } else if (nodeB) {
      newNode = nodeB;
      currentDegree = bIndex;
      nodeOnNewHeap = newRoots[bIndex];
    } else if (nodeA) {
      newNode = nodeA;
      currentDegree = aIndex;
      nodeOnNewHeap = newRoots[aIndex];
    }
    
    if (nodeOnNewHeap && nodeOnNewHeap !== newNode) {
      while (1) {
        newRoots[newNode[DEGREE_SLOT]] = null;
        if (this._equalityComparator(nodeOnNewHeap[VALUE_SLOT], newNode[VALUE_SLOT]) === -1) {
          currentDegree = this._link(nodeOnNewHeap, newNode);
          newNode = nodeOnNewHeap;
        } else {
          currentDegree = this._link(newNode, nodeOnNewHeap);
        }
        nodeOnNewHeap = newRoots[currentDegree];
        if (!nodeOnNewHeap) {
          newRoots[currentDegree] = newNode;
          break;
        }
      }
      newNode[PARENT_SLOT] = null;
    } else if (newNode) {
      newRoots[currentDegree] = newNode;
      newNode[PARENT_SLOT] = null;
    }

    aIndex++;
    bIndex++;
    nodeA = rootsA[aIndex];
    nodeB = rootsB[bIndex];
    nodeOnNewHeap = null;
    newNode = null;
  }
  
  return [newRoots, currentDegree];
};


BinomialHeap.prototype._link = function(a, b) {
  b[PARENT_SLOT] = a;
  a[CHILDREN_SLOT][b[DEGREE_SLOT]] = b;
  a[DEGREE_SLOT]++;
  return a[DEGREE_SLOT];
};


BinomialHeap.display = function(heap) {
  var roots = heap._roots;
  var ret = [];
  function disp(roots, max) {
    var arr = [];
    for (var i = 0; i <= max; i++) {
      if (roots[i]) {
        arr.push(roots[i][VALUE_SLOT].toString() + '[' + roots[i][DEGREE_SLOT] + ']' + (roots[i][PARENT_SLOT]? ('[p:' + roots[i][PARENT_SLOT][VALUE_SLOT] + ']'): ''));
      }
    }
    ret.push(arr.join('  -->  ') + '\n');
    for (i = 0; i <= max; i++) {
      if (roots[i] && roots[i][DEGREE_SLOT] > 0) {
        disp(roots[i][CHILDREN_SLOT], roots[i][DEGREE_SLOT]);
      }
    }
  }
  disp(roots, heap._max);
  process.stdout.write(ret.join('') + '\n');
};
