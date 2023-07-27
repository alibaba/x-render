import React, { useEffect, useContext } from 'react';
import { Form, Grid } from 'antd-mobile';
import { useStore } from 'zustand';
import cx from 'classnames';

import { valueRemoveUndefined, _cloneDeep, isFunction } from '../utils';
import { FRContext } from '../models/context';
import transformProps from '../models/transformProps';
import { parseValuesToBind } from '../models/bindValues';

import {
  valuesWatch,
  immediateWatch,
  yymmdd,
  msToTime,
  getSessionItem,
  setSessionItem
} from '../models/formCoreUtils';
import RenderCore from '../render-core';

import './index.less';

const FormCore = (props: any) => {
  const store: any = useContext(FRContext);
  const schema = useStore(store, (state: any) => state.schema);
  const flattenSchema = useStore(store, (state: any) => state.flattenSchema);
  const setContext = useStore(store, (state: any) => state.setContext);
  const isCardMode = useStore(store, (state: any) => state.isCardMode);

  const { type, properties, ...schemaProps } = schema || {};
  const {
    formProps,
    displayType,
    beforeFinish,
    watch,
    onMount,
    column,
    labelWidth,
    labelCol,
    fieldCol,
    maxWidth,
    form,
    onFinish,
    onFinishFailed,
    readOnly,
    removeHiddenData,
    logOnMount,
    logOnSubmit,
    className,
    id,
  } = transformProps({ ...props, ...schemaProps });

  useEffect(() => {
    form.__initStore(store);
    setTimeout(initial, 0);
  }, []);

  useEffect(() => {
    form.setSchema(props.schema, true);
  }, [JSON.stringify(props.schema || {})]);

  useEffect(() => {
    const context = {
      column,
      readOnly,
      labelWidth,
      displayType,
      labelCol,
      fieldCol,
      maxWidth
    };
    setContext(context);
  }, [column, labelCol, fieldCol, displayType, labelWidth, maxWidth, readOnly]);

  const initial = async () => {
    onMount && await onMount();
    const values = form.getValues();
    immediateWatch(watch, values);
    onMountLogger();
  };

  const onMountLogger = () => {
    const start = new Date().getTime();
    if (isFunction(logOnMount)|| isFunction(logOnSubmit)) {
      setSessionItem('FORM_MOUNT_TIME', start);
      setSessionItem('FORM_START', start);
    }
    if (isFunction(logOnMount)) {
      const logParams: any = {
        schema: props.schema,
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
    if (isFunction(logOnSubmit)) {
      setSessionItem('NUMBER_OF_SUBMITS', 0);
      setSessionItem('FAILED_ATTEMPTS', 0);
    }
  };

  const onSubmitLogger = (params: any) => {
    if (!isFunction(logOnSubmit)) {
      return;
    }
   
    const start = getSessionItem('FORM_START');
    const mount = getSessionItem('FORM_MOUNT_TIME');

    const numberOfSubmits = getSessionItem('NUMBER_OF_SUBMITS') + 1;
    const end = new Date().getTime();

    let failedAttempts = getSessionItem('FAILED_ATTEMPTS');
    if (params.errorFields.length > 0) {
      failedAttempts = failedAttempts + 1;
    }
    const logParams: any = {
      formMount: yymmdd(mount),
      ms: end - start,
      duration: msToTime(end - start),
      numberOfSubmits: numberOfSubmits,
      failedAttempts: failedAttempts,
      url: location.href,
      formData: JSON.stringify(params.values),
      errors: JSON.stringify(params.errorFields),
      schema: JSON.stringify(schema),
    };
    if (id) {
      logParams.id = id;
    }
    logOnSubmit(logParams);
    setSessionItem('FORM_START', end);
    setSessionItem('NUMBER_OF_SUBMITS', numberOfSubmits);
    setSessionItem('FAILED_ATTEMPTS', failedAttempts);
  };

  const handleValuesChange = (changedValues: any, _allValues: any) => {
    const allValues = valueRemoveUndefined(_allValues, true);
    valuesWatch(changedValues, allValues, watch);
  };

  const handleFinish = async (_values: any) => {
    onSubmitLogger({ values: _values });
    let values = _cloneDeep(_values);
    if (!removeHiddenData) {
      values = _cloneDeep(form.getFieldsValue(true));
    }
    values = parseValuesToBind(values, flattenSchema);
    values = valueRemoveUndefined(values);

    let fieldsError = beforeFinish
      ? await beforeFinish({ data: values, schema, errors: [] })
      : null;

    // console.log(values, form.getValues(true));
    // Stop submit
    if (fieldsError) {
      form.setFields(fieldsError);
      return;
    }

    onFinish && onFinish(values, []);
  };

  const handleFinishFailed = async (params: any) => {
    onSubmitLogger(params);
    if (!onFinishFailed) {
      return;
    }
    let values = _cloneDeep(params?.values);
    if (!removeHiddenData) {
      values = _cloneDeep(form.getFieldsValue(true));
    }
    values = parseValuesToBind(values, flattenSchema);
    values = valueRemoveUndefined(values);

    onFinishFailed({ ...params, values });
  };

  const formClassName = cx('frm-form', className, {
    ['frm-form-card']: isCardMode,
  });

  return (
    <Form
      {...formProps}
      className={formClassName}
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      onValuesChange={handleValuesChange}
    >
      <Grid columns={1}>
        <RenderCore schema={schema} />
      </Grid>
    </Form>
  );
}

export default FormCore;
