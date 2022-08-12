import {
  Bar as AntBar,
  Column as AntColumn,
  ColumnConfig,
} from '@ant-design/plots';
import React, { memo } from 'react';
import { DataSource } from '../../utils/type';
import { useChart } from '../../utils/store';
import { splitMeta } from '../../utils';
import ChartContainer from '../../components/ChartContainer';

export interface IColumnProps extends Omit<Partial<ColumnConfig>, 'data'> {
  /** 是否倒置，倒置后柱形图会表现成条形图 */
  inverted?: boolean;
}

export function generateConfig(
  meta: DataSource['meta'],
  data: DataSource['data']
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
        // @ts-ignore
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

const Column: React.FC<IColumnProps> = ({
  className,
  style,
  inverted,
  ...props
}) => {
  const loading = useChart(state => state.loading);
  const { meta = [], data = [] } = useChart(state => state.dataSource) || {};
  const { xField, yField, ...otherConfig } = generateConfig(meta, data);

  return (
    <ChartContainer className={className} style={style}>
      {inverted ? (
        <AntBar
          loading={loading}
          xField={yField || ''}
          yField={xField || ''}
          {...otherConfig}
          {...props}
        />
      ) : (
        <AntColumn
          loading={loading}
          xField={xField || ''}
          yField={yField || ''}
          {...otherConfig}
          {...props}
        />
      )}
    </ChartContainer>
  );
};

export default memo(Column);
