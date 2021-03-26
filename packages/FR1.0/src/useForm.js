/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { getDataPath, removeEmptyItemFromList } from './utils';
import { validateAll } from './validator';
import { useSet } from './hooks';
import { set, unset, sortedUniqBy } from 'lodash';

export const useForm = () => {
  const [state, setState] = useSet({
    formData: {}, // TODO: 初始值从外部传入
    submitData: {},
    errorFields: [],
    isValidating: false, // 是否在提交状态
    isSubmitting: false,
    isEditing: false, // 是否在编辑状态。主要用于优化体验，用户编辑时减少不必要的运算
    allTouched: false, // 是否所有表单元素都被碰过了（一键开关，用于提交的时候，默认所有都被touch了）
    touchedKeys: [], // 碰过的key（用于submit之前，判断哪些被碰过了）
  });

  const schemaRef = useRef();
  const flattenRef = useRef();

  const schema = schemaRef.current || {};
  const flatten = flattenRef.current || {};

  const {
    formData,
    submitData,
    errorFields = [],
    isValidating,
    isSubmitting,
    isEditing,
    allTouched,
    touchedKeys,
    // statusTree, // 和formData一个结构，但是每个元素是 { $touched } 存放那些在schema里无需表达的状态, 看看是否只有touched。目前statusTree没有被使用
  } = state;

  useEffect(() => {
    let isRequired = false;
    if (allTouched) isRequired = true;
    validateAll({
      formData,
      schema: schemaRef.current,
      isRequired,
    }).then(res => {
      setState({ errorFields: res });
    });
  }, [JSON.stringify(formData), allTouched]);

  const setEditing = isEditing => {
    setState({ isEditing });
  };

  const onItemChange = (path, value) => {
    if (typeof path !== 'string') return;
    if (path === '#') {
      setState({ formData: { ...value } });
      return;
    }
    const newFormData = set(formData, path, value);
    setState({ formData: { ...newFormData } });
  };

  // TODO: 全局的没有path, 这个函数要这么写么。。全局的，可以path = #
  // errorFields: [
  //   { name: 'a.b.c', errors: ['Please input your Password!', 'something else is wrong'] },
  // ]

  const bindSchema = ({ schema, flatten }) => {
    schemaRef.current = schema;
    flattenRef.current = flatten;
  };

  // TODO: 外部校验的error要和本地的合并么？
  // TODO!: 这块要优化一下吧
  const setErrorFields = error => {
    let newErrorFields = [];
    if (Array.isArray(error)) {
      newErrorFields = [...error, ...errorFields];
    } else if (error && error.name) {
      newErrorFields = [error, ...errorFields];
    } else {
      console.log('error format is wrong');
    }
    newErrorFields = sortedUniqBy(newErrorFields, item => item.name);
    setState({ errorFields: newErrorFields });
  };

  const removeValidation = _path => {
    if (!_path || _path === '#') {
      setState({ errorFields: [] });
    }
    let path;
    if (typeof _path === 'string') {
      path = _path;
    } else if (Array.isArray(_path) && typeof _path[0] === 'string') {
      path = _path[0];
    } else {
      // 说明有传参有问题，直接结束 TODO: 后续可给个提示
      return;
    }

    setState(({ errorFields }) => {
      let newErrorFields = errorFields.filter(
        item => item.name.indexOf(path) === -1
      );
      return {
        errorFields: newErrorFields,
      };
    });
  };

  // TODO: 提取出来，重新写一份，注意要处理async

  const getValues = () => formData;

  // 提交前需要先处理formData的逻辑
  const processData = data => {
    let _data = JSON.parse(JSON.stringify(data));
    // 1. bind = false 的处理
    const unbindKeys = Object.keys(flatten)
      .map(key => {
        const bind =
          flatten[key] && flatten[key].schema && flatten[key].schema.bind;
        if (bind === false) {
          return key;
        }
        return undefined;
      })
      .filter(key => !!key);
    const removeUnbindData = _data => {
      unbindKeys.forEach(key => {
        if (key.indexOf('[]') === -1) {
          _data = unset(_data, key); // TODO: 光remove了一个key，如果遇到remove了那个key上层的object为空了，object是不是也要去掉。。。不过感觉是伪需求
        } else {
          // const keys = key.split('[]').filter(k => !!k);
          // TODO: 贼复杂，之后写吧
        }
      });
    };
    removeUnbindData(_data);
    // 2. 去掉list里面所有的空值
    _data = removeEmptyItemFromList(_data);

    return _data;
  };

  const submit = () => {
    setState({ isValidating: true, allTouched: true, isSubmitting: true });
    //  https://formik.org/docs/guides/form-submission
    // TODO: 更多的处理，注意处理的时候一定要是copy一份formData，否则submitData会和表单操作实时同步的。。而不是submit再变动了

    // 开始校验。如果校验写在每个renderField，也会有问题，比如table第一页以外的数据是不渲染的，所以都不会触发，而且校验还有异步问题
    validateAll({ formData, schema: schemaRef.current }).then(res => {
      // 如果有错误，停止校验和提交
      if (res && res.length > 0) {
        setState({ isValidating: false, isSubmitting: false });
        return;
      }
      Promise.resolve(processData(formData)).then(res => {
        setState({
          isValidating: false,
          submitData: res,
        });
      });
    });
  };

  const resetFields = () => {
    setState({ formData: {} });
  };

  const setValue = (id, value, dataIndex) => {
    let path = id;
    if (dataIndex && Array.isArray(dataIndex)) {
      path = getDataPath(id, dataIndex);
    }
    onItemChange(path, value);
  };

  const endSubmitting = () =>
    setState({ isSubmitting: false, isValidating: false });

  const form = {
    // state
    formData,
    schema,
    // methods
    onItemChange,
    setValue,
    getValues,
    resetFields,
    submit,
    submitData,
    errorFields,
    isSubmitting,
    isValidating,
    endSubmitting,
    setErrorFields,
    removeValidation,
    isEditing,
    setEditing,
    bindSchema,
  };
  return form;
};
