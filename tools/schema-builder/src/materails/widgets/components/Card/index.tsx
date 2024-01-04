import React from 'react';
import { Card, Row, Col } from 'antd';
import BoxPanel from '../../hoc/components/PanelView'
import { ParentContext } from '../../utils/context';

import './index.less';

const BoxCard = ({ children, title, description }: any) => {
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

export default (props: any) => {
  const {
    labelWidth,
    labelCol,
    fieldCol,
    column,
    maxWidth,
    formRef,
  } = props;

  const context = {
    column,
    labelWidth,
    maxWidth,
    labelCol,
    fieldCol,
    getForm: () => {
      return formRef;
    }
  };

  return (
    <ParentContext.Provider value={context}>
      <BoxCard {...props} />
    </ParentContext.Provider>
  );
};
