import React, { useEffect, useContext } from 'react';
import { Form, Row, Col, Button, Space, ConfigProvider } from 'antd';
import { useStore } from 'zustand';

import { valueRemoveUndefined, _cloneDeep, translation } from '../utils';
import { FRContext } from '../models/context';
import transformProps from '../models/transformProps';
import { parseValuesWithBind } from '../models/bindValues';
import { getFormItemLayout } from '../models/layout';

import {
  transformFieldsError,
  valuesWatch,
  immediateWatch,
} from '../models/formCoreUtils';
import RenderCore from '../render-core';

import './index.less';

const FormCore = (props: any) => {
  const store = useContext(FRContext);
  const schema = useStore(store, (state: any) => state.schema);
  const flattenSchema = useStore(store, (state: any) => state.flattenSchema);
  const setContext = useStore(store, (state: any) => state.setContext);

  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const { type, properties, ...schemProps } = schema || {};
  const {
    formProps,
    displayType,
    beforeFinish,
    watch,
    onMount,
    column,
    labelWidth,
    form,
    onFinish,
    onFinishFailed,
    readOnly,
    builtOperation,
    removeHiddenData,
    operateExtra,
  } = transformProps({ ...props, ...schemProps });
  const { labelCol, wrapperCol } = formProps;

  useEffect(() => {
    form.__setStore(store);
    setTimeout(() => {
      onMount && onMount();
      const values = form.getValues();
      immediateWatch(watch, values);
    }, 0);
  }, []);

  useEffect(() => {
    form.setSchema(props.schema, true);
  }, [props.schema]);

  useEffect(() => {
    const context = {
      column,
      labelCol,
      wrapperCol,
      readOnly,
      labelWidth,
      displayType,
    };
    setContext(context);
  }, [column, labelCol, wrapperCol, displayType, labelWidth]);

  const handleValuesChange = (changedValues: any, _allValues: any) => {
    const allValues = valueRemoveUndefined(_allValues);
    valuesWatch(changedValues, allValues, watch);
  };

  const handleFinish = async (_values: any) => {
    let values = _cloneDeep(_values);
    if (!removeHiddenData) {
      values = _cloneDeep(form.getFieldsValue(true));
    }
    values = parseValuesWithBind(values, flattenSchema);
    values = valueRemoveUndefined(values);

    let fieldsError = beforeFinish
      ? await beforeFinish({ data: values, schema, errors: [] })
      : null;
    fieldsError = transformFieldsError(fieldsError);

    // console.log(values);
    // Stop submit
    if (fieldsError) {
      form.setFields(fieldsError);
      return;
    }

    onFinish && onFinish(values, []);
  };

  const handleFinishFailed = async (params: any) => {
    if (!onFinishFailed) {
      return;
    }
    let values = _cloneDeep(params?.values);
    if (!removeHiddenData) {
      values = _cloneDeep(form.getFieldsValue(true));
    }
    values = parseValuesWithBind(values, flattenSchema);
    values = valueRemoveUndefined(values);

    onFinishFailed({ ...params, values });
  };

  const operlabelCol = getFormItemLayout(column, {}, { labelWidth })?.labelCol;

  return (
    <Form
      labelWrap={true}
      {...formProps}
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      onValuesChange={handleValuesChange}
    >
      <Row gutter={displayType === 'row' ? 16 : 24}>
        <RenderCore schema={schema} />
        {operateExtra}
      </Row>
      {builtOperation && (
        <Row gutter={displayType === 'row' ? 16 : 24}>
          <Col span={24 / column}>
            <Form.Item
              label={ displayType !== 'column' ?  'hideLabel' : null}
              labelCol={operlabelCol}
              className='fr-hide-label'
            >
              <Space>
                <Button type='primary' htmlType='submit'>
                  {t('submit')}
                </Button>
                <Button onClick={() => form.resetFields()}> {t('reset')}</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
}

export default FormCore;
