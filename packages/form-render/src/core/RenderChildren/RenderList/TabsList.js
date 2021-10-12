/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{ useState } from 'react';
import Core from '../../index';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const TabsList = ({
  displayList = [],
  listData,
  changeList,
  schema,
  deleteItem,
  copyItem,
  addItem,
  moveItemUp,
  moveItemDown,
  displayType,
  getFieldsProps,
}) => {

  const [activeKey, setActiveKey ] = useState('0')
  const { props = {}, itemProps } = schema;
  const { tabsName, type, ...restProps } = props

  const onEdit = (targetKey, action) => {
    if(action === 'add'){
      const currentKey = addItem()
      setActiveKey(`${currentKey}`)
    }else if(action === 'remove'){
      deleteItem(Number(targetKey))
    }else {
      return null
    }
  };

  const getCurrentTabPaneName = (idx)=>{
    return tabsName instanceof Array ? tabsName[idx] || idx + 1 : `${tabsName || '产品'} ${idx + 1}`
  }

  return (
      <Tabs
        type={type || 'line' }
        onChange={(key)=>setActiveKey(key)}
        activeKey={activeKey}
        onEdit={onEdit}
        {...restProps}
      >
        {displayList.map((item, idx) => {
          const fieldsProps = getFieldsProps(idx)
          fieldsProps.displayType = displayType;
          return <TabPane tab={getCurrentTabPaneName(idx)} key={`${idx}`}>
            <Core {...fieldsProps} />
          </TabPane>
        }
        )}
      </Tabs>
  );
};

export default TabsList;
