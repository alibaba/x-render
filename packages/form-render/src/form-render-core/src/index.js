/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react';
import {
  updateSchemaToNewVersion,
  msToTime,
  yymmdd,
  getParamByName,
} from './utils';
import Core from './core';
import Watcher from './Watcher';
import { Ctx, StoreCtx, Store2Ctx } from './hooks';
import './atom.less';
import './index.less';
import { mapping as defaultMapping } from './mapping';

const defaultFinish = (data, errors) => {
  console.log('onFinish:', { data, errors });
};

export { default as useForm } from './useForm';
export { defaultMapping as mapping };
export { default as connectForm } from './connectForm';

function App({
  id,
  widgets,
  mapping,
  form,
  className,
  style,
  beforeFinish,
  onFinish = defaultFinish,
  displayType = 'column',
  schema,
  debug,
  debugCss,
  locale = 'cn', // 'cn'/'en'
  debounceInput = false,
  size,
  configProvider,
  theme,
  validateMessages,
  watch = {},
  config,
  onMount,
  labelWidth,
  readOnly,
  disabled,
  allCollapsed = false,
  onValuesChange,
  column,
  removeHiddenData = false,
  globalProps = {},
  ...rest
}) {
  try {
    const _ = form.submit;
  } catch (error) {
    console.error('form 为必填 props，<FormRender /> 没有接收到 form 属性!');
  }

  const _column = (schema && schema.column) || column;
  const {
    onItemChange,
    setEditing,
    touchKey,
    setValueByPath,
    getSchemaByPath,
    setSchemaByPath,
    setSchema,
    setValues,
    getValues,
    resetFields,
    submit,
    endValidating,
    endSubmitting,
    setErrorFields,
    removeErrorField,
    removeTouched,
    changeTouchedKeys,
    syncStuff,
    logOnMount,
    logOnSubmit,
    setFirstMount,
    _setErrors,
    ...valuesThatWillChange
  } = form;

  const {
    submitData,
    errorFields,
    isValidating,
    outsideValidating,
    isSubmitting,
    formData,
    flatten,
    showValidate, // 旧版折中升级方案里，旧的api的软兼容
    firstMount,
  } = valuesThatWillChange;

  useEffect(() => {
    // Schema最外层的type是object来判断，没有的话，认为schema没有传
    if (schema && schema.type) {
      setFirstMount(true);
      syncStuff({
        schema,
        locale,
        validateMessages,
        beforeFinish,
        onMount,
        removeHiddenData,
      });
    } else {
    }
  }, [JSON.stringify(schema)]);

  useEffect(() => {
    if (!firstMount && schema && schema.type) {
      if (typeof onMount === 'function') {
        // 等一下 useForm 里接到第一份schema时，计算第一份data的骨架
        setTimeout(() => {
          onMount();
        }, 0);
      }
      setTimeout(onMountLogger, 0);
    }
  }, [JSON.stringify(schema), firstMount]);

  const onMountLogger = () => {
    const start = new Date().getTime();
    if (typeof logOnMount === 'function' || typeof logOnSubmit === 'function') {
      sessionStorage.setItem('FORM_MOUNT_TIME', start);
      sessionStorage.setItem('FORM_START', start);
    }
    if (typeof logOnMount === 'function') {
      const logParams = {
        schema,
        url: location.href,
        formData: JSON.stringify(form.getValues()),
        formMount: yymmdd(start),
      };
      if (id) {
        logParams.id = id;
      }
      logOnMount(logParams);
    }
    // 如果是要计算时间，在 onMount 时存一个时间戳
    if (typeof logOnSubmit === 'function') {
      sessionStorage.setItem('NUMBER_OF_SUBMITS', 0);
      sessionStorage.setItem('FAILED_ATTEMPTS', 0);
    }
  };

  // 组件destroy的时候，destroy form，因为useForm可能在上层，所以不一定会跟着destroy
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  const store = useMemo(
    () => ({
      ...valuesThatWillChange,
      globalProps,
      ...rest,
    }),
    [
      JSON.stringify(flatten),
      JSON.stringify(formData),
      JSON.stringify(errorFields),
      JSON.stringify(globalProps),
    ]
  );

  // 不常用的context单独放一个地方
  const store2 = useMemo(
    () => ({
      displayType,
      theme,
      column: _column,
      debounceInput,
      debug,
      labelWidth,
      locale,
      validateMessages,
      readOnly,
      disabled,
      allCollapsed,
      showValidate,
    }),
    [
      displayType,
      theme,
      _column,
      debounceInput,
      debug,
      labelWidth,
      locale,
      validateMessages,
      readOnly,
      disabled,
      allCollapsed,
      showValidate,
    ]
  );

  const tools = useMemo(
    () => ({
      widgets,
      mapping: { ...defaultMapping, ...mapping },
      onValuesChange,
      ...form,
      // setEditing,
      // touchKey,
      // onItemChange,
      // _setErrors,
      // setValueByPath,
      // getSchemaByPath,
      // setSchemaByPath,
      // setSchema,
      // setValues,
      // getValues,
      // resetFields,
      // setErrorFields,
      // removeErrorField,
    }),
    []
  );

  useEffect(() => {
    // 需要外部校验的情况，此时 submitting 还是 false
    if (outsideValidating === true) {
      Promise.resolve(
        beforeFinish({
          data: submitData,
          schema,
          errors: errorFields,
          ...config,
        })
      ).then(error => {
        if (error) {
          setErrorFields(error);
        }
        endValidating();
      });
      return;
    }
    // 如果validation结束，submitting开始
    if (isValidating === false && isSubmitting === true) {
      endSubmitting();
      onFinish(submitData, errorFields);
      if (typeof logOnSubmit === 'function') {
        const start = sessionStorage.getItem('FORM_START');
        const mount = sessionStorage.getItem('FORM_MOUNT_TIME');
        const numberOfSubmits =
          Number(sessionStorage.getItem('NUMBER_OF_SUBMITS')) + 1;
        const end = new Date().getTime();
        let failedAttempts = Number(sessionStorage.getItem('FAILED_ATTEMPTS'));
        if (errorFields.length > 0) {
          failedAttempts = failedAttempts + 1;
        }
        const logParams = {
          formMount: yymmdd(mount),
          ms: end - start,
          duration: msToTime(end - start),
          numberOfSubmits: numberOfSubmits,
          failedAttempts: failedAttempts,
          url: location.href,
          formData: JSON.stringify(submitData),
          errors: JSON.stringify(errorFields),
          schema: JSON.stringify(schema),
        };
        if (id) {
          logParams.id = id;
        }
        logOnSubmit(logParams);
        sessionStorage.setItem('FORM_START', end);
        sessionStorage.setItem('NUMBER_OF_SUBMITS', numberOfSubmits);
        sessionStorage.setItem('FAILED_ATTEMPTS', failedAttempts);
      }
    }
  }, [isValidating, isSubmitting, outsideValidating]);

  // TODO: fk doesn't work
  let sizeCls = '';
  if (size === 'small') {
    sizeCls = 'fr-form-small';
  } else if (size === 'large') {
    sizeCls = 'fr-form-large';
  }

  const rootProps = {
    className: `fr-container ${sizeCls} ${className || ''}`,
  };

  if (style && typeof style === 'object') {
    rootProps.style = style;
  }

  if (id && ['number', 'string'].indexOf(typeof id) > -1) {
    rootProps.id = id;
  }

  const debugForm = getParamByName('_debug_form');
  const debugFormCss = getParamByName('_debug_form_css');
  const isPre = location.href.indexOf('pre') > -1;

  const watchList = Object.keys(watch);
  return (
    <StoreCtx.Provider value={store}>
      <Store2Ctx.Provider value={store2}>
        <Ctx.Provider value={tools}>
          <div {...rootProps}>
            {(isPre && debugForm) || debug ? (
              <div className="mv2 bg-black-05 pa2 br2">
                <div style={{ display: 'flex' }}>
                  <span>formData:</span>
                  <span
                    style={{
                      display: 'inline-block',
                      wordBreak: 'break-all',
                      maxWidth: 600,
                    }}
                  >
                    {JSON.stringify(form.formData)}
                  </span>
                </div>
                <div>{'errorFields:' + JSON.stringify(form.errorFields)}</div>
                <div>{'touchedKeys:' + JSON.stringify(form.touchedKeys)}</div>
                <div>{'allTouched:' + JSON.stringify(form.allTouched)}</div>
                <div>{'descriptor:' + JSON.stringify(window.descriptor)}</div>
                {/* <textarea
                    style={{ width: 500, height: 300 }}
                    value={'schema:' + JSON.stringify(flatten, null, 2)}
                    onChange={() => {}}
                  /> */}
              </div>
            ) : null}
            {watchList.length > 0
              ? watchList.map((item, idx) => {
                  return (
                    <Watcher
                      key={idx.toString()}
                      watchKey={item}
                      watch={watch}
                      formData={formData}
                      firstMount={firstMount}
                    />
                  );
                })
              : null}
            <Core debugCss={(isPre && debugFormCss) || debugCss} />
          </div>
        </Ctx.Provider>
      </Store2Ctx.Provider>
    </StoreCtx.Provider>
  );
}

export { createWidget } from './createWidget';

const Wrapper = props => {
  const { isOldVersion = true, schema, ...rest } = props || {};
  let _schema = useRef(schema);
  if (isOldVersion) {
    _schema.current = updateSchemaToNewVersion(schema);
  }

  return <App schema={_schema.current} {...rest} />;
};

export default Wrapper;
