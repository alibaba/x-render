'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = sw;

require('antd/lib/switch/style');

var _switch = _interopRequireDefault(require('antd/lib/switch'));

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function sw(p) {
  return /*#__PURE__*/ _react.default.createElement(_switch.default, {
    disabled: p.disabled || p.readOnly,
    onChange: function onChange(checked) {
      return p.onChange(p.name, checked);
    },
    checked: !!p.value,
  });
}
