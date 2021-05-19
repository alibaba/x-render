import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import isLength from 'validator/lib/isLength';
import Color from 'color';
import { pope } from 'pope';
import 'antd/dist/antd.less';

function _typeof(obj) {
  '@babel/helpers - typeof';

  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function(obj) {
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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

function _objectSpread2(target) {
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;

  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {})
    );
    return true;
  } catch (e) {
    return false;
  }
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function useDebouncedCallback(func, wait, options) {
  var _this = this;

  var lastCallTime = useRef(null);
  var lastInvokeTime = useRef(0);
  var timerId = useRef(null);
  var lastArgs = useRef([]);
  var lastThis = useRef();
  var result = useRef();
  var funcRef = useRef(func);
  var mounted = useRef(true);
  funcRef.current = func; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.

  var useRAF = !wait && wait !== 0 && typeof window !== 'undefined';

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  wait = +wait || 0;
  options = options || {};
  var leading = !!options.leading;
  var trailing = 'trailing' in options ? !!options.trailing : true; // `true` by default

  var maxing = 'maxWait' in options;
  var maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : null;
  useEffect(function() {
    mounted.current = true;
    return function() {
      mounted.current = false;
    };
  }, []); // You may have a question, why we have so many code under the useMemo definition.
  //
  // This was made as we want to escape from useCallback hell and
  // not to initialize a number of functions each time useDebouncedCallback is called.
  //
  // It means that we have less garbage for our GC calls which improves performance.
  // Also, it makes this library smaller.
  //
  // And the last reason, that the code without lots of useCallback with deps is easier to read.
  // You have only one place for that.

  var debounced = useMemo(
    function() {
      var invokeFunc = function invokeFunc(time) {
        var args = lastArgs.current;
        var thisArg = lastThis.current;
        lastArgs.current = lastThis.current = null;
        lastInvokeTime.current = time;
        return (result.current = funcRef.current.apply(thisArg, args));
      };

      var startTimer = function startTimer(pendingFunc, wait) {
        if (useRAF) cancelAnimationFrame(timerId.current);
        timerId.current = useRAF
          ? requestAnimationFrame(pendingFunc)
          : setTimeout(pendingFunc, wait);
      };

      var shouldInvoke = function shouldInvoke(time) {
        if (!mounted.current) return false;
        var timeSinceLastCall = time - lastCallTime.current;
        var timeSinceLastInvoke = time - lastInvokeTime.current; // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.

        return (
          !lastCallTime.current ||
          timeSinceLastCall >= wait ||
          timeSinceLastCall < 0 ||
          (maxing && timeSinceLastInvoke >= maxWait)
        );
      };

      var trailingEdge = function trailingEdge(time) {
        timerId.current = null; // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.

        if (trailing && lastArgs.current) {
          return invokeFunc(time);
        }

        lastArgs.current = lastThis.current = null;
        return result.current;
      };

      var timerExpired = function timerExpired() {
        var time = Date.now();

        if (shouldInvoke(time)) {
          return trailingEdge(time);
        } // https://github.com/xnimorz/use-debounce/issues/97

        if (!mounted.current) {
          return;
        } // Remaining wait calculation

        var timeSinceLastCall = time - lastCallTime.current;
        var timeSinceLastInvoke = time - lastInvokeTime.current;
        var timeWaiting = wait - timeSinceLastCall;
        var remainingWait = maxing
          ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting; // Restart the timer

        startTimer(timerExpired, remainingWait);
      };

      var func = function func() {
        var time = Date.now();
        var isInvoking = shouldInvoke(time);

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        lastArgs.current = args;
        lastThis.current = _this;
        lastCallTime.current = time;

        if (isInvoking) {
          if (!timerId.current && mounted.current) {
            // Reset any `maxWait` timer.
            lastInvokeTime.current = lastCallTime.current; // Start the timer for the trailing edge.

            startTimer(timerExpired, wait); // Invoke the leading edge.

            return leading ? invokeFunc(lastCallTime.current) : result.current;
          }

          if (maxing) {
            // Handle invocations in a tight loop.
            startTimer(timerExpired, wait);
            return invokeFunc(lastCallTime.current);
          }
        }

        if (!timerId.current) {
          startTimer(timerExpired, wait);
        }

        return result.current;
      };

      func.cancel = function() {
        if (timerId.current) {
          useRAF
            ? cancelAnimationFrame(timerId.current)
            : clearTimeout(timerId.current);
        }

        lastInvokeTime.current = 0;
        lastArgs.current = lastCallTime.current = lastThis.current = timerId.current = null;
      };

      func.isPending = function() {
        return !!timerId.current;
      };

      func.flush = function() {
        return !timerId.current ? result.current : trailingEdge(Date.now());
      };

      return func;
    },
    [leading, maxing, wait, maxWait, trailing, useRAF]
  );
  return debounced;
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
      return _objectSpread2(
        _objectSpread2({}, p),
        {},
        {
          schema: _objectSpread2(
            _objectSpread2(_objectSpread2({}, p.schema), ui),
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
      return _objectSpread2(
        _objectSpread2({}, p),
        {},
        {
          schema: newSchema,
        }
      );
    }

    return _objectSpread2(
      _objectSpread2({}, p),
      {},
      {
        schema: _objectSpread2(_objectSpread2({}, p.schema), ui),
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
    return _objectSpread2(_objectSpread2({}, propsSchema), topLevelUi);
  }

  return _objectSpread2(
    _objectSpread2(_objectSpread2({}, propsSchema), topLevelUi),
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

function safeEval(code) {
  return Function('"use strict"; '.concat(code))();
} // 代替eval的函数

var parseString = function parseString(string) {
  return safeEval('return ('.concat(string, ')'));
}; // 解析函数字符串值

var evaluateString = function evaluateString(string, formData, rootValue) {
  return safeEval(
    '\n  const rootValue ='
      .concat(JSON.stringify(rootValue), ';\n  const formData = ')
      .concat(JSON.stringify(formData), ';\n  return (')
      .concat(string, ')\n  ')
  );
}; // 解析函数字符串值(用于validator，入参只有value)

var evaluateString2 = function evaluateString2(string, value, formData) {
  return safeEval(
    '\n  const value ='
      .concat(JSON.stringify(value), ';\n  const formData = ')
      .concat(JSON.stringify(formData), ';\n  return (')
      .concat(string, ')\n  ')
  );
}; // 判断schema的值是是否是“函数”
// JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数，也可使用@标记，不推荐。

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
var getEnum = function getEnum(schema) {
  if (!schema) return undefined;
  var itemEnum = schema && schema.items && schema.items.enum;
  var schemaEnum = schema && schema.enum;
  return itemEnum ? itemEnum : schemaEnum;
};
var isEmail = function isEmail(value) {
  var regex = '^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$';

  if (value && new RegExp(regex).test(value)) {
    return true;
  }

  return false;
};

function isDependShow() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    formData = _ref.formData,
    dependShow = _ref.dependShow;

  if (formData && dependShow) {
    try {
      return !parseString(pope(dependShow, formData)); //eslint-disable-line
    } catch (e) {
      console.error(e);
    }
  }
}
function isHidden() {
  var _ref2 =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    hidden = _ref2.hidden,
    rootValue = _ref2.rootValue,
    formData = _ref2.formData;

  // hidden 为表达式：
  if (typeof hidden === 'string') {
    // 支持 && 和 ||
    var hasAnd = function hasAnd(string) {
      return string.indexOf('&&') > -1;
    };

    var hasOr = function hasOr(string) {
      return string.indexOf('||') > -1;
    };

    var hiddenList = [];

    if (!hasOr(hidden)) {
      if (!hasAnd(hidden)) {
        return calcHidden(hidden, rootValue, formData);
      } else {
        hiddenList = hidden.split('&&').map(function(item) {
          return item.trim();
        });
        return hiddenList.every(function(item) {
          return calcHidden(item, rootValue, formData);
        });
      }
    } else {
      hiddenList = hidden.split('||').map(function(item) {
        return item.trim();
      });

      if (!hasAnd(hidden)) {
        return hiddenList.some(function(item) {
          return calcHidden(item, rootValue, formData);
        });
      } else {
        return hiddenList.some(function(item) {
          if (hasAnd(item)) {
            var list = item.split('&&').map(function(item) {
              return item.trim();
            });
            return list.every(function(x) {
              return calcHidden(x, rootValue, formData);
            });
          } else {
            return calcHidden(item, rootValue, formData);
          }
        });
      }
    }
  }

  return hidden;
} // 计算单个表达式的hidden值

var calcHidden = function calcHidden(hiddenString, rootValue, formData) {
  if (!rootValue || _typeof(rootValue) !== 'object') {
    return false;
  } // 支持四种基本运算符

  var operators = ['==', '!=', '>', '<'];

  try {
    var op = operators.find(function(op) {
      return hiddenString.indexOf(op) > -1;
    });

    var _hiddenString$split$m = hiddenString.split(op).map(function(item) {
        return item.trim();
      }),
      _hiddenString$split$m2 = _slicedToArray(_hiddenString$split$m, 2),
      key = _hiddenString$split$m2[0],
      value = _hiddenString$split$m2[1];

    var left = rootValue[key]; // feature: 允许从 formData 取值

    if (key.substring(0, 9) === 'formData.' && formData) {
      var subKey = key.substring(9);
      left = baseGet(formData, subKey);
    }

    var right = parseString(value);
    return parseString(
      '"'
        .concat(String(left), '"')
        .concat(op, '"')
        .concat(String(right), '"')
    );
  } catch (e) {
    console.error(e);
  }

  return false;
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

  if (validator && isFunction(validator)) {
    if (typeof validator === 'function') {
      return validator(finalValue, formData);
    } else if (typeof validator === 'string') {
      return convertValue2(validator, finalValue, formData);
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
      if (!isLength(_finalValue, 0, parseInt(maxLength, 10))) {
        return (
          (message && message.maxLength) ||
          '\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E '.concat(maxLength)
        );
      }
    }

    if (_finalValue && (minLength || minLength === 0)) {
      if (
        !_finalValue ||
        !isLength(_finalValue, parseInt(minLength, 10), undefined)
      ) {
        return (
          (message && message.minLength) ||
          '\u957F\u5EA6\u4E0D\u80FD\u5C0F\u4E8E '.concat(minLength)
        );
      }
    } // TODO: 为了一个Color引入了一个挺大的包，可以优化

    if (format === 'color' || widget === 'color') {
      try {
        Color(finalValue || null); // 空字符串无法解析会报错，出现空的情况传 null
      } catch (e) {
        return '请填写正确的颜色格式';
      }
    }

    if (format === 'image') {
      var imagePattern =
        '([/|.|w|s|-])*.(?:jpg|gif|png|bmp|apng|webp|jpeg|json)'; // image 里也可以填写网络链接

      var _isUrl = isUrl(finalValue);

      var _isImg = new RegExp(imagePattern).test(finalValue);

      if (usePattern);
      else if (finalValue && !_isUrl && !_isImg) {
        return (message && message.image) || '请输入正确的图片格式';
      }
    }

    if (format === 'url') {
      if (usePattern);
      else if (finalValue && !isUrl(finalValue)) {
        return (message && message.url) || '请输入正确的url格式';
      }
    }

    if (format === 'email') {
      if (usePattern);
      else if (finalValue && !isEmail(finalValue)) {
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
        if (hasRepeat(finalValue)) {
          return '存在重复元素';
        }
      }

      if (typeof uniqueItems === 'string') {
        try {
          var nameList = finalValue.map(function(item) {
            return baseGet(item, uniqueItems);
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

var keyHidden = function keyHidden(schema, val) {
  var hidden = schema && schema['ui:hidden'];

  if (typeof hidden === 'string' && isFunction(hidden) === false) {
    hidden = isHidden({
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

      var _hidden = convertValue(hidden, _formData, val);

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

      var _hidden = convertValue(hidden, _formData, val);

      if (!_hidden) {
        var list = dealTypeValidate(key, value, schema, _formData);
        checkList.push.apply(checkList, _toConsumableArray(list));
      }
    });
  }

  return checkList;
};

function usePrevious(value) {
  var ref = useRef();
  useEffect(
    function() {
      ref.current = value;
    },
    [value]
  ); // Only re-run if value changes

  return ref.current;
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

  return /*#__PURE__*/ React.createElement(
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
    /*#__PURE__*/ React.createElement(
      'svg',
      {
        viewBox: '0 0 1024 1024',
        width: width || 18,
        height: height || 18,
      },
      /*#__PURE__*/ React.createElement('path', {
        d:
          'M942.048 306.176c-12.288-12.288-31.328-13.024-43.008-2.016L529.056 674.112c-15.072 15.872-19.008 15.808-34.816 0L124.288 304.16c-11.68-11.04-30.72-10.272-43.008 2.016-12.512 12.512-13.216 32.032-1.6 43.68L490.624 760.8c5.056 5.056 11.648 7.328 18.464 7.744h5.152c6.816-.448 13.408-2.72 18.464-7.744l410.944-410.944c11.584-11.648 10.88-31.2-1.6-43.68z',
        fill: fill || '#3c3c3c',
      })
    )
  );
};

var asField = function asField(_ref) {
  var FieldUI = _ref.FieldUI,
    Widget = _ref.Widget;

  var FieldContainer = function FieldContainer(_ref2) {
    var className = _ref2.className,
      column = _ref2.column,
      showValidate = _ref2.showValidate,
      isRoot = _ref2.isRoot,
      hidden = _ref2.hidden,
      props = _ref2.props,
      showDescIcon = _ref2.showDescIcon,
      width = _ref2.width,
      labelWidth = _ref2.labelWidth,
      disabled = _ref2.disabled,
      readOnly = _ref2.readOnly,
      options = _ref2.options,
      schema = _ref2.schema,
      isEditing = _ref2.isEditing,
      rest = _objectWithoutProperties(_ref2, [
        'className',
        'column',
        'showValidate',
        'isRoot',
        'hidden',
        'props',
        'showDescIcon',
        'width',
        'labelWidth',
        'disabled',
        'readOnly',
        'options',
        'schema',
        'isEditing',
      ]);

    var firstRender = useRef(true);
    var fieldTouched = useRef(false);
    var displayType = rest.displayType,
      _rest$rootValue = rest.rootValue,
      rootValue = _rest$rootValue === void 0 ? {} : _rest$rootValue,
      _rest$formData = rest.formData,
      formData = _rest$formData === void 0 ? {} : _rest$formData,
      dependShow = rest.dependShow,
      _value = rest.value;
    var prevValue = usePrevious(_value); // most key of schema, disabled, readOnly, options, hidden, support for function expression

    useEffect(
      function() {
        if (showValidate) return; // 首次渲染不做, TODO: 万一首次渲染是用户输入触发的呢？

        if (firstRender.current) {
          firstRender.current = false;
          return;
        } // 已经动过了就不用验证是否动过

        if (fieldTouched.current === true) return; // 之后每次改动就算touch了，尽量避免多余的去使用isDeepEqual，大的复杂表单性能会不好

        if (isDeepEqual(prevValue, _value)) return;
        fieldTouched.current = true;
      },
      [_value]
    );
    var _hidden = hidden,
      _className = className,
      _disabled = disabled,
      _readOnly = readOnly,
      _options = options,
      _schema = schema;

    var convertValues = function convertValues() {
      _hidden = convertValue(hidden, formData, rootValue);

      if (_hidden !== undefined && typeof _hidden !== 'boolean') {
        _hidden = isHidden({
          hidden: _hidden,
          rootValue: rootValue,
          formData: formData,
        });
      }

      _className = convertValue(className, formData, rootValue);
      _disabled = convertValue(disabled, formData, rootValue);
      _readOnly = convertValue(readOnly, formData, rootValue);
      _options = _objectSpread2({}, options);

      try {
        Object.entries(_options).forEach(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            _val = _ref4[1];

          _options[key] = convertValue(_val, formData, rootValue);
        });
      } catch (e) {} // iterate over schema, and convert every key

      _schema = _objectSpread2({}, schema);
      Object.keys(_schema).forEach(function(key) {
        var availableKey = [
          'title',
          'description',
          'format',
          'minimum',
          'maximum',
          'minLength',
          'maxLength',
          'pattern',
          'message',
          'min',
          'max',
          'step',
          'enum',
          'enumNames',
        ]; // TODO: need to cover more

        if (availableKey.indexOf(key) > -1) {
          _schema[key] = convertValue(_schema[key], formData, rootValue);
        }
      });
    }; // 在编辑时使用快照，否则正常计算

    var screenShot = useRef();

    var saveScreenShot = function saveScreenShot() {
      screenShot.current = {};
      screenShot.current.hidden = _hidden;
      screenShot.current.className = _className;
      screenShot.current.disabled = _disabled;
      screenShot.current.readOnly = _readOnly;
      screenShot.current.options = _options;
      screenShot.current.schema = _schema;
    };

    var readScreenShot = function readScreenShot() {
      _hidden = screenShot.current.hidden;
      _className = screenShot.current.className;
      _disabled = screenShot.current.disabled;
      _readOnly = screenShot.current.readOnly;
      _options = screenShot.current.options;
      _schema = screenShot.current.schema;
    };

    if (!isEditing || !screenShot.current) {
      convertValues();
      saveScreenShot();
    } else {
      readScreenShot();
    }

    if (_hidden) {
      return null;
    } // 历史方法，不建议使用ui:dependShow, 一律使用ui:hidden

    if (
      isDependShow({
        formData: formData,
        dependShow: dependShow,
      })
    ) {
      return null;
    } // 传入组件的值

    var _rest = _objectSpread2(
      _objectSpread2({}, rest),
      {},
      {
        schema: _schema,
        disabled: _disabled,
        readOnly: _readOnly,
        options: _options,
        formData: formData || {},
        rootValue: rootValue || {},
      }
    );

    var isComplex =
      _schema.type === 'object' ||
      (_schema.type === 'array' && getEnum(_schema) === undefined);
    var isModal = options && (options.modal || options.drawer);

    if (isModal) {
      isComplex = false;
    }

    var validateText =
      showValidate || fieldTouched.current ? getValidateText(_rest) : ''; // 必填*，label，描述，竖排时的校验语，只要存在一个，label就不为空

    var showLabel =
      _schema.title ||
      rest.description ||
      rest.required ||
      (displayType !== 'row' && validateText);
    var columnStyle = {};

    if (!isComplex && width) {
      columnStyle = {
        width: width,
        paddingRight: '12px',
      };
    } else if (!isComplex && column > 1) {
      columnStyle = {
        width: 'calc(100% /'.concat(column, ')'),
        paddingRight: '12px',
      };
    }

    var fieldProps = {
      className: _className,
      columnStyle: columnStyle,
      displayType: displayType,
      isComplex: isComplex,
      isRequired: rest.required,
      isRoot: isRoot,
      schema: _schema,
      showDescIcon: showDescIcon,
      showLabel: showLabel,
      showValidate: showValidate,
      validateText: validateText,
      labelWidth: labelWidth,
    };
    return /*#__PURE__*/ React.createElement(
      FieldUI,
      fieldProps,
      /*#__PURE__*/ React.createElement(
        Widget,
        _extends({}, _rest, {
          invalid: validateText,
        })
      )
    );
  };

  FieldContainer.propTypes = {
    showValidate: PropTypes.bool,
    column: PropTypes.number,
    isRoot: PropTypes.bool,
    props: PropTypes.object,
    showDescIcon: PropTypes.bool,
    displayType: PropTypes.string,
  };
  FieldContainer.defaultProps = {
    showValidate: true,
    column: 1,
    isRoot: false,
    props: {},
    showDescIcon: false,
    displayType: 'column',
  };
  return FieldContainer;
};
var DefaultFieldUI = function DefaultFieldUI(_ref5) {
  var children = _ref5.children,
    className = _ref5.className,
    columnStyle = _ref5.columnStyle,
    displayType = _ref5.displayType,
    isComplex = _ref5.isComplex,
    isRequired = _ref5.isRequired,
    isRoot = _ref5.isRoot,
    schema = _ref5.schema,
    showDescIcon = _ref5.showDescIcon,
    showLabel = _ref5.showLabel,
    showValidate = _ref5.showValidate,
    validateText = _ref5.validateText,
    labelWidth = _ref5.labelWidth;
  // field 整体 label 标签 content 内容
  var title = schema.title,
    type = schema.type,
    _enum = schema.enum,
    _schema$description = schema.description,
    description = _schema$description === void 0 ? '' : _schema$description,
    widget = schema['ui:widget'],
    options = schema['ui:options'];

  var _useState = useState(options && options.collapsed),
    _useState2 = _slicedToArray(_useState, 2),
    collapsed = _useState2[0],
    setCollapsed = _useState2[1]; // 一个object是否可以折叠，options里collapsed这个值，且这个值只能是true或者false，代表初始是展开还是收起

  var toggleCollapsed = function toggleCollapsed() {
    return setCollapsed(!collapsed);
  };

  var objectCanCollapse =
    type === 'object' &&
    options &&
    [false, true].indexOf(options.collapsed) > -1;
  var isCheckbox = type === 'boolean' && widget !== 'switch';
  var isModal = options && (options.modal || options.drawer);
  var fieldClass = 'fr-field w-100 '.concat(
    isComplex ? 'fr-field-complex' : ''
  );
  var labelClass = 'fr-label mb2';
  var contentClass = 'fr-content';

  switch (type) {
    case 'object':
      if (isModal) {
        break;
      }

      if (title) {
        labelClass += ' fr-label-object bb b--black-20 pb1 mt2 mb3'; // fr-label-object 无默认style，只是占位用于使用者样式覆盖
      }

      if (!isRoot) {
        fieldClass += ' fr-field-object'; // object的margin bottom由内部元素撑起

        if (title) {
          contentClass += ' ml3'; // 缩进
        }
      }

      break;

    case 'array':
      if (isModal) {
        break;
      }

      if (title && getEnum(schema) === undefined) {
        labelClass += ' fr-label-array mt2 mb3';
      }

      break;

    case 'boolean':
      if (isCheckbox) {
        if (title) {
          labelClass = labelClass.replace('mb2', 'mb0');
        }

        contentClass += ' flex items-center'; // checkbox高度短，需要居中对齐

        fieldClass += ' flex items-center flex-row-reverse justify-end';
      }

      break;

    default:
      if (displayType === 'row') {
        labelClass = labelClass.replace('mb2', 'mb0');
      }
  } // 横排时

  if (displayType === 'row' && !isComplex && !isCheckbox) {
    fieldClass += ' flex';
    labelClass += ' flex-shrink-0 fr-label-row';
    labelClass = labelClass.replace('mb2', 'mb0');
    contentClass += ' flex-grow-1 relative';
  } // 横排的checkbox

  if (displayType === 'row' && isCheckbox) {
    contentClass += ' flex justify-end';
  }

  var _labelWidth = isLooselyNumber(labelWidth)
    ? Number(labelWidth)
    : isCssLength(labelWidth)
    ? labelWidth
    : 110; // 默认是 110px 的长度

  var labelStyle = {
    width: _labelWidth,
  };

  if (isCheckbox) {
    labelStyle = {
      flexGrow: 1,
    };
  } else if (isComplex || displayType === 'column') {
    labelStyle = {
      flexGrow: 1,
    };
  }

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: className
        ? ''.concat(className, ' ').concat(fieldClass)
        : fieldClass,
      style: columnStyle,
    },
    showLabel &&
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: labelClass,
          style: labelStyle,
        },
        /*#__PURE__*/ React.createElement(
          'label',
          {
            className: 'fr-label-title '.concat(
              isCheckbox || displayType === 'column' ? 'no-colon' : ''
            ), // boolean不带冒号
            title: title,
          },
          objectCanCollapse &&
            /*#__PURE__*/ React.createElement(FoldIcon, {
              style: {
                marginRight: 6,
              },
              fold: collapsed,
              onClick: toggleCollapsed,
            }),
          isRequired &&
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'fr-label-required',
              },
              ' *'
            ),
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className: ''
                .concat(isComplex ? 'b' : '', ' ')
                .concat(displayType === 'column' ? 'flex-none' : ''),
            },
            title
          ),
          description &&
            (showDescIcon
              ? /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'fr-tooltip-toggle',
                    'aria-label': description,
                  },
                  /*#__PURE__*/ React.createElement('i', {
                    className: 'fr-tooltip-icon',
                  }),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'fr-tooltip-container',
                    },
                    /*#__PURE__*/ React.createElement('i', {
                      className: 'fr-tooltip-triangle',
                    }),
                    description
                  )
                )
              : /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'fr-desc ml2',
                  },
                  '(\xA0',
                  description,
                  '\xA0)'
                )),
          displayType !== 'row' &&
            validateText &&
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'fr-validate',
              },
              validateText
            )
        )
      ),
    objectCanCollapse && collapsed
      ? null
      : /*#__PURE__*/ React.createElement(
          'div',
          {
            className: contentClass,
            style: isCheckbox
              ? displayType === 'row'
                ? {
                    marginLeft: _labelWidth,
                  }
                : {}
              : {
                  flexGrow: 1,
                },
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'fr-children '.concat(
                isComplex ? 'flex-column' : 'items-center'
              ),
            },
            children
          ),
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className: 'fr-validate fr-validate-row '.concat(
                isComplex ? 'relative' : 'absolute'
              ),
            },
            displayType === 'row' && validateText ? validateText : ''
          )
        )
  );
};

function getWidgetName(schema, map) {
  var type = schema.type,
    format = schema.format;
  var readOnly = schema['ui:readonly'];
  var list = [];

  if (readOnly) {
    list.push(''.concat(type, '?readOnly'));
    list.push('*?readOnly');
  }

  if (getEnum(schema)) {
    list.push(''.concat(type, '?enum')); // array 默认使用list，array?enum 默认使用checkboxes，*?enum 默认使用select

    list.push('*?enum');
  }

  if (format) {
    list.push(''.concat(type, ':').concat(format));
  }

  list.push(type); // 放在最后兜底，其他都不match时使用type默认的组件

  var found = list.find(function(item) {
    return !!map[item];
  });
  return map[found] || '';
}

function getField() {
  var schema =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
    customized = _ref.customized,
    generated = _ref.generated,
    mapping = _ref.mapping;

  var widget = schema['ui:widget'],
    field = schema['ui:field']; // Field能否被重定义

  var fieldCanRedefine = false;
  var Field; // ui:widget 是字符串，从generated中查，不是的话，就是本身

  var _widget = typeof widget === 'string' ? generated[widget] : widget;

  if (field && !Field) {
    Field = typeof field === 'string' ? customized[field] : field;
  }

  if (!Field && _widget) {
    Field = _widget;
  }

  if (!Field && !_widget) {
    Field = generated[getWidgetName(schema, mapping)];
    fieldCanRedefine = !!Field;
  }

  return {
    fieldCanRedefine: fieldCanRedefine,
    Field: Field || null,
  };
}

function getDefaultValue(schema) {
  var def = schema.default,
    _schema$enum = schema.enum,
    enums = _schema$enum === void 0 ? [] : _schema$enum,
    type = schema.type;
  var defaultValue = {
    array: [],
    boolean: false,
    integer: '',
    null: null,
    number: '',
    object: {},
    string: '',
    range: null,
  };

  if (isFunction(def)) {
    return defaultValue[type];
  }

  if (isFunction(enums)) {
    if (type === 'array') {
      return [];
    }

    if (type === 'string' || type === 'number') {
      return '';
    }
  } // 如果设置默认值，优先从默认值中获取

  if (typeof def !== 'undefined') {
    return def;
  } // array且enum的情况，为多选框，默认值[]

  if (type === 'array' && enums.length) {
    return [];
  } // 如果enum是表达式，不处理
  // 如果设置枚举值，其次从枚举值中获取

  if (Array.isArray(enums) && typeof enums[0] !== 'undefined') {
    if (schema.hasOwnProperty('default')) {
      return schema.default; // 就算default: undefined, 也用 undefined, 这样就可以清空了
    }

    return enums[0];
  } // 最后使用对应基础类型的默认值

  return defaultValue[type];
}

function resolve(schema, data) {
  var options =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var type = schema.type,
    properties = schema.properties,
    items = schema.items,
    def = schema.default,
    _schema$required = schema.required,
    required = _schema$required === void 0 ? [] : _schema$required,
    widget = schema['ui:widget'];
  var _options$checkRequire = options.checkRequired,
    checkRequired =
      _options$checkRequire === void 0 ? false : _options$checkRequire;
  var value =
    typeof data === 'undefined' ? getDefaultValue(schema) : clone(data);

  if (type === 'object') {
    // 如果自定义组件
    if (widget) {
      if (def && _typeof(def) === 'object') {
        return def;
      }

      return value;
    }

    var subs = properties || {};
    var ret = {};
    Object.keys(subs).forEach(function(name) {
      var checkAndPass =
        checkRequired && [].concat(required).indexOf(name) !== -1;

      if (!checkRequired || checkAndPass) {
        ret[name] = resolve(subs[name], value[name], options);
      }
    });
    return ret;
  }

  if (type === 'array') {
    // 如果没有value且default有值，用default
    if (def && Array.isArray(def) && !value) {
      return def;
    } // 如果自定义组件

    if (widget) return value;

    var _subs = [].concat(items || []);

    var _ret = [];
    value.forEach &&
      value.forEach(function(item, idx) {
        _ret[idx] = resolve(_subs[idx] || _subs[0], item, options);
      });
    return _ret;
  }

  return value;
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
      return /*#__PURE__*/ React.createElement(
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

function getSubSchemas() {
  var schema =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var properties = schema.properties,
    items = schema.items,
    $parent = _objectWithoutProperties(schema, ['properties', 'items']);

  var type = $parent.type; // no subset

  if (!properties && !items) {
    return [];
  }

  var children = {};

  if (type === 'object') {
    children = properties;
  }

  if (type === 'array') {
    children = [].concat(items);
  }

  return Object.keys(children).map(function(name) {
    return {
      schema: children[name],
      name: name,
      // parent propsSchema
      $parent: $parent,
    };
  });
}

function getBasicProps(settings, materials) {
  var schema = settings.schema,
    _settings$name = settings.name,
    name = _settings$name === void 0 ? '' : _settings$name,
    _settings$$parent = settings.$parent,
    $parent = _settings$$parent === void 0 ? {} : _settings$$parent,
    column = settings.column,
    displayType = settings.displayType,
    showDescIcon = settings.showDescIcon,
    showValidate = settings.showValidate,
    readOnly = settings.readOnly,
    labelWidth = settings.labelWidth,
    useLogger = settings.useLogger,
    formData = settings.formData,
    disabled = settings.disabled,
    isEditing = settings.isEditing; // 写错的时候

  if (!schema) return {}; // 目前做了处理的`uiSchema`参数

  var className = schema['ui:className'],
    _schema$uiOptions = schema['ui:options'],
    options = _schema$uiOptions === void 0 ? {} : _schema$uiOptions,
    hidden = schema['ui:hidden'],
    _disabled = schema['ui:disabled'],
    width = schema['ui:width'],
    _readOnly = schema['ui:readonly'],
    _schema$uiExtraButto = schema['ui:extraButtons'],
    extraButtons = _schema$uiExtraButto === void 0 ? [] : _schema$uiExtraButto,
    dependShow = schema['ui:dependShow'],
    action = schema['ui:action'],
    _labelWidth = schema['ui:labelWidth'],
    _column = schema['ui:column'],
    _displayType = schema['ui:displayType'],
    _showDescIcon = schema['ui:showDescIcon'];
  var _$parent$required = $parent.required,
    required = _$parent$required === void 0 ? [] : _$parent$required;
  var widgets = materials.generated,
    fields = materials.customized; // 标准化属性模型
  // 除了value和onChange为动态值这里不处理
  // true/false的值，服务端可能传了 1/0, 或者"true"

  var hasValue = function hasValue(val) {
    return ['string', 'boolean', 'number'].indexOf(_typeof(val)) > -1;
  }; // 一些从顶层一直传下去的props

  var passDownProps = {
    column: _column || column,
    displayType: _displayType || displayType,
    showDescIcon: hasValue(_showDescIcon) ? _showDescIcon : showDescIcon,
    disabled: hasValue(_disabled) ? _disabled : disabled,
    readOnly: hasValue(_readOnly) ? _readOnly : readOnly,
    // 前者单个ui的，后者全局的
    labelWidth: _labelWidth || labelWidth,
    showValidate: showValidate,
    useLogger: useLogger,
    isEditing: isEditing,
  };

  var basicProps = _objectSpread2(
    _objectSpread2({}, passDownProps),
    {},
    {
      name: name,
      schema: schema,
      options: options,
      // 所有特定组件规则，addable等规则TODO
      hidden: hidden,
      required: required.indexOf(name) !== -1,
      width: width,
      widgets: widgets,
      fields: fields,
      formData: formData,
    }
  ); // 假如有表达式来决定显示的场景，才传入dependShow,formData

  if (dependShow) {
    basicProps = _objectSpread2(
      _objectSpread2({}, basicProps),
      {},
      {
        dependShow: dependShow,
      }
    );
  }

  if (className) {
    basicProps = _objectSpread2(
      _objectSpread2({}, basicProps),
      {},
      {
        className: className,
      }
    );
  }

  if (action) {
    basicProps = _objectSpread2(
      _objectSpread2({}, basicProps),
      {},
      {
        action: action,
      }
    );
  } // 子集的属性

  var subItems = {};
  var subSchemas = getSubSchemas(schema);
  subSchemas.forEach(function(subSchema) {
    var _name = subSchema.name,
      _subSchema$schema = subSchema.schema,
      _schema = _subSchema$schema === void 0 ? {} : _subSchema$schema;

    subItems[_name] = {
      field: getField(_schema, materials),
      props: getBasicProps(
        _objectSpread2(
          _objectSpread2(_objectSpread2({}, subSchema), passDownProps),
          {},
          {
            formData: formData,
          }
        ),
        materials
      ),
    };
  });

  if (['array', 'object'].indexOf(schema.type) >= 0) {
    // 传入name和Field（如果重定义Field的话）及其配置信息（如onChange等）
    basicProps.getSubField = function(o) {
      // getSchemaData(schema)
      var _ref = subItems[o.name] || subItems[0] || {},
        field = _ref.field,
        props = _ref.props,
        c = _ref.column;

      return subFieldGenerator(
        _objectSpread2(
          _objectSpread2({}, field),
          {},
          {
            column: c,
            props: _objectSpread2(
              _objectSpread2({}, props),
              {},
              {
                name: o.name,
                rootValue: o.rootValue,
              }
            ),
          }
        )
      )(o);
    };

    if (schema.type === 'array' && schema.items) {
      // 将数组uiSchema配置里面的抽离出来使用
      basicProps.extraButtons = extraButtons; // 数组新增的默认值

      if (subSchemas && subSchemas[0]) {
        basicProps.newItem = resolve(subSchemas[0].schema);
      }
    }
  }

  return basicProps;
}
/**
 *  schema + materials --> parse --> Field + props
 *  schema {
 *    propsSchema,
 *    uiSchema,
 *    data,
 *    name,
 *  }
 *  materials {
 *    // 根据 Widget 生成的 Field
 *    generated,
 *    // 自定义的 Field
 *    customized,
 *    // 字段 type 与 widgetName 的映射关系
 *    mapping,
 *  }
 */

var parse = function parse() {
  var settings =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var materials = arguments.length > 1 ? arguments[1] : undefined;
  var _settings$schema = settings.schema,
    schema = _settings$schema === void 0 ? {} : _settings$schema;
  return {
    Field: getField(schema, materials).Field,
    props: getBasicProps(settings, materials),
  };
};

function fetcher(Component) {
  return /*#__PURE__*/ (function(_React$Component) {
    _inherits(_class2, _React$Component);

    var _super = _createSuper(_class2);

    function _class2() {
      var _this;

      _classCallCheck(this, _class2);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.state = {
        urlSchema: null,
        loading: false,
      };
      return _this;
    }

    _createClass(_class2, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          var path = this.props.path;

          if (path && typeof path === 'string') {
            this.setState({
              loading: true,
            });
            fetch(path)
              .then(function(res) {
                return res.json();
              })
              .then(function(data) {
                _this2.setState({
                  loading: false,
                  urlSchema: data,
                });
              })
              .catch(function(err) {
                console.error(err);
              });
          }
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this$props = this.props,
            schema = _this$props.schema,
            propsSchema = _this$props.propsSchema,
            uiSchema = _this$props.uiSchema,
            rest = _objectWithoutProperties(_this$props, [
              'schema',
              'propsSchema',
              'uiSchema',
            ]);

          var _this$state = this.state,
            urlSchema = _this$state.urlSchema,
            loading = _this$state.loading;

          if (loading) {
            return 'Loading...';
          }

          if (urlSchema)
            return /*#__PURE__*/ React.createElement(
              Component,
              _extends({}, urlSchema, rest)
            );
          return /*#__PURE__*/ React.createElement(Component, this.props);
        },
      },
    ]);

    return _class2;
  })(React.Component);
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z =
  '.fr-wrapper {\n  /* Resets */\n  /*\n    This will set table to full width and then\n    all cells will be equal width\n  */\n  /* 1. Fix for Chrome 44 bug.\n    * https://code.google.com/p/chromium/issues/detail?id=506893 */\n  /* Height Percentages - Based off of height of parent */\n  /* Screen Height Percentage */\n  /* String Properties */\n  /* Max Width Percentages */\n  /* Max Width Scale */\n  /* Max Width String Properties */\n}\n.fr-wrapper .outline {\n  outline: 1px solid;\n}\n.fr-wrapper .outline-transparent {\n  outline: 1px solid transparent;\n}\n.fr-wrapper .outline-0 {\n  outline: 0;\n}\n.fr-wrapper .ba {\n  border-style: solid;\n  border-width: 1px;\n}\n.fr-wrapper .bt {\n  border-top-style: solid;\n  border-top-width: 1px;\n}\n.fr-wrapper .br {\n  border-right-style: solid;\n  border-right-width: 1px;\n}\n.fr-wrapper .bb {\n  border-bottom-style: solid;\n  border-bottom-width: 1px;\n}\n.fr-wrapper .bl {\n  border-left-style: solid;\n  border-left-width: 1px;\n}\n.fr-wrapper .bn {\n  border-style: none;\n  border-width: 0;\n}\n.fr-wrapper .br0 {\n  border-radius: 0;\n}\n.fr-wrapper .br1 {\n  border-radius: 0.125rem;\n}\n.fr-wrapper .br2 {\n  border-radius: 0.25rem;\n}\n.fr-wrapper .br3 {\n  border-radius: 0.5rem;\n}\n.fr-wrapper .br4 {\n  border-radius: 1rem;\n}\n.fr-wrapper .br-100 {\n  border-radius: 100%;\n}\n.fr-wrapper .br-pill {\n  border-radius: 9999px;\n}\n.fr-wrapper .br--bottom {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.fr-wrapper .br--top {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.fr-wrapper .br--right {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.fr-wrapper .br--left {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.fr-wrapper .b--dotted {\n  border-style: dotted;\n}\n.fr-wrapper .b--dashed {\n  border-style: dashed;\n}\n.fr-wrapper .b--solid {\n  border-style: solid;\n}\n.fr-wrapper .b--none {\n  border-style: none;\n}\n.fr-wrapper .b--black-10 {\n  border-color: rgba(0, 0, 0, 0.1);\n}\n.fr-wrapper .b--black-20 {\n  border-color: rgba(0, 0, 0, 0.2);\n}\n.fr-wrapper .b--black-30 {\n  border-color: rgba(0, 0, 0, 0.3);\n}\n.fr-wrapper .bw0 {\n  border-width: 0;\n}\n.fr-wrapper .bw1 {\n  border-width: 0.125rem;\n}\n.fr-wrapper .bw2 {\n  border-width: 0.25rem;\n}\n.fr-wrapper .bw3 {\n  border-width: 0.5rem;\n}\n.fr-wrapper .bw4 {\n  border-width: 1rem;\n}\n.fr-wrapper .bw5 {\n  border-width: 2rem;\n}\n.fr-wrapper .bt-0 {\n  border-top-width: 0;\n}\n.fr-wrapper .br-0 {\n  border-right-width: 0;\n}\n.fr-wrapper .bb-0 {\n  border-bottom-width: 0;\n}\n.fr-wrapper .bl-0 {\n  border-left-width: 0;\n}\n.fr-wrapper .shadow-1 {\n  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);\n}\n.fr-wrapper .shadow-2 {\n  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);\n}\n.fr-wrapper .shadow-3 {\n  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);\n}\n.fr-wrapper .shadow-4 {\n  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.2);\n}\n.fr-wrapper .shadow-5 {\n  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2);\n}\n.fr-wrapper .top-0 {\n  top: 0;\n}\n.fr-wrapper .right-0 {\n  right: 0;\n}\n.fr-wrapper .bottom-0 {\n  bottom: 0;\n}\n.fr-wrapper .left-0 {\n  left: 0;\n}\n.fr-wrapper .top-1 {\n  top: 1rem;\n}\n.fr-wrapper .right-1 {\n  right: 1rem;\n}\n.fr-wrapper .bottom-1 {\n  bottom: 1rem;\n}\n.fr-wrapper .left-1 {\n  left: 1rem;\n}\n.fr-wrapper .top-2 {\n  top: 2rem;\n}\n.fr-wrapper .right-2 {\n  right: 2rem;\n}\n.fr-wrapper .bottom-2 {\n  bottom: 2rem;\n}\n.fr-wrapper .left-2 {\n  left: 2rem;\n}\n.fr-wrapper .top--1 {\n  top: -1rem;\n}\n.fr-wrapper .right--1 {\n  right: -1rem;\n}\n.fr-wrapper .bottom--1 {\n  bottom: -1rem;\n}\n.fr-wrapper .left--1 {\n  left: -1rem;\n}\n.fr-wrapper .top--2 {\n  top: -2rem;\n}\n.fr-wrapper .right--2 {\n  right: -2rem;\n}\n.fr-wrapper .bottom--2 {\n  bottom: -2rem;\n}\n.fr-wrapper .left--2 {\n  left: -2rem;\n}\n.fr-wrapper .absolute--fill {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.fr-wrapper .dn {\n  display: none;\n}\n.fr-wrapper .di {\n  display: inline;\n}\n.fr-wrapper .db {\n  display: block;\n}\n.fr-wrapper .dib {\n  display: inline-block;\n}\n.fr-wrapper .dit {\n  display: inline-table;\n}\n.fr-wrapper .dt {\n  display: table;\n}\n.fr-wrapper .dtc {\n  display: table-cell;\n}\n.fr-wrapper .dt-row {\n  display: table-row;\n}\n.fr-wrapper .dt-row-group {\n  display: table-row-group;\n}\n.fr-wrapper .dt-column {\n  display: table-column;\n}\n.fr-wrapper .dt-column-group {\n  display: table-column-group;\n}\n.fr-wrapper .dt--fixed {\n  table-layout: fixed;\n  width: 100%;\n}\n.fr-wrapper .flex {\n  display: flex;\n}\n.fr-wrapper .inline-flex {\n  display: inline-flex;\n}\n.fr-wrapper .flex-auto {\n  flex: 1 1 auto;\n  min-width: 0;\n  /* 1 */\n  min-height: 0;\n  /* 1 */\n}\n.fr-wrapper .flex-none {\n  flex: none;\n}\n.fr-wrapper .flex-column {\n  flex-direction: column;\n}\n.fr-wrapper .flex-row {\n  flex-direction: row;\n}\n.fr-wrapper .flex-wrap {\n  flex-wrap: wrap;\n}\n.fr-wrapper .flex-nowrap {\n  flex-wrap: nowrap;\n}\n.fr-wrapper .flex-wrap-reverse {\n  flex-wrap: wrap-reverse;\n}\n.fr-wrapper .flex-column-reverse {\n  flex-direction: column-reverse;\n}\n.fr-wrapper .flex-row-reverse {\n  flex-direction: row-reverse;\n}\n.fr-wrapper .items-start {\n  align-items: flex-start;\n}\n.fr-wrapper .items-end {\n  align-items: flex-end;\n}\n.fr-wrapper .items-center {\n  align-items: center;\n}\n.fr-wrapper .items-baseline {\n  align-items: baseline;\n}\n.fr-wrapper .items-stretch {\n  align-items: stretch;\n}\n.fr-wrapper .self-start {\n  align-self: flex-start;\n}\n.fr-wrapper .self-end {\n  align-self: flex-end;\n}\n.fr-wrapper .self-center {\n  align-self: center;\n}\n.fr-wrapper .self-baseline {\n  align-self: baseline;\n}\n.fr-wrapper .self-stretch {\n  align-self: stretch;\n}\n.fr-wrapper .justify-start {\n  justify-content: flex-start;\n}\n.fr-wrapper .justify-end {\n  justify-content: flex-end;\n}\n.fr-wrapper .justify-center {\n  justify-content: center;\n}\n.fr-wrapper .justify-between {\n  justify-content: space-between;\n}\n.fr-wrapper .justify-around {\n  justify-content: space-around;\n}\n.fr-wrapper .content-start {\n  align-content: flex-start;\n}\n.fr-wrapper .content-end {\n  align-content: flex-end;\n}\n.fr-wrapper .content-center {\n  align-content: center;\n}\n.fr-wrapper .content-between {\n  align-content: space-between;\n}\n.fr-wrapper .content-around {\n  align-content: space-around;\n}\n.fr-wrapper .content-stretch {\n  align-content: stretch;\n}\n.fr-wrapper .order-0 {\n  order: 0;\n}\n.fr-wrapper .order-1 {\n  order: 1;\n}\n.fr-wrapper .order-2 {\n  order: 2;\n}\n.fr-wrapper .order-3 {\n  order: 3;\n}\n.fr-wrapper .order-4 {\n  order: 4;\n}\n.fr-wrapper .order-5 {\n  order: 5;\n}\n.fr-wrapper .order-6 {\n  order: 6;\n}\n.fr-wrapper .order-7 {\n  order: 7;\n}\n.fr-wrapper .order-8 {\n  order: 8;\n}\n.fr-wrapper .order-last {\n  order: 99999;\n}\n.fr-wrapper .flex-grow-0 {\n  flex-grow: 0;\n}\n.fr-wrapper .flex-grow-1 {\n  flex-grow: 1;\n}\n.fr-wrapper .flex-shrink-0 {\n  flex-shrink: 0;\n}\n.fr-wrapper .flex-shrink-1 {\n  flex-shrink: 1;\n}\n.fr-wrapper .fw1 {\n  font-weight: 100;\n}\n.fr-wrapper .fw2 {\n  font-weight: 200;\n}\n.fr-wrapper .fw3 {\n  font-weight: 300;\n}\n.fr-wrapper .fw4 {\n  font-weight: 400;\n}\n.fr-wrapper .fw5 {\n  font-weight: 500;\n}\n.fr-wrapper .fw6 {\n  font-weight: 600;\n}\n.fr-wrapper .fw7 {\n  font-weight: 700;\n}\n.fr-wrapper .fw8 {\n  font-weight: 800;\n}\n.fr-wrapper .fw9 {\n  font-weight: 900;\n}\n.fr-wrapper .h1 {\n  height: 1rem;\n}\n.fr-wrapper .h2 {\n  height: 2rem;\n}\n.fr-wrapper .h3 {\n  height: 4rem;\n}\n.fr-wrapper .h4 {\n  height: 8rem;\n}\n.fr-wrapper .h5 {\n  height: 16rem;\n}\n.fr-wrapper .h-25 {\n  height: 25%;\n}\n.fr-wrapper .h-50 {\n  height: 50%;\n}\n.fr-wrapper .h-75 {\n  height: 75%;\n}\n.fr-wrapper .h-100 {\n  height: 100%;\n}\n.fr-wrapper .min-h-100 {\n  min-height: 100%;\n}\n.fr-wrapper .vh-25 {\n  height: 25vh;\n}\n.fr-wrapper .vh-50 {\n  height: 50vh;\n}\n.fr-wrapper .vh-75 {\n  height: 75vh;\n}\n.fr-wrapper .vh-100 {\n  height: 100vh;\n}\n.fr-wrapper .min-vh-100 {\n  min-height: 100vh;\n}\n.fr-wrapper .h-auto {\n  height: auto;\n}\n.fr-wrapper .h-inherit {\n  height: inherit;\n}\n.fr-wrapper .tracked {\n  letter-spacing: 0.1em;\n}\n.fr-wrapper .tracked-tight {\n  letter-spacing: -0.05em;\n}\n.fr-wrapper .tracked-mega {\n  letter-spacing: 0.25em;\n}\n.fr-wrapper .lh-solid {\n  line-height: 1;\n}\n.fr-wrapper .lh-title {\n  line-height: 1.25;\n}\n.fr-wrapper .lh-copy {\n  line-height: 1.5;\n}\n.fr-wrapper .mw-100 {\n  max-width: 100%;\n}\n.fr-wrapper .mw1 {\n  max-width: 1rem;\n}\n.fr-wrapper .mw2 {\n  max-width: 2rem;\n}\n.fr-wrapper .mw3 {\n  max-width: 4rem;\n}\n.fr-wrapper .mw4 {\n  max-width: 8rem;\n}\n.fr-wrapper .mw5 {\n  max-width: 16rem;\n}\n.fr-wrapper .mw6 {\n  max-width: 32rem;\n}\n.fr-wrapper .mw7 {\n  max-width: 48rem;\n}\n.fr-wrapper .mw8 {\n  max-width: 64rem;\n}\n.fr-wrapper .mw9 {\n  max-width: 96rem;\n}\n.fr-wrapper .mw-none {\n  max-width: none;\n}\n.fr-wrapper .w1 {\n  width: 1rem;\n}\n.fr-wrapper .w2 {\n  width: 2rem;\n}\n.fr-wrapper .w3 {\n  width: 4rem;\n}\n.fr-wrapper .w4 {\n  width: 8rem;\n}\n.fr-wrapper .w5 {\n  width: 16rem;\n}\n.fr-wrapper .w-10 {\n  width: 10%;\n}\n.fr-wrapper .w-20 {\n  width: 20%;\n}\n.fr-wrapper .w-25 {\n  width: 25%;\n}\n.fr-wrapper .w-30 {\n  width: 30%;\n}\n.fr-wrapper .w-33 {\n  width: 33%;\n}\n.fr-wrapper .w-34 {\n  width: 34%;\n}\n.fr-wrapper .w-40 {\n  width: 40%;\n}\n.fr-wrapper .w-50 {\n  width: 50%;\n}\n.fr-wrapper .w-60 {\n  width: 60%;\n}\n.fr-wrapper .w-70 {\n  width: 70%;\n}\n.fr-wrapper .w-75 {\n  width: 75%;\n}\n.fr-wrapper .w-80 {\n  width: 80%;\n}\n.fr-wrapper .w-90 {\n  width: 90%;\n}\n.fr-wrapper .w-100 {\n  width: 100%;\n}\n.fr-wrapper .w-third {\n  width: calc(100% / 3);\n}\n.fr-wrapper .w-two-thirds {\n  width: calc(100% / 1.5);\n}\n.fr-wrapper .w-auto {\n  width: auto;\n}\n.fr-wrapper .tl {\n  text-align: left;\n}\n.fr-wrapper .tr {\n  text-align: right;\n}\n.fr-wrapper .tc {\n  text-align: center;\n}\n.fr-wrapper .tj {\n  text-align: justify;\n}\n.fr-wrapper .overflow-visible {\n  overflow: visible;\n}\n.fr-wrapper .overflow-hidden {\n  overflow: hidden;\n}\n.fr-wrapper .overflow-scroll {\n  overflow: scroll;\n}\n.fr-wrapper .overflow-auto {\n  overflow: auto;\n}\n.fr-wrapper .overflow-x-visible {\n  overflow-x: visible;\n}\n.fr-wrapper .overflow-x-hidden {\n  overflow-x: hidden;\n}\n.fr-wrapper .overflow-x-scroll {\n  overflow-x: scroll;\n}\n.fr-wrapper .overflow-x-auto {\n  overflow-x: auto;\n}\n.fr-wrapper .overflow-y-visible {\n  overflow-y: visible;\n}\n.fr-wrapper .overflow-y-hidden {\n  overflow-y: hidden;\n}\n.fr-wrapper .overflow-y-scroll {\n  overflow-y: scroll;\n}\n.fr-wrapper .overflow-y-auto {\n  overflow-y: auto;\n}\n.fr-wrapper .static {\n  position: static;\n}\n.fr-wrapper .relative {\n  position: relative;\n}\n.fr-wrapper .absolute {\n  position: absolute;\n}\n.fr-wrapper .fixed {\n  position: fixed;\n}\n.fr-wrapper .o-100 {\n  opacity: 1;\n}\n.fr-wrapper .o-90 {\n  opacity: 0.9;\n}\n.fr-wrapper .o-80 {\n  opacity: 0.8;\n}\n.fr-wrapper .o-70 {\n  opacity: 0.7;\n}\n.fr-wrapper .o-60 {\n  opacity: 0.6;\n}\n.fr-wrapper .o-50 {\n  opacity: 0.5;\n}\n.fr-wrapper .o-40 {\n  opacity: 0.4;\n}\n.fr-wrapper .o-30 {\n  opacity: 0.3;\n}\n.fr-wrapper .o-20 {\n  opacity: 0.2;\n}\n.fr-wrapper .o-10 {\n  opacity: 0.1;\n}\n.fr-wrapper .o-05 {\n  opacity: 0.05;\n}\n.fr-wrapper .o-025 {\n  opacity: 0.025;\n}\n.fr-wrapper .o-0 {\n  opacity: 0;\n}\n.fr-wrapper .pa0 {\n  padding: 0;\n}\n.fr-wrapper .pa1 {\n  padding: 0.25rem;\n}\n.fr-wrapper .pa2 {\n  padding: 0.5rem;\n}\n.fr-wrapper .pa3 {\n  padding: 1rem;\n}\n.fr-wrapper .pa4 {\n  padding: 2rem;\n}\n.fr-wrapper .pa5 {\n  padding: 4rem;\n}\n.fr-wrapper .pa6 {\n  padding: 8rem;\n}\n.fr-wrapper .pa7 {\n  padding: 16rem;\n}\n.fr-wrapper .pl0 {\n  padding-left: 0;\n}\n.fr-wrapper .pl1 {\n  padding-left: 0.25rem;\n}\n.fr-wrapper .pl2 {\n  padding-left: 0.5rem;\n}\n.fr-wrapper .pl3 {\n  padding-left: 1rem;\n}\n.fr-wrapper .pl4 {\n  padding-left: 2rem;\n}\n.fr-wrapper .pl5 {\n  padding-left: 4rem;\n}\n.fr-wrapper .pl6 {\n  padding-left: 8rem;\n}\n.fr-wrapper .pl7 {\n  padding-left: 16rem;\n}\n.fr-wrapper .pr0 {\n  padding-right: 0;\n}\n.fr-wrapper .pr1 {\n  padding-right: 0.25rem;\n}\n.fr-wrapper .pr2 {\n  padding-right: 0.5rem;\n}\n.fr-wrapper .pr3 {\n  padding-right: 1rem;\n}\n.fr-wrapper .pr4 {\n  padding-right: 2rem;\n}\n.fr-wrapper .pr5 {\n  padding-right: 4rem;\n}\n.fr-wrapper .pr6 {\n  padding-right: 8rem;\n}\n.fr-wrapper .pr7 {\n  padding-right: 16rem;\n}\n.fr-wrapper .pb0 {\n  padding-bottom: 0;\n}\n.fr-wrapper .pb1 {\n  padding-bottom: 0.25rem;\n}\n.fr-wrapper .pb2 {\n  padding-bottom: 0.5rem;\n}\n.fr-wrapper .pb3 {\n  padding-bottom: 1rem;\n}\n.fr-wrapper .pb4 {\n  padding-bottom: 2rem;\n}\n.fr-wrapper .pb5 {\n  padding-bottom: 4rem;\n}\n.fr-wrapper .pb6 {\n  padding-bottom: 8rem;\n}\n.fr-wrapper .pb7 {\n  padding-bottom: 16rem;\n}\n.fr-wrapper .pt0 {\n  padding-top: 0;\n}\n.fr-wrapper .pt1 {\n  padding-top: 0.25rem;\n}\n.fr-wrapper .pt2 {\n  padding-top: 0.5rem;\n}\n.fr-wrapper .pt3 {\n  padding-top: 1rem;\n}\n.fr-wrapper .pt4 {\n  padding-top: 2rem;\n}\n.fr-wrapper .pt5 {\n  padding-top: 4rem;\n}\n.fr-wrapper .pt6 {\n  padding-top: 8rem;\n}\n.fr-wrapper .pt7 {\n  padding-top: 16rem;\n}\n.fr-wrapper .pv0 {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.fr-wrapper .pv1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.fr-wrapper .pv2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.fr-wrapper .pv3 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n.fr-wrapper .pv4 {\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n.fr-wrapper .pv5 {\n  padding-top: 4rem;\n  padding-bottom: 4rem;\n}\n.fr-wrapper .pv6 {\n  padding-top: 8rem;\n  padding-bottom: 8rem;\n}\n.fr-wrapper .pv7 {\n  padding-top: 16rem;\n  padding-bottom: 16rem;\n}\n.fr-wrapper .ph0 {\n  padding-left: 0;\n  padding-right: 0;\n}\n.fr-wrapper .ph1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n.fr-wrapper .ph2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.fr-wrapper .ph3 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.fr-wrapper .ph4 {\n  padding-left: 2rem;\n  padding-right: 2rem;\n}\n.fr-wrapper .ph5 {\n  padding-left: 4rem;\n  padding-right: 4rem;\n}\n.fr-wrapper .ph6 {\n  padding-left: 8rem;\n  padding-right: 8rem;\n}\n.fr-wrapper .ph7 {\n  padding-left: 16rem;\n  padding-right: 16rem;\n}\n.fr-wrapper .ma1 {\n  margin: 0.25rem;\n}\n.fr-wrapper .ma2 {\n  margin: 0.5rem;\n}\n.fr-wrapper .ma3 {\n  margin: 1rem;\n}\n.fr-wrapper .ma4 {\n  margin: 2rem;\n}\n.fr-wrapper .ma5 {\n  margin: 4rem;\n}\n.fr-wrapper .ma6 {\n  margin: 8rem;\n}\n.fr-wrapper .ma7 {\n  margin: 16rem;\n}\n.fr-wrapper .ma0 {\n  margin: 0;\n}\n.fr-wrapper .ml1 {\n  margin-left: 0.25rem;\n}\n.fr-wrapper .ml2 {\n  margin-left: 0.5rem;\n}\n.fr-wrapper .ml3 {\n  margin-left: 1rem;\n}\n.fr-wrapper .ml4 {\n  margin-left: 2rem;\n}\n.fr-wrapper .ml5 {\n  margin-left: 4rem;\n}\n.fr-wrapper .ml6 {\n  margin-left: 8rem;\n}\n.fr-wrapper .ml7 {\n  margin-left: 16rem;\n}\n.fr-wrapper .ml0 {\n  margin-left: 0;\n}\n.fr-wrapper .mr1 {\n  margin-right: 0.25rem;\n}\n.fr-wrapper .mr2 {\n  margin-right: 0.5rem;\n}\n.fr-wrapper .mr3 {\n  margin-right: 1rem;\n}\n.fr-wrapper .mr4 {\n  margin-right: 2rem;\n}\n.fr-wrapper .mr5 {\n  margin-right: 4rem;\n}\n.fr-wrapper .mr6 {\n  margin-right: 8rem;\n}\n.fr-wrapper .mr7 {\n  margin-right: 16rem;\n}\n.fr-wrapper .mr0 {\n  margin-right: 0;\n}\n.fr-wrapper .mb1 {\n  margin-bottom: 0.25rem;\n}\n.fr-wrapper .mb2 {\n  margin-bottom: 0.5rem;\n}\n.fr-wrapper .mb3 {\n  margin-bottom: 1rem;\n}\n.fr-wrapper .mb4 {\n  margin-bottom: 2rem;\n}\n.fr-wrapper .mb5 {\n  margin-bottom: 4rem;\n}\n.fr-wrapper .mb6 {\n  margin-bottom: 8rem;\n}\n.fr-wrapper .mb7 {\n  margin-bottom: 16rem;\n}\n.fr-wrapper .mb0 {\n  margin-bottom: 0;\n}\n.fr-wrapper .mt1 {\n  margin-top: 0.25rem;\n}\n.fr-wrapper .mt2 {\n  margin-top: 0.5rem;\n}\n.fr-wrapper .mt3 {\n  margin-top: 1rem;\n}\n.fr-wrapper .mt4 {\n  margin-top: 2rem;\n}\n.fr-wrapper .mt5 {\n  margin-top: 4rem;\n}\n.fr-wrapper .mt6 {\n  margin-top: 8rem;\n}\n.fr-wrapper .mt7 {\n  margin-top: 16rem;\n}\n.fr-wrapper .mt0 {\n  margin-top: 0;\n}\n.fr-wrapper .mv1 {\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n.fr-wrapper .mv2 {\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.fr-wrapper .mv3 {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n.fr-wrapper .mv4 {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n}\n.fr-wrapper .mv5 {\n  margin-top: 4rem;\n  margin-bottom: 4rem;\n}\n.fr-wrapper .mv6 {\n  margin-top: 8rem;\n  margin-bottom: 8rem;\n}\n.fr-wrapper .mv7 {\n  margin-top: 16rem;\n  margin-bottom: 16rem;\n}\n.fr-wrapper .mv0 {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.fr-wrapper .mh1 {\n  margin-left: 0.25rem;\n  margin-right: 0.25rem;\n}\n.fr-wrapper .mh2 {\n  margin-left: 0.5rem;\n  margin-right: 0.5rem;\n}\n.fr-wrapper .mh3 {\n  margin-left: 1rem;\n  margin-right: 1rem;\n}\n.fr-wrapper .mh4 {\n  margin-left: 2rem;\n  margin-right: 2rem;\n}\n.fr-wrapper .mh5 {\n  margin-left: 4rem;\n  margin-right: 4rem;\n}\n.fr-wrapper .mh6 {\n  margin-left: 8rem;\n  margin-right: 8rem;\n}\n.fr-wrapper .mh7 {\n  margin-left: 16rem;\n  margin-right: 16rem;\n}\n.fr-wrapper .mh0 {\n  margin-left: 0;\n  margin-right: 0;\n}\n.fr-wrapper .debug * {\n  outline: 1px solid gold;\n}\n.fr-wrapper .debug-white * {\n  outline: 1px solid white;\n}\n.fr-wrapper .debug-black * {\n  outline: 1px solid black;\n}\n.fr-wrapper .debug-grid {\n  background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFElEQVR4AWPAC97/9x0eCsAEPgwAVLshdpENIxcAAAAASUVORK5CYII= ) repeat top left;\n}\n.fr-wrapper .truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.fr-wrapper .bg-white {\n  background-color: #fff;\n}\n.fr-wrapper .pointer:hover {\n  cursor: pointer;\n}\n.fr-wrapper .link {\n  color: #1890ff;\n  font-size: 14px;\n}\n.fr-wrapper .link:hover {\n  color: #40a9ff;\n  font-size: 14px;\n}\n';
styleInject(css_248z);

var css_248z$1 =
  "/*\n  用于原有样式的覆盖\n */\n.fr-wrapper {\n  /* Row */\n  /* 自定义类 */\n  /* 组件内部样式*/\n  /* 其他样式 */\n}\n.fr-wrapper .fr-set {\n  padding: 12px 12px 0;\n  margin-bottom: 12px;\n  border-radius: 4px;\n}\n.fr-wrapper .fr-field {\n  margin-bottom: 24px;\n}\n.fr-wrapper .fr-field-object {\n  margin-bottom: 0;\n}\n.fr-wrapper .fr-label {\n  display: block;\n}\n.fr-wrapper .fr-label-title {\n  display: inline-flex;\n  color: #333;\n  font-size: 14px;\n  min-height: 22px;\n  /* \"\"的标签页占位 */\n  line-height: 22px;\n}\n.fr-wrapper .fr-label-required {\n  margin: 1px 4px 0 0;\n  color: #f5222d;\n  font-size: 14px;\n  font-family: SimSun, sans-serif;\n}\n.fr-wrapper .fr-label-title::after {\n  content: ':';\n  position: relative;\n  top: -0.5px;\n  margin: 0 10px 0 2px;\n}\n.fr-wrapper .fr-label-title.no-colon::after {\n  content: '';\n  margin: 0;\n}\n.fr-wrapper .fr-label-object .fr-label-title {\n  font-size: 16px;\n  color: #222;\n}\n.fr-wrapper .fr-label-array .fr-label-title {\n  font-size: 16px;\n  color: #222;\n}\n.fr-wrapper .fr-desc {\n  font-size: 12px;\n  word-break: break-all;\n  color: #888;\n}\n.fr-wrapper .fr-validate {\n  margin-left: 12px;\n  font-size: 12px;\n  word-break: break-all;\n  color: #f5222d;\n}\n.fr-wrapper .fr-field.fr-field-complex {\n  margin-bottom: 0;\n}\n.fr-wrapper .fr-validate-row {\n  margin: 3px 0 0 0;\n}\n.fr-wrapper .fr-label-row {\n  text-align: right;\n  flex-shrink: 0;\n  margin-top: 5px;\n}\n.fr-wrapper .fr-children {\n  display: flex;\n  min-height: 30px;\n}\n.fr-wrapper .fr-field-row .fr-content {\n  flex: 1;\n  position: relative;\n}\n.fr-wrapper .fr-field-row .fr-tooltip-icon {\n  margin: 3px 2px 0 0;\n}\n.fr-wrapper .hover-b--black-20:hover {\n  border-color: rgba(0, 0, 0, 0.3);\n}\n.fr-wrapper .pt44 {\n  padding-top: 46px;\n}\n.fr-wrapper .pv12 {\n  padding-top: 12px;\n  padding-bottom: 12px;\n}\n.fr-wrapper .fr-item-actions {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding-right: 8px;\n  height: 28px;\n  font-size: 18px;\n  display: flex;\n  opacity: 0;\n}\n.fr-wrapper .fr-set:hover .fr-item-actions {\n  opacity: 1;\n}\n.fr-wrapper .fr-item-action-icon {\n  display: flex;\n  align-items: center;\n  width: 20px;\n  margin-left: 8px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.fr-wrapper .fr-move-icon:hover {\n  cursor: move;\n}\n.fr-wrapper .fr-color-picker {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  color: #666;\n}\n.fr-wrapper .fr-color-picker .rc-color-picker-trigger {\n  margin-right: 12px;\n  height: 30px;\n  width: 60px;\n  border: 1px solid #e5e5e5;\n}\n.fr-wrapper .fr-color-picker > p {\n  margin: 0;\n  font-size: 14px;\n  line-height: 28px;\n}\n.fr-wrapper .fr-color-picker .rc-color-picker-wrap {\n  display: flex;\n}\n.fr-wrapper .next-input,\n.fr-wrapper .next-number-picker {\n  width: 100%;\n}\n.fr-wrapper .upload-img {\n  max-width: 200px;\n  max-height: 200px;\n  margin-right: 24px;\n}\n.fr-wrapper .fr-preview-image {\n  width: 160px;\n}\n.fr-wrapper .fr-preview {\n  position: relative;\n  cursor: pointer;\n}\n.fr-wrapper .fr-upload-mod,\n.fr-wrapper .fr-upload-file {\n  display: flex;\n}\n.fr-wrapper .fr-upload-mod {\n  align-items: center;\n}\n.fr-wrapper .fr-upload-mod .fr-upload-preview {\n  margin: 0 12px;\n}\n.fr-wrapper .fr-upload-file .ant-upload-list-item {\n  margin: 5px 0 0 8px;\n}\n.fr-wrapper .fr-upload-file .ant-upload-list-item-name {\n  margin-right: 6px;\n}\n.fr-wrapper .fr-upload-file .ant-upload-list-item-info {\n  cursor: pointer;\n}\n.fr-wrapper .fr-upload-file .next-upload-list-text .next-upload-list-item-done,\n.fr-wrapper .fr-upload-file .next-upload-list-text .next-upload-list-item .next-icon {\n  height: 28px;\n  line-height: 28px;\n  margin-left: 12px;\n}\n.fr-wrapper .fr-upload-file .next-upload-list-item-name-wrap {\n  margin-top: -4px;\n}\n.fr-wrapper .fr-sort-help-class {\n  background: #fff;\n}\n.fr-wrapper .fold-icon.fold-icon-active {\n  transform: rotate(0deg);\n}\n.fr-wrapper .fold-icon {\n  transform: rotate(-90deg);\n  transition: transform 0.24s;\n  cursor: pointer;\n  position: relative;\n}\n.fr-wrapper .fold-icon::after {\n  content: '';\n  position: absolute;\n  top: -20px;\n  right: -10px;\n  bottom: -5px;\n  left: -20px;\n}\n.fr-wrapper .fr-tooltip-toggle {\n  cursor: pointer;\n  position: relative;\n}\n.fr-wrapper .fr-tooltip-toggle:hover .fr-tooltip-container {\n  opacity: 1;\n  visibility: visible;\n}\n.fr-wrapper .fr-tooltip-icon {\n  height: 14px;\n  width: 14px;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEDklEQVR42u2bPUscURSG5y8kBEMgkCD5gFRpQtogduqqK1vZJVnxowssNoH4C7JVUrilxELYTtBOCLKksBGb2PkLtFLL5DywgUXO2buj587sTPbCwXFn7jnve2buzJl730lit/n5+bG5ubkVsaZsb8nfffl7JHYmdomxzW/s4xiOpQ99kyK2arX6RMDXxfbE/tzR8FHHZxGIfxSwuwCPZLvEGDriAqwqdgDIjIxY1dyJyzh9J0DagMrJ2mDI41J/LMFbacBKn+Mu4G+y/bk7XKYxtvmNfRzDsSkT0QJTVpd7Tex0AFBXkBGrC7GnaePQh774wNcA8cBUi03+6wBAfvMIm5mZeeAVF1/4xHcoPhhjke8EAp8LyI2pqal7SaSGb2IQK4Cl40s+PL6/VyqVl0lGjVjEDOHyutP/CARaT3JqxO6HDex3DbAYOPOrSc4NDIETtHgrx7Ozs28D5N8kQ9LA0g8rXFI5rNVq98XpL9+xFb9ZeOECpzSOWn2cjQ9rAsDWr1hKUd6a5Ccdy+jX4vM9xrZjEiYt/AOVzVReRuclR5AV8XnR4/+C3xyTu2S9OwTf6qznvPNYPVTiHHrGsOqEvm+RxivtuWORw9PllXWJss+zWDIqxgNzMsO49L94V3FWAryrScpmLQ5ctYP3tRebGLU9839KrKMY7w7aCxRcb56VZ8bZX4n4zN7pibUTKw4cNG5w7gXTUA66loMeJhEbYx6LGQMOcFH4NXqz9FObjU1K0rTZaTj/u/k94gc1QyVpcNE4wp2da9rOhYWF52VJAFw0jnDn8m8qO04yOCuf5AzsY2xnEO9EGQZNdmxpJWNkMMtKzGX3QOESf0t9/jM9HRnMtgJmO2ZMOGn1gFqUMEdPp2xqgPi1AA1OavHFyqxWKpYqAXapfwaYS2XHdNkSACcl5uUoAaMh8L/fBK3HYLkSYD8GzUKoPAkIF0JNbS2/hEPgWCuFzQkD1ufLkgC4mBM+SNH4R7F6WRIAF4PjmDVhgLVLkQB7/O+FMnSFMqPoCYADXPpe4YgQrTFS8ASY9zg43wS1a02LFzMB9rQ4XNMsjGzknwD/hRHHpTH/BMRfGst/cXRTibOZ3+Jo+JGBrTsmYELxP5GBeKp9V4HEqiPIF+LvA8Z2FqIpuDlIZBRxVDHEUq20YujTsoik4AKn1KLogExuvCDiKKzmII72Fk3FF0VhcHATSXuJp9zFULZ1RmJpWkai6XP0RPnK5cMiaWfxtP3BhKe6BF/KBxNe4uj0ImpFR6zZdXeipXEbrQF96IsPfIXigQlsznRtMbVZLNl2MuhHUxyb0ncLTKPP5kYfTg7Bp7Oq4NLJ8E2MZAibJrxsIEVzII2PBj6TIrauDG8t7efz9KFvbHx/AcNTQFg55SpYAAAAAElFTkSuQmCC');\n  background-size: cover;\n  display: block;\n  margin: 4px 0 0 4px;\n}\n.fr-wrapper .fr-tooltip-container {\n  position: absolute;\n  width: 160px;\n  left: 50%;\n  white-space: initial !important;\n  bottom: 30px;\n  text-align: center;\n  background: #2b222a;\n  padding: 4px;\n  margin-left: -78px;\n  border-radius: 4px;\n  color: #efefef;\n  font-size: 13px;\n  cursor: auto;\n  z-index: 99999;\n  transition: all 0.5s ease;\n  opacity: 0;\n  visibility: hidden;\n  word-wrap: break-word;\n}\n.fr-wrapper .fr-tooltip-triangle {\n  position: absolute;\n  left: 50%;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 5px solid #2b222a;\n  transition: all 0.5s ease;\n  content: ' ';\n  font-size: 0;\n  line-height: 0;\n  margin-left: -5px;\n  width: 0;\n  bottom: -5px;\n}\n.fr-wrapper .fr-tooltip-toggle::before,\n.fr-wrapper .fr-tooltip-toggle::after {\n  color: #efefef;\n  font-size: 13px;\n  opacity: 0;\n  pointer-events: none;\n  text-align: center;\n}\n.fr-wrapper .fr-tooltip-toggle:focus::before,\n.fr-wrapper .fr-tooltip-toggle:focus::after,\n.fr-wrapper .fr-tooltip-toggle:hover::before,\n.fr-wrapper .fr-tooltip-toggle:hover::after {\n  opacity: 1;\n  transition: all 0.75s ease;\n}\n.fr-wrapper .fr-slider {\n  display: flex;\n  width: 100%;\n  align-items: center;\n}\n.fr-wrapper .fr-map {\n  display: flex;\n  flex-wrap: wrap;\n}\n/* 覆盖 antd 的样式 */\n.fr-wrapper .ant-checkbox-wrapper + .ant-checkbox-wrapper {\n  margin-left: 0;\n}\n.fr-wrapper .ant-checkbox-wrapper {\n  margin-right: 8px;\n}\n.fr-wrapper .next-checkbox-wrapper + .next-checkbox-wrapper {\n  margin-left: 0;\n}\n.fr-wrapper .next-checkbox-wrapper {\n  margin: 4px 8px 4px 0;\n}\n";
styleInject(css_248z$1);

function RenderField(_ref) {
  var fields = _ref.fields,
    onChange = _ref.onChange,
    settings = _objectWithoutProperties(_ref, ['fields', 'onChange']);

  var _parse = parse(settings, fields),
    Field = _parse.Field,
    props = _parse.props;

  if (!Field) {
    return null;
  }

  return /*#__PURE__*/ React.createElement(
    Field,
    _extends(
      {
        isRoot: true,
      },
      props,
      {
        value: settings.data,
        onChange: onChange,
        formData: settings.formData,
      }
    )
  );
} // 在顶层将 propsSchema 和 uiSchema 合并，便于后续处理。 也可直接传入合并的 schema

var Wrapper = function Wrapper(_ref2) {
  var schema = _ref2.schema,
    _ref2$propsSchema = _ref2.propsSchema,
    propsSchema = _ref2$propsSchema === void 0 ? {} : _ref2$propsSchema,
    _ref2$uiSchema = _ref2.uiSchema,
    uiSchema = _ref2$uiSchema === void 0 ? {} : _ref2$uiSchema,
    readOnly = _ref2.readOnly,
    showValidate = _ref2.showValidate,
    rest = _objectWithoutProperties(_ref2, [
      'schema',
      'propsSchema',
      'uiSchema',
      'readOnly',
      'showValidate',
    ]);

  var _schema = {};
  var jsonSchema = schema || propsSchema; // 兼容schema字段和propsSchema字段
  // 将uiSchema和schema合并（推荐不写uiSchema）

  _schema = combineSchema(jsonSchema, uiSchema);
  return /*#__PURE__*/ React.createElement(
    FormRender,
    _extends(
      {
        readOnly: readOnly,
        showValidate: !readOnly && showValidate, // 预览模式下不展示校验
      },
      rest,
      {
        schema: _schema,
      }
    )
  );
};

function FormRender(_ref3) {
  var _ref3$name = _ref3.name,
    name = _ref3$name === void 0 ? '$form' : _ref3$name,
    _ref3$column = _ref3.column,
    column = _ref3$column === void 0 ? 1 : _ref3$column,
    className = _ref3.className,
    _ref3$schema = _ref3.schema,
    schema = _ref3$schema === void 0 ? {} : _ref3$schema,
    _ref3$formData = _ref3.formData,
    formData = _ref3$formData === void 0 ? {} : _ref3$formData,
    _ref3$widgets = _ref3.widgets,
    widgets = _ref3$widgets === void 0 ? {} : _ref3$widgets,
    _ref3$FieldUI = _ref3.FieldUI,
    FieldUI = _ref3$FieldUI === void 0 ? DefaultFieldUI : _ref3$FieldUI,
    _ref3$fields = _ref3.fields,
    fields = _ref3$fields === void 0 ? {} : _ref3$fields,
    _ref3$mapping = _ref3.mapping,
    mapping = _ref3$mapping === void 0 ? {} : _ref3$mapping,
    _ref3$showDescIcon = _ref3.showDescIcon,
    showDescIcon = _ref3$showDescIcon === void 0 ? false : _ref3$showDescIcon,
    _ref3$showValidate = _ref3.showValidate,
    showValidate = _ref3$showValidate === void 0 ? true : _ref3$showValidate,
    _ref3$displayType = _ref3.displayType,
    displayType = _ref3$displayType === void 0 ? 'column' : _ref3$displayType,
    _ref3$onChange = _ref3.onChange,
    onChange = _ref3$onChange === void 0 ? function() {} : _ref3$onChange,
    _ref3$onValidate = _ref3.onValidate,
    onValidate = _ref3$onValidate === void 0 ? function() {} : _ref3$onValidate,
    _ref3$onMount = _ref3.onMount,
    onMount = _ref3$onMount === void 0 ? function() {} : _ref3$onMount,
    _ref3$readOnly = _ref3.readOnly,
    readOnly = _ref3$readOnly === void 0 ? false : _ref3$readOnly,
    _ref3$labelWidth = _ref3.labelWidth,
    labelWidth = _ref3$labelWidth === void 0 ? 110 : _ref3$labelWidth,
    _ref3$useLogger = _ref3.useLogger,
    useLogger = _ref3$useLogger === void 0 ? false : _ref3$useLogger,
    forwardedRef = _ref3.forwardedRef;
  var isUserInput = useRef(false); // 状态改变是否来自于用户操作

  var originWidgets = useRef();
  var generatedFields = useRef({});
  var firstRender = useRef(true);

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isEditing = _useState2[0],
    setEditing = _useState2[1];

  var debouncedSetEditing = useDebouncedCallback(setEditing, 300);
  var data = useMemo(
    function() {
      return resolve(schema, formData);
    },
    [JSON.stringify(schema), JSON.stringify(formData)]
  );
  useEffect(function() {
    onChange(data);
    updateValidation();
  }, []);
  useEffect(
    function() {
      if (firstRender.current) {
        onMount();
        firstRender.current = false;
      }

      updateValidation();

      if (!isUserInput.current) {
        onChange(data); // 这个操作不做，当外部修改formData后如果不操作form，返回的值会是没有resolve过的
      } else {
        isUserInput.current = false;
      }
    },
    [JSON.stringify(formData)]
  );
  useEffect(
    function() {
      onChange(data);
      updateValidation();
    },
    [JSON.stringify(schema)]
  ); // data修改比较常用，所以放第一位

  var resetData = function resetData(newData, newSchema) {
    var _schema = newSchema || schema;

    var _formData = newData || formData;

    var res = resolve(_schema, _formData);
    return new Promise(function(resolve) {
      onChange(res);
      updateValidation(res, _schema);
      resolve(res);
    });
  };

  useImperativeHandle(forwardedRef, function() {
    return {
      resetData: resetData,
    };
  }); // 用户输入都是调用这个函数

  var handleChange = function handleChange(key, val) {
    isUserInput.current = true; // 开始编辑，节流

    setEditing(true);
    debouncedSetEditing(false);
    onChange(val);
    onValidate(getValidateList(val, schema));
  };

  var updateValidation = function updateValidation(outData, outSchema) {
    var _data = outData || data;

    var _schema = outSchema || schema;

    onValidate(getValidateList(_data, _schema));
  };

  var generated = {};

  if (!originWidgets.current) {
    originWidgets.current = widgets;
  }

  Object.keys(widgets).forEach(function(key) {
    var oWidget = originWidgets.current[key];
    var nWidget = widgets[key];
    var gField = generatedFields.current[key];

    if (!gField || oWidget !== nWidget) {
      if (oWidget !== nWidget) {
        originWidgets.current[key] = nWidget;
      }

      gField = asField({
        FieldUI: FieldUI,
        Widget: nWidget,
      });
      generatedFields.current[key] = gField;
    }

    generated[key] = gField;
  });
  var settings = {
    schema: schema,
    data: data,
    name: name,
    column: column,
    showDescIcon: showDescIcon,
    showValidate: showValidate,
    displayType: displayType,
    readOnly: readOnly,
    labelWidth: labelWidth,
    useLogger: useLogger,
    formData: data,
    isEditing: isEditing,
  };
  var _fields = {
    // 根据 Widget 生成的 Field
    generated: generated,
    // 自定义的 Field
    customized: fields,
    // 字段 type 与 widgetName 的映射关系
    mapping: mapping,
  };
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: ''.concat(className, ' fr-wrapper'),
    },
    /*#__PURE__*/ React.createElement(
      RenderField,
      _extends({}, settings, {
        fields: _fields,
        onChange: handleChange,
      })
    )
  );
}

FormRender.propTypes = {
  name: PropTypes.string,
  column: PropTypes.number,
  schema: PropTypes.object,
  formData: PropTypes.object,
  widgets: PropTypes.objectOf(PropTypes.func),
  FieldUI: PropTypes.elementType,
  fields: PropTypes.objectOf(PropTypes.element),
  mapping: PropTypes.object,
  showDescIcon: PropTypes.bool,
  showValidate: PropTypes.bool,
  displayType: PropTypes.string,
  onChange: PropTypes.func,
  onMount: PropTypes.func,
  onValidate: PropTypes.func,
  readOnly: PropTypes.bool,
  labelWidth: PropTypes.number,
  useLogger: PropTypes.bool,
};
var index = fetcher(Wrapper);

export default index;
