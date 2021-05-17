'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.clone = clone;
exports.isUrl = isUrl;
exports.isLooselyNumber = isLooselyNumber;
exports.isCssLength = isCssLength;
exports.isDeepEqual = isDeepEqual;
exports.getFormatForFusion = getFormatForFusion;
exports.getFormat = getFormat;
exports.hasRepeat = hasRepeat;
exports.combineSchema = combineSchema;
exports.combine = combine;
exports.safeEval = safeEval;
exports.isFunction = isFunction;
exports.isFunctionSchema = isFunctionSchema;
exports.baseGet = baseGet;
exports.funcfySchema = funcfySchema;
exports.isEmail = exports.getArray = exports.getEnum = exports.convertValue2 = exports.convertValue = exports.isObj = exports.isNumber = exports.evaluateString2 = exports.evaluateString = exports.parseString = exports.isValidVariableName = void 0;

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

/**
 * Created by Tw93 on 2018-09-26.
 * 常见功能函数
 */
// 克隆对象
function clone(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    return data;
  }
} // 做一个url的弱判断，就判断有没有 “//”

function isUrl(string) {
  var protocolRE = /^(?:\w+:)?\/\/(\S+)$/; // const domainRE = /^[^\s\.]+\.\S{2,}$/;

  if (typeof string !== 'string') return false;
  return protocolRE.test(string);
} // '3' => true, 3 => true, undefined => false

function isLooselyNumber(num) {
  if (typeof num === 'number') return true;

  if (typeof num === 'string') {
    return !Number.isNaN(Number(num));
  }

  return false;
}

function isCssLength(str) {
  if (typeof str !== 'string') return false;
  return str.match(/^([0-9])*(%|px|rem|em)$/i);
} // 深度对比

function isDeepEqual(param1, param2) {
  if (param1 === undefined && param2 === undefined) return true;
  else if (param1 === undefined || param2 === undefined) return false;
  if (param1 === null && param2 === null) return true;
  else if (param1 === null || param2 === null) return false;
  else if (param1.constructor !== param2.constructor) return false;

  if (param1.constructor === Array) {
    if (param1.length !== param2.length) return false;

    for (var i = 0; i < param1.length; i++) {
      if (param1[i].constructor === Array || param1[i].constructor === Object) {
        if (!isDeepEqual(param1[i], param2[i])) return false;
      } else if (param1[i] !== param2[i]) return false;
    }
  } else if (param1.constructor === Object) {
    if (Object.keys(param1).length !== Object.keys(param2).length) return false;

    for (var _i = 0; _i < Object.keys(param1).length; _i++) {
      var key = Object.keys(param1)[_i];

      if (
        param1[key] &&
        typeof param1[key] !== 'number' &&
        (param1[key].constructor === Array ||
          param1[key].constructor === Object)
      ) {
        if (!isDeepEqual(param1[key], param2[key])) return false;
      } else if (param1[key] !== param2[key]) return false;
    }
  } else if (param1.constructor === String || param1.constructor === Number) {
    return param1 === param2;
  }

  return true;
} // fusion 的时间 format

function getFormatForFusion(format) {
  var dateFormat;

  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;

    case 'time':
      dateFormat = 'HH:mm:ss';
      break;

    case 'dateTime':
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
      break;

    case 'year':
      dateFormat = 'YYYY';
      break;

    case 'quarter':
      dateFormat = 'YYYY-[Q]Q';
      break;

    case 'month':
      dateFormat = 'YYYY-MM';
      break;

    case 'week':
      dateFormat = 'YYYY-W[*]';
      break;

    default:
      dateFormat = 'YYYY-MM-DD';

      if (format && typeof format === 'string') {
        dateFormat = format;
      }
  }

  return dateFormat;
} // 时间组件

function getFormat(format) {
  var dateFormat;

  switch (format) {
    case 'date':
      // dateFormat = 'YYYY-MM-DD';
      dateFormat = undefined;
      break;

    case 'time':
      dateFormat = 'HH:mm:ss';
      break;

    case 'dateTime':
      // dateFormat = 'YYYY-MM-DD HH:mm:ss';
      dateFormat = undefined;
      break;

    case 'year':
      // dateFormat = 'YYYY';
      dateFormat = undefined;
      break;

    case 'quarter':
      dateFormat = 'YYYY-[Q]Q';
      break;

    case 'month':
      dateFormat = 'YYYY-MM';
      break;

    case 'week':
      dateFormat = 'YYYY-W[*]';
      break;

    default:
      dateFormat = 'YYYY-MM-DD';

      if (format && typeof format === 'string') {
        dateFormat = format;
      }
  }

  return dateFormat;
}

function hasRepeat(list) {
  return list.find(function(x, i, self) {
    return (
      i !==
      self.findIndex(function(y) {
        return JSON.stringify(x) === JSON.stringify(y);
      })
    );
  });
} // ----------------- schema 相关
// 合并propsSchema和UISchema。由于两者的逻辑相关性，合并为一个大schema能简化内部处理

function combineSchema(propsSchema, uiSchema) {
  var propList = getChildren(propsSchema);
  var newList = propList.map(function(p) {
    var name = p.name;
    var _p$schema = p.schema,
      type = _p$schema.type,
      options = _p$schema.enum,
      properties = _p$schema.properties,
      items = _p$schema.items;
    var isObj = type === 'object' && properties;
    var isArr = type === 'array' && items && !options; // enum + array 代表的多选框，没有sub

    var ui = name && uiSchema[p.name];

    if (!ui) {
      return p;
    } // 如果是list，递归合并items

    if (isArr) {
      var newItems = combineSchema(items, ui.items || {});
      return _objectSpread(
        _objectSpread({}, p),
        {},
        {
          schema: _objectSpread(
            _objectSpread(_objectSpread({}, p.schema), ui),
            {},
            {
              items: newItems,
            }
          ),
        }
      );
    } // object递归合并整个schema

    if (isObj) {
      var newSchema = combineSchema(p.schema, ui);
      return _objectSpread(
        _objectSpread({}, p),
        {},
        {
          schema: newSchema,
        }
      );
    }

    return _objectSpread(
      _objectSpread({}, p),
      {},
      {
        schema: _objectSpread(_objectSpread({}, p.schema), ui),
      }
    );
  });
  var newObj = {};
  newList.forEach(function(s) {
    newObj[s.name] = s.schema;
  });
  var topLevelUi = {};
  Object.keys(uiSchema).forEach(function(key) {
    if (typeof key === 'string' && key.substring(0, 3) === 'ui:') {
      topLevelUi[key] = uiSchema[key];
    }
  });

  if (isEmpty(newObj)) {
    return _objectSpread(_objectSpread({}, propsSchema), topLevelUi);
  }

  return _objectSpread(
    _objectSpread(_objectSpread({}, propsSchema), topLevelUi),
    {},
    {
      properties: newObj,
    }
  );
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
} // 获得propsSchema的children

function getChildren(schema) {
  var properties = schema.properties,
    items = schema.items,
    type = schema.type;

  if (!properties && !items) {
    return [];
  }

  var schemaSubs = {};

  if (type === 'object') {
    schemaSubs = properties;
  }

  if (type === 'array') {
    schemaSubs = items;
  }

  return Object.keys(schemaSubs).map(function(name) {
    return {
      schema: schemaSubs[name],
      name: name,
    };
  });
} // 合并多个schema树，比如一个schema的树节点是另一个schema

function combine() {}

var isValidVariableName = function isValidVariableName(param) {
  return /^[a-zA-Z]+$/g.test(param);
}; // 去掉所有的window上的api，出现用户在这段逻辑里报错了。
// export function safeEval(code) {
//   let safeContextStr = '';
//   if (typeof window !== 'undefined') {
//     const windowContextAttr = Object.getOwnPropertyNames(window).filter(
//       isValidVariableName
//     );
//     for (let i = 0, len = windowContextAttr.length; i < len; i++) {
//       safeContextStr += `var ${windowContextAttr[i]} = undefined;`;
//     }
//   }
//   return Function(`${safeContextStr} "use strict";  ${code}`)();
// }

exports.isValidVariableName = isValidVariableName;

function safeEval(code) {
  return Function('"use strict"; '.concat(code))();
} // 代替eval的函数

var parseString = function parseString(string) {
  return safeEval('return ('.concat(string, ')'));
}; // 解析函数字符串值

exports.parseString = parseString;

var evaluateString = function evaluateString(string, formData, rootValue) {
  return safeEval(
    '\n  const rootValue ='
      .concat(JSON.stringify(rootValue), ';\n  const formData = ')
      .concat(JSON.stringify(formData), ';\n  return (')
      .concat(string, ')\n  ')
  );
}; // 解析函数字符串值(用于validator，入参只有value)

exports.evaluateString = evaluateString;

var evaluateString2 = function evaluateString2(string, value, formData) {
  return safeEval(
    '\n  const value ='
      .concat(JSON.stringify(value), ';\n  const formData = ')
      .concat(JSON.stringify(formData), ';\n  return (')
      .concat(string, ')\n  ')
  );
}; // 判断schema的值是是否是“函数”
// JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数，也可使用@标记，不推荐。

exports.evaluateString2 = evaluateString2;

function isFunction(func) {
  if (typeof func === 'function') {
    return true;
  }

  if (typeof func === 'string' && func.substring(0, 1) === '@') {
    return func.substring(1);
  }

  if (
    typeof func === 'string' &&
    func.substring(0, 2) === '{{' &&
    func.substring(func.length - 2, func.length) === '}}'
  ) {
    return func.substring(2, func.length - 2);
  }

  return false;
} // 判断schema中是否有属性值是函数表达式
// TODO: 这个util，没有考虑schema是array的情况，不过目前没有被用到

function isFunctionSchema(schema) {
  return Object.keys(schema).some(function(key) {
    if (typeof schema[key] === 'function') {
      return true;
    } else if (typeof schema[key] === 'string') {
      return isFunction(schema[key]);
    } else if (_typeof(schema[key]) === 'object') {
      return isFunctionSchema(schema[key]);
    } else {
      return false;
    }
  });
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

var isNumber = function isNumber(a) {
  return !Number.isNaN(Number(a));
};

exports.isNumber = isNumber;

var isObj = function isObj(a) {
  return stringContains(Object.prototype.toString.call(a), 'Object');
}; // 函数表达式转换成值

exports.isObj = isObj;

var convertValue = function convertValue(item, formData, rootValue) {
  if (typeof item === 'function') {
    return item(formData, rootValue);
  } else if (typeof item === 'string' && isFunction(item) !== false) {
    var _item = isFunction(item);

    try {
      return evaluateString(_item, formData, rootValue);
    } catch (error) {
      console.error(error.message);
      console.error('happen at '.concat(item));
      return item;
    }
  }

  return item;
}; // 用于validator的求值，入参只有value

exports.convertValue = convertValue;

var convertValue2 = function convertValue2(item, value, formData) {
  if (typeof item === 'function') {
    return item(value, formData);
  } else if (typeof item === 'string' && isFunction(item) !== false) {
    var _item = isFunction(item);

    try {
      return evaluateString2(_item, value, formData);
    } catch (error) {
      console.error(error.message);
      console.error('happen at '.concat(item));
      return item;
    }
  }

  return item;
}; // getValueByKey(formData, 'a.b.c')

exports.convertValue2 = convertValue2;

function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0;
  var length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

function castPath(value, object) {
  if (Array.isArray(value)) {
    return value;
  }

  return isKey(value, object) ? [value] : value.match(/([^\.\[\]"']+)/g);
}

function toKey(value) {
  if (typeof value === 'string') {
    return value;
  }

  var result = ''.concat(value);
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;

function isKey(value, object) {
  if (Array.isArray(value)) {
    return false;
  }

  var type = _typeof(value);

  if (type === 'number' || type === 'boolean' || value == null) {
    return true;
  }

  return (
    reIsPlainProp.test(value) ||
    !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
  );
} // 将schema内所有的 {{ ... }} 转换为正常函数，我们试着一次性在外部做好这件事，而不是在内部每次去计算，优化性能

function funcfySchema(schema) {
  var _schema = clone(schema);

  if (isObj(_schema)) {
    Object.keys(_schema).forEach(function(key) {
      _schema[key] = funcfySchema(_schema[key]);
    });
  } else if (Array.isArray(_schema)) {
    _schema = _schema.map(function(item) {
      return funcfySchema(item);
    });
  } else {
    var funcBody = isFunction(schema);

    if (typeof funcBody === 'string') {
      try {
        _schema = new Function(
          'formData',
          'rootValue',
          'return '.concat(funcBody)
        );
      } catch (error) {
        console.error('funcfySchema', error);
      }
    }
  }

  return _schema;
}

var getEnum = function getEnum(schema) {
  if (!schema) return undefined;
  var itemEnum = schema && schema.items && schema.items.enum;
  var schemaEnum = schema && schema.enum;
  return itemEnum ? itemEnum : schemaEnum;
};

exports.getEnum = getEnum;

var getArray = function getArray(arr) {
  var defaultValue =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (Array.isArray(arr)) return arr;
  return defaultValue;
};

exports.getArray = getArray;

var isEmail = function isEmail(value) {
  var regex = '^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$';

  if (value && new RegExp(regex).test(value)) {
    return true;
  }

  return false;
};

exports.isEmail = isEmail;
