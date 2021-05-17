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

var _drawer = _interopRequireDefault(require('@alifd/next/lib/drawer'));

var _dialog = _interopRequireDefault(require('@alifd/next/lib/dialog'));

var _button = _interopRequireDefault(require('@alifd/next/lib/button'));

var _icon = _interopRequireDefault(require('@alifd/next/lib/icon'));

var _pagination = _interopRequireDefault(require('@alifd/next/lib/pagination'));

var _react = _interopRequireWildcard(require('react'));

var _listHoc = _interopRequireDefault(require('../../components/listHoc'));

var _utils = require('../../base/utils');

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

var Pag = function Pag(_ref) {
  var _objectSpread2;

  var showSizeChanger = _ref.showSizeChanger,
    onChange = _ref.onChange,
    rest = _objectWithoutProperties(_ref, ['showSizeChanger', 'onChange']);

  var handleChange = function handleChange(val) {
    return onChange(val);
  };

  var handleSizeChange = function handleSizeChange(val) {
    return onChange(null, val);
  };

  var newProps = _objectSpread(
    ((_objectSpread2 = {
      pageSizeSelector: showSizeChanger === true ? 'dropdown' : false,
    }),
    _defineProperty(_objectSpread2, 'pageSizeSelector', false),
    _defineProperty(_objectSpread2, 'onChange', handleChange),
    _defineProperty(_objectSpread2, 'showJump', false),
    _defineProperty(_objectSpread2, 'onPageSizeChange', handleSizeChange),
    _objectSpread2),
    rest
  );

  return /*#__PURE__*/ _react.default.createElement(
    _pagination.default,
    newProps
  );
};

function FrButton(_ref2) {
  var icon = _ref2.icon,
    children = _ref2.children,
    type = _ref2.type,
    rest = _objectWithoutProperties(_ref2, ['icon', 'children', 'type']);

  var iconName;

  switch (icon) {
    case 'delete':
      iconName = 'ashbin';
      break;

    default:
      iconName = icon;
      break;
  }

  var restProps =
    type === 'dashed'
      ? rest
      : _objectSpread(
          _objectSpread({}, rest),
          {},
          {
            type: type,
          }
        ); // fusion不支持dashed，antd支持，这边强兼容一下

  return /*#__PURE__*/ _react.default.createElement(
    _button.default,
    restProps,
    iconName
      ? /*#__PURE__*/ _react.default.createElement(_icon.default, {
          type: iconName,
        })
      : null,
    children
  );
}

var List = (0, _listHoc.default)(FrButton, Pag);

var ListWithModal = function ListWithModal(props) {
  var _ref3 = props || {},
    options = _ref3.options,
    schema = _ref3.schema,
    value = _ref3.value;

  var arrLength = (value && value.length) || 0;

  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];

  var toggle = function toggle() {
    return setShow(function(o) {
      return !o;
    });
  };

  if (options && options.modal) {
    var config = (0, _utils.isObj)(options.modal) ? options.modal : {};
    var text = config.text;
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      null,
      /*#__PURE__*/ _react.default.createElement(
        'a',
        {
          className: 'pointer link',
          onClick: toggle,
        },
        text && typeof text === 'string' ? '+ ' + text : '+ 配置'
      ),
      /*#__PURE__*/ _react.default.createElement(
        'span',
        {
          style: {
            fontSize: 14,
          },
        },
        '\uFF08',
        arrLength,
        '\u6761\u6570\u636E\uFF09'
      ),
      /*#__PURE__*/ _react.default.createElement(
        _dialog.default,
        _extends(
          {
            className: 'fr-wrapper',
            title: (schema && schema.title) || '子配置',
            visible: show,
            onClose: toggle,
            footerActions: ['ok'],
            onOk: toggle,
            height: '80%',
          },
          config,
          {
            style: _objectSpread(
              {
                maxWidth: 800,
                width: '80%',
                overflow: 'auto',
              },
              config.style
            ),
          }
        ),
        /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'fr-wrapper',
          },
          /*#__PURE__*/ _react.default.createElement(List, props)
        )
      )
    );
  }

  if (options && options.drawer) {
    var _config = (0, _utils.isObj)(options.drawer) ? options.drawer : {};

    var _text = _config.text;
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      null,
      /*#__PURE__*/ _react.default.createElement(
        'a',
        {
          className: 'pointer link',
          onClick: toggle,
        },
        _text && typeof _text === 'string' ? '+ ' + _text : '+ 配置'
      ),
      /*#__PURE__*/ _react.default.createElement(
        _drawer.default,
        _extends(
          {
            title: (schema && schema.title) || '子配置',
            visible: show,
            onClose: toggle,
            width: '80%',
          },
          _config
        ),
        /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'fr-wrapper',
          },
          /*#__PURE__*/ _react.default.createElement(List, props)
        )
      )
    );
  }

  return /*#__PURE__*/ _react.default.createElement(List, props);
};

var _default = ListWithModal;
exports.default = _default;
