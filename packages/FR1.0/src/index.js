/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { flattenSchema } from './utils';
import FR from './FR';
import { Ctx, StoreCtx, useSet } from './hooks';
import { widgets as defaultWidgets } from './widgets/antd';
import { mapping as defaultMapping } from './mapping';
import './tachyons.less';
import './index.less';

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
    isValidating,
    outsideValidating,
    isSubmitting,
    endValidating,
    endSubmitting,
    bindStuff,
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
    bindStuff({ schema, flatten: newFlatten, beforeFinish });
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
    // 需要外部校验的情况，此时 submitting 还是 false
    if (outsideValidating === true) {
      Promise.resolve(beforeFinish({ formData: submitData, errorFields })).then(
        () => {
          endValidating();
        }
      );
      return;
    }
    // 如果validation结束，submitting开始
    if (isValidating === false && isSubmitting === true) {
      endSubmitting();
      onFinish({ formData: submitData, errorFields });
    }
  }, [isValidating, isSubmitting, outsideValidating]);

  // TODO: Ctx 这层暂时不用，所有都放在StoreCtx，之后性能优化在把一些常量的东西提取出来
  return (
    <StoreCtx.Provider value={store}>
      <Ctx.Provider value={''}>
        <div className="fr-container">
          {debug ? (
            <div className="mv2 bg-black-05 pa2 br2">
              <div>{'formData:' + JSON.stringify(form.formData)}</div>
              <div>{'touchedKeys:' + JSON.stringify(form.touchedKeys)}</div>
              <div>{'isEditting:' + JSON.stringify(form.isEditing)}</div>
              <div>{'isValidating:' + JSON.stringify(form.isValidating)}</div>
              <div>{'isSubmitting:' + JSON.stringify(form.isSubmitting)}</div>
            </div>
          ) : null}
          <FR />
        </div>
      </Ctx.Provider>
    </StoreCtx.Provider>
  );
}

export { createWidget } from './HOC';

export default App;
