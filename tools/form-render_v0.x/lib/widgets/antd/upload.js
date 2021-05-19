'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = upload;

require('antd/lib/upload/style');

var _upload = _interopRequireDefault(require('antd/lib/upload'));

require('antd/lib/button/style');

var _button = _interopRequireDefault(require('antd/lib/button'));

var _UploadOutlined2 = _interopRequireDefault(
  require('@ant-design/icons/lib/icons/UploadOutlined')
);

require('antd/lib/message/style');

var _message2 = _interopRequireDefault(require('antd/lib/message'));

var _react = _interopRequireDefault(require('react'));

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

function upload(_ref) {
  var action = _ref.action,
    value = _ref.value,
    name = _ref.name,
    _onChange = _ref.onChange,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options;

  var _action = action || (options && options.action);

  var _className = 'fr-upload-file '.concat(options ? options.className : '');

  var props = _objectSpread(
    {
      name: 'file',
      action: _action,
      className: _className,
      onChange: function onChange(info) {
        if (info.file.status === 'done') {
          _message2.default.success(
            ''.concat(info.file.name, ' \u4E0A\u4F20\u6210\u529F')
          );

          _onChange(name, info.file.response.url);
        } else if (info.file.status === 'error') {
          _message2.default.error(
            ''.concat(info.file.name, ' \u4E0A\u4F20\u5931\u8D25')
          );
        }
      },
      onRemove: function onRemove() {
        _onChange(name, '');
      },
    },
    options
  );

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: 'fr-upload-mod',
    },
    /*#__PURE__*/ _react.default.createElement(
      _upload.default,
      props,
      /*#__PURE__*/ _react.default.createElement(
        _button.default,
        {
          icon: /*#__PURE__*/ _react.default.createElement(
            _UploadOutlined2.default,
            null
          ),
        },
        '\u4E0A\u4F20'
      )
    ),
    value &&
      /*#__PURE__*/ _react.default.createElement(
        'a',
        {
          href: value,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'fr-upload-preview',
        },
        '\u5DF2\u4E0A\u4F20\u5730\u5740'
      )
  );
}
