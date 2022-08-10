import { Pie as AntPie } from '@ant-design/plots';
import { PieConfig } from '@ant-design/plots/es/components/pie';
import React, { FC, memo } from 'react';
import ChartContainer from '../../components/ChartContainer';
import { splitMeta } from '../../utils';
import { useChart } from '../../utils/store';

export interface IPieProps extends Omit<Partial<PieConfig>, 'data'> {}

const Pie: FC<IPieProps> = ({ className, style, ...props }) => {
  const loading = useChart(state => state.loading);
  const { meta, data } = useChart(state => state.dataSource) || {};

  const { metaDim, metaInd } = splitMeta(meta);
  const colorField = metaDim[0]?.id;
  const angleField = metaInd[0]?.id;

  return (
    <ChartContainer className={className} style={style}>
      <AntPie
        loading={loading}
        data={data || []}
        colorField={colorField || ''}
        angleField={angleField || ''}
        {...props}
      />
    </ChartContainer>
  );
};

export default memo(Pie);
