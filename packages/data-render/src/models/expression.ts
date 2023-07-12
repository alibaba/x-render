import { cloneDeep, isObject } from 'lodash-es';

const recursionArray: any = (list: any[], dataMap: any) => {
  const result = list.map((item) => {
    if (Array.isArray(item)) {
      return recursionArray(item);
    }
    if (isObject(item)) {
      return parseAllExpression(item, dataMap);
    }

    if (isExpression(item)) {
      return parseExpression(item, dataMap);
    }
    return item;
  });

  return result;
};

export const isExpression = (str: string) => {
  if (typeof str !== 'string') {
    return false;
  }

  const pattern = /^{\s*{(.+)}\s*}$/;
  const reg1 = /^{\s*{function\(.+}\s*}$/;

  return str.match(pattern) && !str.match(reg1);
};

export const parseExpression = (
  func: any,
  { sourceData, parentData, currentData }: { sourceData?: any; parentData?: any; currentData?: any },
) => {
  if (typeof func === 'string') {
    const funcBody = func.replace(/^{\s*{/g, '').replace(/}\s*}$/g, '');

    const funcStr = `
      return ${funcBody
        .replace(/source:/g, JSON.stringify(sourceData) + '.')
        .replace(/data:/g, JSON.stringify(currentData) + '.')
        .replace(/parent:/g, JSON.stringify(parentData) + '.')
        // 兼容两种写法
        .replace(/\$s/g, JSON.stringify(sourceData))
        .replace(/\$d/g, JSON.stringify(currentData))
        .replace(/\$p/g, JSON.stringify(parentData))}
    `;

    try {
      const result = Function(funcStr)();
      return result;
    } catch (error) {
      // console.log(error);
      return null; // 如果计算有错误，return null 最合适
    }
  }

  return func;
};

export const parseAllExpression = (_schema: any, dataMap: any) => {
  const schema: any = cloneDeep(_schema);

  Object.keys(schema).forEach((key) => {
    const item: any = schema[key];
    const { mustacheParse } = item || {};

    if (Array.isArray(item)) {
      schema[key] = recursionArray(item, dataMap);
    }
    if (isObject(item) && (mustacheParse ?? true)) {
      schema[key] = parseAllExpression(item, dataMap);
    } else if (isExpression(item)) {
      schema[key] = parseExpression(item, dataMap);
    }
  });

  return schema;
};
