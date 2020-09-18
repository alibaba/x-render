/**
 * Created by Tw93 on 2018-08-28.
 * fusion 主题入口文件
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormRender from './index';
import { mapping, widgets } from './widgets/fusion';

export default class FusionForm extends React.PureComponent {
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
    );
  }
}
