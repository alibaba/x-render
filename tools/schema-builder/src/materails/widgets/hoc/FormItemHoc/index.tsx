import React from 'react';
import { Form, Col } from 'antd';
import FormContext, { ParentContext } from '../../utils/context';
import { getLabel, getColSpan } from './module';

import getFormItemLayout from '../../utils/layout';



const RenderItem = (_props: any) => {
  const { WrapperComponent, getValueFromKey, staticProps, componentId, props, title, description, defaultValue: initialValue, hidden, ...otherItem } = _props;
      const formItemProps = { ...otherItem, initialValue };
    
      const _labelCol = getValueFromKey('labelCol');
      const _fieldCol = getValueFromKey('fieldCol');
      const displayType = getValueFromKey('displayType');
      const labelWidth = getValueFromKey('labelWidth');
      const column = getValueFromKey('column');
      const span = getColSpan(column, _props);

      const { labelCol, fieldCol } = getFormItemLayout(Math.floor(24 / span * 1), _props, { displayType, labelWidth, _labelCol, _fieldCol });
      
      const content = (
        <Form.Item 
          {...formItemProps} 
          name={componentId+ initialValue}
          label={getLabel(title, description)}
          labelCol={labelCol}
          wrapperCol={fieldCol}
        >
          <WrapperComponent
            style={{
              ...staticProps?.style,
              ...props?.style
            }}
            {...props} 
          />
        </Form.Item>
      );

      return (
        <Col span={span || 24}>{content}</Col>
      );
}






function withFormItemHoc(WrapperComponent: any, staticProps?: any) {
  return class FormItemHoc extends React.Component<any, any> {
    getValueFromKey = (formCtx: any, parentCtx: any) => (key: string) => {
      return this.props[key] ?? parentCtx[key] ?? formCtx[key];
    }

    render() {
      return (
        <FormContext.Consumer>
          {formCtx => (
            <ParentContext.Consumer>
              {parentCtx => <RenderItem {...this.props} getValueFromKey={this.getValueFromKey(formCtx, parentCtx)} WrapperComponent={WrapperComponent} staticProps={staticProps} />}
            </ParentContext.Consumer>
          )}
        </FormContext.Consumer>
      )
    }
  }
}

export default withFormItemHoc;
