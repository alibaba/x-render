import React, { useRef, useContext } from 'react';
import { Dropdown, ConfigProvider, Tooltip } from 'antd';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { useStore } from 'zustand';
import { TRContext } from '../../store';
import { translation } from '../../../utils';

export type DensitySize = 'middle' | 'small' | 'default' | undefined;

const DesityIcon = () => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);
 
  const dropRef = useRef<any>(); // class组件用 React.createRef()
  const store = useContext(TRContext);
  const tableSize = useStore(store, (state: any) => state.tableSize);
  const setState = useStore(store, (state: any) => state.setState);

  const items = [
    {
      key: 'large',
      label: t('default')
    },
    {
      key: 'middle',
      label: t('middle')
    },
    {
      key: 'small',
      label: t('small')
    },
  ]

  return (
    <div ref={dropRef}>
      <Dropdown
        getPopupContainer={() => dropRef.current}
        menu={{
          selectedKeys: [tableSize || 'large'],
          onClick: ({ key }) => {
            setState({ tableSize: key as DensitySize });
          },
          style: { width: 80 },
          items,
        }}
        trigger={['click']}
      >
        <Tooltip title={t('table_density')}>
          <ColumnHeightOutlined />
        </Tooltip>
      </Dropdown>
    </div>
  );
};

export default DesityIcon;
