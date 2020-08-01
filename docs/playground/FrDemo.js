import React from 'react';
import ReactDOM from 'react-dom';
import FormRender from 'form-render/lib/antd';
import SCHEMA from './schema.json';

class Demo extends React.Component {
  state = { formData: SCHEMA.formData || {} };

  onChange = formData => {
    this.setState({ formData });
  };

  onValidate = valid => {
    console.log('没有通过的校验:', valid);
  };

  render() {
    const { formData } = this.state;
    const { propsSchema, uiSchema } = SCHEMA;
    return (
      <FormRender
        propsSchema={propsSchema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={this.onChange}
        onValidate={this.onValidate}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
