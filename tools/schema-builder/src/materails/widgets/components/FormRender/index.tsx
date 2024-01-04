import React from 'react';
import { Form, Row } from 'antd';
import FormContext from '../../utils/context';
import './index.less';

const layoutMap: any = {
  column: 'vertical',
  row: 'horizontal',
  inline: 'inline'
}

export default (props: any) => {
  const { children, displayType='column', ...otherProps } = props;

  const {
    labelWidth,
    labelCol,
    fieldCol,
    column,
    maxWidth,
    formRef,
  } = props;

  const context = {
    displayType,
    column,
    labelWidth,
    maxWidth,
    labelCol,
    fieldCol,
    getForm: () => {
      return formRef;
    }
  };


  return (
    <FormContext.Provider value={context}>
      <Form
        labelWrap={true}
        layout={layoutMap[displayType]}
        className="form-design"
        {...otherProps}
      >
        <Row gutter={0}>
          {children}
        </Row>
      </Form>
    </FormContext.Provider>
  );
}