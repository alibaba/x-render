/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { flattenSchema } from './utils';
import FR from './FR';
import { Ctx, StoreCtx, useSet } from './hooks';
import { widgets as defaultWidgets } from './widgets/antd';
import { mapping as defaultMapping } from './mapping';
import 'tachyons';
import './index.css';

// 其他入参 watch: {"a.b.c": (value) => { ... }, }

export { useForm } from './useForm';

function App({
  widgets,
  mapping,
  form,
  beforeFinish,
  onFinish,
  displayType,
  schema,
  initialData,
  flatten: _flatten,
  debug,
  ...rest
}) {
  const {
    submitData,
    errorFields,
    isSubmitting,
    isValidating,
    endSubmitting,
    bindSchema,
    onItemChange,
    formData,
  } = form;

  const [state, setState] = useSet({
    flatten: {}, // // schema 在内部通用转换成 flatten，一般就一次转换。schema便于书写，flatten便于数据处理
  });

  const { flatten } = state;

  // window.blog(flatten, form.formData);
  const store = {
    flatten,
    ...form,
    widgets: { ...defaultWidgets, ...widgets },
    mapping: { ...defaultMapping, ...mapping },
    displayType: displayType || 'column',
    ...rest,
  };

  useEffect(() => {
    const newFlatten = _flatten || flattenSchema(schema);
    bindSchema({ schema, flatten: newFlatten });
    setState({ flatten: newFlatten });
  }, [
    JSON.stringify(_flatten),
    JSON.stringify(schema),
    JSON.stringify(formData),
  ]);

  useEffect(() => {
    onItemChange('#', initialData);
  }, [JSON.stringify(initialData)]);

  useEffect(() => {
    // 如果validation结束，但是submitting开始
    if (!isValidating && isSubmitting) {
      if (beforeFinish && typeof beforeFinish === 'function') {
        Promise.resolve(beforeFinish({ formData: submitData, errorFields }))
          .then(_ => {
            Promise.resolve(onFinish({ formData: submitData, errorFields }));
          })
          .then(endSubmitting);
      } else {
        Promise.resolve(onFinish({ formData: submitData, errorFields })).then(
          endSubmitting
        );
      }
    }
  }, [isValidating, isSubmitting]);

  // TODO: Ctx 这层暂时不用，所有都放在StoreCtx，之后性能优化在把一些常量的东西提取出来
  return (
    <StoreCtx.Provider value={store}>
      <Ctx.Provider value={{}}>
        {debug ? (
          <>
            <div>{'isEditting:' + JSON.stringify(form.isEditing)}</div>
            <div>{'isValidating:' + JSON.stringify(form.isValidating)}</div>
            <div>{'isSubmitting:' + JSON.stringify(form.isSubmitting)}</div>
          </>
        ) : null}
        <div className="fr-wrapper">
          <FR />
        </div>
      </Ctx.Provider>
    </StoreCtx.Provider>
  );
}

export { createWidget } from './HOC';

export default App;
