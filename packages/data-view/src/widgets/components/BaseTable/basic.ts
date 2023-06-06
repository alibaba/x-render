import { get } from 'lodash-es';

// columnObj 递归便利
const recursionColumn = (result: any, columnObj: any, columnConfig?: any, extraParams?: any) => {
  for (const key of Object.keys(columnObj)) {
    const item = columnObj[key];
    let column: any = {
      key,
      align: 'center',
      dataIndex: key,
      ...columnConfig,
    };

    // 配置 item 字符串类型
    if (typeof item === 'string') {
      column['title'] = item;
      result.push(column);
      continue;
    }

    // 存在表头合并
    if (item.column) {
      column = {
        title: item.title,
        children: [],
      };
      recursionColumn(column.children, item.column, columnConfig, extraParams);
    } else {
      // 正常情况
      column = {
        ...column,
        ...item,
      };
    }

    if (column.title.children) {
      const { fRender } = extraParams || {};
      column.title = fRender({ name: item.title.name }, column.title.children);
    }

    result.push(column);
  }
};

//  生成 columns 数据
export const getColumns = (columnObj: any, columnConfig?: any, extraParams?: any) => {
  const result: any = [];
  // 递归，进行格式转换
  recursionColumn(result, columnObj, columnConfig, extraParams);
  return result;
};

// 生成 dataSource 数据
export const getDataSource = (
  columnObj: object,
  dataList: any[] = [],
  extra: { key?: string; that?: any } = {},
) => {
  const dataSource: any[] = [];
  const { key, that } = extra;

  const dealData = (column: any) => {
    for (const code in column) {
      const item = column[code];

      // 存在合并列头
      if (item.column) {
        dealData(item.column);
        continue;
      }

      (dataList || []).forEach((data, index) => {
        let dataItem = dataSource[index];

        if (!dataItem) {
          dataItem = { ...data, key: `${key ? data[key] : index}` };
          dataSource.push(dataItem);
        }

        if (code.includes('x-operate')) {
          dataItem[code] = { ...data, that, dataIndex: index };
        } else {
          dataItem[code] = get(data, code, '');
        }
      });
    }
  };

  // 递归遍历，映射数据
  dealData(columnObj);
  return dataSource;
};

// 表格数据合并
export const combineDataSource = (data: any[], field: any) => {
  let count = 0; // 重复项的第一项
  let index = 1; // 下一项
  while (index < data.length) {
    const item = data.slice(count, count + 1)[0]; // 获取没有比较的第一个对象
    if (!item.rowSpan) {
      item.rowSpan = 1; // 初始化为 1
    }
    if (item[field] === data[index][field]) {
      // 第一个对象与后面的对象相比，有相同项就累加，并且后面相同项设置为 0
      item.rowSpan++;
      data[index].rowSpan = 0;
    } else {
      count = index;
    }
    index++;
  }
};
