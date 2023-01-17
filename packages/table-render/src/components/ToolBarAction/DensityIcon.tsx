import { ColumnHeightOutlined } from '@ant-design/icons';
import { Dropdown, Tooltip } from 'antd';
import React, { useRef } from 'react';
import { useTable } from '../hooks';
import { MenuProps } from 'antd/lib/menu';

export type DensitySize = 'middle' | 'small' | 'default' | undefined;

const DesityIcon = () => {
  const { tableState, setTable }: any = useTable();
  const dropRef = useRef<any>(); // class组件用 React.createRef()

  const menuProps: MenuProps = {
    items: [
      { label: '默认', key: 'default' },
      { label: '中等', key: 'middle' },
      { label: '紧凑', key: 'small' },
    ],
    selectedKeys: [tableState.tableSize],
    onClick: ({ key }) => {
      setTable({ tableSize: key as DensitySize });
    },
    style: {
      width: 80,
    },
  };

  return (
    <div ref={dropRef}>
      <Dropdown
        getPopupContainer={() => dropRef.current}
        menu={menuProps}
        trigger={['click']}
      >
        <Tooltip title="表格密度">
          <ColumnHeightOutlined />
        </Tooltip>
      </Dropdown>
    </div>
  );
};

export default DesityIcon;
