import React from 'react';
import { CrossTable, buildDrillTree, buildRecordMatrix, convertDrillTreeToCrossTree } from 'ali-react-table/pivot';
import { createAggregateFunction } from 'dvt-aggregation';
import { ICommonProps, IDataItem } from '@/utils/types';
import { splitMeta } from '@/utils';
import './index.less';

export interface ICRPivotTableProps extends ICommonProps {
  /**
   * 展示「总计/小计」
   */
  showSubtotal?: boolean;

  /**
   * 「总计/小计」的文案
   */
  subtotalText?: [string, string];

  /**
   * 指标的展示位置
   */
  indicatorSide?: 'left' | 'top';

  /**
   * 表格尺寸
   */
  size?: 'small' | 'middle' | 'large';

  /**
   * 左侧维度放多少个，超出的维度会放到表格顶部
   */
  leftDimensionLength?: number;

  /**
   * 单元格渲染
   */
  cellRender?: (value: any, dimRecord: IDataItem, indId: string) => React.ReactNode;
};

const CRPivotTable: React.FC<ICRPivotTableProps> = ({
  className,
  style,
  showSubtotal = true,
  subtotalText = ['总计', '小计'],
  meta = [],
  data = [],
  size = 'middle',
  indicatorSide = 'top',
  leftDimensionLength = meta.length,
  cellRender,
  ...props
}) => {
  const { metaDim, metaInd } = splitMeta(meta);

  const indicators = metaInd.map(({ id, name, isRate }) => ({
    name, // `求和项：${name}`,
    code: id,
    align: 'right',
    expression: isRate ? `AVG(${id})` : `SUM(${id})`,
  }));

  // 左维树
  const leftCodes = metaDim.filter((_, index) => index < leftDimensionLength).map(({ id }) => id);
  const leftDrillTree = buildDrillTree(data, leftCodes, { includeTopWrapper: true });
  const [leftTreeRoot] = convertDrillTreeToCrossTree(leftDrillTree, {
    // @ts-expect-error => 可以传入 align 字段
    indicators: indicatorSide === 'left' ? indicators : undefined,
    generateSubtotalNode: showSubtotal ? (drillNode) => ({
      position: 'start',
      value: drillNode.path.length === 0 ? subtotalText[0] || '总计' : subtotalText[1] || '小计',
    }) : undefined,
  });

  // 顶维树
  const topCodes = metaDim.filter((_, index) => index >= leftDimensionLength).map(({ id }) => id);
  const topDrillTree = buildDrillTree(data, topCodes, { includeTopWrapper: true });
  const [topTreeRoot] = convertDrillTreeToCrossTree(topDrillTree, {
    // @ts-expect-error => 可以传入 align 字段
    indicators: indicatorSide === 'top' ? indicators : undefined,
    generateSubtotalNode: showSubtotal ? (drillNode) => ({
      position: 'start',
      value: drillNode.path.length === 0 ? subtotalText[0] || '总计' : subtotalText[1] || '小计',
    }) : undefined,
  });

  // 数据集
  const matrix = buildRecordMatrix({
    data,
    leftCodes,
    topCodes,
    aggregate: createAggregateFunction(indicators),
  });

  return (
    <div style={style} className={`CR-PivotTable CR-PivotTable-${size} ${className || ''}`}>
      <CrossTable
        defaultColumnWidth={100}
        leftMetaColumns={metaDim.filter(({ id }) => leftCodes.includes(id)).map(({ id, name }) => ({ code: id, name }))}
        // @ts-expect-error
        leftTree={leftTreeRoot.children}
        leftTotalNode={leftTreeRoot} // 当 leftTree 为空时，leftTotalNode 用于渲染总计行
        // @ts-expect-error
        topTree={topTreeRoot.children}
        topTotalNode={topTreeRoot} // 当 topTree 为空时，topTotalNode 用于渲染总计列
        getValue={(leftNode, topNode) => {
          // 注意这里我们使用 node.data.dataKey 来获取单元格在 matrix 中的 record
          const record = matrix.get(leftNode.data.dataKey)?.get(topNode.data.dataKey);
          return record?.[topNode.code as string];
        }}
        render={(value, leftNode, topNode) => {
          const { dataPath: leftDataPath = [] } = leftNode.data;
          const { dataPath: topDataPath = [] } = topNode.data;
          const dimRecord: IDataItem = {};
          ([...leftDataPath, ...topDataPath] as string[]).forEach((dimValue, index) => {
            dimRecord[metaDim[index]?.id] = dimValue;
          });
          if (cellRender) {
            return cellRender(value, dimRecord, topNode.code as string);
          }
          if (metaInd.find(({ id }) => id === topNode.code)?.isRate) {
            return `${(value * 100).toFixed(2)}%`;
          } else {
            return value;
          }
        }}
        {...props}
      />
    </div>
  );
};

export default CRPivotTable;
