/**
 * Created by Tw93 on 2018-08-28.
 * antd 主题入口文件
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormRender from './index';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { mapping, widgets } from './widgets/antd';
// import 'antd/dist/antd.css';

export default class AntdForm extends React.PureComponent {
  static propTypes = {
    mapping: PropTypes.object,
    widgets: PropTypes.object,
  };
  static defaultProps = {
    mapping: {},
    widgets: {},
  };

  render() {
    const {
      mapping: customizedMapping,
      widgets: customizedWidgets,
      ...props
    } = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <FormRender
          {...props}
          mapping={{
            ...mapping,
            ...customizedMapping,
          }}
          widgets={{
            ...widgets,
            ...customizedWidgets,
          }}
        />
      </ConfigProvider>
    );
  }
}
