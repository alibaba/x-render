import { CSSProperties } from 'react';

export interface IMetaItem {
  /**
   * 对应的数据字段名称
   */
  id: string;

  /**
   * 数据字段的中文名称
   */
  name: string;

  /**
   * 是否是维度，true-维度，false-指标
   */
  isDim?: boolean;

  /**
   * 是否是百分数，如果是，数据展示时会自动处理：0.5 => 50%
   */
  isRate?: boolean;
}

export interface IDataItem {
  [k: string]: number | string;
}

export interface ICommonProps {
  /**
   * 最外层的 style
   */
  style?: CSSProperties;

  /**
   * 最外层的 className
   */
  className?: string;

  /**
   * 元数据描述信息
   */
  meta: IMetaItem[];

  /**
   * 数据
   */
  data: IDataItem[];
}
