'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

require('antd/lib/input-number/style');

var _inputNumber = _interopRequireDefault(require('antd/lib/input-number'));

require('antd/lib/slider/style');

var _slider = _interopRequireDefault(require('antd/lib/slider'));

var _sliderHoc = _interopRequireDefault(require('../../components/sliderHoc'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = (0, _sliderHoc.default)(_slider.default, _inputNumber.default);

exports.default = _default;
