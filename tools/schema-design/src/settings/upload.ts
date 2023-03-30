import { mergeProps, createMeta } from './utils';

const props = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'multiple',
      title: {
        label: '支持多选文件',
        tip:
          'multiple | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件',
      },
      setter: 'BoolSetter',
    },
    {
      name: 'maxCount',
      title: {
        label: '上传数量限制',
        tip:
          'maxCount | 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件',
      },
      setter: 'NumberSetter'
    },
    {
      name: 'accept',
      title: {
        label: '上传文件类型',
        tip:
          'accept | 接受上传的文件类型, 例如 .doc,.docx,application/msword',
      },
      setter: 'StringSetter',
    },
    {
      name: 'directory',
      title: {
        label: '文件夹上传',
        tip: 'directory | 支持上传文件夹',
      },
      setter: 'BoolSetter',
    },
    {
      title: '高级',
      display: 'popup',
      type: 'group',
      items: [
        {
          name: 'openFileDialogOnClick',
          title: {
            label: '打开文件对话框',
            tip: 'openFileDialogOnClick | 点击打开文件对话框',
          },
          setter: 'BoolSetter',
          defaultValue: true,
        },
        {
          name: 'showUploadList',
          title: {
            label: '显示上传列表',
            tip: 'showUploadList | 是否显示上传的文件列表,',
          },
          setter: 'BoolSetter',
          defaultValue: true,
        },
        {
          name: 'listType',
          title: {
            label: '上传列表样式',
            tip:
              'listType | 上传列表的内建样式，支持三种基本样式 `text`, `picture` 和 `picture-card`',
          },
          defaultValue: 'text',
          setter: [
            {
              componentName: 'RadioGroupSetter',
              props: {
                options: [
                  {
                    title: '文本',
                    value: 'text',
                  },
                  {
                    title: '图片',
                    value: 'picture',
                  },
                  {
                    title: '图片卡片',
                    value: 'picture-card',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      title: '上传参数',
      display: 'popup',
      type: 'group',
      items: [
        {
          name: 'action',
          title: { label: '上传地址', tip: 'action | 上传的地址或方法' },
          setter: ['StringSetter', 'FunctionSetter'],
        },
        {
          name: 'method',
          title: {
            label: '请求Method',
            tip: 'method | 上传请求的 http method',
          },
          defaultValue: 'POST',
          setter: {
            componentName: 'SelectSetter',
            props: {
              options: [
                {
                  title: 'GET',
                  value: 'GET',
                },
                {
                  title: 'POST',
                  value: 'POST',
                },
                {
                  title: 'PUT',
                  value: 'PUT',
                },
                {
                  title: 'HEAD',
                  value: 'HEAD',
                },
                {
                  title: 'OPTIONS',
                  value: 'OPTIONS',
                },
                {
                  title: 'PATCH',
                  value: 'PATCH',
                },
                {
                  title: 'DELETE',
                  value: 'DELETE',
                },
              ],
            },
          },
        },
        {
          name: 'headers',
          title: {
            label: '上传请求头',
            tip: 'headers | 设置上传的请求头部，IE10 以上有效',
          },
          setter: 'JsonSetter',
        },
        {
          name: 'withCredentials',
          title: {
            label: '携带Cookie',
            tip: 'withCredentials | 上传请求时是否携带 cookie',
          },
          setter: 'BoolSetter',
        },
        {
          name: 'data',
          title: {
            label: '额外参数',
            tip: 'data | 上传所需额外参数或返回上传额外参数的方法',
          },
          setter: [
            'JsonSetter',
            {
              componentName: 'FunctionSetter',
              props: {
                template:
                  'onData(file,${extParams}){\n// 上传所需额外参数\nreturn {};\n}',
              },
            },
            'VariableSetter',
          ],
        },
      ],
    },
    // {
    //   title: '回调函数',
    //   display: 'popup',
    //   type: 'group',
    //   items: [
    //     {
    //       name: 'beforeUpload',
    //       title: {
    //         label: '上传前回调',
    //         tip: 'beforeUpload | 上传文件之前的回调函数',
    //       },
    //       setter: {
    //         componentName: 'FunctionSetter',
    //         props: {
    //           template:
    //             'beforeUpload(file,fileList,${extParams}){\n// 上传文件之前的钩子\nreturn false;\n}',
    //         },
    //       },
    //     },
    //     {
    //       name: 'customRequest',
    //       title: {
    //         label: '自定义上传',
    //         tip:
    //           'customRequest | 通过覆盖默认的上传行为，可以自定义自己的上传实现',
    //       },
    //       setter: 'FunctionSetter',
    //     },
    //     {
    //       name: 'isImageUrl',
    //       title: {
    //         label: '是否为图片',
    //         tip: 'isImageUrl | 自定义缩略图是否使用 <img /> 标签进行显示',
    //       },
    //       setter: {
    //         componentName: 'FunctionSetter',
    //         props: {
    //           template:
    //             'isImageUrl(file,${extParams}){\n// 判断是否为图片\nreturn true;\n}',
    //         },
    //       },
    //     },
    //     {
    //       name: 'previewFile',
    //       title: {
    //         label: '自定义文件预览',
    //         tip: 'previewFile | 自定义文件预览逻辑',
    //       },
    //       setter: 'FunctionSetter',
    //     },
    //   ],
    // },
  ],
},
null,
{
  name: 'props.placeholder',
  title: {
    label: '提示文字',
    tip: 'placeholder | 按钮提示文字',
  },
  defaultValue: '点击上传',
  setter: 'StringSetter',
}
);

const snippets = [
  {
    label: '上传',
    screenshot:
      'https://img.alicdn.com/imgextra/i3/O1CN012zUx2l1dD6dwQvG2n_!!6000000003701-55-tps-185-59.svg',
    schema: {
      componentName: 'Upload',
      props: {
        label: '上传',
      },
    }
  }
];

export default createMeta('Upload', {
  title: '上传',
  category: '其他控件',
  props,
  // snippets,
});
