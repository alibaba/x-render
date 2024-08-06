import { Collapse } from 'antd';
import React from 'react';
import sortProperties from '../models/sortProperties';
import FieldItem from './FieldItem';
import FieldList from './FieldList';
import './index.less';

interface RenderCoreProps {
  schema: any;
  rootPath?: any[] | undefined;
  parentPath?: any[] | undefined;
  [key: string]: any;
}

interface RenderItemProps {
  schema: any;
  rootPath?: any[] | undefined;
  path?: any[] | undefined;
  key?: string | undefined;
  hideColumnNestedObject?: false | 'hide' | 'collapse';
}

const renderItem = (props: RenderItemProps) => {
  let { schema, key, path, rootPath, hideColumnNestedObject } = props;

  // render List
  if (schema.type === 'array' && schema.items?.type === 'object') {
    if (hideColumnNestedObject === 'hide') {
      return '-';
    } else if (hideColumnNestedObject === 'collapse') {
      return (
        <Collapse
          ghost
          items={[
            {
              key: 'detail',
              label: '查看详情',
              children: (
                <FieldList
                  key={key}
                  schema={schema}
                  path={path}
                  rootPath={rootPath}
                  renderCore={RenderCore}
                />
              ),
            },
          ]}
        />
      );
    } else {
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
  }

  // render Objiect | field
  let child: React.ReactNode = null;

  // has child schema
  if (schema?.properties && schema?.widgetType !== 'field') {
    child = RenderCore({ schema, parentPath: path, rootPath });
    // path = undefined;
  }

  if (schema.type === 'object' && hideColumnNestedObject === 'hide') {
    return '-';
  }

  if (schema.type === 'object' && hideColumnNestedObject === 'collapse') {
    return (
      <Collapse
        ghost
        items={[
          {
            key: 'detail',
            label: '查看详情',
            children: (
              <FieldItem
                key={key}
                schema={schema}
                path={path}
                rootPath={rootPath}
                children={child}
                renderCore={RenderCore}
              />
            ),
          },
        ]}
      />
    );
  }

  return (
    <FieldItem
      key={key}
      schema={schema}
      path={path}
      rootPath={rootPath}
      children={child}
      renderCore={RenderCore}
    />
  );
};

const RenderCore = (props: RenderCoreProps): any => {
  const {
    schema,
    parentPath = [],
    rootPath = [],
    hideColumnNestedObject = false,
  } = props;
  if (!schema || Object.keys(schema).length === 0) {
    return null;
  }

  // render List.item
  if (schema?.items) {
    return renderItem({
      schema: schema.items,
      path: parentPath,
      rootPath,
      hideColumnNestedObject,
    });
  }

  // render Objiect | field
  return sortProperties(Object.entries(schema.properties || {})).map(
    ([key, item]) => {
      const path = [...parentPath, key];

      return renderItem({
        schema: item,
        path,
        key,
        rootPath,
        hideColumnNestedObject,
      });
    }
  );
};

export default RenderCore;
