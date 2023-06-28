import React from 'react';
import { Row, Col } from 'antd';

import { combineClass } from '../utils/common';

import './index.less';

const FRow = (props: any) => {
  const { items, data, hasBackground, className, addons, ...options } = props;

  return (
    <Row className={combineClass('dr-row', className)} wrap={false} {...options}>
      {(items || []).map((item: any, index: number) => {
        const { children, className: itemClassName, ...itemOptions } = item;
        return (
          <Col
            key={index}
            className={combineClass('col-item', {
              'col-item-background': hasBackground,
              [className]: itemClassName,
            })}
            {...itemOptions}
          >
            {addons.renderer({ key: index, schema: children, data, addons })}
          </Col>
        );
      })}
    </Row>
  );
};

export default FRow;
