/**
 * @fileoverview
 * @author Taketoshi Aono
 */


/**
 * Comparet value.
 * Return 1 if value 'a' is bigger than 'b'.  
 * Retrun -1 if value 'b' is bigger than 'a'.  
 * Retrun 0 if value 'a' and 'b' are equals.
 * @param {T} a
 * @param {U} b
 * @returns {number} 
 */
module.exports = function(a, b) {
  return a > b? 1 : a < b? -1 : 0;
};
