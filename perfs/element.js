/**
 * @fileoverview
 * @author Taketoshi Aono
 */


function Element(value) {
  this.value = value;
}


Element.compare = function(a, b) {
  return a.value < b.value? -1: a.value === b.value? 0: 1;
};


module.exports = Element;
