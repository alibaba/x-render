import React from 'react';
import { ICommonProps } from '../../utils/types';
import { Area } from '@ant-design/charts';
import { AreaConfig } from '@ant-design/charts/es/Area';
import ErrorTemplate from '../ErrorTemplate';
import { generateConfig } from '../Line';

export interface ICRAreaProps
  extends ICommonProps,
    Omit<
      AreaConfig,
      keyof ICommonProps | 'yField' | 'xField' | 'seriesField'
    > {};

const CRArea: React.FC<ICRAreaProps> = ({
  className,
  style,
  meta = [],
  data = [],
  ...props
}) => {
  return (
    <Area
      {...generateConfig(meta, data)}
      renderer="svg"
      errorTemplate={() => <ErrorTemplate />}
      {...props}
    />
  );
};

export default CRArea;
