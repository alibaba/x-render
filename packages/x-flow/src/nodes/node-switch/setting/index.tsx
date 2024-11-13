import { forwardRef, useEffect, useMemo } from 'react';
import { Collapse } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useCollapse } from '@/hooks/useCollapse';
import FAutoComplete from '../../../FlowEditor/components/FAutoComplete';
import { getNodeSuggestOptions, getSuggestOptions } from '../../constant';
import '../../index.less';
import { getSchema, getSwitchSchema } from './schema';

export default forwardRef((props: any, ref: any) => {
  const { data, inputItem, flowList, isCollapsed, readonly } = props;
  const form = useForm();
  const switchForm = useForm();
  const { activeKey, onChange: onCollapseChange } = useCollapse(isCollapsed);

  const request = useMemo(() => {
    return getSuggestOptions(inputItem, flowList, data.code);
  }, [inputItem, flowList, data.code]);

  const nodeRequest = useMemo(() => {
    return getNodeSuggestOptions(flowList, data.code);
  }, [flowList, data.code]);

  useEffect(() => {
    form.setValues({ list: data.list });
    const switchData = data?.contentBody;
    if (switchData) {
      switchForm.setValues({ list: [...JSON.parse(switchData)] });
    }
  }, [data.list]);

  const watch = {
    '#': (allValues: any) => {
      // '#': () => {} 等同于 onValuesChange
      if (props.onChange) {
        props.onChange(
          Object.keys(allValues).length ? allValues : { list: [] },
        );
      }
    },
  };

  const switchWatch = {
    '#': (allValues: any) => {
      if (props.onChange) {
        props.onChange({
          contentBody: JSON.stringify(allValues.list),
        });
      }
    },
  };

  const schema = getSchema(request);
  const switchSchema = getSwitchSchema(nodeRequest);
  const items = [
    {
      key: '2',
      label: '输入变量（Input）',
      children: (
        <FormRender
          schema={schema}
          form={form}
          widgets={{ FAutoComplete }}
          watch={watch}
          readOnly={readonly}
        />
      ),
    },
    {
      key: '1',
      label: '条件组（Switch）',
      children: (
        <div>
          <FormRender
            schema={switchSchema}
            form={switchForm}
            widgets={{ FAutoComplete }}
            watch={switchWatch}
            readOnly={readonly}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Collapse
        className="item-collapse"
        items={items}
        onChange={onCollapseChange}
        activeKey={activeKey}
      />
    </div>
  );
});
