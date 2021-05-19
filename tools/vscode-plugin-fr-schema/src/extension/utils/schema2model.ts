interface Schema {
  type?: string;
  properties?: any;
  items?: any;
}

const defaultValue: any = {
  boolean: false,
  integer: 1,
  null: null,
  number: 0,
  range: [],
  string: '',
};

const getModelFromSchema: (schema: Schema) => any = ({
  type = 'string',
  properties = {},
  items = {},
}) => {
  if (type === 'object') {
    return Object.keys(properties).reduce((result, key) => {
      return {
        ...result,
        [key]: getModelFromSchema(properties[key]),
      };
    }, {});
  }

  if (type === 'array') {
    if (items.type === 'object' && !Object.keys(items.properties).length) {
      return [];
    }
    return [getModelFromSchema(items)];
  }

  return defaultValue[type];
};

export default getModelFromSchema;
