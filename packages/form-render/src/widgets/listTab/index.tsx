import React, { useState, useContext, useMemo, useEffect } from 'react';
import { Popconfirm, Tabs, ConfigProvider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { FormListFieldData } from 'antd';
import { translation } from '../utils';
import './index.less';

interface ListTabProps {
  fields: FormListFieldData[];
  schema: any;
  delConfirmProps: any;
  renderCore: any;
  rootPath: any;
  [key: string]: any;
};

const TabPaneContent = (props: any) => {
  const { renderCore, name, schema, rootPath } = props;

  return useMemo(() => (
   <div style={{ flex: 1 }}>
      {renderCore({ schema, parentPath: [name], rootPath: [...rootPath, name] })}
    </div>
  ), [JSON.stringify(props)]);
};

const TabList: React.FC<ListTabProps> = (props) => {
  const {
    schema,
    fields,
    rootPath,
    renderCore,
    readOnly,
    delConfirmProps,
    tabName,
    hideDelete,
    hideAdd,
    addItem,
    removeItem,
    tabItemProps = {},
    activeKey: _activeKey,
    ...retProps
  } = props;

  const [activeKey, setActiveKey] = useState<string>('0');
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  useEffect(() => {
    setActiveKey(_activeKey || '0');
  }, [_activeKey]);

  const getTabPaneName = (index: number) => {
    return tabName instanceof Array ? tabName[index] || index + 1 : `${tabName || t('item')} ${index + 1}`;
  };

  const handleDelete = (targetKey: number) => {
    removeItem(targetKey);
    setActiveKey(`${targetKey > 1 ? targetKey - 1 : 0}`);
  }

  const handleEdit = (_: any, action: any) => {
    if (action === 'add') {
      if ((!schema.max || fields.length < schema.max) && !readOnly && !hideAdd) {
        addItem();
        const currentKey = fields.length;
        setActiveKey(`${currentKey}`);
      }
    }
  };

  const renderClose = (name: number) => {
    return !readOnly && !hideDelete ? (
      <Popconfirm
        onConfirm={() => handleDelete(name)}
        {...delConfirmProps}
      >
        <CloseOutlined />
      </Popconfirm>
    ) : <></>
  };

  return (
    <Tabs
      className='fr-tab-list'
      type='editable-card'
      {...retProps}
      onChange={setActiveKey}
      activeKey={`${activeKey}`}
      onEdit={handleEdit}
      hideAdd={readOnly || hideAdd}
    >
      {fields.map(({ key, name }) => {
        return (
          <Tabs.TabPane 
            key={key}
            className='fr-list-item'
            {...tabItemProps}
            tab={getTabPaneName(name)}
            closeIcon={renderClose(name)}
          >
            <TabPaneContent 
              name={name} 
              rootPath={rootPath} 
              schema={schema} 
              renderCore={renderCore} 
            />
          </Tabs.TabPane>
        )
      })}
    </Tabs>
  );
}

export default TabList;
