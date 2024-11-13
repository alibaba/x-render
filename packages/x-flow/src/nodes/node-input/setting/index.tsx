import FormRender, { useForm } from 'form-render';
import ExpandInput from '@/components/ExpandInput';
import { TYPES } from '../../constant';

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      type: 'array',
      widget: 'tableList',
      props: {
        hideMove: true,
        hideCopy: true,
        onRemove: 'onRemove',
        size: 'small',
        addBtnProps: {
          type: 'dashed'
        },
        pagination: {
          pageSize: 15
        },
        actionColumnProps: {
          width: 55
        }
      },
      items: {
        type: 'object',
        properties: {
          name: {
            title: '参数名称',
            type: 'string',
            width: 200,
            placeholder: '请输入',
            disabled: `{{ rootValue.name === 'session_id' }}`,
            rules: [
              {
                pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
                message: '只能包含字母、数字和下划线且以字母或划线开头'
              }
            ]
          },
          dataType: {
            title: '参数类型',
            type: 'string',
            enum: TYPES.map((el) => el.toUpperCase()),
            enumNames: TYPES,
            widget: 'select',
            width: 120,
            placeholder: '请选择',
            disabled: `{{ rootValue.name === 'session_id' }}`
          },
          value: {
            title: '参数值',
            type: 'string',
            widget: 'ExpandInput',
            placeholder: '变量：${变量名称}',
            disabled: `{{ rootValue.name === 'session_id' }}`
          }
        }
      }
    }
  }
};




/**
 * 
 * 全局输入参数配置
 * 
 */
export default (props: any) => {
  const { data, onChange, readonly } = props;
  const form = useForm();

  const onRemove = (deleteFn: any, params: any) => {
    if (params.data?.name === 'session_id') {
      props.setIsChatFlow(false);
    }
    deleteFn();
  };

  const watch = {
    '#': (allValues: any) => {
      onChange({ ...data, ...allValues });
    },
  };

  return (
    <div id='global-input-form'>
      <FormRender
        schema={schema}
        form={form}
        readOnly={readonly}
        widgets={{ ExpandInput }}
        methods={{ onRemove }}
        watch={watch}
        onMount={() => {
          form.setValues({list: data?.list || []});
        }}
      />
    </div>
  );
}
