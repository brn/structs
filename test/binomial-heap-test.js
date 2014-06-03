/**
 * @fileoverview
 * @author Taketoshi Aono
 */

'use strict';

var BinomialHeap = require('../lib/binomial-heap');
var assert = require('assert');


describe('BinomialHeap', function() {
  var init;
  beforeEach(function() {
    init = function() {
      return new BinomialHeap();
    };
  });

  var order = 10000;
  function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }
  
  describe('#insert()', function() {
    it('is insert element into heap.', function() {
      var instance = init();
      var a = [];
      for (var i = 0;i < 30; i++) {
        var v = v = randomIntInc(0, order);
        a.push(v);
        instance.insert(v);
      }
      assert.strictEqual(instance.length, 30);
      a.sort(function(a,b){return a > b? 1: a === b?0: -1});
      var x = [];

      for (i = 0; i < 30; i++) {
        x.push(instance.pop());
      }
      assert.strictEqual(a.length, x.length);
      assert.deepEqual(a, x);
    });
  });


  describe('#merge()', function() {
    it('is insert element into heap.', function() {
      var a = [];
      var index = 30;
      function createHeap() {
        var instance = init();
        for (var i = 0;i < index; i++) {
          var v = v = randomIntInc(0, order);
          a.push(v);
          instance.insert(v);
        }
        return instance;
      }

      var instanceA = createHeap();
      var instanceB = createHeap();
      var ret = instanceA.merge(instanceB);
      assert.strictEqual(ret.length, index * 2);
      a.sort(function(a,b){return a > b? 1: a === b?0: -1});
      var x = [];

      for (var i = 0; i < index * 2; i++) {
        x.push(ret.pop());
      }
      assert.strictEqual(a.length, x.length);
      assert.deepEqual(a, x);
    });
  });
});
