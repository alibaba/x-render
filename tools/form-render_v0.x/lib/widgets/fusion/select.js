'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _select = _interopRequireDefault(require('@alifd/next/lib/select'));

var _selectHoc = _interopRequireDefault(require('../../components/selectHoc'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = (0, _selectHoc.default)(_select.default);

exports.default = _default;
