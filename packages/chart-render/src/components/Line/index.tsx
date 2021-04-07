import React from 'react';
import { Area, Line } from '@ant-design/charts';
import { AreaConfig } from '@ant-design/charts/es/Area';
import { LineConfig } from '@ant-design/charts/es/line';
import { ICommonProps } from '../../utils/types';
import { splitMeta } from '../../utils';
import ErrorTemplate from '../ErrorTemplate';

export interface ICRLineProps extends ICommonProps, Omit<LineConfig | AreaConfig, keyof ICommonProps | 'yField' | 'xField' | 'seriesField'> {
  /**
   * 以面积图展示，默认 `false`
   * - 注意面积图默认堆叠展示，如不需要可以传入 `isStack={false}` 覆盖
   * - 开启面积图后方可使用 `areaStyle` `startOnZero` `isPercent` 属性
   */
  withArea: boolean;
};

export function generateConfig(meta: ICommonProps['meta'], data: ICommonProps['data']): LineConfig {
  const { metaDim, metaInd } = splitMeta(meta);

  if (metaInd.length === 1 && metaDim.length === 1) {
    // case 1: 单指标、单维度 => 维度作为 x 轴，指标作为 y 轴
    const xField = metaDim.shift()?.id as string;
    const yField = metaInd.shift()?.id as string;
    return {
      data,
      xField,
      yField,
      meta: {
        [yField]: { alias: meta.find(({ id }) => id === yField)?.name }
      },
    };
  } else if (metaInd.length === 1 && metaDim.length === 2) {
    // case 2: 单指标、双维度 => 第一维度作为 x 轴，指标作为 y 轴，第二维度作为 系列
    return {
      data,
      xField: metaDim.shift()?.id as string,
      yField: metaInd.shift()?.id as string,
      seriesField: metaDim.shift()?.id,
    };
  } else if (metaInd.length > 1 && metaDim.length === 1) {
    // case 3: 多指标、单维度 => 维度作为 x 轴，指标名作为系列，指标值作为 y 轴
    // 需要把 data 做一下转化，例：从 { ds, uv, pv }[] 转为 [{ ds, type: uvName, value: xxx }, { ds, type: pvName, value: xxx }]
    const xField = metaDim.shift()?.id as string;
    const yField = 'value';
    const seriesField = 'type';
    return {
      data: data
        .map(item => {
          return metaInd.map(({ id, name }) => {
            return {
              [xField]: item[xField],
              [yField]: item[id],
              [seriesField]: name,
            };
          });
        })
        .flat(),
      xField,
      yField,
      seriesField,
    };
  }
  return { data };
};

const CRLine: React.FC<ICRLineProps> = ({
  className,
  style,
  meta = [],
  data = [],
  withArea,
  ...props
}) => {
  if (withArea) {
    return (
      <Area
        {...generateConfig(meta, data)}
        renderer="svg"
        errorTemplate={() => <ErrorTemplate />}
        {...props}
      />
    );
  } else {
    return (
      <Line
        {...generateConfig(meta, data)}
        renderer="svg"
        errorTemplate={() => <ErrorTemplate />}
        {...props}
      />
    );
  }
};

export default CRLine;
