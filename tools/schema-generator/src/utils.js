import { nanoid } from 'nanoid';
import deepClone from 'clone';

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

export const isObject = a =>
  stringContains(Object.prototype.toString.call(a), 'Object');

// 克隆对象
export function clone(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    return data;
  }
}

// '3' => true, 3 => true, undefined => false
export function isLooselyNumber(num) {
  if (typeof num === 'number') return true;
  if (typeof num === 'string') {
    return !Number.isNaN(Number(num));
  }
  return false;
}

export function isCssLength(str) {
  if (typeof str !== 'string') return false;
  return str.match(/^([0-9])*(%|px|rem|em)$/i);
}

// 深度对比
export function isDeepEqual(param1, param2) {
  if (param1 === undefined && param2 === undefined) return true;
  else if (param1 === undefined || param2 === undefined) return false;
  if (param1 === null && param2 === null) return true;
  else if (param1 === null || param2 === null) return false;
  else if (param1.constructor !== param2.constructor) return false;

  if (param1.constructor === Array) {
    if (param1.length !== param2.length) return false;
    for (let i = 0; i < param1.length; i++) {
      if (param1[i].constructor === Array || param1[i].constructor === Object) {
        if (!isDeepEqual(param1[i], param2[i])) return false;
      } else if (param1[i] !== param2[i]) return false;
    }
  } else if (param1.constructor === Object) {
    if (Object.keys(param1).length !== Object.keys(param2).length) return false;
    for (let i = 0; i < Object.keys(param1).length; i++) {
      const key = Object.keys(param1)[i];
      if (
        param1[key] &&
        typeof param1[key] !== 'number' &&
        (param1[key].constructor === Array ||
          param1[key].constructor === Object)
      ) {
        if (!isDeepEqual(param1[key], param2[key])) return false;
      } else if (param1[key] !== param2[key]) return false;
    }
  } else if (param1.constructor === String || param1.constructor === Number) {
    return param1 === param2;
  }
  return true;
}

// 时间组件
export function getFormat(format) {
  let dateFormat;
  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'time':
      dateFormat = 'HH:mm:ss';
      break;
    default:
      // dateTime
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
  }
  return dateFormat;
}

export function hasRepeat(list) {
  return list.find(
    (x, i, self) =>
      i !== self.findIndex(y => JSON.stringify(x) === JSON.stringify(y)),
  );
}

// ----------------- schema 相关

// 合并propsSchema和UISchema。由于两者的逻辑相关性，合并为一个大schema能简化内部处理
export function combineSchema(propsSchema = {}, uiSchema = {}) {
  const propList = getChildren(propsSchema);
  const newList = propList.map(p => {
    const { name } = p;
    const { type, enum: options, properties, items } = p.schema;
    const isObj = type === 'object' && properties;
    const isArr = type === 'array' && items && !options; // enum + array 代表的多选框，没有sub
    const ui = name && uiSchema[p.name];
    if (!ui) {
      return p;
    }
    // 如果是list，递归合并items
    if (isArr) {
      const newItems = combineSchema(items, ui.items || {});
      return { ...p, schema: { ...p.schema, ...ui, items: newItems } };
    }
    // object递归合并整个schema
    if (isObj) {
      const newSchema = combineSchema(p.schema, ui);
      return { ...p, schema: newSchema };
    }
    return { ...p, schema: { ...p.schema, ...ui } };
  });

  const newObj = {};
  newList.forEach(s => {
    newObj[s.name] = s.schema;
  });

  const topLevelUi = {};
  Object.keys(uiSchema).forEach(key => {
    if (typeof key === 'string' && key.substring(0, 3) === 'ui:') {
      topLevelUi[key] = uiSchema[key];
    }
  });
  if (isEmpty(newObj)) {
    return { ...propsSchema, ...topLevelUi };
  }
  return { ...propsSchema, ...topLevelUi, properties: newObj };
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// 获得propsSchema的children
function getChildren(schema) {
  if (!schema) return [];
  const {
    // object
    properties,
    // array
    items,
    type,
  } = schema;
  if (!properties && !items) {
    return [];
  }
  let schemaSubs = {};
  if (type === 'object') {
    schemaSubs = properties;
  }
  if (type === 'array') {
    schemaSubs = items;
  }
  return Object.keys(schemaSubs).map(name => ({
    schema: schemaSubs[name],
    name,
  }));
}

// 合并多个schema树，比如一个schema的树节点是另一个schema
export function combine() {}

// 代替eval的函数
export const parseString = string =>
  Function('"use strict";return (' + string + ')')();

// 解析函数字符串值
export const evaluateString = (string, formData, rootValue) =>
  Function(`"use strict";
    const rootValue = ${JSON.stringify(rootValue)};
    const formData = ${JSON.stringify(formData)};
    return (${string})`)();

// 判断schema的值是是否是“函数”
// JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数，也可使用@标记，不推荐。
export function isFunction(func) {
  if (typeof func === 'function') {
    return true;
  }
  if (typeof func === 'string' && func.substring(0, 1) === '@') {
    return func.substring(1);
  }
  if (
    typeof func === 'string' &&
    func.substring(0, 2) === '{{' &&
    func.substring(func.length - 2, func.length) === '}}'
  ) {
    return func.substring(2, func.length - 2);
  }
  return false;
}

// 判断schema中是否有属性值是函数表达式
export function isFunctionSchema(schema) {
  return Object.keys(schema).some(key => {
    if (typeof schema[key] === 'function') {
      return true;
    } else if (typeof schema[key] === 'string') {
      return isFunction(schema[key]);
    } else if (typeof schema[key] === 'object') {
      return isFunctionSchema(schema[key]);
    } else {
      return false;
    }
  });
}

// 后面三个参数都是内部递归使用的，将schema的树形结构扁平化成一层, 每个item的结构
// {
//   parent: '#',
//   schema: ...,
//   children: []
// }
export function flattenSchema(schema, name = '#', parent, result = {}) {
  const _schema = deepClone(schema);
  if (!_schema.$id) {
    _schema.$id = name; // 给生成的schema添加一个唯一标识，方便从schema中直接读取
  }
  const children = [];
  const isObj = _schema.type === 'object' && _schema.properties;
  const isList =
    _schema.type === 'array' && _schema.items && _schema.items.properties;
  if (isObj) {
    Object.entries(_schema.properties).forEach(([key, value]) => {
      const uniqueName = name + '/' + key;
      children.push(uniqueName);
      flattenSchema(value, uniqueName, name, result);
    });
    delete _schema.properties;
  }
  if (isList) {
    Object.entries(_schema.items.properties).forEach(([key, value]) => {
      const uniqueName = name + '/' + key;
      children.push(uniqueName);
      flattenSchema(value, uniqueName, name, result);
    });
    delete _schema.items.properties;
  }
  if (_schema.type) {
    result[name] = { parent, schema: _schema, children };
  }
  return result;
}

export const getKeyFromUniqueId = (uniqueId = '#') => {
  const arr = uniqueId.split('/');
  return arr[arr.length - 1];
};

export const changeKeyFromUniqueId = (uniqueId = '#', key = 'something') => {
  const arr = uniqueId.split('/');
  if (typeof key === 'string' || typeof key === 'number') {
    arr[arr.length - 1] = key;
  }
  return arr.join('/');
};

const copyFlattenItem = _item => {
  return {
    parent: _item.parent,
    schema: { ..._item.schema },
    data: _item.data,
    children: _item.children,
  };
};

// final = true 用于最终的导出的输出
// 几种特例：
// 1. 删除时值删除了item，没有删除和parent的关联，也没有删除children，所以要在解析这步来兜住 (所有的解析都是)
// 2. 修改$id的情况, 修改的是schema内的$id, 解析的时候要把schema.$id 作为真正的id (final = true的解析)
export function idToSchema(flatten, id = '#', final = false) {
  let schema = {};
  const _item = flatten[id];
  const item = deepClone(_item);
  if (item) {
    schema = { ...item.schema };
    // 最终输出去掉 $id
    if (final) {
      schema.$id && delete schema.$id;
    }
    if (item.children.length > 0) {
      item.children.forEach(child => {
        let childId = child;
        // TODO: 这个情况会出现吗？return会有问题吗？
        if (!flatten[child]) {
          return;
        }
        // 最终输出将所有的 key 值改了
        try {
          if (final) {
            childId = flatten[child].schema.$id;
          }
        } catch (error) {
          console.log('catch', error);
        }
        const key = getKeyFromUniqueId(childId);
        if (schema.type === 'object') {
          if (!schema.properties) {
            schema.properties = {};
          }
          schema.properties[key] = idToSchema(flatten, child, final);
        }
        if (
          schema.type === 'array' &&
          schema.items &&
          schema.items.type === 'object'
        ) {
          if (!schema.items.properties) {
            schema.items.properties = {};
          }
          schema.items.properties[key] = idToSchema(flatten, child, final);
        }
      });
    }
  }
  return schema;
}

// 删除对应id的schema（以及所有它的子schema）
export const deleteSchema = (id, schema) => {
  const flatten = flattenSchema(schema);
  if (id in flatten) {
    delete flatten[id];
  }
  return idToSchema(flatten);
};

// 复制对应id的schema
// export const copySchema = (id, schema) => {
//   const flatten = flattenSchema(schema);
//   let newId = id + '$$' + nanoid(10);
//   if (id && typeof id === 'string' && id.split('$$').length > 1) {
//     newId = id.split('$$')[0] + '$$' + nanoid(10);
//   }
//   if (id in flatten) {
//     // 将创建的新id注入到parent的children array
//     const parent = flatten[id].parent;
//     if (parent && parent in flatten) {
//       const children = flatten[parent].children;
//       try {
//         const idx = children.findIndex((x) => x === id);
//         children.splice(idx + 1, 0, newId);
//       } catch (error) {
//         console.error(error.message);
//       }
//     }

//     try {
//       // 简单的实现一下拷贝
//       flatten[newId] = {
//         parent: flatten[id].parent,
//         schema: { ...flatten[id].schema },
//         children: flatten[id].children,
//       };
//       flatten[newId].schema.$id = newId;
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
//   return [idToSchema(flatten), newId];
// };

export const copyItem = (flatten, $id) => {
  let newFlatten = { ...flatten };
  try {
    const item = flatten[$id];
    const newId = $id + nanoid(6);
    const siblings = newFlatten[item.parent].children;
    const idx = siblings.findIndex(x => x === $id);
    siblings.splice(idx + 1, 0, newId);
    newFlatten[newId] = deepClone(newFlatten[$id]);
    newFlatten[newId].schema.$id = newId;
    return [newFlatten, newId];
  } catch (error) {
    console.error(error, 'catcherror');
    return [flatten, $id];
  }
};

// schema的某个id位置后面添加一个名字是key的subSchema，生成新的schema
// TODO: 如果没有任何选中，或者选中的是object，逻辑要变

export const addSchema = ({ id, key, schema, subSchema }) => {
  const flatten = flattenSchema(schema);
  let newId = changeKeyFromUniqueId(id, key) + '$$' + nanoid(10);
  if (id in flatten) {
    // 生成新id，并将其放置于parent节点的children属性中
    const parent = flatten[id].parent;
    if (parent && parent in flatten) {
      const children = flatten[parent].children;
      try {
        const idx = children.findIndex(x => x === id);
        children.splice(idx + 1, 0, newId);
      } catch (error) {
        console.error(error.message);
      }
    }
    // 生成新节点
    try {
      flatten[newId] = {
        parent: flatten[id].parent,
        schema: subSchema,
        children: [],
      };
      flatten[newId].schema.$id = newId;
    } catch (error) {
      console.error(error.message);
    }
  }
  // 将id也返回，用于ui展示显示
  return [idToSchema(flatten), newId];
};

// Left 点击添加 item
export const addItem = ({ selected, name, schema, flatten }) => {
  let _selected = selected || '#';
  let newId;
  // string第一个是0，说明点击了object、list的里侧
  if ((_selected && _selected[0] === '0') || _selected === '#') {
    const newFlatten = { ...flatten };
    try {
      let oldId = _selected.substring(1);
      newId = oldId + '/' + name + '_' + nanoid(6);
      if (_selected === '#') {
        newId = '#/' + name + '_' + nanoid(6);
        oldId = '#';
      }
      const siblings = newFlatten[oldId].children;
      siblings.push(newId);
      const newItem = {
        parent: oldId,
        schema: { ...schema, $id: newId },
        data: undefined,
        children: [],
      };
      newFlatten[newId] = newItem;
    } catch (error) {
      console.error(error, 'catch');
    }
    return { newId, newFlatten };
  }
  let _name = name + '_' + nanoid(6);
  const idArr = selected.split('/');
  idArr.pop();
  idArr.push(_name);
  newId = idArr.join('/');
  const newFlatten = { ...flatten };
  try {
    const item = newFlatten[selected];
    const siblings = newFlatten[item.parent].children;
    const idx = siblings.findIndex(x => x === selected);
    siblings.splice(idx + 1, 0, newId);
    const newItem = {
      parent: item.parent,
      schema: { ...schema, $id: newId },
      data: undefined,
      children: [],
    };
    newFlatten[newId] = newItem;
  } catch (error) {
    console.error(error);
  }
  return { newId, newFlatten };
};

// position 代表 drop 在元素的哪里: 'up' 上 'down' 下 'inside' 内部
export const dropItem = ({ dragId, dragItem, dropId, position, flatten }) => {
  const _position = dropId === '#' ? 'inside' : position;
  let newFlatten = { ...flatten };
  // 会动到三块数据，dragItem, dragParent, dropParent. 其中dropParent可能就是dropItem（inside的情况）
  if (dragItem) {
    newFlatten[dragId] = dragItem;
  }
  const _dragItem = dragItem || newFlatten[dragId];

  const dropItem = newFlatten[dropId];
  let dropParent = dropItem;
  if (_position !== 'inside') {
    const parentId = dropItem.parent;
    dropParent = newFlatten[parentId];
  }
  // TODO: 这块的体验，现在这样兜底了，但是drag起一个元素了，应该让原本变空
  if (dropId.indexOf(dragId) > -1) {
    return [newFlatten, dragId];
  }

  let newId = dragId;
  try {
    const newParentId = dropParent.schema.$id;
    newId = newId.replace(_dragItem.parent, newParentId);
  } catch (error) {}

  // dragParent 的 children 删除 dragId
  try {
    const dragParent = newFlatten[_dragItem.parent];
    const idx = dragParent.children.indexOf(dragId);
    if (idx > -1) {
      dragParent.children.splice(idx, 1);
    }
  } catch (error) {
    console.error(error);
  }
  try {
    // dropParent 的 children 添加 dragId
    const newChildren = dropParent.children || []; // 要考虑children为空，inside的情况
    const idx = newChildren.indexOf(dropId);
    switch (_position) {
      case 'up':
        newChildren.splice(idx, 0, dragId);
        break;
      case 'down':
        newChildren.splice(idx + 1, 0, dragId);
        break;
      default:
        // inside 作为 default 情况
        newChildren.push(dragId);
        break;
    }
    // console.log(newChildren, dropParent, 'dropParent');
    dropParent.children = newChildren;
  } catch (error) {
    console.error(error);
  }

  _dragItem.parent = dropParent.$id;
  return [newFlatten, newId];
};
// TODO: 是不是要考虑如果drag前，已经有id和schema.id不一致的情况，会不会有问题？

// export const changeSubSchema = ({ id, schema, subSchema }) => {
//   const flatten = flattenSchema(schema);
//   if (id in flatten) {
//     const oldSchema = flatten[id];
//     const newId = subSchema.$id;
//     if (oldSchema.$id !== subSchema.$id) {
//     }
//   }
// };

// 解析函数字符串值
// TODO: 没有考虑list的情况
// export const getDataById = (data, idString) => {
//   if (idString === '#') return data;
//   try {
//     const idConnectedByDots = idString
//       .split('/')
//       .filter(id => id !== '#')
//       .map(id => `["${id}"]`)
//       .join('');
//     const string = `data${idConnectedByDots}`;
//     const a = `"use strict";
//     const data = ${JSON.stringify(data)};
//     return ${string}`;
//     return Function(a)();
//     // TODO: can be better
//     // let result = { ...data };
//     // idConnectedByDots.forEach((item) => {
//     //   result = result[item];
//     // });
//     // return result;
//   } catch (error) {
//     return undefined;
//   }
// };

// TODO: 没有考虑list的情况
export const dataToFlatten = (flatten, data) => {
  if (!flatten || !data) return {};
  Object.entries(flatten).forEach(([id, item]) => {
    const branchData = getDataById(data, id);
    flatten[id].data = branchData;
  });
  return flatten;
};

export const onChangeById = onChange => (id, value) => {};

// TODO: 没有考虑list的情况
export const flattenToData = (flatten, id = '#') => {
  try {
    let result = flatten[id].data;
    const ids = Object.keys(flatten);
    const childrenIds = ids.filter(item => {
      const lengthOfId = id.split('/').length;
      const lengthOfChild = item.split('/').length;
      return item.indexOf(id) > -1 && lengthOfChild > lengthOfId;
    });
    if (childrenIds && childrenIds.length > 0) {
      if (result === undefined) {
        // TODO: 这个是简化的逻辑，在编辑器模型下，list和object都是object结构
        if (['object', 'array'].indexOf(flatten[id].schema.type) > -1) {
          result = {};
        }
      }
      childrenIds.forEach(c => {
        const lengthOfId = id.split('/').length;
        const lengthOfChild = c.split('/').length;
        // 只比他长1，是直属的child
        if (lengthOfChild === lengthOfId + 1) {
          const cData = flattenToData(flatten, c);
          const cKey = getKeyFromUniqueId(c);
          result[cKey] = cData;
        }
      });
    }
    return result;
  } catch (error) {
    return undefined;
  }
};

// 例如当前item的id = '#/obj/input'  propName: 'labelWidth' 往上一直找，直到找到第一个不是undefined的值
export const getParentProps = (propName, id, flatten) => {
  try {
    const item = flatten[id];
    if (item.schema[propName] !== undefined) return item.schema[propName];
    if (item && item.parent) {
      const parentSchema = flatten[item.parent].schema;
      if (parentSchema[propName] !== undefined) {
        return parentSchema[propName];
      } else {
        return getParentProps(propName, item.parent, flatten);
      }
    }
  } catch (error) {
    return undefined;
  }
};

export function looseJsonParse(obj) {
  return Function('"use strict";return (' + obj + ')')();
}

// 获得propsSchema的children
export function getChildren2(schema) {
  if (!schema) return [];
  const {
    // object
    properties,
    // array
    items,
    type,
  } = schema;
  if (!properties && !items) {
    return [];
  }
  let schemaSubs = {};
  if (type === 'object') {
    schemaSubs = properties;
  }
  if (type === 'array') {
    schemaSubs = items.properties;
  }
  return Object.keys(schemaSubs).map(name => ({
    schema: schemaSubs[name],
    name,
  }));
}

// 解析函数字符串值
// TODO: 没有考虑list的情况
// getDataById(formData, '#/a/b/c')
export function getDataById(object, path) {
  path = castPath(path, object);

  let index = 0;
  const length = path.length;

  while (object != null && index < length) {
    const key = toKey(path[index++]);
    object = key ? object[key] : object;
  }
  return index && index == length ? object : undefined;
}

function castPath(value, object) {
  if (Array.isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : value.match(/([^\.\/\[\]#"']+)/g);
}

function toKey(value) {
  if (typeof value === 'string') {
    return value.replace(/^#\/?/, '');
  }
  const result = `${value}`;
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

const reIsDeepProp = /#\/.+\//;
const reIsPlainProp = /^\w*$/;

function isKey(value, object) {
  if (Array.isArray(value)) {
    return false;
  }
  const type = typeof value;
  if (type === 'number' || type === 'boolean' || value == null) {
    return true;
  }
  return (
    reIsPlainProp.test(value) ||
    !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
  );
}

export const oldSchemaToNew = schema => {
  if (schema && schema.propsSchema) {
    const { propsSchema, ...rest } = schema;
    return { schema: propsSchema, ...rest };
  }
  return schema;
};

export const newSchemaToOld = setting => {
  if (setting && setting.schema) {
    const { schema, ...rest } = setting;
    return { propsSchema: schema, ...rest };
  }
  return setting;
};
