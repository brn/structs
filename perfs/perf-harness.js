/**
 * @fileoverview
 * @author Taketoshi Aono
 */


var colors = require('colors');
var TEST_COUNT = 5;


module.exports = function(opt, cb) {
  var ret = [];
  var test = opt.shift();
  if (!test) return cb && cb();
  runTest(test.name, test.test, function(time) {
    ret.push(time);
  }, function() {
    console.log('Performance Test Result for ' + test.name.cyan.bold);
    console.log('  ave: ' + (ret.reduce(function(i, v) {
      return i + v; 
    }, 0) / TEST_COUNT).toFixed(4) + ' seconds');
    var max = 0;
    var min = Infinity;
    ret.forEach(function(v) {
      return max = Math.max(max, v);
    });
    ret.forEach(function(v) {
      return min = Math.min(min, v);
    });
    console.log('  max: ' + max.toFixed(4) + ' seconds');
    console.log('  min: ' + min.toFixed(4) + ' seconds');
    setImmediate(module.exports.bind(null, opt, cb));
  });
};


function runTest(name, fn, cb, end) {
  function loop(now) {
    console.log('[PERFORMANCE_TEST]'.green + ' Running performance test for ' + name + ' round ' + (now + 1));
    var begin = getHrtime();
    fn(function() {
      var endTime = getHrtime();
      cb(endTime - begin);
      if (now + 1 < TEST_COUNT) {
        setImmediate(loop.bind(null, now + 1));
      } else {
        end();
      }
    });
  }
  loop(0);
}


function getHrtime() {
  return parseFloat(process.hrtime().join("."));
}

