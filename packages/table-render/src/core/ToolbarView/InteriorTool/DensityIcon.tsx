import { ColumnHeightOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Tooltip } from 'antd';
import React, { useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { TRContext } from '../../store';
import { useTranslation } from 'react-i18next';

export type DensitySize = 'middle' | 'small' | 'default' | undefined;

const DesityIcon = () => {
  const { t } = useTranslation()
  const dropRef = useRef<any>(); // class组件用 React.createRef()
  const store = useContext(TRContext);
  const tableSize = useStore(store, (state: any) => state.tableSize);
  const setState = useStore(store, (state: any) => state.setState);

  return (
    <div ref={dropRef}>
      <Dropdown
        getPopupContainer={() => dropRef.current}
        overlay={
          <Menu
            selectedKeys={[tableSize]}
            onClick={({ key }) => {
              setState({ tableSize: key as DensitySize });
            }}
            style={{
              width: 80,
            }}
          >
            <Menu.Item key="default">{t('default')}</Menu.Item>
            <Menu.Item key="middle">{t('middle')}</Menu.Item>
            <Menu.Item key="small">{t('small')}</Menu.Item>
          </Menu>
        }
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
