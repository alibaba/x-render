'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

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

var FoldIcon = function FoldIcon(_ref) {
  var _ref$fold = _ref.fold,
    fold = _ref$fold === void 0 ? false : _ref$fold,
    width = _ref.width,
    height = _ref.height,
    fill = _ref.fill,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, [
      'fold',
      'width',
      'height',
      'fill',
      'style',
      'className',
    ]);

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    _extends(
      {
        style: style,
        className: fold
          ? 'fold-icon '.concat(className)
          : 'fold-icon fold-icon-active '.concat(className),
      },
      rest
    ),
    /*#__PURE__*/ _react.default.createElement(
      'svg',
      {
        viewBox: '0 0 1024 1024',
        width: width || 18,
        height: height || 18,
      },
      /*#__PURE__*/ _react.default.createElement('path', {
        d:
          'M942.048 306.176c-12.288-12.288-31.328-13.024-43.008-2.016L529.056 674.112c-15.072 15.872-19.008 15.808-34.816 0L124.288 304.16c-11.68-11.04-30.72-10.272-43.008 2.016-12.512 12.512-13.216 32.032-1.6 43.68L490.624 760.8c5.056 5.056 11.648 7.328 18.464 7.744h5.152c6.816-.448 13.408-2.72 18.464-7.744l410.944-410.944c11.584-11.648 10.88-31.2-1.6-43.68z',
        fill: fill || '#3c3c3c',
      })
    )
  );
};

var _default = FoldIcon;
exports.default = _default;
