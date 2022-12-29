/* eslint-disable react-hooks/exhaustive-deps */
import { set, sortedUniqBy, get, isEmpty, isFunction } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSet } from './hooks';
import { processData, transformDataWithBind2 } from './processData';
import scrollIntoView from 'scroll-into-view-if-needed';
import {
  clone,
  flattenSchema,
  generateDataSkeleton,
  parseAllExpression,
  schemaContainsExpression,
  getHiddenData,
} from './utils';
import { validateAll } from './validator';

const useForm = props => {
  const {
    formData: _formData,
    onChange: _onChange,
    onValidate: _onValidate,
    showValidate: _showValidate,
    /** 数据分析接口，表单展示完成渲染时触发 */
    logOnMount: _logOnMount,
    /** 数据分析接口，表单提交成功时触发，获得本次表单填写的总时长 */
    logOnSubmit: _logOnSubmit,
  } = props || {};

  const logOnMount =
    _logOnMount || (window.FR_LOGGER && window.FR_LOGGER.logOnMount);
  const logOnSubmit =
    _logOnSubmit || (window.FR_LOGGER && window.FR_LOGGER.logOnSubmit);

  const [renderCount, forceRender] = useState(0);

  const [state, setState] = useSet({
    formData: {},
    submitData: {},
    errorFields: [],
    outErrorFields: [],
    isValidating: false, // 是否在提交状态
    outsideValidating: false, // 是否开始外部校验，没有外部校验回传的场景，一直是false
    isSubmitting: false,
    isEditing: false, // 是否在编辑状态。主要用于优化体验，用户编辑时减少不必要的运算
    allTouched: false, // 是否所有表单元素都被碰过了（一键开关，用于提交的时候，默认所有都被touch了）
    touchedKeys: [], // 碰过的key（用于submit之前，判断哪些被碰过了）
    flatten: {}, // schema 的转换结构，便于处理
    finalFlatten: {}, // 表达式等被处理过的flatten，用于渲染
    firstMount: true,
    validatingFields: [], // 在校验状态的表单fields
  });

  const schemaRef = useRef();
  const beforeFinishRef = useRef();
  const localeRef = useRef('cn');
  const removeHiddenDataRef = useRef();
  const validateMessagesRef = useRef();
  const _data = useRef({}); // 用ref是为了破除闭包的影响
  const _flatten = useRef({}); // 用ref是为了破除闭包的影响
  const _finalFlatten = useRef({}); // 用ref是为了破除闭包的影响
  const _touchedKeys = useRef([]); // 用ref是为了破除闭包的影响
  const _errorFields = useRef();
  const _outErrorFields = useRef();
  const _allErrors = useRef([]); // 内部和外部的错误的合并
  const _validatingFields = useRef([]);
  const {
    formData: innerData,
    submitData,
    errorFields = [],
    outErrorFields = [], // 用户人为输入的errors，可以是直接调用 setErrorField/removeErrorField 方法，或者使用 beforeFinish 钩子
    isValidating,
    outsideValidating,
    isSubmitting,
    isEditing,
    allTouched,
    touchedKeys,
    flatten,
    finalFlatten,
    firstMount,
    // validatingFields,
    // statusTree, // 和formData一个结构，但是每个元素是 { $touched } 存放那些在schema里无需表达的状态, 看看是否只有touched。目前statusTree没有被使用
  } = state;

  _errorFields.current = errorFields;
  _outErrorFields.current = outErrorFields;
  _touchedKeys.current = touchedKeys;
  _flatten.current = flatten;
  _finalFlatten.current = finalFlatten;

  const dataFromOutside = props && props.hasOwnProperty('formData');
  const formData = dataFromOutside ? _formData : innerData;
  // 生成一个基础结构，确保对象内的必填元素也被校验
  _data.current = useMemo(() => {
    if (schemaRef.current) {
      return generateDataSkeleton(schemaRef.current, formData);
    }
    return {};
  }, [JSON.stringify(formData), JSON.stringify(schemaRef.current)]);

  _allErrors.current = useMemo(() => {
    if (
      Array.isArray(_errorFields.current) &&
      Array.isArray(_outErrorFields.current) &&
      _outErrorFields.current.length > 0
    ) {
      const mergeErrors = [..._errorFields.current, ..._outErrorFields.current];
      return sortedUniqBy(mergeErrors, item => item.name);
    } else {
      return _errorFields.current;
    }
  }, [
    JSON.stringify(_errorFields.current),
    JSON.stringify(_outErrorFields.current),
  ]);

  useEffect(() => {
    if (schemaRef.current && firstMount) {
      const flatten = flattenSchema(schemaRef.current);
      setState({ flatten, firstMount: false });
    }
  }, [JSON.stringify(schemaRef.current), firstMount]);

  // 统一的处理expression
  useEffect(() => {
    if (firstMount) {
      return;
    }
    let newFlatten = clone(_flatten.current);
    Object.entries(_flatten.current).forEach(([path, info]) => {
      if (schemaContainsExpression(info.schema)) {
        const arrayLikeIndex = path.indexOf(']');
        const isArrayItem =
          arrayLikeIndex > -1 && arrayLikeIndex < path.length - 1;
        const hasRootValue =
          JSON.stringify(info.schema).indexOf('rootValue') > -1;
        if (isArrayItem && hasRootValue) {
          // do nothing
        } else {
          newFlatten[path].schema = parseAllExpression(
            info.schema,
            _data.current,
            path
          );
        }
      }
    });
    setState({ finalFlatten: newFlatten });
  }, [
    JSON.stringify(_flatten.current),
    JSON.stringify(_data.current),
    firstMount,
  ]);

  // All form methods are down here ----------------------------------------------------------------
  // 两个兼容 0.x 的函数
  const _setData = data => {
    if (typeof _onChange === 'function') {
      _onChange(data);
    } else {
      setState({ formData: data });
    }
  };

  // Allow function to get the old value
  const _setErrors = errors => {
    if (typeof _onValidate === 'function') {
      const oldFormatErrors = errors ? errors.map(item => item.name) : [];
      _onValidate(oldFormatErrors);
    }
    if (typeof errors === 'function') {
      setState(({ errorFields }) => {
        return { errorFields: errors(errorFields) };
      });
    } else {
      setState({ errorFields: errors });
    }
  };

  const setFirstMount = value => {
    setState({ firstMount: value });
  };

  const touchKey = key => {
    if (_touchedKeys.current.indexOf(key) > -1) {
      return;
    }
    const newKeyList = [..._touchedKeys.current, key];
    _touchedKeys.current = newKeyList;
    setState({ touchedKeys: newKeyList });
  };

  const removeTouched = key => {
    let newTouch = _touchedKeys.current.filter(item => {
      return item.indexOf(key) === -1;
    });
    _touchedKeys.current = newTouch;
    setState({ touchedKeys: newTouch });
  };

  const changeTouchedKeys = newTouchedKeys => {
    setState({ touchedKeys: newTouchedKeys });
  };

  const setEditing = isEditing => {
    setState({ isEditing });
  };

  const onItemChange = (path, value) => {
    if (typeof path !== 'string') return;
    if (path === '#') {
      _setData({ ...value });
      return;
    }
    set(_data.current, path, value);
    _setData({ ..._data.current });
  };

  // errorFields: [
  //   { name: 'a.b.c', errors: ['Please input your Password!', 'something else is wrong'] },
  // ]

  const syncStuff = ({
    schema,
    locale,
    validateMessages,
    beforeFinish,
    removeHiddenData,
  }) => {
    schemaRef.current = schema;
    localeRef.current = locale;
    validateMessagesRef.current = validateMessages;
    beforeFinishRef.current = beforeFinish;
    removeHiddenDataRef.current = removeHiddenData;
    forceRender(renderCount + 1);
  };

  const setSchema = (settings, { override = false }) => {
    if (override) {
      const flatten = flattenSchema(settings);
      setState({ flatten });
      return;
    }
    const newFlatten = clone(_flatten.current);
    try {
      Object.keys(settings).forEach(path => {
        if (!_flatten.current[path]) {
          console.error(`path：'${path}' 不存在(form.setSchemaByPath)`);
        } else {
          const newSchema = settings[path];
          const _newSchema =
            typeof newSchema === 'function'
              ? newSchema(newFlatten[path].schema)
              : newSchema;
          newFlatten[path].schema = {
            ...newFlatten[path].schema,
            ..._newSchema,
          };
        }
      });
      setState({ flatten: newFlatten });
      _flatten.current = newFlatten;
    } catch (error) {
      console.error(error, 'setSchema');
    }
  };

  const setSchemaByPath = (path, newSchema) => {
    if (!_flatten.current[path]) {
      console.error(`path：'${path}' 不存在(form.setSchemaByPath)`);
      return;
    }
    const newFlatten = clone(_flatten.current);

    try {
      const _newSchema =
        typeof newSchema === 'function'
          ? newSchema(newFlatten[path].schema)
          : newSchema;
      newFlatten[path].schema = { ...newFlatten[path].schema, ..._newSchema };
      setState({ flatten: newFlatten });
      _flatten.current = newFlatten;
    } catch (error) {
      console.error(error, 'setSchemaByPath');
    }
  };

  const getSchemaByPath = path => {
    try {
      return _flatten.current[path].schema;
    } catch (error) {
      console.log(error, 'getSchemaByPath');
      return {};
    }
  };

  // TODO: better implementation needed
  const setErrorFields = error => {
    let newErrorFields = [];
    if (Array.isArray(error)) {
      newErrorFields = [...error, ..._outErrorFields.current];
    } else if (error && error.name) {
      newErrorFields = [error, ..._outErrorFields.current];
    } else {
      console.log('error format is wrong');
    }
    newErrorFields = sortedUniqBy(newErrorFields, item => item.name);
    _outErrorFields.current = newErrorFields;
    setState({ outErrorFields: newErrorFields });
  };

  const removeErrorField = path => {
    let newError = _errorFields.current.filter(item => {
      return item.name.indexOf(path) === -1;
    });

    let newOutError = _outErrorFields.current.filter(item => {
      return item.name.indexOf(path) === -1;
    });
    setState({ errorFields: newError, outErrorFields: newOutError });
  };

  /**
   * (nameList?: NamePath[], filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any
   * 参考rc-field-form中的getFieldsValue
   * 如果第一个参数为数组类型,则获取nameList数据并且做filterFunc过滤
   * 如果第一个参数非数组类型,则获取所有数据并做filterFunc过滤
   *
   * @returns
   */
  const getValues = (nameList, filterFunc) => {
    let flatten = _finalFlatten.current;
    let data = _data.current;
    let currentData = {};
    let filterMetaKeys = []; // 当前符合filter条件的key

    if (Array.isArray(nameList)) {
      nameList.forEach(path => {
        set(currentData, path, get(data, path));
      });
    } else {
      currentData = data;
    }
    // 过滤出满足条件的path
    if (filterFunc && isFunction(filterFunc)) {
      if (Array.isArray) {
        flatten = {};
        nameList.forEach(path => {
          flatten[path] = get(_finalFlatten.current, path);
        });
      }
      const metas = {};
      Object.keys(flatten).forEach(key => {
        metas[key] = {
          touched: isFieldTouched(key),
          validating: isFieldValidating(key),
        };
      });
      filterMetaKeys = Object.keys(metas).filter(k => filterFunc(metas[k]));
      //  没有filter满足条件的就返回{}
      currentData = {};

      if (!isEmpty(filterMetaKeys)) {
        filterMetaKeys.forEach(key => {
          set(currentData, key, get(data, key));
        });
      }
    }

    return processData(
      currentData,
      _finalFlatten.current,
      removeHiddenDataRef.current
    );
  };

  const setValues = newFormData => {
    const newData = transformDataWithBind2(newFormData, _flatten.current);
    _setData(newData);
  };

  const submit = () => {
    setState({ isValidating: true, allTouched: true, isSubmitting: false });
    //  https://formik.org/docs/guides/form-submission
    return validateAll({
      formData: _data.current,
      flatten: _finalFlatten.current,
      options: {
        locale: localeRef.current,
        validateMessages: validateMessagesRef.current,
      },
      formInstance: {
        setFieldValidating,
        removeFieldValidating,
      },
    })
      .then(errors => {
        setState({ errorFields: errors });

        const _errors = sortedUniqBy(
          [...(errors || []), ..._outErrorFields.current],
          item => item.name
        );

        if (typeof beforeFinishRef.current === 'function') {
          return Promise.resolve(
            processData(
              _data.current,
              _finalFlatten.current,
              removeHiddenDataRef.current
            )
          ).then(res => {
            setState({
              isValidating: true,
              isSubmitting: false,
              outsideValidating: true,
              submitData: res,
            });
            return { data: res, errors: _errors };
          });
        }

        return Promise.resolve(
          processData(
            _data.current,
            _finalFlatten.current,
            removeHiddenDataRef.current
          )
        ).then(res => {
          setState({
            isValidating: false,
            isSubmitting: true,
            submitData: res,
          });
          return {
            data: res,
            errors: _errors,
          };
        });
      })
      .catch(err => {
        // 不应该走到这边的
        console.log('submit error:', err);
        return err;
      });
  };

  const resetFields = options => {
    setState({
      formData: options?.formData || {},
      submitData: options?.submitData || {},
      errorFields: options?.errorFields || [],
      touchedKeys: options?.touchedKeys || [],
      allTouched: options?.allTouched || false,
    });
  };

  const endValidating = () =>
    setState({
      isValidating: false,
      outsideValidating: false,
      isSubmitting: true,
    });

  const endSubmitting = () =>
    setState({
      isSubmitting: false,
      isValidating: false,
      outsideValidating: false,
    });

  const setFieldValidating = namePath => {
    if (_validatingFields.current.indexOf(namePath) > -1) {
      return;
    }
    _validatingFields.current = [..._validatingFields.current, namePath];
  };
  const removeFieldValidating = namePath => {
    _validatingFields.current = _validatingFields.current.filter(item => {
      return item !== namePath;
    });
  };

  const isFieldValidating = namePath => {
    return _validatingFields.current.indexOf(namePath) > -1;
  };
  /**
   * 参考rc-field-form 校验不包含外部设置的error
   * @param {*} nameList
   * @returns
   */
  const validateFields = nameList => {
    const data = _data.current;
    if (Array.isArray(nameList)) {
      set(data, {});
      nameList.forEach(path => {
        set(data, path, get(_data.current, path));
      });
    }
    setState({ isValidating: true });
    return validateAll({
      formData: data,
      flatten: _finalFlatten.current,
      options: {
        locale: localeRef.current,
        validateMessages: validateMessagesRef.current,
      },
      formInstance: {
        setFieldValidating,
        removeFieldValidating,
      },
    }).then(errors => {
      setState({ isValidating: false, errorFields: errors });
      if (!isEmpty(errors)) {
        return Promise.reject({
          errors: errors,
          data: processData(
            data,
            _finalFlatten.current,
            removeHiddenDataRef.current
          ),
        });
      } else {
        return Promise.resolve(
          processData(data, _finalFlatten.current, removeHiddenDataRef.current)
        );
      }
    });
  };

  /**
   * (nameList?: NamePath[], allTouched?: boolean) => boolean
   * 参照antd rc-field-form的处理逻辑
   * 如果入参为空，则返回 是否有表单被触碰过
   * 如果参数为一个
   *    当args0 === Array，则返回当前表单list是否 >= 1个表单被触碰过
   *    否则，args0 ? 返回 是否‘所有’表单被触碰过 ：是否有表单被触碰过
   * 如果参数为两个
   *    args1 ? args0中的’所有‘表单都被触碰过： args0中的表单 >= 1个被触碰过
   * @returns
   */
  function isFieldsTouched() {
    const argsLen = arguments.length;
    var namePathList = [];
    var isAllFieldsTouched = false;
    const allTouchedKeys = _touchedKeys.current;
    if (argsLen === 0) {
      return _touchedKeys.current.length > 0;
    } else if (argsLen === 1) {
      if (Array.isArray(arguments[0])) {
        namePathList = arguments[0];
      } else {
        return arguments[0] ? allTouched : _touchedKeys.current.length > 0;
      }
    } else {
      namePathList = Array.isArray(arguments[0]) ? arguments[0] : [];
      isAllFieldsTouched = arguments[1];
    }
    try {
      const touchedFunc = key => {
        return allTouchedKeys.indexOf(key) !== -1;
      };
      return isAllFieldsTouched
        ? namePathList.every(touchedFunc)
        : namePathList.some(touchedFunc);
    } catch (e) {
      console.error(
        '>>>> isFieldsTouched error, check your input arguments',
        e
      );
    }
  }

  const isFieldTouched = namePath => {
    return _touchedKeys.current.indexOf(namePath) > -1;
  };

  //options 滑动设置https://github.com/stipsan/scroll-into-view-if-needed
  const scrollToPath = (namePath, options = {}) => {
    const node = document.querySelector(`[datapath="${namePath}"]`);

    if (node) {
      scrollIntoView(node, {
        scrollMode: 'if-needed',
        block: 'nearest',
        ...options,
      });

      return true;
    }
    return false;
  };

  const getFieldError = namePath => {
    return (
      _allErrors.current.find(error => {
        return error.name === namePath;
      })?.error || []
    );
  };
  const getFieldsError = nameList => {
    if (!nameList || !Array.isArray(nameList)) {
      return _allErrors.current;
    }
    return _allErrors.current.filter(error => {
      return nameList.indexOf(error.name) > -1;
    });
  };
  /**
   * fields: {error?, name, touched?, validating?, value?}
   * 参照rc-field-form的实现逻辑
   * @param {*} fields
   * 设置一组字段状态
   */
  const setFields = fields => {
    // 设置error调用统一的函数，直接设置数组，省去forEach频繁操作
    const errors = fields
      .filter(field => {
        return field.error;
      })
      .map(field => {
        return {
          name: field.name,
          error: field.error,
        };
      });
    !isEmpty(errors) && setErrorFields(errors);
    // 对 value, touched, validating进行设置
    fields.forEach(field => {
      const { name, value, touched, validating } = field;
      if ('value' in field) {
        onItemChange(name, value);
      }
      if (typeof touched === 'boolean') {
        touched ? touchKey(name) : removeTouched(name);
      }
      if (typeof validating === 'boolean') {
        validating ? setFieldValidating(name) : removeFieldValidating(name);
      }
    });
  };

  const getHiddenValues = () => {
    return getHiddenData(_data.current, _finalFlatten.current);
  };

  const form = {
    // state
    formData: _data.current,
    schema: schemaRef.current,
    flatten: finalFlatten,
    touchedKeys: _touchedKeys.current,
    allTouched,
    // methods
    touchKey,
    removeTouched,
    changeTouchedKeys,
    onItemChange,
    setValueByPath: onItemChange, // 单个
    getSchemaByPath,
    setSchemaByPath,
    setSchema,
    setValues,
    getValues,
    getHiddenValues,
    resetFields,
    submit,
    init: submit, // 简版的迁移方案里用，正常用不到，换个名字迁移的时候大家更好接受点
    submitData,
    errorFields: _allErrors.current,
    isValidating,
    outsideValidating,
    isSubmitting,
    endValidating,
    endSubmitting,
    setErrorFields,
    removeErrorField,
    isEditing,
    setEditing,
    syncStuff,
    showValidate: _showValidate,
    validateFields,
    isFieldTouched,
    isFieldsTouched,
    setFieldValidating,
    removeFieldValidating,
    isFieldValidating,
    scrollToPath,
    getFieldError,
    getFieldsError,
    setFields,
    // firstMount,
    setFirstMount,
    // logs
    logOnMount,
    logOnSubmit,
    // inner api, DON'T USE
    _setErrors,
  };

  return form;
};

export default useForm;
