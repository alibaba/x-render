import React, { createRef, Component } from 'react';

function withFormHoc(WrapperComponent: any) {
  return class FormHoc extends Component<any, any> {
    formRef = createRef<any>();

    render() {
      return (
        <WrapperComponent
          {...this.props}
          formRef={this.formRef}
        />
      );
    }
  }
}

export default withFormHoc;