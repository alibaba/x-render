import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button, Input } from 'antd';

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
        list: {
          title: '对象数组',
          description: '对象数组嵌套功能',
          type: 'array',
          widget: 'cardList',
          items: {
            type: 'object',
            title: '卡片主题',
            description: '这是一个对象类型',
            column: 3,
            widget: 'card',
            properties: {
              input1: {
                title: '输入框 A',
                type: 'string',
              },
              input2: {
                title: '输入框 A',
                type: 'string',
                required: true,
                widget: 'xx'
              }
            },
          },
        },
      },
    },
   
  },
};

const Test = (props: any) => {
  const { addons } = props;

  console.log(addons, '------addons', props)
  useEffect(() => {
    addons.setValueByPath('obj', {list: [{ input1: '1111'}]})
  }, [])

  return <div><Input /></div>
}

export default () => {
  const form = useForm();

 

  return (
    <>
      <FormRender 
        form={form} 
        schema={schema}
        widgets={{
          xx: Test
        }}
        footer={true}
      />
      
    </>
  );
}



// // import React from 'react';
// // import FormRender, { useForm } from 'form-render';
// // import { Button, Input } from 'antd';

// // const schema = {
// //   type: 'object',
// //   displayType: 'row',
// //   properties: {
// //     input1: {
// //       title: '简单输入框',
// //       type: 'array',
// //       required: true,
// //       labelWidth: '300px',
// //       widget: 'site',
// //     },
// //     select1: {
// //       title: '单选',
// //       type: 'string',
// //       required: true,
// //       props: {
// //         options: [
// //           { label: '早', value: 'a' },
// //           { label: '中', value: 'b' },
// //           { label: '晚', value: 'c', disabled: "{{formData.input1 === '1' }}" }
// //         ]
// //       }
// //     }
// //   }
// // };

// // const SiteInput = props => {
// //   console.log('widget props:', props);

// //   const handleChange = () => {
// //     props.onChange([
// //       1, 2, 3, 4
// //     ])
// //   }

// //   return <Input addonBefore="https://" addonAfter=".com" {...props} onChange={handleChange} />;
// // };

// // export default () => {
// //   const form = useForm();

// //   const watch = {
// //     '#': (value) => {
// //       // debugger;
// //     }
// //   }

// //   return (
// //     <>
// //       <FormRender 
// //         form={form} 
// //         schema={schema}
// //         watch={watch}
// //         widgets={{ site: SiteInput }}
// //       />
// //     </>
// //   );
// // }




// import React from 'react';
// import FormRender, { useForm } from 'form-render';
// import { Button } from 'antd';

// const schema = {
//   type: 'object',
//   displayType: 'row',
//   properties: {
//     date1: {
//       title: '日期选择',
//       type: 'string',
//       format: 'date',
//     },
//     dateRange1: {
//       title: '日期范围',
//       type: 'range',
//       format: 'dateTime',
//     },
//     year: {
//       title: '年份选择',
//       type: 'string',
//       format: 'year',
//     },
//     month: {
//       title: '月份选择',
//       type: 'string',
//       format: 'month',
//     },
//     week: {
//       title: '周选择',
//       type: 'string',
//       format: 'week',
//     },
//     quarter: {
//       title: '季度选择',
//       type: 'string',
//       format: 'quarter',
//     },
//   },
// };

// export default () => {
//   const form = useForm();

//   const watch =  {
//     'obj.input1': () => {
//       // debugger;
//       form.setValueByPath('obj.input2', '2222')
//     }
//   }

  
//   return (
//     <>
//       <FormRender 
//         form={form} 
//         schema={schema}
//         watch={watch}
//         onFinish={(value) => {
//           console.log(value, 'formData')
//         }}
//         builtOperation={true}
//       />
//     </>
//   );
// }


// import React from 'react';
// import FormRender, { useForm } from 'form-render';

// const schema = {
//   type: 'object',
//   displayType: 'row',
//   properties: {
//     obj: {
//       type: 'object',
//       widget: 'card',
//       title: '卡片主题',
//       description: '这是一个对象类型',
//       column: 3,
//       properties: {
//         input1: {
//           title: '输入框 A',
//           type: 'string',
//         },
//         input2: {
//           title: '输入框 B',
//           type: 'string',
//         },
//         obj: {
//           type: 'object',
//           widget: 'card',
//           title: '卡片主题',
//           description: '这是一个对象类型',
//           column: 3,
//           properties: {
//             input1: {
//               title: '输入框 A',
//               type: 'string',
//             },
//             input2: {
//               title: '输入框 B',
//               type: 'string',
//             }
//           }
//         }
//       },
//     },
//     list: {
//       // title: '对象数组',
//       // description: '对象数组嵌套功能',
//       type: 'array',
//       widget: 'cardList',
//       items: {
//         type: 'object',
//         title: '卡片主题',
//         description: '这是一个对象类型',
//         column: 3,
//         properties: {
//           input1: {
//             title: '输入框 A',
//             type: 'string',
//           },
//           input3: {
//             title: '输入框 B',
//             type: 'string',
//           },
//           obj: {
//             type: 'object',
//             widget: 'card',
//             title: '卡片主题',
//             description: '这是一个对象类型',
//             column: 3,
//             properties: {
//               input1: {
//                 title: '输入框 A',
//                 type: 'string',
//               },
//               input2: {
//                 title: '输入框 B',
//                 type: 'string',
//               },
//               list: {
//                 // title: '对象数组',
//                 // description: '对象数组嵌套功能',
//                 type: 'array',
//                 widget: 'cardList',
//                 items: {
//                   type: 'object',
//                   title: '卡片主题',
//                   description: '这是一个对象类型',
//                   column: 3,
//                   properties: {
//                     input1: {
//                       title: '输入框 A',
//                       type: 'string',
//                     },
//                     input3: {
//                       title: '输入框 B',
//                       type: 'string',
//                     },
//                   },
//                 },
//               },
//             }
//           }
//         },
//       },
//     },
//   },
// };

// export default () => {
//   const form = useForm();
//   const watch = {
//     '#': (value, a) => {
//       debugger;
//     },
//     "list": (a, b) => {
//      debugger;
//     },
//     "obj.obj.input1": (a, b) => {
//       debugger;
//     },
//     "list[].input1": (a, b) => {
//       debugger
//     },
//     "list[].obj.input1": (a, b) => {
//       debugger
//     },
//     "list[].obj.list": (a, b) => {
//       debugger;
//     },
//     "list[].obj.list[]": (a, b) => {
//       debugger;
//     },
//     "list[].obj.list[].input1": (a, b) => {
//       debugger;
//     }
//   }

//   return <FormRender schema={schema} form={form} watch={watch}/>;
// };



// import React from 'react';
// import FormRender, { useForm } from 'form-render';

// const schema = {
//   type: 'object',
//   displayType: 'row',
//   properties: {
//     obj: {
//       type: 'object',
//       widget: 'card',
//       title: '卡片主题',
//       description: '这是一个对象类型',
//       column: 3,
//       properties: {
//         yyy: {
//           title: '输入框 A',
//           type: 'void',
//           widget: 'test'
//         },
//         input1: {
//           title: '输入框 A',
//           type: 'string',
//         },
//         input2: {
//           title: '输入框 B',
//           type: 'string',
//         },
//         xxx: {
//           title: '输入框 A',
//           type: 'void',
//           widget: 'test'
//         },
//         input3: {
//           title: '输入框 C',
//           type: 'string',
//         },
//         input4: {
//           title: '输入框 D',
//           type: 'string',
//         },
//       },
//     },
//   },
// };

// const Test = () => {
//   return 1
// }

// export default () => {
//   const form = useForm();

//   return <FormRender schema={schema} form={form} widgets={{ test: Test }} builtOperation/>;
// };