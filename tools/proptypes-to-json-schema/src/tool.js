/**
 * Created by Tw93<tw93@qq.con> on 2019-11-11.
 * 操作的相关功能函数
 */

const doctrine = require('doctrine');

const type2format = type => {
  let format;
  switch (type) {
    case 'bool':
      format = 'boolean';
      break;
    case 'arrayOf':
      format = 'array';
      break;
    case 'shape':
      format = 'object';
      break;
    case 'enum':
      break;
    default:
      format = type;
  }
  return format;
};

const getValueByType = (value, type) => {
  let data;
  switch (type) {
    case 'bool':
      data = value === 'true' || value === true;
      break;
    case 'number':
      data = value * 1;
      break;
    case 'shape':
      let v = {};
      try {
        v = eval(`(${value})`);
      } catch (e) {
        console.error(e);
      }
      data = v;
      break;
    case 'arrayOf':
      let arr = [];
      try {
        arr = eval(`(${value})`);
      } catch (e) {
        console.error(e);
      }
      data = arr;
      break;
    default:
      data = value.replace(/'|"/g, '');
  }
  return data;
};

const parse = doc => {
  const { tags } = doctrine.parse(doc);
  const result = {};
  ['title', 'description', 'format', 'pattern', 'enumNames'].forEach(item => {
    const tag = tags.find(t => t.title === item);
    if (tag && tag.description) {
      result[tag.title] = tag.description;
      // 转义
      if (tag.title === 'enumNames') {
        let names = [];
        try {
          names = eval(`(${tag.description})`);
        } catch (e) {
          console.error(e);
        }
        names.length > 0 && (result[tag.title] = names);
      }
    }
  });
  return result;
};

const getColumn = doc => {
  const { tags } = doctrine.parse(doc);
  const tag = tags.find(t => t.title === 'column');
  if (tag && tag.description && !isNaN(tag.description)) {
    return parseInt(tag.description);
  }
  return 2;
};

const getProp = props =>
  Object.keys(props).reduce((ret, propName) => {
    const { description, type = {}, defaultValue } = props[propName];
    const { name, value } = type;
    // 只处理有注释的 prop
    if (description) {
      const result = {};
      result.type = type2format(name);
      if (name === 'arrayOf') {
        const obj = parse(description);
        result.items = {
          type: type2format(value.name),
        };
        if (obj && obj.format) {
          result.items = Object.assign(result.items, {
            format: obj.format,
          });
        }
        if (value && value.name === 'shape' && value.value) {
          result.items = Object.assign(result.items, getObjProp(value.value));
        }
      }

      if (name === 'enum') {
        result.enum = value.map(item => item.value.replace(/'|"/g, ''));
      }

      if (defaultValue && defaultValue.value) {
        result.default = getValueByType(defaultValue.value, name);
      }

      let prop = Object.assign(parse(description), result);
      if (prop && prop.type === 'array' && prop.format) {
        delete prop.format;
      }

      if (name === 'shape') {
        prop = Object.assign(prop, getObjProp(value));
      }

      ret[propName] = prop;
    }

    return ret;
  }, {});

const getRequired = props => {
  const result = [];
  Object.keys(props).forEach(propName => {
    const prop = props[propName];
    if (prop.required) {
      result.push(propName);
    }
  });
  return result.length > 0 ? { required: result } : {};
};

const getObjProp = props => {
  const { required } = getRequired(props);
  const properties = Object.keys(props).reduce((ret, propName) => {
    const result = {};
    const pro = props[propName];
    const { name, description, value } = pro;
    if (description) {
      result.type = type2format(name);
      if (name === 'enum') {
        result.enum = value.map(item => item.value.replace(/'|"/g, ''));
      }

      if (name === 'arrayOf') {
        const obj = parse(description);
        result.items = {
          type: type2format(value.name),
        };
        if (obj && obj.format) {
          result.items = Object.assign(result.items, {
            format: obj.format,
          });
        }
        if (value && value.name === 'shape' && value.value) {
          result.items = Object.assign(result.items, getObjProp(value.value));
        }
      }

      ret[propName] = Object.assign(parse(description), result);
    }
    return ret;
  }, {});
  return {
    properties,
    required,
  };
};

// 根据 props 的类型生成默认的
const getUiWidgets = props =>
  Object.keys(props).reduce((ret, propName) => {
    const prop = props[propName];
    const { description, type = {} } = prop;
    const { name, value } = type;
    // 只处理有注释的 prop
    if (description) {
      const desc = parse(description);
      if (desc && desc.format && desc.format !== 'image') {
        ret[propName] = { 'ui:widget': desc.format };
      }
      if (name === 'shape' && value) {
        const widget = getUiWidgets(value);
        // 防止为空
        if (widget && JSON.stringify(widget) !== '{}') {
          ret[propName] = widget;
        }
      }
    }
    return ret;
  }, {});

// 喜码错误纠正
exports.parse = parse;
exports.getProp = getProp;
exports.getRequired = getRequired;
exports.getUiWidgets = getUiWidgets;
exports.getColumn = getColumn;
