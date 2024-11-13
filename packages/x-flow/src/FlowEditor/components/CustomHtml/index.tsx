import React from 'react';
import { Tooltip, Typography } from 'antd';
import _ from 'lodash';
import IconView from '../../components/IconView';

const { Text } = Typography;

export default (props: any) => {
  const { value, config, showEllipsis, width } = props;
  const item = config?.[value];

  if (showEllipsis && width) {
    return (
      <Text
        style={showEllipsis ? { width } : undefined}
        ellipsis={showEllipsis ? { tooltip: value } : false}
      >
        {value}
      </Text>
    );
  }

  if (config?.requiredByValue && props.addons.schemaPath.includes('[]')) {
    // 根据当前行的数据判断是否必填
    const values = props.addons.getValues();
    const dataPath = props.addons.dataPath;
    const record = _.get(values, dataPath.slice(0, dataPath.lastIndexOf('.')));
    const pathName = dataPath.slice(dataPath.lastIndexOf('.') + 1);
    // console.log('🚀 ~ record:', record, pathName);
    // 获取当前行的数据

    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {record?.required && config?.[pathName] === 'required' ? (
          <span style={{ color: '#ff4d4f', marginTop: '6px' }}>*</span>
        ) : (
          ''
        )}
        <span style={{ margin: '0 3px' }}>{value}</span>
      </span>
    );
  }

  if (!item) {
    return value;
  }
  const { required, tooltip } = item;

  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {required && (
        <span style={{ color: '#ff4d4f', marginTop: '6px' }}>*</span>
      )}
      <span style={{ margin: '0 3px' }}>{item?.label || value}</span>
      {!!tooltip && (
        <Tooltip title={tooltip}>
          <IconView
            type="icon-help"
            style={{ fontSize: 16, color: 'rgba(0, 0, 0, 45%)' }}
          />
        </Tooltip>
      )}
    </span>
  );
};
