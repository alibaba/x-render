import React from 'react';
import { Card } from 'antd';

const FCard = ({ children, title, schema }) => {
  return (
    <Card
      id={title}
      title={
        <>
          {title}
          <span className="fr-desc ml2">
            {schema?.description ? `( ${schema.description} )` : ''}
          </span>
        </>
      }
      className="fr-theme-card-wrap"
    >
      {children}
      {/* <div className={`flex flex-wrap fr-core-obj`}>{children}</div> */}
    </Card>
  );
}

export default FCard;
