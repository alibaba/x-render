import { parseExpression } from './expression';

// 提取 formData. 开头的字符串
const extractFormDataStrings = (list: string[]) => {
  let result = [];
  list.forEach(str => {
    // TODO: 为啥要拆开来获取？
    const regex = /formData.\w+(.\w+)*(\(.*\))?/g; // 匹配formData.后面跟着字母、数字、下划线间隔的组合
    const matches = str.match(regex);
    if (matches) {
      result = result.concat(matches);
    }
  });

  return result;
};

// 提取 rootValue. 开头的字符串
const extractRootValueStrings = (list: string[]) => {
  let result = [];
  list.forEach(str => {
    const regex = /rootValue.\w+(.\w+)*(\(.*\))?/g; // 匹配formData.后面跟着字母、数字、下划线间隔的组合
    const matches = str.match(regex);
    if (matches) {
      result = result.concat(matches);
    }
  });
  return result;
};

// 提取 {{ }} 里面的内容
const findStrList = (str: any, type: string) => {
  const regex = /{{(.*?)}}/g;
  const matches = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    matches.push(match[1]);
  };

  if (type === 'formData') {
    return extractFormDataStrings(matches);
  }

  if (type === 'rootValue') {
    return extractRootValueStrings(matches);
  }
  return [];
};

const getListEveryResult = (list: string[], preValue: any, nextValue: any, dataPath: string) => {
  return list.every(item => {
    const pre = parseExpression(item, preValue, dataPath);
    const curr = parseExpression(item, nextValue, dataPath);
    return pre === curr;
  });
};

export default (str: string, dataPath: string, dependencies: any[], shouldUpdateOpen: boolean) => (preValue: any, nextValue: any) => {
  // dependencies 先不处理
  if (dependencies) {
    return true;
  }

  const formDataList = findStrList(str, 'formData');
  const rootValueList = findStrList(str, 'rootValue');
  const formDataRes = getListEveryResult(formDataList, preValue, nextValue, dataPath);
  const rootValueRes = getListEveryResult(rootValueList, preValue, nextValue, dataPath);

  if (formDataRes && rootValueRes) {
    return false;
  }

  return true;
};
