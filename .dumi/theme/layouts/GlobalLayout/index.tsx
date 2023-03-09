import React from 'react';
import { ConfigProvider } from 'antd';
import { useOutlet } from 'dumi';

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  return (
    <ConfigProvider
    >
      {outlet}
    </ConfigProvider>
  );
};

export default GlobalLayout;
