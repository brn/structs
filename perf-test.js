/**
 * @fileoverview
 * @author Taketoshi Aono
 */


var fs = require('fs');
var async = require('async');

var DIR = './perfs';


async.forEachSeries(fs.readdirSync(DIR), function(file, cb) {
  if (/-perfs.js$/.test(file)) {
    require(DIR + '/' + file)(cb);
  } else {
    cb();
  }
});
