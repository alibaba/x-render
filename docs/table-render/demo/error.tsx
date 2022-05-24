/**
 * transform: true
 * defaultShowCode: false
 * background: 'rgb(245,245,245)'
 */

import React from 'react';
import { Search, Table, withTable } from 'table-render';

const Demo = () => {
  const searchApi = params => {
    return {
      rows: [],
      total: 0,
    };
  };

  // ProColumnsType的使用与antd类似
  const columns = [];

  return (
    <div>
      <Search hidden displayType="row" api={searchApi} />
      {/* 和antd类似，与ProColumnsType配合使用 */}
      <Table
        style={false}
        pagination={{ pageSize: 4 }}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default withTable(Demo);
