import React, { useState } from 'react';
import {
  CrossTable,
  buildDrillTree,
  buildRecordMatrix,
  convertDrillTreeToCrossTree,
} from 'ali-react-table/pivot';
import { createAggregateFunction } from 'dvt-aggregation';
import { ICommonProps, IDataItem } from '../../utils/types';
import { splitMeta, strip } from '../../utils';
import './index.less';

export interface ICRPivotTableProps extends ICommonProps {
  /**
   * 展示「总计/小计」，默认 `true`
   */
  showSubtotal?: boolean;

  /**
   * 「总计/小计」的文案，默认 `['总计', '小计']`
   */
  subtotalText?: [string, string];

  /**
   * 指标的展示位置，默认 `'top'`
   */
  indicatorSide?: 'left' | 'top';

  /**
   * 表格尺寸，默认 `'middle'`
   */
  size?: 'small' | 'middle' | 'large';

  /**
   * 左侧维度放多少个，超出的维度会放到表格顶部
   */
  leftDimensionLength?: number;

  /**
   * 左侧维度允许展开/收起，默认 `false`
   */
  leftExpandable?: boolean;

  /**
   * 顶部维度允许展开/收起，默认 `false`
   */
  topExpandable?: boolean;

  /**
   * [此属性无效] 默认展开所有可展开项，默认 `true`
   */
  defaultExpandAll?: boolean;

  /**
   * 单元格渲染
   */
  cellRender?: (
    value: any,
    dimRecord: IDataItem,
    indId: string,
  ) => React.ReactNode;
}

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
  leftExpandable = false,
  topExpandable = false,
  defaultExpandAll = true,
  cellRender,
  ...props
}) => {
  const [topExpandKeys, setTopExpandKeys] = useState<string[]>([]);
  const [leftExpandKeys, setLeftExpandKeys] = useState<string[]>([]);

  const { metaDim, metaInd } = splitMeta(meta);

  const indicators = metaInd.map(({ id, name, isRate }) => ({
    name, // `求和项：${name}`,
    code: id,
    align: 'right',
    expression: isRate ? `AVG(${id})` : `SUM(${id})`,
  }));

  // 左维树
  const leftMetaDim = metaDim.filter((_, index) => index < leftDimensionLength);
  const leftCodes = leftMetaDim.map(({ id }) => id);
  const leftDrillTree = buildDrillTree(data, leftCodes, {
    includeTopWrapper: true,
    isExpand: leftExpandable ? key => leftExpandKeys.includes(key) : undefined,
  });
  const [leftTreeRoot] = convertDrillTreeToCrossTree(leftDrillTree, {
    // @ts-expect-error => 可以传入 align 字段
    indicators: indicatorSide === 'left' ? indicators : undefined,
    supportsExpand: leftExpandable,
    expandKeys: leftExpandKeys,
    onChangeExpandKeys: setLeftExpandKeys,
    generateSubtotalNode: showSubtotal
      ? drillNode => ({
          position: 'start',
          value:
            drillNode.path.length === 0
              ? subtotalText[0] || '总计'
              : subtotalText[1] || '小计',
        })
      : undefined,
  });

  // 顶维树
  const topMetaDim = metaDim.filter((_, index) => index >= leftDimensionLength);
  const topCodes = topMetaDim.map(({ id }) => id);
  const topDrillTree = buildDrillTree(data, topCodes, {
    includeTopWrapper: true,
    isExpand: topExpandable ? key => topExpandKeys.includes(key) : undefined,
  });
  const [topTreeRoot] = convertDrillTreeToCrossTree(topDrillTree, {
    // @ts-expect-error => 可以传入 align 字段
    indicators: indicatorSide === 'top' ? indicators : undefined,
    supportsExpand: topExpandable,
    expandKeys: topExpandKeys,
    onChangeExpandKeys: setTopExpandKeys,
    generateSubtotalNode: showSubtotal
      ? drillNode => ({
          position: 'start',
          value:
            drillNode.path.length === 0
              ? subtotalText[0] || '总计'
              : subtotalText[1] || '小计',
        })
      : undefined,
  });

  // 数据集
  const matrix = buildRecordMatrix({
    data,
    leftCodes,
    topCodes,
    aggregate: createAggregateFunction(indicators),
  });

  return (
    <div
      style={style}
      className={`CR-PivotTable CR-PivotTable-${size} ${className || ''}`}
    >
      <CrossTable
        defaultColumnWidth={100}
        leftMetaColumns={metaDim
          .filter(({ id }) => leftCodes.includes(id))
          .map(({ id, name }) => ({ code: id, name }))}
        // @ts-expect-error
        leftTree={leftTreeRoot.children}
        leftTotalNode={leftTreeRoot}
        // @ts-expect-error
        topTree={topTreeRoot.children}
        topTotalNode={topTreeRoot}
        getValue={(leftNode, topNode) => {
          const record = matrix
            .get(leftNode.data.dataKey)
            ?.get(topNode.data.dataKey);
          return record?.[topNode.code as string];
        }}
        render={(value, leftNode, topNode) => {
          // 自定义渲染
          if (cellRender) {
            const { dataPath: leftDataPath = [] } = leftNode.data;
            const { dataPath: topDataPath = [] } = topNode.data;
            const dimRecord: IDataItem = {};
            (leftDataPath as string[]).forEach((dimValue, index) => {
              dimRecord[leftMetaDim[index]?.id] = dimValue;
            });
            (topDataPath as string[]).forEach((dimValue, index) => {
              dimRecord[topMetaDim[index]?.id] = dimValue;
            });
            return cellRender(value, dimRecord, topNode.code as string);
          }
          // 正常渲染
          if (metaInd.find(({ id }) => id === topNode.code)?.isRate) {
            return `${strip(value * 100).toFixed(2)}%`;
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
