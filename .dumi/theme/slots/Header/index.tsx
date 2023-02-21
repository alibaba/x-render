import React from 'react';
import DumiLogo from 'dumi/theme-default/slots/Logo';
import DumiSearch from 'dumi/theme-default/slots/SearchBar';
import { Row, Col, Space, Divider } from 'antd';
import Navigation from './Navigation';
import ThemeSwitch from './ThemeSwitch';
import GithubLink from './GithubLink';

import './index.less';

const prefix = 'xr-doc-header';

const Header: React.FC = () => {
  return (
    <header className={prefix}>
      <Row align="middle" justify="space-between" style={{ padding: '10px 40px' }}>
        <Col span={12}>
          <Space size={20}>
            <DumiLogo />
            <DumiSearch />
          </Space>
        </Col>
        <Col span={12}>
          <Space size={0} style={{ float: 'right'}}>
            <Navigation />
            <Divider type="vertical" style={{ marginLeft: 0 }} />
            <Space>
              <ThemeSwitch />
              <GithubLink />
            </Space>
          </Space>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
