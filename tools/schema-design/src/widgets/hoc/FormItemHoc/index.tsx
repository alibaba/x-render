import React from 'react';
import { Form, Col } from 'antd';
import FormContext from '../../utils/context';
import { getLabel, getColSpan } from './module';

import getFormItemLayout from '../../utils/layout';

function withFormItemHoc(WrapperComponent: any) {
  return class FormItemHoc extends React.Component<any, any> {
    static contextType = FormContext;

    componentDidMount() {
      // const formRef = this.context.getForm();
      // this.setState({ formRef });
    }

    getValueFromKey = (key: string) => {
      return this.props[key] ?? this.context[key];
    }

    render() {
      const { componentId, props, title, description, defaultValue: initialValue, ...otherItem } = this.props;
      const formItemProps = { ...otherItem, initialValue };
    
      const _labelCol = this.getValueFromKey('labelCol');
      const _fieldCol = this.getValueFromKey('fieldCol');
      const displayType = this.getValueFromKey('displayType');
      const labelWidth = this.getValueFromKey('labelWidth');
      const column = this.getValueFromKey('column');
      const span = getColSpan(column, this.props);

      const { labelCol, fieldCol } = getFormItemLayout(Math.floor(24 / span * 1), this.props, { displayType, labelWidth, _labelCol, _fieldCol });
      
      const content = (
        <Form.Item 
          {...formItemProps} 
          name={componentId+ initialValue}
          label={getLabel(title, description)}
          labelCol={labelCol}
          wrapperCol={fieldCol}
        >
          <WrapperComponent {...props} />
        </Form.Item>
      );

      return (
        <Col span={span || 24}>{content}</Col>
      );
    }
  }
}

export default withFormItemHoc;
