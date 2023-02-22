// import React from 'react';
// import FormRender, { useForm } from 'form-render';
// import { Button } from 'antd';

// const schema = {
//   type: 'object',
//   displayType: 'row',
//   properties: {
//     input1: {
//       title: '简单输入框',
//       type: 'string',
//       required: true,
//       labelWidth: '300px'
//     },
//     select1: {
//       title: '单选',
//       type: 'string',
//       required: true,
//       props: {
//         options: [
//           { label: '早', value: 'a' },
//           { label: '中', value: 'b' },
//           { label: '晚', value: 'c', disabled: "{{formData.input1 === '1' }}" }
//         ]
//       }
//     }
//   }
// };

// export default () => {
//   const form = useForm();

//   const onValidateFields = () => {
//     form.validateFields(['input1'])
//     .then(values => {
//       console.log(values, 'values');
//     })
//     .catch(errors => {
//       console.log(errors, 'errors');
//     });
//   }

//   return (
//     <>
//       <FormRender 
//         form={form} 
//         schema={schema}
//         labelCol={{
//           span: 5
//         }}
//         wrapperCol={{ span: 8}}
//       />
//       <div>
//         <Button onClick={onValidateFields}>validateFields Test</Button>
//       </div>
//     </>
//   );
// }



// import React from 'react';
// import FormRender, { useForm } from 'form-render';
// import { Button, Input } from 'antd';

// const schema = {
//   type: 'object',
//   displayType: 'row',
//   properties: {
//     input1: {
//       title: '简单输入框',
//       type: 'array',
//       required: true,
//       labelWidth: '300px',
//       widget: 'site',
//     },
//     select1: {
//       title: '单选',
//       type: 'string',
//       required: true,
//       props: {
//         options: [
//           { label: '早', value: 'a' },
//           { label: '中', value: 'b' },
//           { label: '晚', value: 'c', disabled: "{{formData.input1 === '1' }}" }
//         ]
//       }
//     }
//   }
// };

// const SiteInput = props => {
//   console.log('widget props:', props);

//   const handleChange = () => {
//     props.onChange([
//       1, 2, 3, 4
//     ])
//   }

//   return <Input addonBefore="https://" addonAfter=".com" {...props} onChange={handleChange} />;
// };

// export default () => {
//   const form = useForm();

//   const watch = {
//     '#': (value) => {
//       debugger;
//     }
//   }

//   return (
//     <>
//       <FormRender 
//         form={form} 
//         schema={schema}
//         watch={watch}
//         widgets={{ site: SiteInput }}
//       />
//     </>
//   );
// }




import React from 'react';
import FormRender, { useForm } from 'form-render';
import { Button } from 'antd';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      title: '卡片主题',
      description: '这是一个对象类型',
      widget: 'collapse',
      column: 3,
      properties: {
        input1: {
          title: '输入框 A',
          type: 'string',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
        },
        input3: {
          title: '输入框 C',
          type: 'string',
        },
        input4: {
          title: '输入框 D',
          type: 'string',
        },
      },
    },
  },
};

export default () => {
  const form = useForm();

  const watch =  {
    'obj.input1': () => {
      debugger;
      form.setValueByPath('obj.input2', '2222')
    }
  }

  
  return (
    <>
      <FormRender 
        form={form} 
        schema={schema}
        watch={watch}
        onFinish={(value) => {
          console.log(value, 'formData')
        }}
        builtOperation={true}
      />
    </>
  );
}