/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import {
  flattenSchema,
  updateSchemaToNewVersion,
  schemaContainsExpression,
  parseExpression,
} from './utils';
import FR from './FR';
import { Ctx, StoreCtx, useSet } from './hooks';
import { widgets as defaultWidgets } from './widgets/antd';
import { mapping as defaultMapping } from './mapping';
import './atom.less';
import 'antd/dist/antd.less';
import './index.less';

// 其他入参 watch: {"a.b.c": (value) => { ... }, }

export { useForm } from './useForm';

function App({
  widgets,
  mapping,
  form,
  beforeFinish,
  onFinish,
  displayType = 'column',
  schema,
  flatten: _flatten,
  debug,
  locale = 'cn', // 'cn'/'en'
  debounceInput = false,
  size,
  isEditing,
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
    syncStuff,
    formData,
  } = form;

  // const flatten = _flatten || flattenSchema(schema);

  // let schema
  // if (schemaContainsExpression(_schema)) {
  //   console.log('parseAllExpression');
  //   schema = parseExpression(_schema, formData);
  // }

  const flatten = useMemo(() => _flatten || flattenSchema(schema), [
    JSON.stringify(_flatten),
    JSON.stringify(schema),
  ]);

  useEffect(() => {
    syncStuff({ schema, flatten, beforeFinish, locale });
  }, [JSON.stringify(_flatten), JSON.stringify(schema)]);

  const store = useMemo(
    () => ({
      flatten,
      ...form,
      displayType,
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

  let sizeCls = '';
  if (size === 'small') {
    sizeCls = 'fr-form-small';
  } else if (size === 'large') {
    sizeCls = 'fr-form-large';
  }

  // TODO: Ctx 这层暂时不用，所有都放在StoreCtx，之后性能优化在把一些常量的东西提取出来
  return (
    <StoreCtx.Provider value={store}>
      <Ctx.Provider value={tools}>
        <div className={`fr-container ${sizeCls}`}>
          {debug ? (
            <div className="mv2 bg-black-05 pa2 br2">
              <div>{'formData:' + JSON.stringify(form.formData)}</div>
              <div>{'errorFields:' + JSON.stringify(form.errorFields)}</div>
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

const VersionChanger = props => {
  const { isOldVersion = false, schema, ...rest } = props;

  useEffect(() => {
    // parseAllExpression(sch, {}, '#')
    // console.log(updateSchemaToNewVersion(test), 'updateSchemaToNewVersion');
  }, []);

  if (isOldVersion) {
    const _schema = updateSchemaToNewVersion(schema);
    return <App schema={_schema} {...rest} />;
  }
  return <App schema={schema} {...rest} />;
};

export default VersionChanger;
