'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.usePrevious = usePrevious;
exports.useSet = void 0;

var _react = require('react');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(
    function() {
      ref.current = value;
    },
    [value]
  ); // Only re-run if value changes

  return ref.current;
}

var useSet = function useSet(initState) {
  return (0, _react.useReducer)(function(a, b) {
    return _objectSpread(_objectSpread({}, a), b);
  }, initState);
};

exports.useSet = useSet;
