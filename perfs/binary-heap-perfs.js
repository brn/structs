/**
 * @fileoverview
 * @author Taketoshi Aono
 */

var BinaryHeap = require('../lib/binary-heap');
var perfHarness = require('./perf-harness');
var order = require('./order');
var profiler = require('../lib/profiler');
var Element = require('./element');

function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
// BinaryHeap = profiler.profileFunction(BinaryHeap);
// profiler.setEnable();


module.exports = function(cb) {
  perfHarness([
    {
      name: '[binary-heap] insert random values',
      test: function(timer, cb) {
        var instance = new BinaryHeap(Element.compare);
        for (var i = 0; i < order; i++) {
          instance.insert(new Element(randomIntInc(0, order)));
        }
        cb();
      }
    },
    {
      name: '[binary-heap] insert ordered values',
      test: function(timer, cb) {
        var instance = new BinaryHeap(Element.compare);
        for (var i = 0; i < order; i++) {
          instance.insert(new Element(i));
        }
        cb();
      }
    },
    {
      name: '[binary-heap] pop',
      test: function(timer, cb) {
        var instance = new BinaryHeap(Element.compare);
        for (var i = 0; i < order; i++) {
          instance.insert(new Element(i));
        }
        timer.begin();
        for (var i = 0; i < order; i++) {
          instance.pop();
        }
        cb();
      }
    },
    {
      name: '[binary-heap] peek',
      test: function(timer, cb) {
        var instance = new BinaryHeap(Element.compare);
        for (var i = 0; i < order; i++) {
          instance.insert(new Element(i));
        }
        timer.begin();
        for (var i = 0; i < order; i++) {
          instance.peek();
        }
        cb();
      }
    },
    {
      name: '[binary-heap] merge',
      test: function(timer, cb) {
        function createHeap() {
          var instance = new BinaryHeap(Element.compare);
          for (var i = 0; i < 10; i++) {
            instance.insert(new Element(randomIntInc(0, order)));
          }
          return instance;
        }
        for (var i = 0; i < order; i++) {
          timer.stop();
          var a = createHeap();
          var b = createHeap();
          timer.resume();
          a.merge(b);
        }
        cb();
      } 
    }
  ], cb);
};
