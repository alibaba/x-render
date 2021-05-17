'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getValidateList = exports.dealTypeValidate = exports.getValidateText = void 0;

var _isLength = _interopRequireDefault(require('validator/lib/isLength'));

var _color = _interopRequireDefault(require('color'));

var _isHidden = require('./isHidden');

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
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

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

var isNotEmpty = function isNotEmpty(val) {
  return [undefined, null].indexOf(val) === -1;
};

var isEmptyObject = function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}; // 值是是否为空

var isEmptyValue = function isEmptyValue(value, schema) {
  // 多选组件的值为 [] 时，也判断为空值
  if (schema.type === 'array' && schema.enum) {
    return !value || value.length === 0;
  } // boolean里的false, number里的0, 都不要认为是空值

  if (value === 0 || value === false) {
    return false;
  }

  return !value;
};

var getValidateText = function getValidateText() {
  var obj =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var value = obj.value,
    defaultValue = obj.defaultValue,
    required = obj.required,
    _obj$schema = obj.schema,
    schema = _obj$schema === void 0 ? {} : _obj$schema,
    formData = obj.formData;
  var type = schema.type,
    pattern = schema.pattern,
    message = schema.message,
    format = schema.format,
    minLength = schema.minLength,
    maxLength = schema.maxLength,
    minimum = schema.minimum,
    maximum = schema.maximum,
    minItems = schema.minItems,
    maxItems = schema.maxItems,
    uniqueItems = schema.uniqueItems,
    widget = schema['ui:widget'],
    options = schema['ui:options'],
    validator = schema.validator; // TODO: 这里要不要把 null 算进去呢？感觉算进去更合理一点

  var finalValue = [undefined, null].indexOf(value) > -1 ? defaultValue : value; // fix: number = 0 返回空字符串

  if (type === 'number' && value === 0) {
    finalValue = 0;
  } // 新增 validator 校验

  if (validator && (0, _utils.isFunction)(validator)) {
    if (typeof validator === 'function') {
      return validator(finalValue, formData);
    } else if (typeof validator === 'string') {
      return (0, _utils.convertValue2)(validator, finalValue, formData);
    }
  }

  var usePattern = pattern && ['string', 'number'].indexOf(type) > -1; // schema 里面没有内容的，直接退出

  if (isEmptyObject(schema)) {
    return false;
  } // 校验是否为required

  if (required && isEmptyValue(finalValue, schema)) {
    return (message && message.required) || '不能为空';
  } // 字符串相关校验

  if (type === 'string') {
    // TODO： 考虑了下，目前先允许 string 类的填入值是 undefined null 和 数字，校验的时候先转成 string
    var _finalValue = finalValue;

    if (typeof finalValue !== 'string') {
      if (finalValue === null || finalValue === undefined) {
        _finalValue = '';
      } else {
        _finalValue = String(finalValue); // return '内容不是字符串，请修改'; // 这里可以强制提示，但旧项目有修改成本
      }
    } // TODO: 为了一个 isLength 去引入一个包有点过分了，有空自己改写一下，而且 antd 用的 async-validator，是不是可以考虑看看
    // 添加检查，是否两侧有空格

    var noTrim = options && options.noTrim; // 配置项，不需要trim

    var trimedValue = _finalValue.trim();

    if (trimedValue !== _finalValue && !noTrim) {
      return (
        (message && message.trim) ||
        '\u8F93\u5165\u7684\u5185\u5BB9\u6709\u591A\u4F59\u7A7A\u683C'
      );
    }

    if (_finalValue && maxLength) {
      if (!(0, _isLength.default)(_finalValue, 0, parseInt(maxLength, 10))) {
        return (
          (message && message.maxLength) ||
          '\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E '.concat(maxLength)
        );
      }
    }

    if (_finalValue && (minLength || minLength === 0)) {
      if (
        !_finalValue ||
        !(0, _isLength.default)(_finalValue, parseInt(minLength, 10), undefined)
      ) {
        return (
          (message && message.minLength) ||
          '\u957F\u5EA6\u4E0D\u80FD\u5C0F\u4E8E '.concat(minLength)
        );
      }
    } // TODO: 为了一个Color引入了一个挺大的包，可以优化

    if (format === 'color' || widget === 'color') {
      try {
        (0, _color.default)(finalValue || null); // 空字符串无法解析会报错，出现空的情况传 null
      } catch (e) {
        return '请填写正确的颜色格式';
      }
    }

    if (format === 'image') {
      var imagePattern =
        '([/|.|w|s|-])*.(?:jpg|gif|png|bmp|apng|webp|jpeg|json)'; // image 里也可以填写网络链接

      var _isUrl = (0, _utils.isUrl)(finalValue);

      var _isImg = new RegExp(imagePattern).test(finalValue);

      if (usePattern) {
      } else if (finalValue && !_isUrl && !_isImg) {
        return (message && message.image) || '请输入正确的图片格式';
      }
    }

    if (format === 'url') {
      if (usePattern) {
      } else if (finalValue && !(0, _utils.isUrl)(finalValue)) {
        return (message && message.url) || '请输入正确的url格式';
      }
    }

    if (format === 'email') {
      if (usePattern) {
      } else if (finalValue && !(0, _utils.isEmail)(finalValue)) {
        return (message && message.email) || '请输入正确的email格式';
      }
    }
  } // 数字相关校验

  if (type === 'number') {
    if (typeof finalValue !== 'number') {
      return '请填写数字';
    }

    if (maximum && parseFloat(finalValue, 10) > maximum) {
      return (
        (message && message.maximum) ||
        '\u6570\u503C\u4E0D\u80FD\u5927\u4E8E '.concat(maximum)
      );
    }

    if ((minimum || minimum === 0) && parseFloat(finalValue, 10) < minimum) {
      return (
        (message && message.minimum) ||
        '\u6570\u503C\u4E0D\u80FD\u5C0F\u4E8E '.concat(minimum)
      );
    }
  } // 正则只对数字和字符串有效果
  // finalValue 有值的时候才去算 pattern。从场景反馈还是这样好

  if (finalValue && usePattern && !new RegExp(pattern).test(finalValue)) {
    return (message && message.pattern) || '格式不匹配';
  } // 数组项目相关校验

  if (type === 'array') {
    if (maxItems && finalValue && finalValue.length > maxItems) {
      return (
        (message && message.maxItems) ||
        '\u6570\u7EC4\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E '.concat(maxItems)
      );
    }

    if (
      (minItems || minItems === 0) &&
      finalValue &&
      finalValue.length < minItems
    ) {
      return (
        (message && message.minItems) ||
        '\u6570\u7EC4\u957F\u5EA6\u4E0D\u80FD\u5C0F\u4E8E '.concat(minItems)
      );
    }

    if (uniqueItems && Array.isArray(finalValue) && finalValue.length > 1) {
      if (typeof uniqueItems === 'boolean') {
        if ((0, _utils.hasRepeat)(finalValue)) {
          return '存在重复元素';
        }
      }

      if (typeof uniqueItems === 'string') {
        try {
          var nameList = finalValue.map(function(item) {
            return (0, _utils.baseGet)(item, uniqueItems);
          }); // 只考虑非object的情况

          var isRepeat = nameList.find(function(x, index) {
            return nameList.indexOf(x) !== index;
          });

          if (isRepeat) {
            return uniqueItems + ' 的值存在重复的';
          }
        } catch (e) {}
      }
    }
  }

  return false;
};

exports.getValidateText = getValidateText;

var dealTypeValidate = function dealTypeValidate(key, value) {
  var schema =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _formData = arguments.length > 3 ? arguments[3] : undefined;

  var checkList = [];
  var type = schema.type,
    items = schema.items;
  var obj = {
    value: value,
    schema: schema,
    formData: _formData,
  };

  if (type === 'object') {
    var list = getValidateList(value, schema, _formData); // eslint-disable-line

    checkList.push.apply(checkList, _toConsumableArray(list));
  } else if (type === 'array') {
    value.forEach(function(v) {
      var list = dealTypeValidate(key, v, items, _formData);
      checkList.push.apply(checkList, _toConsumableArray(list));
    });
  }

  if (getValidateText(obj)) {
    checkList.push(key);
  }

  return checkList;
}; // for backward compatibility

exports.dealTypeValidate = dealTypeValidate;

var keyHidden = function keyHidden(schema, val) {
  var hidden = schema && schema['ui:hidden'];

  if (typeof hidden === 'string' && (0, _utils.isFunction)(hidden) === false) {
    hidden = (0, _isHidden.isHidden)({
      hidden: hidden,
      rootValue: val,
    });
  }

  return hidden;
};

var getValidateList = function getValidateList() {
  var val =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var schema =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 ? arguments[2] : undefined;

  var _formData = formData || val;

  var checkList = [];
  var properties = schema.properties,
    required = schema.required; // 校验必填（required 属性只在 type:object 下存在）

  if (required && required.length > 0) {
    required.forEach(function(key) {
      var schema = (properties && properties[key]) || {};
      var hidden = keyHidden(schema, val);

      var _hidden = (0, _utils.convertValue)(hidden, _formData, val);

      var itemValue = val && val[key];

      if (isEmptyValue(itemValue, schema) && !_hidden) {
        checkList.push(key);
      }
    });
  }

  if (properties && val && Object.keys(val) && Object.keys(val).length > 0) {
    Object.keys(val).forEach(function(key) {
      var value = val[key];
      var schema = properties[key] || {};
      var hidden = keyHidden(schema, val);

      var _hidden = (0, _utils.convertValue)(hidden, _formData, val);

      if (!_hidden) {
        var list = dealTypeValidate(key, value, schema, _formData);
        checkList.push.apply(checkList, _toConsumableArray(list));
      }
    });
  }

  return checkList;
};

exports.getValidateList = getValidateList;
