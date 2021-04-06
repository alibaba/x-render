import React from 'react';
import Generator, { fromFormily, toFormily } from 'fr-generator';
import './index.css';

const defaultValue = {
  type: 'object',
  properties: {
    array: {
      key: 'array',
      type: 'array',
      name: 'array',
      title: 'Name',
      'x-component': 'arraytable',
      items: {
        type: 'object',
        properties: {
          aa: {
            key: 'aa',
            type: 'string',
            name: 'aa',
            title: '控制相邻字段显示隐藏',
            enum: [
              {
                label: '显示',
                value: true,
              },
              {
                label: '隐藏',
                value: false,
              },
            ],
            'x-component': 'input',
          },
          bb: {
            key: 'bb',
            type: 'string',
            name: 'bb',
            title: 'BB',
            'x-component': 'input',
          },
        },
      },
    },
    cc: {
      key: 'cc',
      type: 'string',
      name: 'cc',
      title: 'CC',
      'x-component': 'input',
      'x-component-props': { min: 1 },
    },
  },
};

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Generator
        transformer={{
          from: fromFormily,
          to: toFormily,
        }}
      />
    </div>
  );
};

export default Demo;
