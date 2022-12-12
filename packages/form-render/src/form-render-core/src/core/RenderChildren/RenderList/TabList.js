/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react';
import { Tabs } from 'antd';
import Core from '../../index';

const { TabPane } = Tabs;

const dragType = 'DraggableTabNode';

const DraggableTabNode = ({ index, children, moveNode }) => {
  const ref = useRef(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: dragType,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};

      if (dragIndex === index) {
        return {};
      }

      return {
        isOver: monitor.isOver(),
        dropClassName: 'dropping',
      };
    },
    drop: item => {
      moveNode(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type: dragType,
    item: {
      index,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <div
      ref={ref}
      style={{
        marginRight: 2,
      }}
      className={isOver ? dropClassName : ''}
    >
      {children}
    </div>
  );
};

const TabList = ({
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
  const [activeKey, setActiveKey] = useState('0');
  const { props = {}, itemProps } = schema;
  const { tabName, type, draggable = false, ...restProps } = props;

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      const currentKey = addItem();
      setActiveKey(`${currentKey}`);
    } else if (action === 'remove') {
      deleteItem(Number(targetKey));
      setActiveKey(`${targetKey > 1 ? targetKey - 1 : 0}`);
    } else {
      return null;
    }
  };

  //  如果tabName传数组是可以「自定义」tab页的名字的。表单联动可以使用formrender的watch 配合 setSchemaByPath
  const getCurrentTabPaneName = idx => {
    return tabName instanceof Array
      ? tabName[idx] || idx + 1
      : `${tabName || '项目'} ${idx + 1}`;
  };

  return (
    <Tabs
      type={type || 'line'}
      onChange={setActiveKey}
      activeKey={activeKey}
      onEdit={onEdit}
      {...restProps}
    >
      {displayList.map((item, idx) => {
        const fieldsProps = getFieldsProps(idx);
        fieldsProps.displayType = displayType;
        return (
          <TabPane tab={getCurrentTabPaneName(idx)} key={`${idx}`}>
            <Core {...fieldsProps} />
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default TabList;
