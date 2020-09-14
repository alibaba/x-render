function getWidgetName(schema, map) {
  const { type, format, enum: enums, readonly } = schema;
  const list = [];
  if (readonly) {
    list.push(`${type}?readonly`);
    list.push('*?readonly');
  }
  if (enums) {
    list.push(`${type}?enum`);
    // array 默认使用list，array?enum 默认使用checkboxes，*?enum 默认使用select
    list.push('*?enum');
  }
  if (format) {
    list.push(`${type}:${format}`);
  }
  list.push(type); // 放在最后兜底，其他都不match时使用type默认的组件
  const found = list.find(item => !!map[item])
  return found || '';
}

export default function getField(
  schema = {},
  { customized, generated, mapping }
) {
  const { 'ui:widget': widget, 'ui:field': field } = schema;
  // Field能否被重定义
  let fieldCanRedefine = false;
  let Field;
  // ui:widget 是字符串，从generated中查，不是的话，就是本身
  const _widget = typeof widget === 'string' ? generated[widget] : widget;
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
    fieldCanRedefine,
    Field: Field || null,
  };
}
