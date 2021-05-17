'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = getField;

var _utils = require('./utils');

function getWidgetName(schema, map) {
  var type = schema.type,
    format = schema.format;
  var readOnly = schema['ui:readonly'];
  var list = [];

  if (readOnly) {
    list.push(''.concat(type, '?readOnly'));
    list.push('*?readOnly');
  }

  if ((0, _utils.getEnum)(schema)) {
    list.push(''.concat(type, '?enum')); // array 默认使用list，array?enum 默认使用checkboxes，*?enum 默认使用select

    list.push('*?enum');
  }

  if (format) {
    list.push(''.concat(type, ':').concat(format));
  }

  list.push(type); // 放在最后兜底，其他都不match时使用type默认的组件

  var found = list.find(function(item) {
    return !!map[item];
  });
  return map[found] || '';
}

function getField() {
  var schema =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
    customized = _ref.customized,
    generated = _ref.generated,
    mapping = _ref.mapping;

  var widget = schema['ui:widget'],
    field = schema['ui:field']; // Field能否被重定义

  var fieldCanRedefine = false;
  var Field; // ui:widget 是字符串，从generated中查，不是的话，就是本身

  var _widget = typeof widget === 'string' ? generated[widget] : widget;

  if (field && !Field) {
    Field = typeof field === 'string' ? customized[field] : field;
  }

  if (!Field && _widget) {
    Field = _widget;
  }

  if (!Field && !_widget) {
    Field = generated[getWidgetName(schema, mapping)];
    fieldCanRedefine = !!Field;
  }

  return {
    fieldCanRedefine: fieldCanRedefine,
    Field: Field || null,
  };
}
