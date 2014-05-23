/**
 * @fileoverview
 * @author Taketoshi Aono
 */

var BinaryHeap = require('../lib/binary-heap');
var perfHarness = require('./perf-harness');

function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

var MAX = Math.pow(10000, 2) / 10;

perfHarness('[binary-heap] random values', function(cb) {
  var instance = new BinaryHeap();
  for (var i = 0; i < MAX; i++) {
    instance.insert(randomIntInc(0, MAX));
  }
  for (i = 0; i < MAX; i++) {
    instance.takeRoot();
  }
  cb();
});


perfHarness('[binary-heap] ordered values', function(cb) {
  var instance = new BinaryHeap();
  for (var i = 0; i < MAX; i++) {
    instance.insert(i);
  }
  for (i = 0; i < MAX; i++) {
    instance.takeRoot();
  }
  cb();
});

