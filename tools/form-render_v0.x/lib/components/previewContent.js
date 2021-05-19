'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var defaultImg =
  'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';

var _default = function _default(format, value) {
  return format === 'image'
    ? /*#__PURE__*/ _react.default.createElement('img', {
        src: value || defaultImg,
        alt: '\u56FE\u7247\u5730\u5740\u9519\u8BEF',
        className: 'fr-preview-image',
      })
    : null;
};

exports.default = _default;
