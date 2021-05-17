'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = html;

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

function html(_ref) {
  var value = _ref.value,
    schema = _ref.schema,
    rest = _objectWithoutProperties(_ref, ['value', 'schema']);

  var __html = '';

  try {
    __html = value ? value : schema.default;

    if (typeof __html !== 'string') {
      __html = '';
    }
  } catch (error) {}

  return /*#__PURE__*/ _react.default.createElement('div', {
    dangerouslySetInnerHTML: {
      __html: __html,
    },
  });
}
