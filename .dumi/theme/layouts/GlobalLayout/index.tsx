import React from 'react';
import { ConfigProvider } from 'antd';
import { useOutlet, usePrefersColor } from 'dumi';
import theme from 'antd/lib/theme';

const algorithmMap = {
  'light': theme.defaultAlgorithm,
  'dark': theme.darkAlgorithm,
}

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const [theme] = usePrefersColor();


  return (
    <ConfigProvider
      theme={{
        algorithm: algorithmMap[theme],
      }}
    >
      {outlet}
    </ConfigProvider>
  );
};

export default GlobalLayout;
