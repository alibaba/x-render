/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { validateAll } from './validator';
import { useSet } from './hooks';
import { set, sortedUniqBy } from 'lodash';
import {
  processData,
  transformDataWithBind,
  transformDataWithBind2,
  getDataWithDefault,
} from './processData';

export const useForm = props => {
  const {
    // 为了更平滑兼容 0.x，如果外部传入状态，那么使用外部的状态
    formData: _formData,
    onChange: _onChange,
    onValidate: _onValidate,
  } = props || {};

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
  });

  const schemaRef = useRef();
  const flattenRef = useRef();
  const clickSubmit = useRef(false); // 点击submit的那一下，不要执行useEffect里的validate
  const beforeFinishRef = useRef();
  const localeRef = useRef('cn');

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
    // statusTree, // 和formData一个结构，但是每个元素是 { $touched } 存放那些在schema里无需表达的状态, 看看是否只有touched。目前statusTree没有被使用
  } = state;

  const dataFromOutside = props && props.hasOwnProperty('formData');

  const formData = dataFromOutside ? _formData : innerData;

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
      const oldFormatErrors = errors.map(item => item.name);
      _onValidate(oldFormatErrors);
    }
    setState({ errorFields: errors });
  };

  const touchKey = key => {
    if (touchedKeys.indexOf(key) > -1) {
      return;
    }
    const newKeyList = [...touchedKeys, key];
    setState({ touchedKeys: newKeyList });
  };

  // 为了兼容 0.x
  useEffect(() => {
    // 如果是外部数据，submit没有收束，无校验
    if (dataFromOutside && typeof _onValidate === 'function') {
      setTimeout(() => {
        const _data = getDataWithDefault(formData, flattenRef.current);
        validateAll({
          formData: _data,
          schema: schemaRef.current,
          isRequired: true,
          touchedKeys,
          locale: localeRef.current,
        }).then(res => {
          const oldFormatErrors = res.map(item => item.name);
          _onValidate(oldFormatErrors);
        });
      }, 200);
    }
  }, []);

  // 这里导致第二次的渲染
  useEffect(() => {
    if (clickSubmit.current) {
      clickSubmit.current = false;
      return;
    }
    const _data = getDataWithDefault(formData, flattenRef.current);
    validateAll({
      formData: _data,
      schema: schemaRef.current,
      isRequired: allTouched,
      touchedKeys,
      locale: localeRef.current,
    }).then(res => {
      _setErrors(res);
      window.NOTHING_CHANGED_IN_WIDGETS = true;
      // 如果500ms内触发多次，试着减少一些不必要的渲染（见ExtendedWidget）TODO: 这个不是最优解
      setTimeout(() => {
        window.NOTHING_CHANGED_IN_WIDGETS = false;
      }, 500);
    });
    // console.log('validateAll', formData, allTouched);
  }, [JSON.stringify(formData), allTouched]);

  const setEditing = isEditing => {
    setState({ isEditing });
  };

  const onItemChange = (path, value) => {
    if (typeof path !== 'string') return;
    if (path === '#') {
      _setData({ ...value });
      return;
    }
    set(formData, path, value);
    _setData({ ...formData });
  };

  // TODO: 全局的没有path, 这个函数要这么写么。。全局的，可以path = #
  // errorFields: [
  //   { name: 'a.b.c', errors: ['Please input your Password!', 'something else is wrong'] },
  // ]

  const syncStuff = ({ schema, flatten, beforeFinish, locale }) => {
    schemaRef.current = schema;
    flattenRef.current = flatten;
    beforeFinishRef.current = beforeFinish;
    localeRef.current = locale;
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
    _setErrors(newErrorFields);
  };
  // TODO: 提取出来，重新写一份，注意要处理async

  const getValues = () => transformDataWithBind(formData, flattenRef.current);

  const setValues = newFormData => {
    const newData = transformDataWithBind2(newFormData, flattenRef.current);
    _setData(newData);
  };

  const submit = () => {
    clickSubmit.current = true;
    setState({ isValidating: true, allTouched: true, isSubmitting: false });
    //  https://formik.org/docs/guides/form-submission
    // TODO: 更多的处理，注意处理的时候一定要是copy一份formData，否则submitData会和表单操作实时同步的。。而不是submit再变动了

    // 开始校验。如果校验写在每个renderField，也会有问题，比如table第一页以外的数据是不渲染的，所以都不会触发，而且校验还有异步问题

    const _data = getDataWithDefault(formData, flattenRef.current);

    validateAll({
      formData: _data,
      schema: schemaRef.current,
      touchedKeys: [],
      isRequired: true,
      locale: localeRef.current,
    })
      .then(errors => {
        // 如果有错误，停止校验和提交
        if (errors && errors.length > 0) {
          console.log('submit:', _data, errors);
          setState({
            isValidating: false,
            isSubmitting: false,
            errorFields: errors,
          });
          return;
        }
        if (typeof beforeFinishRef.current === 'function') {
          Promise.resolve(processData(_data, flattenRef.current)).then(res => {
            setState({
              isValidating: true,
              isSubmitting: false,
              outsideValidating: true,
              submitData: res,
            });
          });
          return;
        }
        Promise.resolve(processData(_data, flattenRef.current)).then(res => {
          setState({
            isValidating: false,
            isSubmitting: true,
            submitData: res,
          });
        });
      })
      .catch(err => {
        // 不应该走到这边的
        console.log('submit error:', err);
      });
  };

  const resetFields = () => {
    _setData({});
  };

  // const setValue = (id, value, dataIndex) => {
  //   let path = id;
  //   if (dataIndex && Array.isArray(dataIndex)) {
  //     path = getDataPath(id, dataIndex);
  //   }
  //   onItemChange(path, value);
  // };

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
    formData,
    schema: schemaRef.current,
    touchedKeys,
    // methods
    touchKey,
    onItemChange,
    // setValue, // 单个
    setValues,
    getValues,
    resetFields,
    submit,
    submitData,
    errorFields,
    isValidating,
    outsideValidating,
    isSubmitting,
    endValidating,
    endSubmitting,
    setErrorFields,
    isEditing,
    setEditing,
    syncStuff,
  };
  return form;
};
