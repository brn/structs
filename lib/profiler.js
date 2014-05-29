/**
 * @fileoverview プロファイルを行う
 * @author Taketshi Aono
 */
'use strict';

var asciiBox = require('./ascii-box');
var ProcessSentinel = require('process-sentinel');
var util = require('util');

/**
 * @const
 * @type {RegExp}
 */
var ARGS_REG = /function\s*(?:[a-zA-Z_$][\w_$]*)?\s*(\([^\)]*\))/;

/**
 * @const
 * @type {Date}
 */
var BEGIN = process.hrtime();

function getMembers(proto) {
  var ret = {};
  var map = {};
  while (proto) {
    var props = Object.getOwnPropertyNames(proto);
    for (var i = 0, len = props.length; i < len; i++) {
      var prototype = props[i];
      if (prototype in map) {
        continue;
      }
      if (proto.hasOwnProperty(prototype)) {
        map[prototype] = true;
        var descriptor = Object.getOwnPropertyDescriptor(proto, prototype);
      }
      ret[prototype] = descriptor;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return ret;
};


/**
 * プロファイラ
 * @constructor
 */
function Profiler() {
  this._callMap = {};
  this._isEnabled = false;
  this._stoped = [];
  this._currentStopedDate = null;
  process.on('exit', this._exitHandler.bind(this));
}


Profiler.prototype._gethrtime = function(before) {
  var end = process.hrtime(before);
  return (end[0] * 1e9 + end[1]) / 1e7;
};


/**
 * メソッドとコンストラクタにプロファイラを組み込む
 * @param {Function} ctor クラスコンストラクタ
 * @param {string=} opt_name クラス名
 * @return {Function}
 */
Profiler.prototype.profileFunction = function(ctor, opt_name) {
  var name = opt_name || ctor.name || 'anonymous';
  this._callMap[name + '.prototype'] = {};
  var profiler = this._createProfiledFunction(ctor, name, 'prototype.constructor', this._callMap[name + '.prototype']);
  this._profile(ctor.prototype, name + '.prototype');
  return profiler;
};


/**
 * Objectにプロファイラを埋め込む
 * @param {Object} obj
 * @param {string} opt_name
 * @returns {Object}
 */
Profiler.prototype.profileObject = function(obj, opt_name) {
  var name = opt_name || 'anonymous';
  this._profile(obj, name);
  return obj;
};


/**
 * プロパティを定義
 * もしconfigurableでないか、
 * freezeされていた場合はメッセージを表示する
 * @private
 * @param {string} name
 * @param {Object} obj
 * @param {string} prop
 * @param {Object} descriptor
 */
Profiler.prototype._defineProperty = function(name, obj, prop, descriptor) {
  try {
    Object.defineProperty(obj, prop, descriptor);
  } catch (x) {
    console.warn(util.format('[PROFILER] Can\'t intercept %s.%s because property %s is not configurable.', name, prop, prop).yellow);
  }
};


/**
 * プロパティをプロファイル関数に置き換える
 * @private
 * @param {Object} obj
 * @param {string} name
 */
Profiler.prototype._profile = function(obj, name) {
  var callMap = this._callMap;
  if (!(name in callMap)) {
    callMap[name] = {};
  }
  var methodMap = callMap[name];
  var members = getMembers(obj);
  for (var prop in members) {
    var descriptor = members[prop];
    if (typeof descriptor.value === 'function' ||
        descriptor.get || descriptor.get) {
      if (descriptor.value && Object.getOwnPropertyNames(descriptor.value.prototype).some(function(item) {
        return !(item in Function.prototype);
      })) {
        var fn = descriptor.value;
        descriptor.value = this.profileFunction(fn, name + '.' + (fn.name || prop));
        this._defineProperty(name, obj, prop, descriptor);
        this._profile(fn.prototype, name + '.' + (fn.name || prop) + '.prototype');
      } else {
        if (descriptor.get) {
          descriptor.get = this._createProfiledFunction(descriptor.get, name, prop, callMap[name]);
        } else if (descriptor.set) {
          descriptor.set = this._createProfiledFunction(descriptor.set, name, prop, callMap[name]);
        } else {
          descriptor.value = this._createProfiledFunction(descriptor.value, name, prop, callMap[name]);
        }
        this._defineProperty(name, obj, prop, descriptor);
      }
    } else {
      this._defineProperty(name, obj, prop, descriptor);
    }
  }
};


/**
 * プロファイル関数を生成する
 * @param {Function} fn
 * @param {string} name
 * @param {string} prop
 * @param {Object} methodMap
 * @returns {Function}
 */
Profiler.prototype._createProfiledFunction = function(fn, name, prop, methodMap) {
  var args = fn.toString().match(ARGS_REG)[1].replace(/\s/g, '');
  methodMap[prop] = {
    count : 0,
    time : [],
    name : name + '.' + prop + args
  };
  var self = this;

  var ret = function() {
        var begin = process.hrtime();
        var ret = fn.apply(this, arguments);
        var time = self._gethrtime(begin);
        methodMap[prop].count++;
        methodMap[prop].time.push(time);
        if (ret !== undefined) {
          return ret;
        }
      };

  ret.prototype = fn.prototype;

  Object.getOwnPropertyNames(fn).forEach(function(item) {
    if (!(item in Function.prototype) && !(item in Function)) {
      ret[item] = fn[item];
    }
  });
  return ret;
};


/**
 * 全体時間の停止
 * 最後に全体の経過時間から引かれる
 */
Profiler.prototype.stop = function() {
  if (this._isEnabled) {
    this._currentStopedDate = process.hrtime();
  }
};


/**
 * 全体時間計測の開始
 */
Profiler.prototype.resume = function() {
  if (this._isEnabled && this._currentStopedDate) {
    this._stoped.push(this._gethrtime(this._currentStopedDate));
    this._currentStopedDate = null;
  }
}


/**
 * プロファイラがonになっているかどうか
 * @returns {boolean}
 */
Profiler.prototype.isEnabled = function() {
  return this._isEnabled;
};


/**
 * プロファイラの無効化
 */
Profiler.prototype.setDisable = function() {
  this._isEnabled = false;
};


/**
 * プロファイラの有効化
 */
Profiler.prototype.setEnable = function() {
  this._isEnabled = true;
};



/**
 * レポートの表示
 * @private
 */
Profiler.prototype._exitHandler = function() {
  if (this._isEnabled) {
    var nano = this._gethrtime(BEGIN);
    var allTime = nano - (this._stoped.length > 0? this._stoped.reduce(function(a, b) {return a + b}) : 0);
    var results = [];
    Object.keys(this._callMap).sort().forEach(function(className) {
      for (var methodName in this._callMap[className]) {
        var methodMap = this._callMap[className][methodName];
        if (methodMap.count > 0) {
          results.push(this._processResult(methodMap, allTime));
        }
      }
    }, this);
    allTime = allTime.toFixed(4);
    console.log('\n------PROFILE RESULT------\n');
    results.unshift(['Program', allTime, allTime, allTime, allTime, '100', '1']);
    asciiBox(results, ['Name', 'Ave', 'Fastest', 'Slowest', 'Total', 'Ratio', 'Called'], [null, ' ms', ' ms', ' ms', ' ms', ' %', ' time'], 2);
  }
};


/**
 * 結果の整形
 * @param {Object} methodMap
 * @param {number} allTime
 * @returns {Array.<string>}
 */
Profiler.prototype._processResult = function(methodMap, allTime) {
  var total = methodMap.time.reduce(function(a, b) {return a + b;}).toFixed(4);
  var ave =  (total / methodMap.count).toFixed(4);
  var heavy = methodMap.time.sort(function (a, b) {return b - a;})[0].toFixed(4);
  var light = methodMap.time.sort(function (a, b) {return a - b;})[0].toFixed(4);
  var ratio = ((total / allTime) * 100).toFixed(4);
  return [methodMap.name,
          String(ave),
          String(light),
          String(heavy),
          String(total),
          String(ratio),
          String(methodMap.count)];
};

module.exports = new Profiler;
