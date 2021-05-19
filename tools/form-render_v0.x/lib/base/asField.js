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
exports.DefaultFieldUI = exports.asField = void 0;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _validate = require('./validate');

var _hooks = require('../hooks');

var _isHidden = require('./isHidden');

var _utils = require('./utils');

var _foldIcon = _interopRequireDefault(require('../components/foldIcon'));

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

// asField拆分成逻辑组件和展示组件，从而可替换展示组件的方式完全插拔fr的样式
var asField = function asField(_ref) {
  var FieldUI = _ref.FieldUI,
    Widget = _ref.Widget;

  var FieldContainer = function FieldContainer(_ref2) {
    var className = _ref2.className,
      column = _ref2.column,
      showValidate = _ref2.showValidate,
      isRoot = _ref2.isRoot,
      hidden = _ref2.hidden,
      props = _ref2.props,
      showDescIcon = _ref2.showDescIcon,
      width = _ref2.width,
      labelWidth = _ref2.labelWidth,
      disabled = _ref2.disabled,
      readOnly = _ref2.readOnly,
      options = _ref2.options,
      schema = _ref2.schema,
      isEditing = _ref2.isEditing,
      rest = _objectWithoutProperties(_ref2, [
        'className',
        'column',
        'showValidate',
        'isRoot',
        'hidden',
        'props',
        'showDescIcon',
        'width',
        'labelWidth',
        'disabled',
        'readOnly',
        'options',
        'schema',
        'isEditing',
      ]);

    var firstRender = (0, _react.useRef)(true);
    var fieldTouched = (0, _react.useRef)(false);
    var displayType = rest.displayType,
      _rest$rootValue = rest.rootValue,
      rootValue = _rest$rootValue === void 0 ? {} : _rest$rootValue,
      _rest$formData = rest.formData,
      formData = _rest$formData === void 0 ? {} : _rest$formData,
      dependShow = rest.dependShow,
      _value = rest.value;
    var prevValue = (0, _hooks.usePrevious)(_value); // most key of schema, disabled, readOnly, options, hidden, support for function expression

    (0, _react.useEffect)(
      function() {
        if (showValidate) return; // 首次渲染不做, TODO: 万一首次渲染是用户输入触发的呢？

        if (firstRender.current) {
          firstRender.current = false;
          return;
        } // 已经动过了就不用验证是否动过

        if (fieldTouched.current === true) return; // 之后每次改动就算touch了，尽量避免多余的去使用isDeepEqual，大的复杂表单性能会不好

        if ((0, _utils.isDeepEqual)(prevValue, _value)) return;
        fieldTouched.current = true;
      },
      [_value]
    );
    var _hidden = hidden,
      _className = className,
      _disabled = disabled,
      _readOnly = readOnly,
      _options = options,
      _schema = schema;

    var convertValues = function convertValues() {
      _hidden = (0, _utils.convertValue)(hidden, formData, rootValue);

      if (_hidden !== undefined && typeof _hidden !== 'boolean') {
        _hidden = (0, _isHidden.isHidden)({
          hidden: _hidden,
          rootValue: rootValue,
          formData: formData,
        });
      }

      _className = (0, _utils.convertValue)(className, formData, rootValue);
      _disabled = (0, _utils.convertValue)(disabled, formData, rootValue);
      _readOnly = (0, _utils.convertValue)(readOnly, formData, rootValue);
      _options = _objectSpread({}, options);

      try {
        Object.entries(_options).forEach(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            _val = _ref4[1];

          _options[key] = (0, _utils.convertValue)(_val, formData, rootValue);
        });
      } catch (e) {} // iterate over schema, and convert every key

      _schema = _objectSpread({}, schema);
      Object.keys(_schema).forEach(function(key) {
        var availableKey = [
          'title',
          'description',
          'format',
          'minimum',
          'maximum',
          'minLength',
          'maxLength',
          'pattern',
          'message',
          'min',
          'max',
          'step',
          'enum',
          'enumNames',
        ]; // TODO: need to cover more

        if (availableKey.indexOf(key) > -1) {
          _schema[key] = (0, _utils.convertValue)(
            _schema[key],
            formData,
            rootValue
          );
        }
      });
    }; // 在编辑时使用快照，否则正常计算

    var screenShot = (0, _react.useRef)();

    var saveScreenShot = function saveScreenShot() {
      screenShot.current = {};
      screenShot.current.hidden = _hidden;
      screenShot.current.className = _className;
      screenShot.current.disabled = _disabled;
      screenShot.current.readOnly = _readOnly;
      screenShot.current.options = _options;
      screenShot.current.schema = _schema;
    };

    var readScreenShot = function readScreenShot() {
      _hidden = screenShot.current.hidden;
      _className = screenShot.current.className;
      _disabled = screenShot.current.disabled;
      _readOnly = screenShot.current.readOnly;
      _options = screenShot.current.options;
      _schema = screenShot.current.schema;
    };

    if (!isEditing || !screenShot.current) {
      convertValues();
      saveScreenShot();
    } else {
      readScreenShot();
    }

    if (_hidden) {
      return null;
    } // 历史方法，不建议使用ui:dependShow, 一律使用ui:hidden

    if (
      (0, _isHidden.isDependShow)({
        formData: formData,
        dependShow: dependShow,
      })
    ) {
      return null;
    } // 传入组件的值

    var _rest = _objectSpread(
      _objectSpread({}, rest),
      {},
      {
        schema: _schema,
        disabled: _disabled,
        readOnly: _readOnly,
        options: _options,
        formData: formData || {},
        rootValue: rootValue || {},
      }
    );

    var isComplex =
      _schema.type === 'object' ||
      (_schema.type === 'array' && (0, _utils.getEnum)(_schema) === undefined);
    var isModal = options && (options.modal || options.drawer);

    if (isModal) {
      isComplex = false;
    }

    var validateText =
      showValidate || fieldTouched.current
        ? (0, _validate.getValidateText)(_rest)
        : ''; // 必填*，label，描述，竖排时的校验语，只要存在一个，label就不为空

    var showLabel =
      _schema.title ||
      rest.description ||
      rest.required ||
      (displayType !== 'row' && validateText);
    var columnStyle = {};

    if (!isComplex && width) {
      columnStyle = {
        width: width,
        paddingRight: '12px',
      };
    } else if (!isComplex && column > 1) {
      columnStyle = {
        width: 'calc(100% /'.concat(column, ')'),
        paddingRight: '12px',
      };
    }

    var fieldProps = {
      className: _className,
      columnStyle: columnStyle,
      displayType: displayType,
      isComplex: isComplex,
      isRequired: rest.required,
      isRoot: isRoot,
      schema: _schema,
      showDescIcon: showDescIcon,
      showLabel: showLabel,
      showValidate: showValidate,
      validateText: validateText,
      labelWidth: labelWidth,
    };
    return /*#__PURE__*/ _react.default.createElement(
      FieldUI,
      fieldProps,
      /*#__PURE__*/ _react.default.createElement(
        Widget,
        _extends({}, _rest, {
          invalid: validateText,
        })
      )
    );
  };

  FieldContainer.propTypes = {
    showValidate: _propTypes.default.bool,
    column: _propTypes.default.number,
    isRoot: _propTypes.default.bool,
    props: _propTypes.default.object,
    showDescIcon: _propTypes.default.bool,
    displayType: _propTypes.default.string,
  };
  FieldContainer.defaultProps = {
    showValidate: true,
    column: 1,
    isRoot: false,
    props: {},
    showDescIcon: false,
    displayType: 'column',
  };
  return FieldContainer;
};

exports.asField = asField;

var DefaultFieldUI = function DefaultFieldUI(_ref5) {
  var children = _ref5.children,
    className = _ref5.className,
    columnStyle = _ref5.columnStyle,
    displayType = _ref5.displayType,
    isComplex = _ref5.isComplex,
    isRequired = _ref5.isRequired,
    isRoot = _ref5.isRoot,
    schema = _ref5.schema,
    showDescIcon = _ref5.showDescIcon,
    showLabel = _ref5.showLabel,
    showValidate = _ref5.showValidate,
    validateText = _ref5.validateText,
    labelWidth = _ref5.labelWidth;
  // field 整体 label 标签 content 内容
  var title = schema.title,
    type = schema.type,
    _enum = schema.enum,
    _schema$description = schema.description,
    description = _schema$description === void 0 ? '' : _schema$description,
    widget = schema['ui:widget'],
    options = schema['ui:options'];

  var _useState = (0, _react.useState)(options && options.collapsed),
    _useState2 = _slicedToArray(_useState, 2),
    collapsed = _useState2[0],
    setCollapsed = _useState2[1]; // 一个object是否可以折叠，options里collapsed这个值，且这个值只能是true或者false，代表初始是展开还是收起

  var toggleCollapsed = function toggleCollapsed() {
    return setCollapsed(!collapsed);
  };

  var objectCanCollapse =
    type === 'object' &&
    options &&
    [false, true].indexOf(options.collapsed) > -1;
  var isCheckbox = type === 'boolean' && widget !== 'switch';
  var isModal = options && (options.modal || options.drawer);
  var fieldClass = 'fr-field w-100 '.concat(
    isComplex ? 'fr-field-complex' : ''
  );
  var labelClass = 'fr-label mb2';
  var contentClass = 'fr-content';

  switch (type) {
    case 'object':
      if (isModal) {
        break;
      }

      if (title) {
        labelClass += ' fr-label-object bb b--black-20 pb1 mt2 mb3'; // fr-label-object 无默认style，只是占位用于使用者样式覆盖
      }

      if (!isRoot) {
        fieldClass += ' fr-field-object'; // object的margin bottom由内部元素撑起

        if (title) {
          contentClass += ' ml3'; // 缩进
        }
      }

      break;

    case 'array':
      if (isModal) {
        break;
      }

      if (title && (0, _utils.getEnum)(schema) === undefined) {
        labelClass += ' fr-label-array mt2 mb3';
      }

      break;

    case 'boolean':
      if (isCheckbox) {
        if (title) {
          labelClass = labelClass.replace('mb2', 'mb0');
        }

        contentClass += ' flex items-center'; // checkbox高度短，需要居中对齐

        fieldClass += ' flex items-center flex-row-reverse justify-end';
      }

      break;

    default:
      if (displayType === 'row') {
        labelClass = labelClass.replace('mb2', 'mb0');
      }
  } // 横排时

  if (displayType === 'row' && !isComplex && !isCheckbox) {
    fieldClass += ' flex';
    labelClass += ' flex-shrink-0 fr-label-row';
    labelClass = labelClass.replace('mb2', 'mb0');
    contentClass += ' flex-grow-1 relative';
  } // 横排的checkbox

  if (displayType === 'row' && isCheckbox) {
    contentClass += ' flex justify-end';
  }

  var _labelWidth = (0, _utils.isLooselyNumber)(labelWidth)
    ? Number(labelWidth)
    : (0, _utils.isCssLength)(labelWidth)
    ? labelWidth
    : 110; // 默认是 110px 的长度

  var labelStyle = {
    width: _labelWidth,
  };

  if (isCheckbox) {
    labelStyle = {
      flexGrow: 1,
    };
  } else if (isComplex || displayType === 'column') {
    labelStyle = {
      flexGrow: 1,
    };
  }

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: className
        ? ''.concat(className, ' ').concat(fieldClass)
        : fieldClass,
      style: columnStyle,
    },
    showLabel &&
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: labelClass,
          style: labelStyle,
        },
        /*#__PURE__*/ _react.default.createElement(
          'label',
          {
            className: 'fr-label-title '.concat(
              isCheckbox || displayType === 'column' ? 'no-colon' : ''
            ), // boolean不带冒号
            title: title,
          },
          objectCanCollapse &&
            /*#__PURE__*/ _react.default.createElement(_foldIcon.default, {
              style: {
                marginRight: 6,
              },
              fold: collapsed,
              onClick: toggleCollapsed,
            }),
          isRequired &&
            /*#__PURE__*/ _react.default.createElement(
              'span',
              {
                className: 'fr-label-required',
              },
              ' *'
            ),
          /*#__PURE__*/ _react.default.createElement(
            'span',
            {
              className: ''
                .concat(isComplex ? 'b' : '', ' ')
                .concat(displayType === 'column' ? 'flex-none' : ''),
            },
            title
          ),
          description &&
            (showDescIcon
              ? /*#__PURE__*/ _react.default.createElement(
                  'span',
                  {
                    className: 'fr-tooltip-toggle',
                    'aria-label': description,
                  },
                  /*#__PURE__*/ _react.default.createElement('i', {
                    className: 'fr-tooltip-icon',
                  }),
                  /*#__PURE__*/ _react.default.createElement(
                    'div',
                    {
                      className: 'fr-tooltip-container',
                    },
                    /*#__PURE__*/ _react.default.createElement('i', {
                      className: 'fr-tooltip-triangle',
                    }),
                    description
                  )
                )
              : /*#__PURE__*/ _react.default.createElement(
                  'span',
                  {
                    className: 'fr-desc ml2',
                  },
                  '(\xA0',
                  description,
                  '\xA0)'
                )),
          displayType !== 'row' &&
            validateText &&
            /*#__PURE__*/ _react.default.createElement(
              'span',
              {
                className: 'fr-validate',
              },
              validateText
            )
        )
      ),
    objectCanCollapse && collapsed
      ? null
      : /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: contentClass,
            style: isCheckbox
              ? displayType === 'row'
                ? {
                    marginLeft: _labelWidth,
                  }
                : {}
              : {
                  flexGrow: 1,
                },
          },
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'fr-children '.concat(
                isComplex ? 'flex-column' : 'items-center'
              ),
            },
            children
          ),
          /*#__PURE__*/ _react.default.createElement(
            'span',
            {
              className: 'fr-validate fr-validate-row '.concat(
                isComplex ? 'relative' : 'absolute'
              ),
            },
            displayType === 'row' && validateText ? validateText : ''
          )
        )
  );
};

exports.DefaultFieldUI = DefaultFieldUI;
