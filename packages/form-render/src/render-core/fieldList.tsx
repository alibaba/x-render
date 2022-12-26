import React, { useContext } from 'react';
import { Form, Col } from 'antd';
import { FormContext } from '../utils/context';

import ListCard from '../widgets/container/ListCard';
import ListDrawer from '../widgets/container/ListDrawer';
import ListTable from '../widgets/container/ListTable';
import ListVirtual from '../widgets/container/ListVirtual';
import ListTab from '../widgets/container/ListTab';

const widgetModules = {
  list0: ListCard,
  list1: ListCard,
  list2: ListTable,
  list3: ListDrawer,
  list4: ListVirtual,
  simpleList: ListCard,
  cardList: ListCard,
  tableList: ListTable,
  drawerList: ListDrawer,
  virtualList: ListVirtual,
  tabList: ListTab
};

const FieldList = (props: any) => {
  const formProps: any = useContext(FormContext);
  const { schema, path, renderCore, max } = props;
  console.log(props, 'fieldProps');
  const { title: label, widget } = schema;
  let widgetName = widget || 'list1';
  const Widget = widgetModules[widgetName] || ListCard;
  

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
        />
      </Form.Item>
    </Col>
  );
}

export default FieldList;
