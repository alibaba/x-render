'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

require('antd/lib/drawer/style');

var _drawer = _interopRequireDefault(require('antd/lib/drawer'));

require('antd/lib/modal/style');

var _modal = _interopRequireDefault(require('antd/lib/modal'));

require('antd/lib/pagination/style');

var _pagination = _interopRequireDefault(require('antd/lib/pagination'));

require('antd/lib/button/style');

var _button = _interopRequireDefault(require('antd/lib/button'));

var _DeleteOutlined2 = _interopRequireDefault(
  require('@ant-design/icons/lib/icons/DeleteOutlined')
);

var _PlusCircleOutlined2 = _interopRequireDefault(
  require('@ant-design/icons/lib/icons/PlusCircleOutlined')
);

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

var isComponent = function isComponent(comp) {
  var type = _typeof(comp);

  if (comp !== null && (type === 'function' || type === 'object')) {
    return true;
  }

  return false;
};

function FrButton(_ref) {
  var icon = _ref.icon,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, ['icon', 'children']);

  var IconComponent;

  switch (icon) {
    case 'add':
      IconComponent = _PlusCircleOutlined2.default;
      break;

    case 'delete':
      IconComponent = _DeleteOutlined2.default;
      break;

    default:
      IconComponent = icon;
      break;
  }

  var iconElement;

  try {
    if (isComponent(IconComponent)) {
      iconElement = /*#__PURE__*/ _react.default.createElement(
        IconComponent,
        null
      );
    }
  } catch (error) {}

  return /*#__PURE__*/ _react.default.createElement(
    _button.default,
    _extends({}, rest, {
      size: 'small',
      icon: iconElement,
    }),
    children
  );
}

var List = (0, _listHoc.default)(FrButton, _pagination.default);

var ListWithModal = function ListWithModal(props) {
  var _ref2 = props || {},
    options = _ref2.options,
    schema = _ref2.schema,
    value = _ref2.value;

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
          className: 'pointer',
          onClick: toggle,
        },
        text && typeof text === 'string' ? '+ ' + text : '+ 配置'
      ),
      /*#__PURE__*/ _react.default.createElement(
        'span',
        null,
        '\uFF08',
        arrLength,
        '\u6761\u6570\u636E\uFF09'
      ),
      /*#__PURE__*/ _react.default.createElement(
        _modal.default,
        _extends(
          {
            title: (schema && schema.title) || '子配置',
            visible: show,
            onCancel: toggle,
            onOk: toggle,
            cancelText: '\u5173\u95ED',
            width: '80%',
          },
          config,
          {
            style: _objectSpread(
              {
                maxWidth: 800,
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
          className: 'pointer',
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
