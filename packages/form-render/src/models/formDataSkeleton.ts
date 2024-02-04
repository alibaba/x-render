import { _cloneDeep, isObjType, isListType } from '../utils/index';

export const createDataSkeleton = (schema: any, formData?: any) => {
  let _formData = _cloneDeep(formData);
  let result = _formData;
  
  if (isObjType(schema)) {
    if (_formData === undefined || typeof _formData !== 'object') {
      _formData = {};
      result = {};
    }
    Object.keys(schema.properties).forEach(key => {
      const childSchema = schema.properties[key];
      const childData = _formData[key];
      const childResult = createDataSkeleton(childSchema, childData);
      result[key] = childResult;
    });
  } else if (_formData !== undefined) {
    // result = _formData;
  } else if (schema.default !== undefined) {
    result = _cloneDeep(schema.default);
  } else if (isListType(schema)) {
    result = [createDataSkeleton(schema.items)];
  } else if (schema.type === 'boolean' && !schema.widget) {
    // result = false;
    result = undefined;
  } else {
    result = undefined;
  }
  return result;
};