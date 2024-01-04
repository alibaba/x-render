import React, { Component } from 'react';
import { Form, Col } from 'antd';
import FormContext from '../../utils/context';

function withColHoc(WrapperComponent: any) {
  return class ColHoc extends Component<any, any> {

    render() {
      return (
        <Col span={24}>
          <WrapperComponent {...this.props}/>
        </Col>
      );
    }
  }
}

export default withColHoc;
