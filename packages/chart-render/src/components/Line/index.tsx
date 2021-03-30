import React from 'react';
import { ICommonProps } from '../../utils/types';
import { Line } from '@ant-design/charts';
import { splitMeta } from '../../utils';
import { LineConfig } from '@ant-design/charts/es/line';
import ErrorTemplate from '../ErrorTemplate';

export interface ICRLineProps
  extends ICommonProps,
    Omit<
      LineConfig,
      keyof ICommonProps | 'yField' | 'xField' | 'seriesField'
    > {}

const CRLine: React.FC<ICRLineProps> = ({
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

  if (metaInd.length === 1 && [1, 2].includes(metaDim.length)) {
    // case 1: 单指标、N维度(N = 1 | 2) 第一个维度作为 x 轴，第二个维度作为系列
    xField = metaDim.shift()?.id as string;
    yField = metaInd.shift()?.id as string;
    seriesField = metaDim.shift()?.id;
  } else if (metaInd.length > 1 && metaDim.length === 1) {
    // case 2: N指标、单维度(N > 1) 维度作为 x 轴，指标名作为系列，指标值作为 y 轴
    // 需要把 data 做一下转化，例：从 { ds, uv, pv }[] 转为 [{ ds, type: uv, value: xxx }, { ds, type: pv, value: xxx }]
    xField = metaDim.shift()?.id as string;
    yField = 'value';
    seriesField = 'type';
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
  }

  return (
    <Line
      data={chartData}
      yField={yField}
      xField={xField}
      seriesField={seriesField}
      renderer="svg"
      errorTemplate={() => <ErrorTemplate />}
      {...props}
    />
  );
};

export default CRLine;
