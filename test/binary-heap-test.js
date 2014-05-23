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
      assert.strictEqual(instance.takeRoot(), 10);
      assert.strictEqual(instance.takeRoot(), 6);
      assert.strictEqual(instance.takeRoot(), 4);
      assert.strictEqual(instance.takeRoot(), 3);
      assert.strictEqual(instance.takeRoot(), 2);
      assert.strictEqual(instance.takeRoot(), 1);
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
      assert.strictEqual(instance.takeRoot(), 1);
      assert.strictEqual(instance.takeRoot(), 2);
      assert.strictEqual(instance.takeRoot(), 3);
      assert.strictEqual(instance.takeRoot(), 4);
      assert.strictEqual(instance.takeRoot(), 6);
      assert.strictEqual(instance.takeRoot(), 10);
      assert.strictEqual(instance.length, 0);
    });
  });
});
