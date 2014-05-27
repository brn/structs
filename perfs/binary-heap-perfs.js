/**
 * @fileoverview
 * @author Taketoshi Aono
 */

var BinaryHeap = require('../lib/binary-heap');
var perfHarness = require('./perf-harness');
var order = require('./order');

function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}


module.exports = function(cb) {
  perfHarness([
    {
      name: '[binary-heap] random values',
      test: function(cb) {
        var instance = new BinaryHeap();
        for (var i = 0; i < order; i++) {
          instance.insert(randomIntInc(0, order));
        }
        for (i = 0; i < order; i++) {
          instance.takeRoot();
        }
        cb();
      }
    },
    {
      name: '[binary-heap] ordered values',
      test: function(cb) {
        var instance = new BinaryHeap();
        for (var i = 0; i < order; i++) {
          instance.insert(i);
        }
        for (i = 0; i < order; i++) {
          instance.takeRoot();
        }
        cb();
      }
    },
    {
      name: '[binary-heap] merge',
      test: function(cb) {
        function createHeap() {
          var instance = new BinaryHeap();
          for (var i = 0; i < order; i++) {
            instance.insert(randomIntInc(0, order));
          }
          return instance;
        }
        var a = createHeap();
        var b = createHeap();
        a.merge(b);
        cb();
      } 
    }
  ], cb);
};
