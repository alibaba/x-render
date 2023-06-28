import React from 'react';
import { Steps } from 'antd';
import { get } from 'lodash-es';
import { combineClass } from '../utils/common';

import './index.less';

const { Step } = Steps;

const FSteps = (props: any) => {
  const {
    data = [],
    stautsKey = 'status',
    titleKey = 'title',
    descriptionKey = 'description',
    subTitleKey = 'subTitle',
    size = 'small',
    className,
    style,
    addons,
    ...otherProps
  } = props;

  return (
    <Steps
      {...otherProps}
      size={size}
      className={combineClass('dr-steps', className)}
      style={style}
    >
      {data.map((item: any, index: number) => (
        <Step
          key={index}
          status={get(item, stautsKey, '')}
          title={get(item, titleKey, '')}
          description={get(item, descriptionKey, '')}
          subTitle={get(item, subTitleKey, '')}
        />
      ))}
    </Steps>
  );
};

export default FSteps;
