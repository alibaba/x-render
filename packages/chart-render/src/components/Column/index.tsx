import React from 'react';
import { ICommonProps } from '../../utils/types';
import { Column } from '@ant-design/charts';
import { splitMeta } from '../../utils';
import { ColumnConfig } from '@ant-design/charts/es/Column';
import ErrorTemplate from '../ErrorTemplate';

export interface ICRColumnProps
  extends ICommonProps,
    Omit<
      ColumnConfig,
      keyof ICommonProps | 'xField' | 'yField' | 'seriesField'
    > {}

const CRColumn: React.FC<ICRColumnProps> = ({
  className,
  style,
  meta = [],
  data = [],
  ...props
}) => {
  const { metaDim, metaInd } = splitMeta(meta);

  let chartData = data;
  let xField: string = '';
  let yField: string = '';
  let seriesField: string | undefined = undefined;
  let isGroup: boolean = false;

  if (metaInd.length >= 1 && metaDim.length === 0) {
    // case 1: N指标、0维度
    xField = 'type';
    yField = 'value';
    chartData = data
      .map(item => {
        return metaInd.map(({ id, name }) => {
          return {
            [xField]: id,
            [yField]: item[id],
          };
        });
      })
      .flat();
  } else if (metaInd.length >= 1 && metaDim.length === 1) {
    // case 2: 单/多指标，单维度
    xField = metaDim.shift()?.id as string;
    yField = 'value';
    seriesField = 'type';
    isGroup = true;
    chartData = data
      .map(item => {
        return metaInd.map(({ id, name }) => {
          return {
            [xField]: item[xField],
            [yField]: item[id],
            [seriesField as string]: id,
          };
        });
      })
      .flat();
  } else if (metaInd.length === 1 && metaDim.length === 2) {
    // case 3: 单指标，双维度
    xField = metaDim.shift()?.id as string;
    yField = metaInd.shift()?.id as string;
    seriesField = metaDim.shift()?.id as string;
    isGroup = true;
  }

  return (
    <Column
      data={chartData}
      isGroup={isGroup}
      yField={yField}
      xField={xField}
      seriesField={seriesField}
      errorTemplate={() => <ErrorTemplate />}
      {...props}
    />
  );
};

export default CRColumn;
