'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _utils = require('../base/utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Created by Tw93 on 2019-12-07.
 * 单选输入组件
 */
var _default = function _default(p) {
  var Radio = p.Radio;
  var RadioGroup = p.Radio.Group;

  var _ref = p.schema || {},
    enums = _ref.enum,
    enumNames = _ref.enumNames;

  return /*#__PURE__*/ _react.default.createElement(
    RadioGroup,
    {
      disabled: p.disabled || p.readOnly,
      value: p.value,
      onChange: p.onChange,
    },
    (0, _utils.getArray)(enums).map(function(val, index) {
      return /*#__PURE__*/ _react.default.createElement(
        Radio,
        {
          value: val,
          key: index,
        },
        /*#__PURE__*/ _react.default.createElement('span', {
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML: {
            __html:
              enumNames && Array.isArray(enumNames) ? enumNames[index] : val,
          },
        })
      );
    })
  );
};

exports.default = _default;
