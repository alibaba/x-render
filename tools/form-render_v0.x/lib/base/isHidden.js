'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.isDependShow = isDependShow;
exports.isHidden = isHidden;

var _pope = require('pope');

var _utils = require('./utils');

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function isDependShow() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    formData = _ref.formData,
    dependShow = _ref.dependShow;

  if (formData && dependShow) {
    try {
      return !(0, _utils.parseString)((0, _pope.pope)(dependShow, formData)); //eslint-disable-line
    } catch (e) {
      console.error(e);
    }
  }
}

function isHidden() {
  var _ref2 =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    hidden = _ref2.hidden,
    rootValue = _ref2.rootValue,
    formData = _ref2.formData;

  // hidden 为表达式：
  if (typeof hidden === 'string') {
    // 支持 && 和 ||
    var hasAnd = function hasAnd(string) {
      return string.indexOf('&&') > -1;
    };

    var hasOr = function hasOr(string) {
      return string.indexOf('||') > -1;
    };

    var hiddenList = [];

    if (!hasOr(hidden)) {
      if (!hasAnd(hidden)) {
        return calcHidden(hidden, rootValue, formData);
      } else {
        hiddenList = hidden.split('&&').map(function(item) {
          return item.trim();
        });
        return hiddenList.every(function(item) {
          return calcHidden(item, rootValue, formData);
        });
      }
    } else {
      hiddenList = hidden.split('||').map(function(item) {
        return item.trim();
      });

      if (!hasAnd(hidden)) {
        return hiddenList.some(function(item) {
          return calcHidden(item, rootValue, formData);
        });
      } else {
        return hiddenList.some(function(item) {
          if (hasAnd(item)) {
            var list = item.split('&&').map(function(item) {
              return item.trim();
            });
            return list.every(function(x) {
              return calcHidden(x, rootValue, formData);
            });
          } else {
            return calcHidden(item, rootValue, formData);
          }
        });
      }
    }
  }

  return hidden;
} // 计算单个表达式的hidden值

var calcHidden = function calcHidden(hiddenString, rootValue, formData) {
  if (!rootValue || _typeof(rootValue) !== 'object') {
    return false;
  } // 支持四种基本运算符

  var operators = ['==', '!=', '>', '<'];

  try {
    var op = operators.find(function(op) {
      return hiddenString.indexOf(op) > -1;
    });

    var _hiddenString$split$m = hiddenString.split(op).map(function(item) {
        return item.trim();
      }),
      _hiddenString$split$m2 = _slicedToArray(_hiddenString$split$m, 2),
      key = _hiddenString$split$m2[0],
      value = _hiddenString$split$m2[1];

    var left = rootValue[key]; // feature: 允许从 formData 取值

    if (key.substring(0, 9) === 'formData.' && formData) {
      var subKey = key.substring(9);
      left = (0, _utils.baseGet)(formData, subKey);
    }

    var right = (0, _utils.parseString)(value);
    return (0, _utils.parseString)(
      '"'
        .concat(String(left), '"')
        .concat(op, '"')
        .concat(String(right), '"')
    );
  } catch (e) {
    console.error(e);
  }

  return false;
};
