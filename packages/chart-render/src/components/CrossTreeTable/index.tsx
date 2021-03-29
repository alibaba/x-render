import React from 'react';
import { CrossTreeTable, buildDrillTree, buildRecordMap } from 'ali-react-table/pivot';
import { createAggregateFunction } from 'dvt-aggregation';
import { ICommonProps, IDataItem } from '@/utils/types';
import { splitMeta } from '@/utils';
import './index.less';

export interface ICRCrossTreeTableProps extends ICommonProps {
  /**
   * 最顶层的「总计」
   */
  showSubtotal?: boolean;

  /**
   * 「总计」的文案
   */
  subtotalText?: string;

  /**
   * 表格尺寸
   */
  size?: 'small' | 'middle' | 'large';

  /**
   * 单元格渲染
   */
  cellRender?: (value: any, dimRecord: IDataItem, indId: string) => React.ReactNode;
};

const CRCrossTreeTable: React.FC<ICRCrossTreeTableProps> = ({
  className,
  style,
  showSubtotal = true,
  subtotalText = '总计',
  meta = [],
  data = [],
  size = 'middle',
  cellRender,
  ...props
}) => {
  const { metaDim, metaInd } = splitMeta(meta);

  // 左维树
  const leftCodes = metaDim.map(({ id }) => id);
  const leftTree = buildDrillTree(data, leftCodes, {
    includeTopWrapper: showSubtotal,
    totalValue: subtotalText,
    enforceExpandTotalNode: true,
  });

  // 顶维树
  const topTree = metaInd.map(({ id, name }) => ({
    key: id,
    value: name,
    align: 'right',
  }));

  // 数据集
  const recordMap = buildRecordMap({
    data,
    codes: leftCodes,
    aggregate: createAggregateFunction(metaInd.map(({ id, name, isRate }) => ({
      name, // `求和项：${name}`,
      code: id,
      expression: isRate ? `AVG(${id})` : `SUM(${id})`,
    }))),
  });

  return (
    <div style={style} className={`CR-CrossTreeTable CR-CrossTreeTable-${size} ${className || ''}`}>
      <CrossTreeTable
        primaryColumn={{ lock: true, name: '数据维度', width: 200 }}
        leftTree={leftTree}
        // @ts-expect-error => 可以传入 align 字段
        topTree={topTree}
        getValue={(leftNode, topNode) => {
          const record = recordMap.get(leftNode.key);
          return record?.[topNode.key];
        }}
        render={(value, leftNode, topNode) => {
          // @ts-expect-error => 是有 path 字段的，类型是 string[]
          const { path = [] } = leftNode;
          const dimRecord: IDataItem = {};
          (path as string[]).forEach((dimValue, index) => {
            dimRecord[metaDim[index]?.id] = dimValue;
          });
          if (cellRender) {
            return cellRender(value, dimRecord, topNode.key);
          }
          if (metaInd.find(({ id }) => id === topNode.key)?.isRate) {
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

export default CRCrossTreeTable;
