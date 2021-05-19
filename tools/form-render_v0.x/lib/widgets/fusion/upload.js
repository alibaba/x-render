'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = upload;

var _upload = _interopRequireDefault(require('@alifd/next/lib/upload'));

var _button = _interopRequireDefault(require('@alifd/next/lib/button'));

var _icon = _interopRequireDefault(require('@alifd/next/lib/icon'));

var _message = _interopRequireDefault(require('@alifd/next/lib/message'));

var _react = _interopRequireDefault(require('react'));

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

function upload(p) {
  var props = {
    name: 'file',
    listType: 'text',
    action: p.action || (p.options && p.options.action),
    enctype: 'multipart/form-data',
    withCredentials: true,
    type: 'file',
    onChange: function onChange(res) {
      var info = res[0];

      if (info && info.response && info.response.status === 'done') {
        _message.default.success(
          ''.concat(info.name, ' \u4E0A\u4F20\u6210\u529F')
        );

        p.onChange(p.name, info.response.url);
      } else if (info && info.response && info.response.status === 'error') {
        _message.default.error(
          ''.concat(info.file.name, ' \u4E0A\u4F20\u5931\u8D25')
        );
      }
    },
    onRemove: function onRemove() {
      p.onChange(p.name, '');
    },
  };
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: 'fr-upload-mod',
    },
    /*#__PURE__*/ _react.default.createElement(
      _upload.default,
      _extends({}, props, {
        className: 'fr-upload-file',
      }),
      /*#__PURE__*/ _react.default.createElement(
        _button.default,
        null,
        /*#__PURE__*/ _react.default.createElement(_icon.default, {
          type: 'upload',
        }),
        ' \u4E0A\u4F20'
      )
    ),
    p.value &&
      /*#__PURE__*/ _react.default.createElement(
        'a',
        {
          href: p.value,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'fr-upload-preview',
        },
        '\u5730\u5740\u67E5\u770B'
      )
  );
}
