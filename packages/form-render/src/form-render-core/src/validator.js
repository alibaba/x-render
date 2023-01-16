/* eslint-disable react-hooks/exhaustive-deps */
import Validator from 'async-validator';
import { get, merge } from 'lodash-es';
import {
  allPromiseFinish,
  dataToKeys,
  destructDataPath,
  getDataPath,
  isExpression,
  isObject,
  parseSingleExpression,
  removeDups,
} from './utils';
import { defaultValidateMessages } from './validateMessage';
import { defaultValidateMessagesCN } from './validateMessageCN';
import { getRealDataFlatten } from './void';
import { getDescriptorSimple } from './getDescriptorSimple';

export const parseSchemaExpression = (schema, formData, path) => {
  if (!isObject(schema)) return schema;
  const result = {};
  Object.keys(schema).forEach(key => {
    const item = schema[key];
    if (isObject(item)) {
      result[key] = parseSchemaExpression(item, formData, path);
    } else if (isExpression(item)) {
      result[key] = parseSingleExpression(item, formData, path);
    } else {
      result[key] = item;
    }
  });
  return result;
};

const getRelatedPaths = (path, flatten) => {
  const parentPaths = [];
  const pathArr = path.split('.');
  while (pathArr.length > 0) {
    parentPaths.push(pathArr.join('.'));
    pathArr.pop();
  }

  let result = [...parentPaths];

  parentPaths.forEach(path => {
    const { id, dataIndex } = destructDataPath(path);
    if (
      flatten[id] &&
      flatten[id].schema &&
      Array.isArray(flatten[id].schema.dependecies)
    ) {
      const deps = flatten[id].schema.dependecies;
      const fullPathDeps = deps.map(dep => getDataPath(dep, dataIndex));
      result = [...result, ...fullPathDeps];
    }
  });
  return removeDups(result).map(path => {
    if (path.slice(-1) === ']') {
      const pattern = /\[[0-9]+\]$/;
      return path.replace(pattern, '');
    } else {
      return path;
    }
  });
};

export const validateField = ({
  path,
  formData,
  flatten,
  options,
  formInstance = {},
}) => {
  const paths = getRelatedPaths(path, flatten);
  // console.log('all relevant paths:', paths);

  flatten = getRealDataFlatten(flatten);
  const promiseArray = paths.map(path => {
    const { id, dataIndex } = destructDataPath(path);
    if (flatten[id] || flatten[`${id}[]`]) {
      const item = flatten[id] || flatten[`${id}[]`];
      const singleData = get(formData, path);
      let schema = item.schema || {};
      const finalSchema = parseSchemaExpression(schema, formData, path);
      return validateSingle(
        singleData,
        finalSchema,
        path,
        options,
        formInstance
      ); // is a promise
    } else {
      return Promise.resolve();
    }
  });

  return allPromiseFinish(promiseArray)
    .then(res => {
      const errorFields = res
        .filter(item => Array.isArray(item) && item.length > 0)
        .map(item => {
          const name = item[0].field;
          const error = item.map(m => m.message).filter(m => !!m);
          return { name, error };
        });
      return errorFields;
    })
    .catch(e => {
      console.log(e);
    });
};

// pathFromData => allPath
const getAllPaths = (paths, flatten) => {
  if (!Array.isArray(paths)) return [];
  const result = [...paths]
    .filter(p => p.indexOf(']') > -1)
    .map(p1 => {
      const last = p1.lastIndexOf(']');
      return p1.substring(0, last + 1);
    });
  const uniqueResult = removeDups(result);

  const allFlattenPath = Object.keys(flatten);
  let res = [...paths];
  uniqueResult.forEach(result => {
    const { id, dataIndex } = destructDataPath(result);
    if (flatten[id]) {
      const children = allFlattenPath.filter(
        f => f.indexOf(id) === 0 && f !== id
      );
      const childrenWithIndex = children
        .map(child => {
          const p = getDataPath(child, dataIndex);
          return p.split('[]')[0];
        })
        .filter(i => !!i);
      res = [...res, ...removeDups(childrenWithIndex)];
    }
  });
  return removeDups(res);
};

export const validateAll = ({
  formData,
  flatten,
  options, // {locale = 'cn', validateMessages = {}}
  formInstance = {},
}) => {
  const paths = dataToKeys(formData);
  const allPaths = getAllPaths(paths, flatten);

  // console.log(formData, dataToKeys(formData), 'dataToKeysdataToKeys');
  // console.log('allPaths', allPaths);
  const promiseArray = allPaths.map(path => {
    const { id, dataIndex } = destructDataPath(path);
    if (flatten[id] || flatten[`${id}[]`]) {
      const item = flatten[id] || flatten[`${id}[]`];
      const singleData = get(formData, path);
      let schema = item.schema || {};

      // 若parent的hidden属性为true，则子项需继承 hidden
      const relatedPaths = getRelatedPaths(path, flatten);
      if (relatedPaths.length > 1) {
        const parentPath = relatedPaths[relatedPaths.length - 1];
        const parentSchema = flatten[parentPath] || {};
        if (get(parentSchema, 'schema.hidden', false)) {
          schema.hidden = true;
        }
      }

      const finalSchema = parseSchemaExpression(schema, formData, path);
      return validateSingle(
        singleData,
        finalSchema,
        path,
        options,
        formInstance
      ); // is a promise
    } else {
      return Promise.resolve();
    }
  });

  return allPromiseFinish(promiseArray)
    .then(res => {
      const errorFields = res
        .filter(
          item =>
            Array.isArray(item) && item.length > 0 && item[0].message !== null
        ) // NOTICE: different from validateField
        .map(item => {
          const name = item[0].field;
          const error = item.map(m => m.message).filter(m => !!m);
          return { name, error };
        });
      return errorFields;
    })
    .catch(e => {
      console.log(e);
    });
};

const validateSingle = (
  data,
  schema = {},
  path,
  options = {},
  formInstance = {}
) => {
  // 自定义区块不做rules校验
  if (schema.type === 'block') {
    return Promise.resolve();
  }
  if (schema.hidden) {
    return Promise.resolve();
  }

  const { validateMessages = {}, locale = 'cn' } = options;
  const cn = defaultValidateMessagesCN;
  const en = defaultValidateMessages;
  const descriptor = getDescriptorSimple(schema, path);
  // console.log('descriptor, schema, path', descriptor, schema, path, data);
  // TODO: 有些情况会出现没有rules，需要看一下，先兜底
  let validator;
  try {
    validator = new Validator(descriptor);
  } catch (error) {
    return Promise.resolve();
  }
  formInstance?.setFieldValidating(path);
  let messageFeed = locale === 'en' ? en : cn;
  merge(messageFeed, validateMessages);
  validator.messages(messageFeed);
  return validator
    .validate({ [path]: data })
    .then(res => {
      return [{ field: path, message: null }];
    })
    .catch(({ errors, fields }) => {
      return errors;
    })
    .finally(() => {
      formInstance?.removeFieldValidating(path);
    });
};
