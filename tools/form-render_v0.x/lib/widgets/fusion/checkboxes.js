'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = checkboxes;

var _checkbox = _interopRequireDefault(require('@alifd/next/lib/checkbox'));

var _react = _interopRequireDefault(require('react'));

var _utils = require('../../base/utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function checkboxes(p) {
  var schema = p.schema || {};
  var _schema$items = schema.items,
    items = _schema$items === void 0 ? {} : _schema$items;

  var _ref = items && items.enum ? items : schema,
    enums = _ref.enum,
    enumNames = _ref.enumNames;

  var _value = p.value && Array.isArray(p.value) ? p.value : []; // if (p.readOnly) {
  //   let displayText = _value.join(',');
  //   if (enumNames) {
  //     const idxs = _value.map(v => enums.indexOf(v));
  //     const nameList = enumNames.filter((e, i) => idxs.indexOf(i) > -1);
  //     displayText = nameList.join(',');
  //   }
  //   return <span>{displayText}</span>;
  // }

  return /*#__PURE__*/ _react.default.createElement(
    _checkbox.default.Group,
    {
      disabled: p.disabled || p.readOnly,
      value: _value,
      onChange: function onChange(values) {
        return p.onChange(p.name, values);
      },
    },
    (0, _utils.getArray)(enums, [true, false]).map(function(val, index) {
      return /*#__PURE__*/ _react.default.createElement(
        _checkbox.default,
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
}
