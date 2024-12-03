import React, { useEffect, useState } from 'react';
import { AutoComplete, InputNumber } from 'antd';
import _ from 'lodash';

const FAutoComplete: React.FC<any> = (props) => {
  const {
    value,
    onChange,
    placeholder,
    optionList,
    width = '100%',
    disabled,
  } = props;
  const [options, setOptions] = useState<{ value: string }[]>(optionList);

  useEffect(() => {
    setOptions(optionList);
  }, [optionList]);
  const handleSearch = async (value: string) => {
    if (!props.request) {
      return;
    }
    const res = await props.request(value);
    setOptions(res);
  };

  let customDisabled = false;
  const dependValues = props.addons.dependValues;
  if (dependValues) {
    // 知识库组件的特殊处理
    if (dependValues.length > 1) {
      customDisabled = dependValues[1] === 'vector_weight' && dependValues[0];
    }
    if (dependValues[1] === 'vector_weight') {
      const onNumberChange = (val: any) => {
        let newValue: string | number = val;
        if (val === null || val === undefined) {
          newValue = '';
        }
        onChange(newValue);
      };
      return (
        <InputNumber
          value={value || ''}
          onChange={onNumberChange}
          disabled={customDisabled}
          style={{ width }}
          min={0}
          max={1}
          step={0.01}
        />
      );
    }
    // if (
    //   ['search_attachment', 'with_associated_documents'].includes(
    //     dependValues[1],
    //   )
    // ) {
    //   return (
    //     <Checkbox
    //       checked={value}
    //       onChange={(e) => onChange(e.target.checked)}
    //       style={{ width }}
    //       disabled={disabled}
    //     />
    //   );
    // }
  }
  const values = props.addons.getValues();
  const dataPath = props.addons.dataPath;
  const record = _.get(values, dataPath.slice(0, dataPath.lastIndexOf('.')));
  const pathName = dataPath.slice(dataPath.lastIndexOf('.') + 1);

  return (
    <AutoComplete
      value={value}
      options={options}
      onSearch={handleSearch}
      style={{ width }}
      status={record?.required && !record?.[pathName] ? 'error' : ''}
      onChange={(val) => {
        onChange(val);
      }}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
export default FAutoComplete;
