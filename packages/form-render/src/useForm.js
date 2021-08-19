/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useMemo, useState } from 'react';
import { validateAll } from './validator';
import { useSet } from './hooks';
import { set, sortedUniqBy } from 'lodash-es';
import { processData, transformDataWithBind2 } from './processData';
import {
  generateDataSkeleton,
  flattenSchema,
  clone,
  schemaContainsExpression,
  parseAllExpression,
} from './utils';

const useForm = props => {
  const {
    // 为了更平滑兼容 0.x，如果外部传入状态，那么使用外部的状态
    formData: _formData,
    onChange: _onChange,
    onValidate: _onValidate,
    showValidate: _showValidate,
    /** 数据分析接口，表单展示完成渲染时触发 */
    logOnMount,
    /** 数据分析接口，表单提交成功时触发，获得本次表单填写的总时长 */
    logOnSubmit,
  } = props || {};

  const [renderCount, forceRender] = useState(0);

  const [state, setState] = useSet({
    formData: {},
    submitData: {},
    errorFields: [],
    isValidating: false, // 是否在提交状态
    outsideValidating: false, // 是否开始外部校验，没有外部校验回传的场景，一直是false
    isSubmitting: false,
    isEditing: false, // 是否在编辑状态。主要用于优化体验，用户编辑时减少不必要的运算
    allTouched: false, // 是否所有表单元素都被碰过了（一键开关，用于提交的时候，默认所有都被touch了）
    touchedKeys: [], // 碰过的key（用于submit之前，判断哪些被碰过了）
    flatten: {}, // schema 的转换结构，便于处理
    finalFlatten: {}, // 表达式等被处理过的flatten，用于渲染
    firstMount: true,
  });

  const schemaRef = useRef();
  const beforeFinishRef = useRef(() => {});
  const localeRef = useRef('cn');
  const removeHiddenDataRef = useRef();
  const validateMessagesRef = useRef();
  const _data = useRef({}); // 用ref是为了破除闭包的影响
  const _flatten = useRef({}); // 用ref是为了破除闭包的影响
  const _touchedKeys = useRef([]); // 用ref是为了破除闭包的影响
  const _errorFields = useRef();

  const {
    formData: innerData,
    submitData,
    errorFields = [],
    isValidating,
    outsideValidating,
    isSubmitting,
    isEditing,
    allTouched,
    touchedKeys,
    flatten,
    finalFlatten,
    firstMount,
    // statusTree, // 和formData一个结构，但是每个元素是 { $touched } 存放那些在schema里无需表达的状态, 看看是否只有touched。目前statusTree没有被使用
  } = state;

  _errorFields.current = errorFields;
  _touchedKeys.current = touchedKeys;
  _flatten.current = flatten;

  const dataFromOutside = props && props.hasOwnProperty('formData');
  const formData = dataFromOutside ? _formData : innerData;
  // 生成一个基础结构，确保对象内的必填元素也被校验
  _data.current = useMemo(() => {
    if (schemaRef.current) {
      return generateDataSkeleton(schemaRef.current, formData);
    }
    return {};
  }, [JSON.stringify(formData), JSON.stringify(schemaRef.current)]);

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
        newFlatten[path].schema = parseAllExpression(
          info.schema,
          _data.current,
          path
        );
      }
    });
    setState({ finalFlatten: newFlatten });
  }, [
    JSON.stringify(_flatten.current),
    JSON.stringify(_data.current),
    firstMount,
  ]);

  // TODO: 首次渲染的时候不要执行，这里导致第二次的渲染。不过关系不大
  useEffect(() => {
    if (firstMount) return;
    validateAll({
      formData: _data.current,
      flatten: finalFlatten,
      isRequired: allTouched,
      touchedKeys: _touchedKeys.current,
      locale: localeRef.current,
      validateMessages: validateMessagesRef.current,
    }).then(res => {
      _setErrors(res);
    });
  }, [JSON.stringify(_data.current)]);

  // All form methods are down here ----------------------------------------------------------------
  // 两个兼容 0.x 的函数
  const _setData = data => {
    if (typeof _onChange === 'function') {
      _onChange(data);
    } else {
      setState({ formData: data });
    }
  };
  const _setErrors = errors => {
    if (typeof _onValidate === 'function') {
      const oldFormatErrors = errors ? errors.map(item => item.name) : [];
      _onValidate(oldFormatErrors);
    }
    setState({ errorFields: errors });
  };

  const setFirstMount = value => {
    setState({ firstMount: value });
  };

  const touchKey = key => {
    if (_touchedKeys.current.indexOf(key) > -1) {
      return;
    }
    const newKeyList = [..._touchedKeys.current, key];
    setState({ touchedKeys: newKeyList });
  };

  const removeTouched = key => {
    let newTouch = _touchedKeys.current.filter(item => {
      return item.indexOf(key) === -1;
    });
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

  // TODO: 全局的没有path, 这个函数要这么写么。。全局的，可以path = #
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

  const setSchema = settings => {
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

  // TODO: 外部校验的error要和本地的合并么？
  // TODO!: 这块要优化一下吧
  const setErrorFields = error => {
    let newErrorFields = [];
    if (Array.isArray(error)) {
      newErrorFields = [...error, ..._errorFields.current];
    } else if (error && error.name) {
      newErrorFields = [error, ..._errorFields.current];
    } else {
      console.log('error format is wrong');
    }
    newErrorFields = sortedUniqBy(newErrorFields, item => item.name);
    _setErrors(newErrorFields);
  };
  // TODO: 提取出来，重新写一份，注意要处理async

  const removeErrorField = path => {
    let newError = _errorFields.current.filter(item => {
      return item.name.indexOf(path) === -1;
    });
    _setErrors(newError);
  };

  const getValues = () => {
    return processData(
      _data.current,
      finalFlatten,
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
    // 开始校验。如果校验写在每个renderField，也会有问题，比如table第一页以外的数据是不渲染的，所以都不会触发，而且校验还有异步问题
    return validateAll({
      formData: _data.current,
      flatten: finalFlatten,
      touchedKeys: [],
      isRequired: true,
      locale: localeRef.current,
      validateMessages: validateMessagesRef.current,
    })
      .then(errors => {
        setState({ errorFields: errors });

        if (typeof beforeFinishRef.current === 'function') {
          return Promise.resolve(
            processData(
              _data.current,
              finalFlatten,
              removeHiddenDataRef.current
            )
          ).then(res => {
            setState({
              isValidating: true,
              isSubmitting: false,
              outsideValidating: true,
              submitData: res,
            });
            return errors;
          });
        }

        return Promise.resolve(
          processData(_data.current, finalFlatten, removeHiddenDataRef.current)
        ).then(res => {
          setState({
            isValidating: false,
            isSubmitting: true,
            submitData: res,
          });
          return errors;
        });
      })
      .catch(err => {
        // 不应该走到这边的
        console.log('submit error:', err);
        return err;
      });
  };

  const resetFields = () => {
    setState({
      formData: {},
      submitData: {},
      errorFields: [],
      touchedKeys: [],
      allTouched: false,
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
    resetFields,
    submit,
    init: submit, // 简版的迁移方案里用，正常用不到，换个名字迁移的时候大家更好接受点
    submitData,
    errorFields,
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
    // firstMount,
    setFirstMount,
    // logs
    logOnMount,
    logOnSubmit,
  };

  return form;
};

export default useForm;
