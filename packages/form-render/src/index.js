/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react';
import {
  flattenSchema,
  updateSchemaToNewVersion,
  getValueByPath,
  // completeSchemaWithTheme,
} from './utils';
import Core from './core';
import { Ctx, StoreCtx } from './hooks';
import { widgets as defaultWidgets } from './widgets/antd';
import { mapping as defaultMapping } from './mapping';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './atom.less';
import './index.less';

// 其他入参 watch: {"a.b.c": (value) => { ... }, }

const defaultFinish = (data, error) => {
  console.log(data, error);
};

export { defaultWidgets as widgets, defaultMapping as mapping };

export { useForm } from './useForm';
export { connectForm } from './connectForm';

function App({
  widgets,
  mapping,
  form,
  beforeFinish = defaultFinish,
  onFinish = defaultFinish,
  displayType = 'column',
  schema,
  flatten: _flatten,
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
  ...rest
}) {
  try {
    const _ = form.submit;
  } catch (error) {
    console.error('form 为必填 props，<FormRender /> 没有接收到 form 属性!');
  }

  const {
    submitData,
    errorFields,
    isValidating,
    outsideValidating,
    isSubmitting,
    endValidating,
    endSubmitting,
    syncStuff,
    formData,
    isEditing,
    setErrorFields,
  } = form;

  const flatten = useMemo(() => _flatten || flattenSchema(schema), [
    JSON.stringify(_flatten),
    JSON.stringify(schema),
  ]);

  useEffect(() => {
    syncStuff({ schema, flatten, beforeFinish, locale, validateMessages });
  }, [JSON.stringify(_flatten), JSON.stringify(schema)]);

  // 组件destroy的时候，destroy form，因为useForm可能在上层，所以不一定会跟着destroy
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  const store = useMemo(
    () => ({
      flatten,
      ...form,
      displayType,
      theme,
      debounceInput,
      debug,
      isEditing,
      ...rest,
    }),
    [
      JSON.stringify(flatten),
      JSON.stringify(formData),
      JSON.stringify(errorFields),
    ]
  );

  const tools = useMemo(
    () => ({
      widgets: { ...defaultWidgets, ...widgets },
      mapping: { ...defaultMapping, ...mapping },
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
    }
  }, [isValidating, isSubmitting, outsideValidating]);

  let sizeCls = '';
  if (size === 'small') {
    sizeCls = 'fr-form-small';
  } else if (size === 'large') {
    sizeCls = 'fr-form-large';
  }

  const watchList = Object.keys(watch);
  // TODO: Ctx 这层暂时不用，所有都放在StoreCtx，之后性能优化在把一些常量的东西提取出来
  return (
    <ConfigProvider locale={zhCN} {...configProvider}>
      <StoreCtx.Provider value={store}>
        <Ctx.Provider value={tools}>
          <div className={`fr-container ${sizeCls}`}>
            {debug ? (
              <div className="mv2 bg-black-05 pa2 br2">
                <div>{'formData:' + JSON.stringify(form.formData)}</div>
                <div>{'errorFields:' + JSON.stringify(form.errorFields)}</div>
                <div>{'touchedKeys:' + JSON.stringify(form.touchedKeys)}</div>
                <div>{'allTouched:' + JSON.stringify(form.allTouched)}</div>
                <div>{'isEditting:' + JSON.stringify(form.isEditing)}</div>
                <div>{'isValidating:' + JSON.stringify(form.isValidating)}</div>
                <div>{'isSubmitting:' + JSON.stringify(form.isSubmitting)}</div>
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
                    />
                  );
                })
              : null}
            <Core debugCss={debugCss} />
          </div>
        </Ctx.Provider>
      </StoreCtx.Provider>
    </ConfigProvider>
  );
}

export { createWidget } from './createWidget';

const Wrapper = props => {
  const { isOldVersion = true, schema, ...rest } = props;
  let _schema = schema;
  // let _schema = completeSchemaWithTheme(schema, theme);
  if (isOldVersion) {
    _schema = updateSchemaToNewVersion(schema);
  }
  return <App schema={_schema} {...rest} />;
};

export default Wrapper;

const Watcher = ({ watchKey, watch, formData }) => {
  const value = getValueByPath(formData, watchKey);
  const watchObj = watch[watchKey];
  const firstMount = useRef(true);

  useEffect(() => {
    const runWatcher = () => {
      if (typeof watchObj === 'function') {
        watchObj(value);
      } else if (watchObj && typeof watchObj.handler === 'function') {
        watchObj.handler(value);
      }
    };

    if (firstMount.current) {
      const immediate = watchObj && watchObj.immediate;
      if (immediate) {
        runWatcher();
      }
      firstMount.current = false;
    } else {
      runWatcher();
    }
  }, [JSON.stringify(value)]);
  return null;
};
