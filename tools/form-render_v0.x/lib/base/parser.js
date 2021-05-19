'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _getField = _interopRequireDefault(require('./getField'));

var _resolve = _interopRequireDefault(require('./resolve'));

var _subFieldGenerator = _interopRequireDefault(require('./subFieldGenerator'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
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

// 对于数组或对象类型，获取其子集schema
function getSubSchemas() {
  var schema =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var properties = schema.properties,
    items = schema.items,
    $parent = _objectWithoutProperties(schema, ['properties', 'items']);

  var type = $parent.type; // no subset

  if (!properties && !items) {
    return [];
  }

  var children = {};

  if (type === 'object') {
    children = properties;
  }

  if (type === 'array') {
    children = [].concat(items);
  }

  return Object.keys(children).map(function(name) {
    return {
      schema: children[name],
      name: name,
      // parent propsSchema
      $parent: $parent,
    };
  });
}

function getBasicProps(settings, materials) {
  var schema = settings.schema,
    _settings$name = settings.name,
    name = _settings$name === void 0 ? '' : _settings$name,
    _settings$$parent = settings.$parent,
    $parent = _settings$$parent === void 0 ? {} : _settings$$parent,
    column = settings.column,
    displayType = settings.displayType,
    showDescIcon = settings.showDescIcon,
    showValidate = settings.showValidate,
    readOnly = settings.readOnly,
    labelWidth = settings.labelWidth,
    useLogger = settings.useLogger,
    formData = settings.formData,
    disabled = settings.disabled,
    isEditing = settings.isEditing; // 写错的时候

  if (!schema) return {}; // 目前做了处理的`uiSchema`参数

  var className = schema['ui:className'],
    _schema$uiOptions = schema['ui:options'],
    options = _schema$uiOptions === void 0 ? {} : _schema$uiOptions,
    hidden = schema['ui:hidden'],
    _disabled = schema['ui:disabled'],
    width = schema['ui:width'],
    _readOnly = schema['ui:readonly'],
    _schema$uiExtraButto = schema['ui:extraButtons'],
    extraButtons = _schema$uiExtraButto === void 0 ? [] : _schema$uiExtraButto,
    dependShow = schema['ui:dependShow'],
    action = schema['ui:action'],
    _labelWidth = schema['ui:labelWidth'],
    _column = schema['ui:column'],
    _displayType = schema['ui:displayType'],
    _showDescIcon = schema['ui:showDescIcon'];
  var _$parent$required = $parent.required,
    required = _$parent$required === void 0 ? [] : _$parent$required;
  var widgets = materials.generated,
    fields = materials.customized; // 标准化属性模型
  // 除了value和onChange为动态值这里不处理
  // true/false的值，服务端可能传了 1/0, 或者"true"

  var hasValue = function hasValue(val) {
    return ['string', 'boolean', 'number'].indexOf(_typeof(val)) > -1;
  }; // 一些从顶层一直传下去的props

  var passDownProps = {
    column: _column || column,
    displayType: _displayType || displayType,
    showDescIcon: hasValue(_showDescIcon) ? _showDescIcon : showDescIcon,
    disabled: hasValue(_disabled) ? _disabled : disabled,
    readOnly: hasValue(_readOnly) ? _readOnly : readOnly,
    // 前者单个ui的，后者全局的
    labelWidth: _labelWidth || labelWidth,
    showValidate: showValidate,
    useLogger: useLogger,
    isEditing: isEditing,
  };

  var basicProps = _objectSpread(
    _objectSpread({}, passDownProps),
    {},
    {
      name: name,
      schema: schema,
      options: options,
      // 所有特定组件规则，addable等规则TODO
      hidden: hidden,
      required: required.indexOf(name) !== -1,
      width: width,
      widgets: widgets,
      fields: fields,
      formData: formData,
    }
  ); // 假如有表达式来决定显示的场景，才传入dependShow,formData

  if (dependShow) {
    basicProps = _objectSpread(
      _objectSpread({}, basicProps),
      {},
      {
        dependShow: dependShow,
      }
    );
  }

  if (className) {
    basicProps = _objectSpread(
      _objectSpread({}, basicProps),
      {},
      {
        className: className,
      }
    );
  }

  if (action) {
    basicProps = _objectSpread(
      _objectSpread({}, basicProps),
      {},
      {
        action: action,
      }
    );
  } // 子集的属性

  var subItems = {};
  var subSchemas = getSubSchemas(schema);
  subSchemas.forEach(function(subSchema) {
    var _name = subSchema.name,
      _subSchema$schema = subSchema.schema,
      _schema = _subSchema$schema === void 0 ? {} : _subSchema$schema;

    subItems[_name] = {
      field: (0, _getField.default)(_schema, materials),
      props: getBasicProps(
        _objectSpread(
          _objectSpread(_objectSpread({}, subSchema), passDownProps),
          {},
          {
            formData: formData,
          }
        ),
        materials
      ),
    };
  });

  if (['array', 'object'].indexOf(schema.type) >= 0) {
    // 传入name和Field（如果重定义Field的话）及其配置信息（如onChange等）
    basicProps.getSubField = function(o) {
      // getSchemaData(schema)
      var _ref = subItems[o.name] || subItems[0] || {},
        field = _ref.field,
        props = _ref.props,
        c = _ref.column;

      return (0, _subFieldGenerator.default)(
        _objectSpread(
          _objectSpread({}, field),
          {},
          {
            column: c,
            props: _objectSpread(
              _objectSpread({}, props),
              {},
              {
                name: o.name,
                rootValue: o.rootValue,
              }
            ),
          }
        )
      )(o);
    };

    if (schema.type === 'array' && schema.items) {
      // 将数组uiSchema配置里面的抽离出来使用
      basicProps.extraButtons = extraButtons; // 数组新增的默认值

      if (subSchemas && subSchemas[0]) {
        basicProps.newItem = (0, _resolve.default)(subSchemas[0].schema);
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

var parse = function parse() {
  var settings =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var materials = arguments.length > 1 ? arguments[1] : undefined;
  var _settings$schema = settings.schema,
    schema = _settings$schema === void 0 ? {} : _settings$schema;
  return {
    Field: (0, _getField.default)(schema, materials).Field,
    props: getBasicProps(settings, materials),
  };
};

var _default = parse;
exports.default = _default;
