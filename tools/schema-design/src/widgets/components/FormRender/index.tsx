import React, { Component, createRef } from 'react';
import Main from './main';
import './index.less';

class ProForm extends Component<any, any> {
  formRef = createRef<any>();
  submitTypeRef = createRef<any>();

 


  render() {
    return (
      <Main
      {...this.props}
      formRef={this.formRef}
      submitTypeRef={this.submitTypeRef}
    />
    )
  }
}

export default ProForm;