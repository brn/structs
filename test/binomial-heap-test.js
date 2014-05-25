/**
 * @fileoverview
 * @author Taketoshi Aono
 */

'use strict';

var BinomialHeap = require('../lib/binomial-heap');


describe('BinomialHeap', function() {
  var init;
  beforeEach(function() {
    init = function() {
      return new BinomialHeap();
    };
  });
  
  describe('#insert()', function() {
    it('is insert element into heap.', function() {
      var instance = init();
      instance.insert(3);
      instance.insert(6);
      instance.insert(2);
      instance.insert(10);
      instance.insert(4);
      instance.insert(1);
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
