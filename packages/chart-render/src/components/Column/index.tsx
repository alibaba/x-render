import React from 'react';
import { ICommonProps } from '../../utils/types';
import { Bar, Column } from '@ant-design/charts';
import { splitMeta } from '../../utils';
import { ColumnConfig } from '@ant-design/charts/es/Column';
import ErrorTemplate from '../ErrorTemplate';

export interface ICRColumnProps
  extends ICommonProps,
    Omit<
      ColumnConfig,
      keyof ICommonProps | 'xField' | 'yField' | 'seriesField'
    > {
  /**
   * 是否倒置，倒置后柱形图会表现成条形图
   */
  inverted?: boolean;
}

export function generateConfig(
  meta: ICommonProps['meta'],
  data: ICommonProps['data'],
): ColumnConfig {
  const { metaDim, metaInd } = splitMeta(meta);

  if (metaInd.length >= 1 && metaDim.length === 0) {
    // case 1: N指标、0维度 => 指标名作为 x 轴，指标值作为 y 轴
    const xField = 'type';
    const yField = 'value';
    return {
      xField,
      yField,
      data: data
        .map(item => {
          return metaInd.map(({ id, name }) => {
            return {
              [xField]: id,
              [yField]: item[id],
            };
          });
        })
        .flat(),
      meta: {
        [xField]: {
          formatter: label =>
            meta.find(({ id }) => label === id)?.name || label,
        },
      },
      tooltip: {
        formatter: ({ [xField]: type, [yField]: value }) => ({
          name: meta.find(({ id }) => type === id)?.name as string,
          value,
        }),
      },
    };
  } else if (metaInd.length === 1 && metaDim.length === 1) {
    // case 2: 单指标，单维度 => 维度作为 x 轴，指标作为 y 轴
    const xField = metaDim.shift()?.id as string;
    const yField = metaInd.shift()?.id as string;
    return {
      data,
      xField,
      yField,
      meta: {
        [yField]: { alias: meta.find(({ id }) => id === yField)?.name },
      },
    };
  } else if (metaInd.length > 1 && metaDim.length === 1) {
    // case 3: 多指标，单维度 => 维度作为 x 轴，指标名作为系列，指标值作为 y 轴
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
      isGroup: true,
    };
  } else if (metaInd.length === 1 && metaDim.length === 2) {
    // case 3: 单指标，双维度
    return {
      data,
      xField: metaDim.shift()?.id as string,
      yField: metaInd.shift()?.id as string,
      seriesField: metaDim.shift()?.id,
      isGroup: true,
    };
  }
  return { data, xField: '', yField: '' };
}

const CRColumn: React.FC<ICRColumnProps> = ({
  className,
  style,
  meta = [],
  data = [],
  inverted,
  ...props
}) => {
  if (inverted) {
    const { xField, yField, ...otherConfig } = generateConfig(meta, data);

    // 条形图 x、y 互换
    return (
      <Bar
        xField={yField}
        yField={xField}
        {...otherConfig}
        renderer="svg"
        errorTemplate={() => <ErrorTemplate />}
        {...props}
      />
    );
  } else {
    return (
      <Column
        {...generateConfig(meta, data)}
        renderer="svg"
        errorTemplate={() => <ErrorTemplate />}
        {...props}
      />
    );
  }
};

export default CRColumn;
