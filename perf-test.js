/**
 * @fileoverview
 * @author Taketoshi Aono
 */


var fs = require('fs');

var DIR = './perfs';

fs.readdirSync(DIR).forEach(function(file) {
  if (/-perfs.js$/.test(file)) {
    require(DIR + '/' + file);
  }
});
