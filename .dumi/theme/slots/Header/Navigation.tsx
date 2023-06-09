import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dumi';
import { CodeOutlined, DownOutlined, MobileOutlined, SwapOutlined, ToolOutlined } from '@ant-design/icons';

const Navigation: React.FC = () => {
  const items: any = [
    {
      label: <Link to="/form-render">FormRender</Link>,
      key: 'form-render',
    },
    {
      label: <Link to="/table-render">TableRender</Link>,
      key: 'table-render',
    },
    {
      label: <Link to="/form-render-mobile">FRMobile</Link>,
      key: 'form-render-mobile'
    },
    // {
    //   label: <Link to="/data-render">DataView</Link>,
    //   key: 'data-render'
    // },
    {
      label: <Link to="/playground">Playground</Link>,
      key: 'playground'
    },
    {
      label: <Link to="/schema-builder">SchemaBuilder</Link>,
      key: 'schema-builder',
    },
    {
      label: (
        <div>
          <span>更多</span>
          <DownOutlined style={{fontSize: 12, color: '#666', marginLeft: 3}} />
        </div>
      ),
      children: [
        {
          label: <a href="https://1.xrender.fun/chart-render" target='_black'>ChartRender</a>,
          key: 'chart-render',
          icon: <CodeOutlined />,
        }
      ]
    }
  ];

  return <Menu disabledOverflow items={items} mode="horizontal" />;
};

export default Navigation;
