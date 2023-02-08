import React, { useEffect, useContext } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import { useStore } from 'zustand';
import { isUndefined, omitBy, cloneDeep } from 'lodash-es';

import { FRContext } from '../models/context';
import transformProps from '../models/transformProps';
import { parseValuesWithBind } from '../models/bindValues';
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
      const values = omitBy(form.getValues(), isUndefined);
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

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const _allValues = omitBy(allValues, isUndefined);
    valuesWatch(changedValues, _allValues, watch);
  };

  const handleFinish = async (_values: any) => {
    let values = cloneDeep(_values);
    if (!removeHiddenData) {
      values = cloneDeep(form.getFieldsValue(true));
    }
    values = parseValuesWithBind(values, flattenSchema);
    values = omitBy(values, isUndefined);

    let fieldsError = beforeFinish
      ? await beforeFinish({ data: values, schema, errors: [] })
      : null;
    fieldsError = transformFieldsError(fieldsError);

    console.log(values);
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
    let values = cloneDeep(params?.values);
    if (!removeHiddenData) {
      values = cloneDeep(form.getFieldsValue(true));
    }
    values = parseValuesWithBind(values, flattenSchema);
    values = omitBy(values, isUndefined);

    onFinishFailed({ ...params, values });
  };

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
              label='hideLabel'
              labelCol={labelCol}
              className='fr-hide-label'
            >
              <Space>
                <Button type='primary' htmlType='submit'>
                  提交
                </Button>
                <Button onClick={() => form.resetFields()}>重置</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
}

export default FormCore;
