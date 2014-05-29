/**
 * @fileoverview
 * @author Taketoshi Aono
 */

var assert = require('assert');
var BinaryHeap = require('../lib/binary-heap');


describe('BinaryHeap', function() {
  var init;

  beforeEach(function() {
    init = function(comparator) {
      return new BinaryHeap(comparator);
    };
  });
  
  describe('#insert()', function() {
    it('is insert item by value order.', function() {
      var instance = init();
      instance.insert(3);
      instance.insert(6);
      instance.insert(2);
      instance.insert(10);
      instance.insert(4);
      instance.insert(1);
      assert.strictEqual(instance.length, 6);
      assert.strictEqual(instance.pop(), 10);
      assert.strictEqual(instance.pop(), 6);
      assert.strictEqual(instance.pop(), 4);
      assert.strictEqual(instance.pop(), 3);
      assert.strictEqual(instance.pop(), 2);
      assert.strictEqual(instance.pop(), 1);
      assert.strictEqual(instance.length, 0);
    });


    it('is insert item by equalityComparator decided order.', function() {
      var instance = init(function(a, b) {
        return a > b? -1: a < b? 1: 0;
      });
      instance.insert(3);
      instance.insert(6);
      instance.insert(2);
      instance.insert(10);
      instance.insert(4);
      instance.insert(1);
      assert.strictEqual(instance.length, 6);
      assert.strictEqual(instance.pop(), 1);
      assert.strictEqual(instance.pop(), 2);
      assert.strictEqual(instance.pop(), 3);
      assert.strictEqual(instance.pop(), 4);
      assert.strictEqual(instance.pop(), 6);
      assert.strictEqual(instance.pop(), 10);
      assert.strictEqual(instance.length, 0);
    });
  });


  describe('remove', function() {
    it('remove item from heap.', function() {
      var instance = init();
      instance.insert(3);
      instance.insert(6);
      instance.insert(2);
      instance.insert(10);
      instance.insert(4);
      instance.insert(1);

      instance.insert(11);
      instance.insert(24);
      instance.insert(26);

      instance.remove(11);
      instance.remove(24);
      instance.remove(26);
      
      assert.strictEqual(instance.length, 6);
      assert.strictEqual(instance.pop(), 10);
      assert.strictEqual(instance.pop(), 6);
      assert.strictEqual(instance.pop(), 4);
      assert.strictEqual(instance.pop(), 3);
      assert.strictEqual(instance.pop(), 2);
      assert.strictEqual(instance.pop(), 1);
      assert.strictEqual(instance.length, 0);
    });
  });


  describe('merge', function() {
    it('is merge two heaps.', function() {
      var instanceA = init();
      instanceA.insert(3);
      instanceA.insert(6);
      instanceA.insert(2);
      instanceA.insert(10);
      instanceA.insert(4);
      instanceA.insert(1);

      var instanceB = init();
      instanceB.insert(13);
      instanceB.insert(16);
      instanceB.insert(12);
      instanceB.insert(110);
      instanceB.insert(14);
      instanceB.insert(11);

      var ret = instanceA.merge(instanceB);
      
      
      assert.strictEqual(ret.length, 12);
      assert.strictEqual(ret.pop(), 110);
      assert.strictEqual(ret.pop(), 16);
      assert.strictEqual(ret.pop(), 14);
      assert.strictEqual(ret.pop(), 13);
      assert.strictEqual(ret.pop(), 12);
      assert.strictEqual(ret.pop(), 11);
      assert.strictEqual(ret.pop(), 10);
      assert.strictEqual(ret.pop(), 6);
      assert.strictEqual(ret.pop(), 4);
      assert.strictEqual(ret.pop(), 3);
      assert.strictEqual(ret.pop(), 2);
      assert.strictEqual(ret.pop(), 1);
      assert.strictEqual(ret.length, 0);
    });
  });
});
