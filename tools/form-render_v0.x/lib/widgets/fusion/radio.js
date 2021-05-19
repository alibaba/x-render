'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _radio = _interopRequireDefault(require('@alifd/next/lib/radio'));

var _react = _interopRequireDefault(require('react'));

var _radioHoc = _interopRequireDefault(require('../../components/radioHoc'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

var RadioComponent = function RadioComponent(p) {
  var _ref = p.schema || {},
    enums = _ref.enum,
    enumNames = _ref.enumNames;

  var onChange = function onChange(v) {
    return p.onChange(p.name, v);
  };

  return /*#__PURE__*/ _react.default.createElement(
    _radioHoc.default,
    _extends({}, p, {
      onChange: onChange,
      Radio: _radio.default,
    })
  );
};

var _default = RadioComponent;
exports.default = _default;
