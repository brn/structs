/**
 * @fileoverview
 * @author Taketoshi Aono
 */

var BinomialHeap = require('../lib/binomial-heap');
var perfHarness = require('./perf-harness');
var order = require('./order');
var profiler = require('../lib/profiler');
var Element = require('./element');

function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
// BinomialHeap = profiler.profileFunction(BinomialHeap);
// profiler.setEnable();

module.exports = function(cb) {
  perfHarness([
    {
      name: '[binomial-heap] random values',
      test: function(cb) {
        var instance = new BinomialHeap(Element.compare);
        for (var i = 0; i < order; i++) {
          instance.insert(new Element(randomIntInc(0, order)));
        }
        for (i = 0; i < order; i++) {
          instance.pop();
        }
        cb();
      }
    },
    {
      name: '[binomial-heap] ordered values',
      test: function(cb) {
        var instance = new BinomialHeap(Element.compare);
        for (var i = 0; i < order; i++) {
          instance.insert(new Element(i));
        }
        for (i = 0; i < order; i++) {
          instance.pop();
        }
        cb();
      }
    },
    {
      name: '[binomial-heap] merge',
      test: function(cb) {
        function createHeap() {
          var instance = new BinomialHeap(Element.compare);
          for (var i = 0; i < 10; i++) {
            instance.insert(new Element(randomIntInc(0, order)));
          }
          return instance;
        }

        for (var i = 0; i < order; i++) {
          var a = createHeap();
          var b = createHeap();
          a.merge(b);
        }
        cb();
      }
    }
  ], cb);
};
