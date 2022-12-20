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
  const { schema, path, renderCore } = props;

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

  return (
    <Col span={span}>
      <Form.Item label={label}>
        <Widget
          name={path}
          schema={schema}
          form={formProps.form}
        />
      </Form.Item>
    </Col>
  );
}

export default FieldList;
