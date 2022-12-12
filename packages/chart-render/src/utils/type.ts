export type ArrayFilters = Array<
  | {
      key: string;
      operator: '=' | '!=' | (string & {});
      value: string | number;
      extra: any;
    }
  | {
      key: string;
      operator: 'in' | 'not in' | (string & {});
      value: (string | number)[];
      extra: any;
    }
  | {
      key: string;
      operator: 'between' | 'not between' | (string & {});
      value: [string | number, string | number];
      extra: any;
    }
>;
export type ObjectFilters = Record<string, ArrayFilters[0]['value']>;

/**

export type ArrayOrders = Array<{
  field: string;
  order: 'asc' | 'desc' | (string & {});
}>;
export type ObjectOrders = Record<string, ArrayOrders[0]['order']>;

**/

export type MetaItem = {
  /** 对应单条数据项的 key 名 */
  id: string;

  /** 对应单条数据项的 key 的描述 */
  name?: string;

  /** 是否是维度字段，`true`-维度，`false`-指标，默认按指标处理 */
  isDim?: boolean;

  /** 是否是百分数，仅限指标使用，启用后，数值 `0.5` 会以 `50%` 来输出渲染 */
  isRate?: boolean;
};

export type DataItem = Record<string, any>;

export type DataSource = { meta: MetaItem[]; data: DataItem[] };
