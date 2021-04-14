import { getChildren2 } from '../utils';

// FR Schema => FRG schema
const transformFrom = (schema, parent = null, key) => {
  const isObj = schema.type === 'object' && schema.properties;
  const isList =
    schema.type === 'array' && schema.items && schema.items.properties;
  const hasChildren = isObj || isList;
  // debugger;
  if (hasChildren) {
    const childrenList = getChildren2(schema);
    childrenList.map(item => {
      if (isObj) {
        schema.properties[item.name] = transformFrom(
          item.schema,
          schema,
          item.name,
        );
      }
      if (isList) {
        schema.items.properties[item.name] = transformFrom(
          item.schema,
          schema,
          item.name,
        );
      }
    });
  }

  if (parent && parent.required && Array.isArray(parent.required)) {
    const index = parent.required.indexOf(key);
    if (index > -1) {
      schema.required = true;
      parent.required.splice(index, 1);
    }
    if (!parent.required.length) {
      delete parent.required;
    }
  }

  return schema;
};

export const fromFormRender = schema => {
  return {
    ...schema,
    schema: transformFrom(schema.schema),
  };
};

// FRG schema => FR Schema
const transformTo = (schema, parent = null, key = null) => {
  const isObj = schema.type === 'object' && schema.properties;
  const isList =
    schema.type === 'array' && schema.items && schema.items.properties;
  const hasChildren = isObj || isList;
  // debugger;
  if (hasChildren) {
    const childrenList = getChildren2(schema);
    childrenList.map(item => {
      if (isObj) {
        schema.properties[item.name] = transformTo(
          item.schema,
          schema,
          item.name,
        );
      }
      if (isList) {
        schema.items.properties[item.name] = transformTo(
          item.schema,
          schema,
          item.name,
        );
      }
    });
  }

  if (typeof schema.required === 'boolean') {
    if (schema.required && parent) {
      if (parent.required && Array.isArray(parent.required)) {
        parent.required.push(key);
      } else {
        parent.required = [key];
      }
    }
    delete schema.required;
  }

  return schema;
};

export const toFormRender = schema => {
  return {
    ...schema,
    schema: transformTo(schema.schema),
  };
};
