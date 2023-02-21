import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dumi';
import { CodeOutlined, DownOutlined, HighlightOutlined, SwapOutlined, ToolOutlined } from '@ant-design/icons';

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
      label: <Link to="/chart-render">ChartRender</Link>,
      key: 'chart-render',
    },
    {
      label: <Link to="/generator">表单设计器</Link>,
      key: 'generator',
    },
    {
      label: (
        <div>
          <span>生态</span>
          <DownOutlined style={{fontSize: 12, color: '#666', marginLeft: 3}} />
        </div>
      ),
      children: [
        {
          label: <Link to="/playground">Playground</Link>,
          key: 'playground',
          icon: <CodeOutlined />,
        },
        // {
        //   label: <Link to="/generator">表单设计器</Link>,
        //   key: 'generator',
        //   icon: <HighlightOutlined />,
        // },
        {
          label: <Link to="/proptypes">PropToSchema</Link>,
          key: 'proptypes',
          icon: <SwapOutlined />,
        },
        {
          label: <Link to="/vscode">vscode 插件</Link>,
          key: 'vscode',
          icon: <ToolOutlined />,
        },
      ],
    },
  ];

  return <Menu disabledOverflow items={items} mode="horizontal" />;
};

export default Navigation;
