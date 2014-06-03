/**
 * @fileoverview
 * @author Taketoshi Aono
 */


var colors = require('colors');
var TEST_COUNT = 10;


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
    var timer = new Timer();
    timer.begin();
    fn(timer, function() {
      if (timer.isStoped()) {
        throw new Error('Timer must be resumed');
      }
      cb(timer._end());
      if (now + 1 < TEST_COUNT) {
        setImmediate(loop.bind(null, now + 1));
      } else {
        end();
      }
    });
  }
  loop(0);
}


function Timer() {
  this._begin = process.hrtime();
  this._stoped = false;
  this._stopedAt = null;
  this._paused = 0;
}


Timer.prototype.begin = function() {
  this._begin = process.hrtime();
};


Timer.prototype.stop = function() {
  this._stoped = true;
  this._stopedAt = process.hrtime();
};


Timer.prototype.resume = function() {
  if (!this._stoped) return;
  this._stoped = false;
  this._paused += gethrtime(this._stopedAt);
};

Timer.prototype.isStoped = function() {
  return this._stoped;
};


Timer.prototype._end = function() {
  return gethrtime(this._begin) - this._paused;
};



function gethrtime(before) {
  var end = process.hrtime(before);
  return (end[0] * 1e9 + end[1]) / 1e7;
}
