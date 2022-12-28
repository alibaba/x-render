import React, { useContext } from 'react';
import { Form, Col } from 'antd';
import { FormContext } from '../utils/context';

import SimpleList from '../widgets/container/ListSimple';
import DrawerList from '../widgets/container/ListDrawer';
import TableList from '../widgets/container/ListTable';
import VirtualList from '../widgets/container/ListVirtual';
import TabList from '../widgets/container/ListTab';

const widgetModules = {
  list0: SimpleList,
  list1: SimpleList,
  list2: TableList,
  list3: DrawerList,
  list4: VirtualList,
  simpleList: SimpleList,
  cardList: SimpleList,
  tableList: TableList,
  drawerList: DrawerList,
  virtualList: VirtualList,
  tabList: TabList
};

const FieldList = (props: any) => {
  const formProps: any = useContext(FormContext);
  const { schema, path, parentLitPath, renderCore, max } = props;
  console.log(props, 'fieldProps');
  const { title: label, widget } = schema;
  let widgetName = widget || 'list1';
  const Widget = widgetModules[widgetName] || SimpleList;
  

  let span = 24;
  if (formProps.column) {
    span = 24 / formProps.column;
  }

  if (schema.width === '100%') {
    span = 24;
  }

 const handleOnAdd = () => {

 }

 const handleOnRemove = () => {

 }

 const handleOnMove = () => {

 }

  return (
    <Col span={24}>
      <Form.Item label={label} wrapperCol={{ span: 22 }} labelCol={{ span : 2 }}>
        <Widget
          name={path}
          schema={schema}
          parentLitPath={parentLitPath}
        />
      </Form.Item>
    </Col>
  );
}

export default FieldList;
