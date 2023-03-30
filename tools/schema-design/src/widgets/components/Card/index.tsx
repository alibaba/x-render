import React from 'react';
import { Card, Row, Col } from 'antd';
import BoxPanel from '../../hoc/components/PanelView'

import './index.less';

const BoxCard = ({ children, title, description }) => {
  if (!title) {
    return (
      <BoxPanel>
        <Row>
          {children}
        </Row>
      </BoxPanel>
    )
  }
 
  return (
    <Col span={24}>
      <Card
      className='fr-obj-card'
      title={
        <>
          {title}
          {description && (
            <span className='fr-header-desc '>
              {description}
            </span>
          )}
        </>
      }
    >
      <Row gutter={24}>
        {children}
      </Row>
    </Card>
    </Col>
    
  );
}

export default BoxCard;
