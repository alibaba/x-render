import React from 'react';
import ReactDOM from 'react-dom';
import FormRender from '../src/antd';
import SCHEMA from './json/basic.json';

// const SCHEMA = {
//   propsSchema: {
//     type: 'object',
//     properties: {
//       select: {
//         title: '单选单选单选单选单选单选单选',
//         type: 'string',
//         enum: ['a', 'b', 'c'],
//         enumNames: ['早', '中', '晚'],
//       },
//       multiSelect: {
//         title: '多选',
//         description: '下拉多选',
//         type: 'array',
//         items: {
//           type: 'string',
//         },
//         enum: "@rootValue.select == 'a'?['A','B']:['C','D']",
//       },
//       string1: {
//         title: '字符串',
//         type: 'string',
//         'ui:hidden': "@!rootValue.multiSelect.includes('A')",
//       },
//       string2: {
//         title: '字符串2',
//         type: 'string',
//         'ui:hidden': "@!rootValue.multiSelect.includes('C')",
//       },
//     },
//     required: [],
//   },

//   formData: {},
// };

class Demo extends React.Component {
  state = { formData: SCHEMA.formData || {}, readOnly: false };

  onChange = formData => {
    this.setState({ formData });
  };

  onValidate = valid => {
    console.log('没有通过的校验:', valid);
  };

  toggle = () => this.setState({ readOnly: !this.state.readOnly });

  render() {
    const { formData } = this.state;
    const { propsSchema, uiSchema } = SCHEMA;
    return (
      <div className="pa6">
        <button onClick={this.toggle}>toggle</button>
        <FormRender
          propsSchema={propsSchema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={this.onChange}
          displayType="row"
          showDescIcon
          labelWidth={3}
          readOnly={this.state.readOnly}
          onValidate={this.onValidate}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__render_content_'));
