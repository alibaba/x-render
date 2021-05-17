'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = radio;

var _checkbox = _interopRequireDefault(require('@alifd/next/lib/checkbox'));

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function radio(p) {
  return /*#__PURE__*/ _react.default.createElement(_checkbox.default, {
    disabled: p.disabled || p.readOnly,
    onChange: function onChange(checked) {
      return p.onChange(p.name, checked);
    },
    checked: p.value,
  });
}
