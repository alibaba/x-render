/**
 * transform: true
 * defaultShowCode: false
 * background: 'rgb(245,245,245)'
 */
import React from 'react';
import { Column, Search, withChart } from 'chart-render';
import { Card } from 'antd';

const schema = {
  type: 'object',
  properties: {
    os: {
      type: 'string',
      enum: ['Windows', 'MacOS', 'Android', 'iOS'],
      enumNames: ['Windows', 'MacOS', 'Android', 'iOS'],
      props: { placeholder: '操作系统' },
    },
    location: {
      type: 'string',
      enum: ['杭州', '宁波', '嘉兴', '金华'],
      enumNames: ['杭州', '宁波', '嘉兴', '金华'],
      props: { placeholder: 'IP 属地' },
    },
  },
};

const api = ({ filters }) => {
  console.log('filters >>> ', filters);
  return new Promise(resolve =>
    setTimeout(() => {
      const meta = [
        { id: 'ds', name: '日期', isDim: true },
        { id: 'pv', name: '访问量' },
        { id: 'uv', name: '访客数' },
      ];
      const data = [...new Array(24)].map((_, index) => ({
        ds: `2022-01-${String(index + 1).padStart(2, 0)}`,
        pv: Math.floor(Math.random() * 100) + 100,
        uv: Math.floor(Math.random() * 100),
      }));
      resolve({ meta, data });
    }, 1000)
  );
};

const App = () => {
  return (
    <Card
      title="访问趋势"
      extra={<Search searchOnChange api={api} schema={schema} />}
    >
      <Column />
    </Card>
  );
};

export default withChart(App);
