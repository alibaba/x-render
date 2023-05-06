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
      label: <Link to="/form-render-mobile">Form Mobile</Link>,
      key: 'form-render-mobile'
    },
    {
      label: <a href="https://1.xrender.fun/chart-render" target='_black'>ChartRender</a>,
      key: 'chart-render',
    },
    {
      label: <Link to="/schema-builder">表单设计器</Link>,
      key: 'generator',
    },
    {
      label: (
        <div>
          <span>插件</span>
          <DownOutlined style={{fontSize: 12, color: '#666', marginLeft: 3}} />
        </div>
      ),
      children: [
        {
          label: <a href="/playground" target='_black'>Playground</a>,
          key: 'playground',
          icon: <CodeOutlined />,
        },
        {
          label: <Link to="/tools/proptypes">PropToSchema</Link>,
          key: 'proptypes',
          icon: <SwapOutlined />,
        },
        {
          label: <Link to="/tools/vscode">vscode 插件</Link>,
          key: 'vscode',
          icon: <ToolOutlined />,
        },
      ],
    },
  ];

  return <Menu disabledOverflow items={items} mode="horizontal" />;
};

export default Navigation;
