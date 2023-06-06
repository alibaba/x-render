import React, { useEffect, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import type { RadioGroupProps } from 'antd';
import { combineClass, isArray } from '../utils/common';
import { get } from 'lodash-es';

interface FRadioGroupProps extends Omit<RadioGroupProps, 'onChange'> {
  data: any;
  addons: Record<string, (...params: any) => any>;
  /** 自定义 onChange 方法，参数是 event，需要返回最终的 value，支持异步方法 */
  onChange: string;
  /** 自定义 label, value, disable 的字段 */
  optionKeys: {
    label: string;
    value: string;
    disable: string;
  };
  [key: string]: any;
}

const defaultOptionKeys = {
  label: 'label',
  value: 'value',
  disable: 'disable',
};

const FRadioGroup: React.FC<FRadioGroupProps> = (props) => {
  const {
    options,
    data,
    className,
    onChange,
    style,
    addons,
    dataKey,
    optionKeys = defaultOptionKeys,
    ...restProps
  } = props;

  useEffect(() => {
    setValue(data);
  }, [data]);

  const [value, setValue] = useState();

  let _options: any = isArray(options) ? options : [];
  _options = _options?.map((item: any, index: number) => ({
    label: get(item, optionKeys.label, ''),
    value: get(item, optionKeys.value, index),
    disable: get(item, optionKeys.disable, false),
  }));

  const handleChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    const func = addons.getMethod(onChange);
    const result = func(value, { options });

    if (result?.then) {
      result.then((res: any) => {
        if (res === 'stop') {
          return;
        }
        setValue(res || value);
      });
      return;
    } else if (result === 'stop') {
      return;
    }

    setValue(value);
  };

  return (
    <Radio.Group
      className={combineClass('dtv-radio-group', className)}
      style={style}
      onChange={handleChange}
      value={value}
      options={_options}
      buttonStyle="solid"
      optionType="button"
      {...restProps}
    />
  );
};

export default FRadioGroup;
