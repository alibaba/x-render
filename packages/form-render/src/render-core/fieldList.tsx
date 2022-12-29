import React, { useContext } from 'react';
import { Form, Col } from 'antd';
import { FormContext, ParentContext } from '../utils/context';

import SimpleList from '../widgets/container/ListSimple';
import DrawerList from '../widgets/container/ListDrawer';
import TableList from '../widgets/container/ListTable';
import VirtualList from '../widgets/container/ListVirtual';
import TabList from '../widgets/container/ListTab';


import { getParamValue, getColSpan, getLabel, getRuleList, getTooltip, getValuePropName, getWidgetProps, ErrorSchema } from './common';


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
  const formCtx: any = useContext(FormContext);
  const parentCtx: any = useContext(ParentContext);

  const { schema, path, parentLitPath, renderCore, max, rootPath } = props;
  console.log(props, 'fieldProps');
  const { title: label, widget } = schema;
  let widgetName = widget || 'list1';
  const Widget = widgetModules[widgetName] || SimpleList;
  

  let span = 24;
  if (formCtx.column) {
    span = 24 / formCtx.column;
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

 const getValueFromKey = getParamValue(formCtx, parentCtx, schema);

  //const span = getColSpan(formCtx, parentCtx, schema);
  const labelCol = getValueFromKey('labelCol');
  const wrapperCol = getValueFromKey('wrapperCol');
  const readyOnly = getValueFromKey('readyOnly');






 const preRootPath = (rootPath || []).splice(0, rootPath.length-1);


  return (
    <Col span={24}>
      <Form.Item label={label} wrapperCol={{ span: 22 }} labelCol={{ span : 2 }}>
        <Widget
          name={path}
          schema={schema}
          parentLitPath={parentLitPath}
          rootPath={preRootPath}
          readyOnly={readyOnly}
        />
      </Form.Item>
    </Col>
  );
}

export default FieldList;
