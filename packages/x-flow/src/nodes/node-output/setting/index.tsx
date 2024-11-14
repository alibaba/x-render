import { useEffect, useRef } from 'react';
import { AnyObject } from 'antd/lib/_util/type';
import FormRender, { useForm } from 'form-render';
import { ICard, TYPES } from '../../constant';
import FAutoComplete from '../../../components/FAutoComplete';

export interface GlobalOutputProps {
  data?: AnyObject;
  onChange: (data: AnyObject) => void;
  flowList: ICard[];
  inputItem: ICard;
  readonly?: boolean;
}

const getSchema = (request: any) => ({
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      type: 'array',
      widget: 'tableList',
      props: {
        hideMove: true,
        hideCopy: true,
        size: 'small',
        addBtnProps: {
          type: 'dashed',
        },
        actionColumnProps: {
          width: 60,
        },
      },
      items: {
        type: 'object',
        properties: {
          name: {
            title: '名称',
            type: 'string',
            width: 200,
            placeholder: '请输入',
            rules: [
              {
                pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
                message: '只能包含字母、数字和下划线且以字母或划线开头',
              },
            ],
          },
          dataType: {
            title: '类型',
            type: 'string',
            enum: TYPES.map((el) => el.toUpperCase()),
            enumNames: TYPES,
            width: 120,
            widget: 'select',
            placeholder: '请选择',
          },
          value: {
            title: '值',
            type: 'string',
            widget: 'FAutoComplete',
            props: {
              placeholder: '${组件名.output}',
              request,
            },
          },
        },
      },
    },
  },
});

export default (props: GlobalOutputProps) => {
  const { data, onChange, inputItem, flowList, readonly } = props;

  const form = useForm();
  const flowListRef = useRef<any>();
  const inputRef = useRef<any>();

  useEffect(() => {
    flowListRef.current = flowList;
    inputRef.current = inputItem;
  }, [flowList, inputItem]);

  const watch = {
    '#': (allValues: any) => {
      onChange({ ...data, ...allValues });
    }
  };

  const request = (val: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inputValue = inputRef.current?.data;
        const inputText = 'inputs';
        const options = (inputValue?.list || [])
          .filter((el: any) => !!el.name)
          .map((item: any) => '${#' + `${inputText}.${item.name}` + `}`);
        const nodes = (flowListRef?.current || [])
          .filter((el: any) => el.code !== 'Output')
          .map((item: any) => {
            return '${#' + `${item.code}.output` + `}`;
          });

        resolve(
          [...options, ...nodes]
            .filter((el: string) => val && el.includes(val))
            .map((el: string) => {
              return {
                value: el,
              };
            }),
        );
      }, 10);
    });
  };
  const schema = getSchema(request);

  return (
    <FormRender
      schema={schema}
      form={form}
      watch={watch}
      readOnly={readonly}
      widgets={{ FAutoComplete }}
      onMount={() => {
        form.setValues({ list: data?.list });
      }}
    />
  );
}
