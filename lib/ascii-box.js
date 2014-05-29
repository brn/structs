/**
 * @fileoverview
 * @author Taketshi Aono
 */
'use strict';

var util = require('util');


/**
 * コマンドラインに架線表示する
 * @param {Array.<Array.<string>>} array コンテンツ
 * @param {Array.<string>} title ヘッダ
 * @param {Array.<string>} units 単位
 * @param {number=} additionalPadding 余白
 */
module.exports = function (array, title, units, additionalPadding) {
  additionalPadding = additionalPadding || 0;

  var max = Math.max,
      colInfo = [],
      hasHeader = false;

  function getUnitsLength(index) {
    return (units && units[index]? units[index].length : 0);
  }

  if (title) {
    array.unshift(title);
    hasHeader = true;
  }

  array.forEach(function (item, i) {
    if (item instanceof Array && 'forEach' in item) {
      item.forEach(function (inner, index) {
        var unitLength = getUnitsLength(index);
        colInfo[index] = (colInfo[index] != undefined)? max(colInfo[index], inner.toString().length + additionalPadding + unitLength)
          : inner.toString().length + additionalPadding + unitLength;
      });
    } else {
      return;
    }
  });

  util.print('+');

  colInfo.forEach(function (item, index) {
    for (var i = 0; i < item; i++) {
      util.print('-');
    }
    if (index + 1 < array[0].length) {
      util.print('+');
    }
  });

  util.print('+\n');

  array.forEach(function(item, index) {
    util.print('|');
    item.forEach(function (innerItem , innerIndex) {
      var unitLength = getUnitsLength(innerIndex);
      var padding = colInfo[innerIndex] - (innerItem.toString().length + unitLength);
      for (var i = 0; i < padding; i++) {
        util.print(' ');
      }
      if (index > 0) {
        if (units[innerIndex]) {
          innerItem += units[innerIndex];
        }
      } else {
        if (units[innerIndex]) {
          innerItem = Array(unitLength + 1).join(' ') + innerItem;
        }
      }
      util.print(innerItem);
      util.print('|');
    });
    if (hasHeader && index === 0) {
      util.print('\n');
      util.print('+');
      colInfo.forEach(function (item, index) {
        for (var i = 0; i < item; i++) {
          util.print('-');
        }
        util.print('+');
      });
    }
    util.print('\n');
  });

  util.print('+');

  colInfo.forEach(function (item, index) {
    for (var i = 0; i < item; i++) {
      util.print('-');
    }
    util.print('+');
  });

  util.print('\n');
};
