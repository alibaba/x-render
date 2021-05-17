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

var subFieldGenerator = function subFieldGenerator(_ref) {
  var can = _ref.fieldCanRedefine,
    _ref$Field = _ref.Field,
    SourceField = _ref$Field === void 0 ? null : _ref$Field,
    _ref$props = _ref.props,
    props = _ref$props === void 0 ? {} : _ref$props;
  return function(args) {
    var name = args.name,
      _args$Field = args.Field,
      RedefineField = _args$Field === void 0 ? null : _args$Field,
      others = _objectWithoutProperties(args, ['name', 'Field']);

    var Field = (can && RedefineField) || SourceField;

    if (Field) {
      return /*#__PURE__*/ _react.default.createElement(
        Field,
        _extends(
          {},
          props,
          {
            name: name,
          },
          others,
          {
            key: name,
          }
        )
      );
    }

    return null;
  };
};

var _default = subFieldGenerator;
exports.default = _default;
