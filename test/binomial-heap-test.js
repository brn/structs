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
      a.sort(function(a,b){return a > b? 1: a === b?0: -1});
      var x = [];

      for (i = 0; i < 30; i++) {
        x.push(instance.pop());
      }
      assert.strictEqual(a.length, x.length);
      assert.deepEqual(a, x);
    });
  });


  // describe('#merge()', function() {
  //   it('is insert element into heap.', function() {
  //     var instanceA = init();
  //     instanceA.insert(3);
  //     instanceA.insert(6);
  //     instanceA.insert(2);
  //     instanceA.insert(10);
  //     instanceA.insert(4);
  //     instanceA.insert(1);

  //     var instanceB = init();
  //     instanceB.insert(3);
  //     instanceB.insert(6);
  //     instanceB.insert(2);
  //     instanceB.insert(10);
  //     instanceB.insert(4);
  //     instanceB.insert(1);
  //     var ret = instanceA.merge(instanceB);
  //     //BinomialHeap.display(ret);
  //   });
  // });
});
