'use strict';

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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireWildcard(require('react'));

var _useDebounce = _interopRequireDefault(require('./base/useDebounce'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _utils = require('./base/utils');

var _asField = require('./base/asField');

var _parser = _interopRequireDefault(require('./base/parser'));

var _resolve = _interopRequireDefault(require('./base/resolve'));

var _validate = require('./base/validate');

var _fetcher = _interopRequireDefault(require('./HOC/fetcher'));

require('./atom.css');

require('./index.css');

require('antd/dist/antd.css');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function RenderField(_ref) {
  var fields = _ref.fields,
    onChange = _ref.onChange,
    settings = _objectWithoutProperties(_ref, ['fields', 'onChange']);

  var _parse = (0, _parser.default)(settings, fields),
    Field = _parse.Field,
    props = _parse.props;

  if (!Field) {
    return null;
  }

  return /*#__PURE__*/ _react.default.createElement(
    Field,
    _extends(
      {
        isRoot: true,
      },
      props,
      {
        value: settings.data,
        onChange: onChange,
        formData: settings.formData,
      }
    )
  );
} // 在顶层将 propsSchema 和 uiSchema 合并，便于后续处理。 也可直接传入合并的 schema

var Wrapper = function Wrapper(_ref2) {
  var schema = _ref2.schema,
    _ref2$propsSchema = _ref2.propsSchema,
    propsSchema = _ref2$propsSchema === void 0 ? {} : _ref2$propsSchema,
    _ref2$uiSchema = _ref2.uiSchema,
    uiSchema = _ref2$uiSchema === void 0 ? {} : _ref2$uiSchema,
    readOnly = _ref2.readOnly,
    showValidate = _ref2.showValidate,
    rest = _objectWithoutProperties(_ref2, [
      'schema',
      'propsSchema',
      'uiSchema',
      'readOnly',
      'showValidate',
    ]);

  var _schema = {};
  var jsonSchema = schema || propsSchema; // 兼容schema字段和propsSchema字段
  // 将uiSchema和schema合并（推荐不写uiSchema）

  _schema = (0, _utils.combineSchema)(jsonSchema, uiSchema);
  return /*#__PURE__*/ _react.default.createElement(
    FormRender,
    _extends(
      {
        readOnly: readOnly,
        showValidate: !readOnly && showValidate, // 预览模式下不展示校验
      },
      rest,
      {
        schema: _schema,
      }
    )
  );
};

function FormRender(_ref3) {
  var _ref3$name = _ref3.name,
    name = _ref3$name === void 0 ? '$form' : _ref3$name,
    _ref3$column = _ref3.column,
    column = _ref3$column === void 0 ? 1 : _ref3$column,
    className = _ref3.className,
    _ref3$schema = _ref3.schema,
    schema = _ref3$schema === void 0 ? {} : _ref3$schema,
    _ref3$formData = _ref3.formData,
    formData = _ref3$formData === void 0 ? {} : _ref3$formData,
    _ref3$widgets = _ref3.widgets,
    widgets = _ref3$widgets === void 0 ? {} : _ref3$widgets,
    _ref3$FieldUI = _ref3.FieldUI,
    FieldUI =
      _ref3$FieldUI === void 0 ? _asField.DefaultFieldUI : _ref3$FieldUI,
    _ref3$fields = _ref3.fields,
    fields = _ref3$fields === void 0 ? {} : _ref3$fields,
    _ref3$mapping = _ref3.mapping,
    mapping = _ref3$mapping === void 0 ? {} : _ref3$mapping,
    _ref3$showDescIcon = _ref3.showDescIcon,
    showDescIcon = _ref3$showDescIcon === void 0 ? false : _ref3$showDescIcon,
    _ref3$showValidate = _ref3.showValidate,
    showValidate = _ref3$showValidate === void 0 ? true : _ref3$showValidate,
    _ref3$displayType = _ref3.displayType,
    displayType = _ref3$displayType === void 0 ? 'column' : _ref3$displayType,
    _ref3$onChange = _ref3.onChange,
    onChange = _ref3$onChange === void 0 ? function() {} : _ref3$onChange,
    _ref3$onValidate = _ref3.onValidate,
    onValidate = _ref3$onValidate === void 0 ? function() {} : _ref3$onValidate,
    _ref3$onMount = _ref3.onMount,
    onMount = _ref3$onMount === void 0 ? function() {} : _ref3$onMount,
    _ref3$readOnly = _ref3.readOnly,
    readOnly = _ref3$readOnly === void 0 ? false : _ref3$readOnly,
    _ref3$labelWidth = _ref3.labelWidth,
    labelWidth = _ref3$labelWidth === void 0 ? 110 : _ref3$labelWidth,
    _ref3$useLogger = _ref3.useLogger,
    useLogger = _ref3$useLogger === void 0 ? false : _ref3$useLogger,
    forwardedRef = _ref3.forwardedRef;
  var isUserInput = (0, _react.useRef)(false); // 状态改变是否来自于用户操作

  var originWidgets = (0, _react.useRef)();
  var generatedFields = (0, _react.useRef)({});
  var firstRender = (0, _react.useRef)(true);

  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isEditing = _useState2[0],
    setEditing = _useState2[1];

  var debouncedSetEditing = (0, _useDebounce.default)(setEditing, 300);
  var data = (0, _react.useMemo)(
    function() {
      return (0, _resolve.default)(schema, formData);
    },
    [JSON.stringify(schema), JSON.stringify(formData)]
  );
  (0, _react.useEffect)(function() {
    onChange(data);
    updateValidation();
  }, []);
  (0, _react.useEffect)(
    function() {
      if (firstRender.current) {
        onMount();
        firstRender.current = false;
      }

      updateValidation();

      if (!isUserInput.current) {
        onChange(data); // 这个操作不做，当外部修改formData后如果不操作form，返回的值会是没有resolve过的
      } else {
        isUserInput.current = false;
      }
    },
    [JSON.stringify(formData)]
  );
  (0, _react.useEffect)(
    function() {
      onChange(data);
      updateValidation();
    },
    [JSON.stringify(schema)]
  ); // data修改比较常用，所以放第一位

  var resetData = function resetData(newData, newSchema) {
    var _schema = newSchema || schema;

    var _formData = newData || formData;

    var res = (0, _resolve.default)(_schema, _formData);
    return new Promise(function(resolve) {
      onChange(res);
      updateValidation(res, _schema);
      resolve(res);
    });
  };

  (0, _react.useImperativeHandle)(forwardedRef, function() {
    return {
      resetData: resetData,
    };
  }); // 用户输入都是调用这个函数

  var handleChange = function handleChange(key, val) {
    isUserInput.current = true; // 开始编辑，节流

    setEditing(true);
    debouncedSetEditing(false);
    onChange(val);
    onValidate((0, _validate.getValidateList)(val, schema));
  };

  var updateValidation = function updateValidation(outData, outSchema) {
    var _data = outData || data;

    var _schema = outSchema || schema;

    onValidate((0, _validate.getValidateList)(_data, _schema));
  };

  var generated = {};

  if (!originWidgets.current) {
    originWidgets.current = widgets;
  }

  Object.keys(widgets).forEach(function(key) {
    var oWidget = originWidgets.current[key];
    var nWidget = widgets[key];
    var gField = generatedFields.current[key];

    if (!gField || oWidget !== nWidget) {
      if (oWidget !== nWidget) {
        originWidgets.current[key] = nWidget;
      }

      gField = (0, _asField.asField)({
        FieldUI: FieldUI,
        Widget: nWidget,
      });
      generatedFields.current[key] = gField;
    }

    generated[key] = gField;
  });
  var settings = {
    schema: schema,
    data: data,
    name: name,
    column: column,
    showDescIcon: showDescIcon,
    showValidate: showValidate,
    displayType: displayType,
    readOnly: readOnly,
    labelWidth: labelWidth,
    useLogger: useLogger,
    formData: data,
    isEditing: isEditing,
  };
  var _fields = {
    // 根据 Widget 生成的 Field
    generated: generated,
    // 自定义的 Field
    customized: fields,
    // 字段 type 与 widgetName 的映射关系
    mapping: mapping,
  };
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: ''.concat(className, ' fr-wrapper'),
    },
    /*#__PURE__*/ _react.default.createElement(
      RenderField,
      _extends({}, settings, {
        fields: _fields,
        onChange: handleChange,
      })
    )
  );
}

FormRender.propTypes = {
  name: _propTypes.default.string,
  column: _propTypes.default.number,
  schema: _propTypes.default.object,
  formData: _propTypes.default.object,
  widgets: _propTypes.default.objectOf(_propTypes.default.func),
  FieldUI: _propTypes.default.elementType,
  fields: _propTypes.default.objectOf(_propTypes.default.element),
  mapping: _propTypes.default.object,
  showDescIcon: _propTypes.default.bool,
  showValidate: _propTypes.default.bool,
  displayType: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onMount: _propTypes.default.func,
  onValidate: _propTypes.default.func,
  readOnly: _propTypes.default.bool,
  labelWidth: _propTypes.default.number,
  useLogger: _propTypes.default.bool,
};

var _default = (0, _fetcher.default)(Wrapper);

exports.default = _default;
