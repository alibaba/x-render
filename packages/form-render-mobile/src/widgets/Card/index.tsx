import React from 'react';
import { Card } from 'antd-mobile';
import { FRContext } from '../../models/context';
import {useStore} from 'zustand'
import cx from 'classnames';

import './index.less';

const prefix = 'frm-widget-card';

const BoxCard = (props: any) => {
  const { children, description, title } = props;
  const context = React.useContext(FRContext);
  const setIsCardMode = useStore(context, (store: any) => store.setIsCardMode);

  React.useEffect(() => {
    setIsCardMode(true);
  }, []);

  let titleNode = (
    <>
      {title && <span className={`${prefix}-title`}>{title}</span>}
      {description && (
        <span className={`${prefix}-desc`}>
          {description}
        </span>
      )}
    </>
  )

  const noTitle = !title && !description;

  const className = cx(prefix, {
    [`${prefix}-no-title`]: noTitle,
  })
  
  return (
    <Card
      className={className}
      title={noTitle ? null : titleNode}
    >
      {children}
    </Card>
  );
}

export default BoxCard;
