import { _cloneDeep, isObjType, isListType } from '../utils/index';
import sortProperties from './sortProperties';

export const getKeyFromPath = (path = '#') => {
  try {
    const arr = path.split('.');
    const last = arr.slice(-1)[0];
    const result = last.replace('[]', '');
    return result;
  } catch (error) {
    console.error(error, 'getKeyFromPath');
    return '';
  }
};

export function getSchemaFromFlatten(flatten: any, path = '#') {
  let schema: any = {};
  const item = _cloneDeep(flatten[path]);

  if (!item) {
    return schema;
  }
  
  schema = item.schema;
  // schema.$id && delete schema.$id;
  if (item.children.length > 0) {
    item.children.forEach((child: any) => {
      if (!flatten[child]) return;
      const key = getKeyFromPath(child);
      if (isObjType(schema)) {
        schema.properties[key] = getSchemaFromFlatten(flatten, child);
      }
      if (isListType(schema)) {
        schema.items.properties[key] = getSchemaFromFlatten(flatten, child);
      }
    });
  }

  return schema;
}

// TODO: more tests to make sure weird & wrong schema won't crush
export function flattenSchema(_schema = {}, name?: any, parent?: any, _result?: any) {
  // 排序
  // _schema = orderBy(_schema, item => item.order, ['asc']);

  const result = _result || {};

  const schema: any = _cloneDeep(_schema) || {};
  let _name = name || '#';
  if (!schema.$id) {
    schema.$id = _name; // path as $id, for easy access to path in schema
  }
  const children: any[] = [];
  if (isObjType(schema)) {
    sortProperties(Object.entries(schema.properties)).forEach(
      ([key, value]) => {
        const _key = isListType(value) ? key + '[]' : key;
        const uniqueName = _name === '#' ? _key : _name + '.' + _key;
        children.push(uniqueName);

        flattenSchema(value, uniqueName, _name, result);
      }
    );

    schema.properties = {};
  }
  if (isListType(schema)) {
    sortProperties(Object.entries(schema.items.properties)).forEach(
      ([key, value]) => {
        const _key = isListType(value) ? key + '[]' : key;
        const uniqueName = _name === '#' ? _key : _name + '.' + _key;
        children.push(uniqueName);
        flattenSchema(value, uniqueName, _name, result);
      }
    );

    schema.items.properties = {};
  }

  if (schema.type) {
    result[_name] = { parent, schema, children };
  }
 
  return result;
}

