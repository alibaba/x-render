import getField from './getField';
import resolve from './resolve';
import subFieldGenerator from './subFieldGenerator';

// 对于数组或对象类型，获取其子集schema
function getSubSchemas(schema = {}) {
  const {
    // object subset
    properties,
    // array subset
    items,
    // as subset's parent
    ...$parent
  } = schema;
  const { type } = $parent;
  // no subset
  if (!properties && !items) {
    return [];
  }
  let children = {};
  if (type === 'object') {
    children = properties;
  }
  if (type === 'array') {
    children = [].concat(items);
  }
  return Object.keys(children).map(name => ({
    schema: children[name],
    name,
    // parent propsSchema
    $parent,
  }));
}

function getBasicProps(settings, materials) {
  const {
    schema,
    name = '',
    $parent = {},
    column,
    displayType,
    showDescIcon,
    showValidate,
    readOnly, // 添加全局控制只读模式
    labelWidth,
    useLogger,
    formData,
    // 父传子
    disabled,
    isEditing,
  } = settings;
  // 写错的时候
  if (!schema) return {};

  // 目前做了处理的`uiSchema`参数
  const {
    'ui:className': className,
    'ui:options': options = {},
    'ui:hidden': hidden,
    'ui:disabled': _disabled,
    'ui:width': width,
    'ui:readonly': _readOnly,
    'ui:extraButtons': extraButtons = [],
    'ui:dependShow': dependShow,
    'ui:action': action,
    'ui:labelWidth': _labelWidth,
    // 新增
    'ui:column': _column,
    'ui:displayType': _displayType,
    'ui:showDescIcon': _showDescIcon,
  } = schema;
  const { required = [] } = $parent;
  const { generated: widgets, customized: fields } = materials;
  // 标准化属性模型
  // 除了value和onChange为动态值这里不处理

  // true/false的值，服务端可能传了 1/0, 或者"true"
  const hasValue = val =>
    ['string', 'boolean', 'number'].indexOf(typeof val) > -1;
  // 一些从顶层一直传下去的props
  const passDownProps = {
    column: _column || column,
    displayType: _displayType || displayType,
    showDescIcon: hasValue(_showDescIcon) ? _showDescIcon : showDescIcon,
    disabled: hasValue(_disabled) ? _disabled : disabled,
    readOnly: hasValue(_readOnly) ? _readOnly : readOnly, // 前者单个ui的，后者全局的
    labelWidth: _labelWidth || labelWidth,
    showValidate,
    useLogger,
    isEditing,
  };

  let basicProps = {
    ...passDownProps,
    name,
    schema,
    options, // 所有特定组件规则，addable等规则TODO
    hidden,
    required: required.indexOf(name) !== -1,
    width,
    widgets,
    fields,
    formData,
  };
  // 假如有表达式来决定显示的场景，才传入dependShow,formData
  if (dependShow) {
    basicProps = { ...basicProps, dependShow };
  }
  if (className) {
    basicProps = { ...basicProps, className };
  }
  if (action) {
    basicProps = { ...basicProps, action };
  }
  // 子集的属性
  const subItems = {};
  const subSchemas = getSubSchemas(schema);
  subSchemas.forEach(subSchema => {
    const { name: _name, schema: _schema = {} } = subSchema;
    subItems[_name] = {
      field: getField(_schema, materials),
      props: getBasicProps(
        {
          ...subSchema,
          ...passDownProps,
          formData,
        },
        materials
      ),
    };
  });
  if (['array', 'object'].indexOf(schema.type) >= 0) {
    // 传入name和Field（如果重定义Field的话）及其配置信息（如onChange等）
    basicProps.getSubField = o => {
      // getSchemaData(schema)
      const { field, props, column: c } = subItems[o.name] || subItems[0] || {};
      return subFieldGenerator({
        ...field,
        column: c,
        props: {
          ...props,
          name: o.name,
          rootValue: o.rootValue,
        },
      })(o);
    };
    if (schema.type === 'array' && schema.items) {
      // 将数组uiSchema配置里面的抽离出来使用
      basicProps.extraButtons = extraButtons;
      // 数组新增的默认值
      if (subSchemas && subSchemas[0]) {
        basicProps.newItem = resolve(subSchemas[0].schema);
      }
    }
  }
  return basicProps;
}

/**
 *  schema + materials --> parse --> Field + props
 *  schema {
 *    propsSchema,
 *    uiSchema,
 *    data,
 *    name,
 *  }
 *  materials {
 *    // 根据 Widget 生成的 Field
 *    generated,
 *    // 自定义的 Field
 *    customized,
 *    // 字段 type 与 widgetName 的映射关系
 *    mapping,
 *  }
 */
const parse = (settings = {}, materials) => {
  const { schema = {} } = settings;
  return {
    Field: getField(schema, materials).Field,
    props: getBasicProps(settings, materials),
  };
};

export default parse;
