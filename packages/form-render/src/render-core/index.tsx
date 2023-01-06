import React from 'react';
import { Row } from 'antd';

import FieldItem from './fieldItem';
import FieldList from './fieldList';

interface RenderCoreProps {
  schema: any,
  rootPath?: any[] | undefined,
  parentPath?: any[] | undefined,
}

interface RenderItemProps {
  schema: any,
  rootPath?: any[] | undefined,
  path?: any[] | undefined,
  key?: string | undefined
}

const renderItem = (props: RenderItemProps) => {
  let { schema, key, path, rootPath } = props;

  // render List
  if (schema.type === 'array' && schema.items?.type === 'object') {
    return (
      <FieldList
        key={key}
        schema={schema}
        path={path}
        rootPath={rootPath}
        renderCore={RenderCore}
      />
    );
  }

  // render Objiect | field
  let childContent: React.ReactNode = null;

  // has child schema
  if (schema?.properties) {
    childContent = (
      <Row gutter={8}>
        {RenderCore({ schema, parentPath: path, rootPath })}
      </Row>
    );
    path = undefined;
  }

  return (
    <FieldItem
      key={key}
      schema={schema}
      path={path}
      rootPath={rootPath}
      children= {childContent}
      renderCore={RenderCore}
    />
  );
}

const RenderCore = (props: RenderCoreProps) => {
  const { schema, parentPath = [], rootPath = [] } = props;

  // render List.item
  if (schema.items) {
    return renderItem({ schema: schema.items, path: parentPath, rootPath });
  }

  return Object.keys(schema?.properties || {}).map((key) => {
    const item = schema.properties[key];
    const path = [...parentPath, key];

    return renderItem({ schema: item, path, key, rootPath })
  });
}

export default RenderCore;