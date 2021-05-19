'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

require('antd/lib/input-number/style');

var _inputNumber = _interopRequireDefault(require('antd/lib/input-number'));

var _numberHoc = _interopRequireDefault(require('../../components/numberHoc'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = (0, _numberHoc.default)(_inputNumber.default);

exports.default = _default;
