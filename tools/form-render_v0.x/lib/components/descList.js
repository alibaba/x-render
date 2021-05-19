'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getDescription = exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _isHidden = require('../base/isHidden');

var _utils = require('../base/utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var getEnumValue = function getEnumValue(value, enums, enumNames) {
  if (Array.isArray(enums) && Array.isArray(enumNames)) {
    if (typeof value === 'string' || typeof value === 'number') {
      var count = enums.indexOf(value);

      if (count > -1) {
        return enumNames[count];
      }

      return value;
    } else if (Array.isArray(value)) {
      var result = value.map(function(v) {
        return getEnumValue(v, enums, enumNames);
      });
      return String(result);
    }

    return value;
  }

  return value;
};

var isEnumText = function isEnumText(text) {
  return (
    typeof text === 'string' || typeof text === 'number' || Array.isArray(text)
  );
};

var DescriptionList = function DescriptionList(_ref) {
  var _ref$schema = _ref.schema,
    schema = _ref$schema === void 0 ? {} : _ref$schema,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    index = _ref.index;
  var list = getDescription({
    schema: schema,
    value: value,
    index: index,
  })
    .filter(function(item) {
      return item.title;
    })
    .slice(0, 3);
  return /*#__PURE__*/ _react.default.createElement(
    'ul',
    {
      className: 'flex overflow-hidden',
      style: {
        paddingRight: 45,
      },
    },
    list.map(function(item, i) {
      return item.title
        ? /*#__PURE__*/ _react.default.createElement(
            'li',
            {
              className: 'overflow-hidden truncate',
              style: {
                width: '33%',
                paddingRight: 8,
              },
              key: i,
            },
            /*#__PURE__*/ _react.default.createElement(
              'span',
              {
                className: 'fw5',
              },
              item.title,
              ': '
            ),
            /*#__PURE__*/ _react.default.createElement(
              'span',
              {
                className: 'truncate',
              },
              item.text
            )
          )
        : null;
    })
  );
};

var _default = DescriptionList; // 获得title，value值list

exports.default = _default;

var getDescription = function getDescription(_ref2) {
  var _ref2$schema = _ref2.schema,
    schema = _ref2$schema === void 0 ? {} : _ref2$schema,
    _ref2$value = _ref2.value,
    value = _ref2$value === void 0 ? [] : _ref2$value,
    index = _ref2.index;
  var _schema$items = schema.items,
    items = _schema$items === void 0 ? {} : _schema$items; // 只有当items为object时才做收起（fold）处理

  if (items.type !== 'object') {
    return [];
  }

  var titles = (items && items.properties) || {};
  titles = Object.values(titles);
  var description = (value && value.length && value[index]) || {};
  var valueList = Object.values(description);
  var descList = titles.map(function(t, idx) {
    var hidden = t && t['ui:hidden']; // ui:hidden为判断式时解析 TODO: 解析在外部集中做

    if (
      typeof hidden === 'string' &&
      (0, _utils.isFunction)(hidden) === false
    ) {
      hidden = (0, _isHidden.isHidden)({
        hidden: hidden,
        rootValue: description,
      });
    }

    if (hidden) return;
    var title = t.title;
    var text = valueList[idx];

    if (text === null && text === undefined) {
      text = '';
    } else if (typeof text === 'boolean') {
      text = text ? '是' : '否';
    } else if (t.enum && t.enumNames && text && isEnumText(text)) {
      // 先判断是否有枚举配置
      text = getEnumValue(text, t.enum, t.enumNames);
    } else if (typeof text !== 'string' && typeof text !== 'number' && text) {
      // 最后的兜底处理
      text = '{复杂结构}';
    }

    return {
      title: title,
      text: text,
    };
  }); // 去空

  return descList.filter(function(d) {
    return !!d;
  });
};

exports.getDescription = getDescription;
