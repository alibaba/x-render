import React, { useContext } from 'react';
import { Form, Col } from 'antd';

import { FormContext, ParentContext } from '../utils/context';
import { getParamValue } from './common';


const FieldList = (props: any) => {
  const formCtx: any = useContext(FormContext);
  const parentCtx: any = useContext(ParentContext);

  const widgets = formCtx.widgets;


  const { schema, path, parentLitPath, renderCore, max, rootPath } = props;
  console.log(props, 'fieldProps');
  const { title: label, widget } = schema;
  let widgetName = widget || 'list1';
  const Widget = widgets[widgetName];
  

  let span = 24;
  if (formCtx.column) {
    span = 24 / formCtx.column;
  }

  if (schema.width === '100%') {
    span = 24;
  }

 const handleOnAdd = () => {

 }

 const handleOnRemove = () => {

 }

 const handleOnMove = () => {

 }

 const getValueFromKey = getParamValue(formCtx, parentCtx, schema);

  //const span = getColSpan(formCtx, parentCtx, schema);
  const labelCol = getValueFromKey('labelCol');
  const wrapperCol = getValueFromKey('wrapperCol');
  const readyOnly = getValueFromKey('readyOnly');






 const preRootPath = (rootPath || []).splice(0, rootPath.length-1);


  return (
    <Col span={24}>
      <Form.Item label={label} wrapperCol={{ span: 22 }} labelCol={{ span : 2 }}>
        <Widget
          name={path}
          schema={schema}
          parentLitPath={parentLitPath}
          rootPath={preRootPath}
          readyOnly={readyOnly}
        />
      </Form.Item>
    </Col>
  );
}

export default FieldList;
