import { get, isObject } from 'lodash-es';

// 把schema的properties降到一维
export function flatProperties(properties, ignoreObject = false, preKey = '') {
  if (!properties) {
    return {};
  }
  let obj = {};
  Object.keys(properties).forEach((key) => {
    obj[preKey ? `${preKey}[${key}]` : `[${key}]`] = properties[key];
    if (get(properties[key], 'type', '').toLocaleLowerCase() === 'object') {
      if (ignoreObject) {
        delete obj[preKey ? `${preKey}[${key}]` : `[${key}]`];
      }
      obj = {
        ...obj,
        ...flatProperties(
          properties[key].properties,
          ignoreObject,
          preKey ? `${preKey}[${key}]` : `[${key}]`,
        ),
      };
    }
  });
  return obj;
}

// 把 enum 值用 enumNames 替换
export function enumToEnumNames(data, enums, enumNames = enums) {
  // 数组类型有多种情况，可能是带enum的多选枚举，可能是区间
  // 做法是有enum的话，把enum用enumNames替换掉，无则保留
  let retData = null;
  if (Array.isArray(data)) {
    // 原有的 data 值是 ['apple', 'pear'] 这种，换成 苹果_梨子
    retData = data
      .map(
        (item) =>
          enumNames[enums.findIndex((i) => String(i) === String(item))] ||
          enumNames.findIndex((i) => String(i) === String(item)),
      )
      .join('_');
  } else {
    // 原有的 data 值是 'pear' 这种，换成 梨子
    retData =
      enumNames[enums.findIndex((i) => String(i) === String(data))] ||
      enumNames.findIndex((i) => String(i) === String(data));
  }
  return retData || data;
}

// 把 enumNames 值用 enum 替换
export function enumNamesToEnum(data, enums, enumNames = enums) {
  let retData = null;
  if (Array.isArray(data)) {
    retData = data.map(
      (item) =>
        enums[enumNames.findIndex((i) => String(i) === String(item))] ||
        enums.find((i) => String(i) === String(item)),
    );
  } else {
    retData =
      enums[enumNames.findIndex((i) => String(i) === String(data))] ||
      enums.find((i) => String(i) === String(data));
  }
  return retData || data;
}

export function generateSheetHeader(properties) {
  const flatProp = flatProperties(properties, true);
  return Object.keys(flatProp).map((key) => {
    const iProp = get(properties, key.replaceAll('][', '][properties]['), {});
    return iProp.type === 'array' && iProp?.items?.type === 'object'
      ? `【此列勿填】${iProp.title || key}`
      : `${iProp.title || key}`;
  });
}

export function generateSheetData(properties, arrayData) {
  function flatObject(obj) {
    return Object.values(obj).map((objVal) =>
      isObject(objVal) ? flatObject(objVal) : objVal,
    );
  }
  // 把数组内的对象降维下来
  const arrayDataFlat = arrayData.map(flatObject);
  // 降维后，还剩下数组格式的值，可能是带enum的多选枚举，可能是区间
  // 有一些单选的也有带enum的枚举
  // 做法是有enum的话，把enum用enumNames替换掉，无则保留
  const flatProp = flatProperties(properties);
  Object.values(flatProp).forEach((prop, index) => {
    if (prop.type === 'range') {
      // 区间类型
      arrayDataFlat.forEach((arr) => {
        // 原有的 arr[index] 值是 ['2020-01-01', '2020-01-02'] 这种
        arr[index] = Array.isArray(arr[index]) ? arr[index].join('_') : '';
      });
    } else if (prop.enum) {
      // 带enum的类型
      arrayDataFlat.forEach((arr) => {
        arr[index] = enumToEnumNames(arr[index], prop.enum, prop.enumNames);
      });
    } else if (prop.type === 'array') {
      // 数组类型
      arrayDataFlat.forEach((arr) => {
        // 原有的 arr[index] 值是 [{...}, {...}, {...}] 这种
        // 复杂数组直接不导出了
        arr[index] = '';
      });
    }
  });

  return arrayDataFlat;
}

/**
 * true、'TRUE'、'是' 都会被转成 true
 * false、'FALSE'、'是' 都会被转成 false
 * 其他的都返回原值
 * @param {*} val
 */
export function toBoolean(val) {
  if (typeof val === 'string') {
    if (val === '是' || val.toLowerCase() === 'true') {
      return true;
    }
    if (val === '否' || val.toLowerCase() === 'false') {
      return false;
    }
  }
  return val;
}
