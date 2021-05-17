'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = range;

require('antd/lib/input/style');

var _input = _interopRequireDefault(require('antd/lib/input'));

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function range(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    name = _ref.name,
    rest = _objectWithoutProperties(_ref, ['value', 'onChange', 'name']);

  return /*#__PURE__*/ _react.default.createElement(
    _input.default.Group,
    {
      compact: true,
      style: {
        width: '100%',
        display: 'flex',
      },
    },
    /*#__PURE__*/ _react.default.createElement(_input.default, {
      style: {
        // width: 100,
        // textAlign: 'center',
      },
    }),
    /*#__PURE__*/ _react.default.createElement(_input.default, {
      className: 'site-input-split',
      style: {
        backgroundColor: '#fff',
        width: 30,
        borderLeft: 0,
        borderRight: 0,
        pointerEvents: 'none',
        flexShrink: 0,
      },
      placeholder: '~',
      disabled: true,
    }),
    /*#__PURE__*/ _react.default.createElement(_input.default, {
      style: {
        borderLeftWidth: 0, // width: 100,
        // textAlign: 'center',
      },
    })
  );
}
