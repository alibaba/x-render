'use strict';

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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = listHoc;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _reactSortableHoc = require('react-sortable-hoc');

var _utils = require('../base/utils');

var _foldIcon = _interopRequireDefault(require('./foldIcon'));

var _descList = _interopRequireWildcard(require('./descList'));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
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

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

var DragHandle = (0, _reactSortableHoc.SortableHandle)(function() {
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: 'fr-item-action-icon fr-move-icon',
    },
    ':::'
  );
});

var listItemHoc = function listItemHoc(ButtonComponent) {
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

      _this.toggleFold = function() {
        _this.props.toggleFoldItem(_this.props.name);
      };

      _this.handleDelete = function() {
        var _this$props = _this.props,
          _this$props$p = _this$props.p,
          p = _this$props$p === void 0 ? {} : _this$props$p,
          name = _this$props.name,
          pageSize = _this$props.pageSize;

        var value = _toConsumableArray(p.value);

        value.splice(name, 1);

        _this.props.handleDeleteItem(name);

        p.onChange(p.name, value); // 计算页码

        var list = Array.isArray(value) ? value : [];
        var page = Math.ceil(list.length / pageSize);

        _this.props.handlePageChange(page, pageSize);
      };

      return _this;
    }

    _createClass(_class2, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this$props2 = this.props,
            _this$props2$p = _this$props2.p,
            p = _this$props2$p === void 0 ? {} : _this$props2$p,
            name = _this$props2.name,
            fold = _this$props2.fold;
          var description = (0, _descList.getDescription)({
            schema: p.schema,
            value: p.value,
            index: name,
          }); // 如果第一个值不为空，则收起
          // 新增的值为0，不折叠

          var hasValue = description && description[0] && description[0].text;

          if (hasValue && fold !== 0) {
            this.props.toggleFoldItem(name);
          }
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this$props3 = this.props,
            item = _this$props3.item,
            _this$props3$p = _this$props3.p,
            p = _this$props3$p === void 0 ? {} : _this$props3$p,
            name = _this$props3.name,
            fold = _this$props3.fold;

          var descProps = _objectSpread(
            _objectSpread({}, p),
            {},
            {
              index: name,
            }
          );

          var options = p.options,
            readOnly = p.readOnly,
            formData = p.formData,
            rootValue = p.value;

          var _options = (0, _utils.isObj)(options) ? options : {};

          var canFold = _options.foldable,
            hideIndex = _options.hideIndex;
          var hideDelete = _options.hideDelete,
            itemButtons = _options.itemButtons; // 判断 hideDelete 是不是函数，是的话将计算后的值赋回

          var _isFunction = (0, _utils.isFunction)(hideDelete);

          if (_isFunction) {
            // isFunction 返回为 true 则说明只可能为 string | Function
            if (typeof _isFunction === 'string') {
              hideDelete = (0, _utils.evaluateString)(
                _isFunction,
                formData,
                rootValue
              );
            } else if (typeof _isFunction === 'function') {
              hideDelete = _isFunction(formData, rootValue);
            }
          } // 只有当items为object时才做收起（fold）处理

          var isSchemaObj = p.schema.items && p.schema.items.type == 'object';
          var setClass =
            'fr-set ba b--black-10 hover-b--black-20 relative flex flex-column';

          if (canFold && fold) {
            setClass += ' pv12';
          } else if (p.displayType === 'row') {
            setClass += ' pt44';
          }

          return /*#__PURE__*/ _react.default.createElement(
            'li',
            {
              className: setClass,
            },
            hideIndex
              ? null
              : /*#__PURE__*/ _react.default.createElement(
                  'div',
                  {
                    className: 'absolute top-0 left-0 bg-blue',
                    style: {
                      paddingLeft: 4,
                      paddingRight: 6,
                      borderBottomRightRadius: 8,
                      borderTopLeftRadius: 3,
                      backgroundColor: 'rgba(0, 0, 0, .36)',
                      fontSize: 8,
                      color: '#fff',
                    },
                  },
                  name + 1
                ),
            canFold && fold && isSchemaObj
              ? /*#__PURE__*/ _react.default.createElement(
                  _descList.default,
                  descProps
                )
              : item,
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'fr-item-actions',
              },
              canFold &&
                /*#__PURE__*/ _react.default.createElement(_foldIcon.default, {
                  fold: fold,
                  onClick: this.toggleFold,
                  className: 'fr-item-action-icon',
                }),
              readOnly || !hideDelete
                ? /*#__PURE__*/ _react.default.createElement(
                    'div',
                    {
                      className: 'fr-item-action-icon',
                      onClick: this.handleDelete,
                    },
                    /*#__PURE__*/ _react.default.createElement('img', {
                      style: {
                        width: 20,
                      },
                      src:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAFVBMVEVHcEwyMjIzMzMzMzMzMzMyMjIzMzPB9FYmAAAABnRSTlMAwO5OlCWVPuLSAAABQklEQVRo3u2ZzQ6CMBCEQeSuHHrGn3gmRjkbjZxN9AVA0/d/BAPR2OKCU+pJZ04E2A+6hTY7GwQU1atNoh+aHYbEh9rQZABAW3KPH9uAnTMgtwFXZ0BhA27OAGUDSmfAygZUvTdHiR6gMutKGKpr13jhV+j4ZmBV3wN4D8E7id7T+MyDy4+KnSSAAAJ+ARAlrwXDPIYBubFk5a3NFQIoY9FUrb0RApjLdntvRAEauUYAAQQQQAABBBBAAAEE/CXAr+DwLnm8iy7vso+1838CaiP6hMXHolFdAzIMEIkAhfcAxqLXXrv5CwywFt3+HLfwldhvGMF9jKb3kcqnS2AeYiU/Km4aCsvtp/jzvnHFhScVLqa01DEJXQAT6eVWQ3z9t3nAlMr5KXwy0MwkOIiq83O5QITq2POfTeefwufTLKCotu7zGChb6PfVgwAAAABJRU5ErkJggg==',
                      alt: 'delete',
                    })
                  )
                : null,
              !readOnly &&
                /*#__PURE__*/ _react.default.createElement(DragHandle, null)
            ),
            !((canFold && fold) || readOnly) &&
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'self-end flex mb2',
                },
                itemButtons &&
                  itemButtons.length > 0 &&
                  itemButtons.map(function(btn, idx) {
                    return /*#__PURE__*/ _react.default.createElement(
                      ButtonComponent,
                      {
                        key: idx.toString(),
                        className: 'ml2',
                        type: 'dashed',
                        icon: btn.icon,
                        onClick: function onClick() {
                          var value = _toConsumableArray(p.value);

                          if (typeof window[btn.callback] === 'function') {
                            var result = window[btn.callback](value, name); // eslint-disable-line

                            p.onChange(p.name, result);
                          }
                        },
                      },
                      btn.text || ''
                    );
                  })
              )
          );
        },
      },
    ]);

    return _class2;
  })(_react.default.Component);
};

var fieldListHoc = function fieldListHoc(ButtonComponent, Pagination) {
  var SortableItem = (0, _reactSortableHoc.SortableElement)(
    listItemHoc(ButtonComponent)
  );
  return /*#__PURE__*/ (function(_React$Component2) {
    _inherits(_class4, _React$Component2);

    var _super2 = _createSuper(_class4);

    function _class4() {
      var _this2;

      _classCallCheck(this, _class4);

      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2];
      }

      _this2 = _super2.call.apply(_super2, [this].concat(args));

      _this2.handleAddClick = function() {
        var _this2$props = _this2.props,
          p = _this2$props.p,
          addUnfoldItem = _this2$props.addUnfoldItem,
          pageSize = _this2$props.pageSize;

        var value = _toConsumableArray(p.value);

        value.push(p.newItem);
        p.onChange(p.name, value);
        addUnfoldItem(); // 计算页码

        var list = Array.isArray(value) ? value : [];
        var page = Math.ceil(list.length / pageSize);

        _this2.props.handlePageChange(page, pageSize);
      };

      _this2.onPageChange = function(page, pageSize) {
        _this2.props.handlePageChange(page, pageSize);
      };

      return _this2;
    }

    _createClass(_class4, [
      {
        key: 'render',
        // buttons is a list, each item looks like:
        value:
          // {
          //   "text": "删除全部",
          //   "icon": "delete",
          //   "callback": "clearAll"
          // }
          function render() {
            var _this$props4 = this.props,
              p = _this$props4.p,
              _this$props4$foldList = _this$props4.foldList,
              foldList =
                _this$props4$foldList === void 0 ? [] : _this$props4$foldList,
              currentIndex = _this$props4.currentIndex,
              pageSize = _this$props4.pageSize,
              handlePageChange = _this$props4.handlePageChange,
              toggleFoldItem = _this$props4.toggleFoldItem,
              handleDeleteItem = _this$props4.handleDeleteItem; // prefer ui:options/buttons to ui:extraButtons, but keep both for backwards compatibility

            var _ref = p || {},
              readOnly = _ref.readOnly,
              _ref$schema = _ref.schema,
              schema = _ref$schema === void 0 ? {} : _ref$schema,
              extraButtons = _ref.extraButtons,
              options = _ref.options;

            var _options = (0, _utils.isObj)(options) ? options : {};

            var buttons = _options.buttons || extraButtons || [];
            var maxItems = schema.maxItems;
            var list = Array.isArray(p.value) ? p.value : [];
            var total = list.length;
            var currentPage = list.slice(
              (currentIndex - 1) * pageSize,
              currentIndex * pageSize
            );

            if (!Array.isArray(p.value)) {
              console.error(
                '"'.concat(
                  p.name,
                  '"\u8FD9\u4E2A\u5B57\u6BB5\u76F8\u5173\u7684schema\u4E66\u5199\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\uFF01'
                )
              );
              return null;
            }

            var canAdd = maxItems ? maxItems > list.length : true; // 当到达最大个数，新增按钮消失

            var showPagination = !!(Pagination && total > pageSize);
            return /*#__PURE__*/ _react.default.createElement(
              'ul',
              {
                className: 'pl0 ma0',
              },
              currentPage.map(function(_, idx) {
                var name = (currentIndex - 1) * pageSize + idx;
                return /*#__PURE__*/ _react.default.createElement(
                  SortableItem,
                  {
                    key: 'item-'.concat(name),
                    index: name,
                    name: name,
                    p: p,
                    fold: foldList[name],
                    toggleFoldItem: toggleFoldItem,
                    pageSize: pageSize,
                    handlePageChange: handlePageChange,
                    handleDeleteItem: handleDeleteItem,
                    item: p.getSubField({
                      name: name,
                      value: p.value[name],
                      onChange: function onChange(key, val) {
                        var value = _toConsumableArray(p.value);

                        value[key] = val;
                        p.onChange(p.name, value);
                      },
                    }),
                  }
                );
              }),
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'flex justify-between mb3',
                },
                showPagination
                  ? /*#__PURE__*/ _react.default.createElement(Pagination, {
                      size: 'small',
                      total: total,
                      pageSize: pageSize,
                      showSizeChanger: showPagination,
                      onChange: this.onPageChange,
                      current: currentIndex,
                    })
                  : /*#__PURE__*/ _react.default.createElement('div', null),
                !readOnly &&
                  /*#__PURE__*/ _react.default.createElement(
                    'div',
                    {
                      className: 'tr',
                    },
                    canAdd &&
                      /*#__PURE__*/ _react.default.createElement(
                        ButtonComponent,
                        {
                          icon: 'add',
                          onClick: this.handleAddClick,
                        },
                        '\u65B0\u589E'
                      ),
                    buttons &&
                      buttons.length > 0 &&
                      buttons.map(function(item, i) {
                        var icon = item.icon,
                          text = item.text,
                          callback = item.callback,
                          rest = _objectWithoutProperties(item, [
                            'icon',
                            'text',
                            'callback',
                          ]);

                        return /*#__PURE__*/ _react.default.createElement(
                          ButtonComponent,
                          _extends(
                            {
                              className: 'ml2',
                              icon: icon,
                              key: i.toString(),
                              onClick: function onClick() {
                                if (callback === 'clearAll') {
                                  p.onChange(p.name, []);
                                  return;
                                }

                                if (callback === 'copyLast') {
                                  var value = _toConsumableArray(p.value);

                                  var lastIndex = value.length - 1;
                                  value.push(
                                    lastIndex > -1
                                      ? value[lastIndex]
                                      : p.newItem
                                  );
                                  p.onChange(p.name, value);
                                  return;
                                }

                                if (typeof window[callback] === 'function') {
                                  var _value = _toConsumableArray(p.value);

                                  var onChange = function onChange(value) {
                                    return p.onChange(p.name, value);
                                  };

                                  window[callback](
                                    _value,
                                    onChange,
                                    schema,
                                    p.newItem
                                  ); // eslint-disable-line
                                }
                              },
                            },
                            rest
                          ),
                          text
                        );
                      })
                  )
              )
            );
          },
      },
    ]);

    return _class4;
  })(_react.default.Component);
};

function listHoc(ButtonComponent, Pagination) {
  var _class5, _temp;

  var SortableList = (0, _reactSortableHoc.SortableContainer)(
    fieldListHoc(ButtonComponent, Pagination)
  );
  return (
    (_temp = _class5 = /*#__PURE__*/ (function(_React$Component3) {
      _inherits(_class5, _React$Component3);

      var _super3 = _createSuper(_class5);

      function _class5(_props) {
        var _this3;

        _classCallCheck(this, _class5);

        _this3 = _super3.call(this, _props);

        _this3.addUnfoldItem = function() {
          _this3.setState({
            foldList: [].concat(_toConsumableArray(_this3.state.foldList), [0]),
          });
        };

        _this3.handleDeleteItem = function() {
          var _this3$props = _this3.props,
            options = _this3$props.options,
            value = _this3$props.value;
          var pageSize = 10;

          if ((0, _utils.isNumber)(options.pageSize)) {
            pageSize = Number(options.pageSize);
          }

          var idx =
            Math.floor((value.length === 0 ? 0 : value.length - 2) / pageSize) +
            1;

          if (_this3.state.currentIndex > idx) {
            _this3.setState({
              currentIndex: idx,
            });
          }
        };

        _this3.toggleFoldItem = function(index) {
          var _this3$state$foldList = _this3.state.foldList,
            foldList =
              _this3$state$foldList === void 0 ? [] : _this3$state$foldList;
          foldList[index] = !foldList[index]; // TODO: need better solution for the weird behavior caused by setState being async

          _this3.setState({
            foldList: foldList,
          });
        };

        _this3.handleSort = function(_ref2) {
          var oldIndex = _ref2.oldIndex,
            newIndex = _ref2.newIndex;
          var _this3$props2 = _this3.props,
            onChange = _this3$props2.onChange,
            name = _this3$props2.name,
            value = _this3$props2.value;
          onChange(
            name,
            (0, _reactSortableHoc.arrayMove)(value, oldIndex, newIndex)
          );

          _this3.setState({
            foldList: (0, _reactSortableHoc.arrayMove)(
              _this3.state.foldList,
              oldIndex,
              newIndex
            ),
          });
        };

        _this3.handlePageChange = function(page, pageSize) {
          var _this3$state = _this3.state,
            currentIndex = _this3$state.currentIndex,
            _size = _this3$state.pageSize;

          _this3.setState({
            currentIndex: page || currentIndex,
            pageSize: pageSize || _size,
          });
        };

        _this3.getPageSize = function(props) {
          var _ref3 = props || {},
            options = _ref3.options;

          var _options = (0, _utils.isObj)(options) ? options : {};

          var pageSize = 10;

          if ((0, _utils.isNumber)(_options.pageSize)) {
            pageSize = Number(_options.pageSize);
          }

          return pageSize;
        };

        var len = _this3.props.value.length || 0;
        _this3.state = {
          foldList: new Array(len).fill(false) || [],
          currentIndex: 1,
          pageSize: _this3.getPageSize(_props),
        };
        return _this3;
      } // 新添加的item默认是展开的

      _createClass(_class5, [
        {
          key: 'render',
          value: function render() {
            var _this$state = this.state,
              foldList = _this$state.foldList,
              currentIndex = _this$state.currentIndex,
              pageSize = _this$state.pageSize;
            return /*#__PURE__*/ _react.default.createElement(SortableList, {
              p: this.props,
              foldList: foldList,
              currentIndex: currentIndex,
              pageSize: pageSize,
              toggleFoldItem: this.toggleFoldItem,
              addUnfoldItem: this.addUnfoldItem,
              handlePageChange: this.handlePageChange,
              handleDeleteItem: this.handleDeleteItem,
              distance: 6,
              useDragHandle: true,
              helperClass: 'fr-sort-help-class',
              shouldCancelStart: function shouldCancelStart(e) {
                return (
                  e.toElement &&
                  e.toElement.className === 'fr-tooltip-container'
                );
              },
              onSortEnd: this.handleSort,
            });
          },
        },
      ]);

      return _class5;
    })(_react.default.Component)),
    (_class5.propTypes = {
      value: _propTypes.default.array,
    }),
    (_class5.defaultProps = {
      value: [],
    }),
    _temp
  );
}
