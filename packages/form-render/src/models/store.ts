import { d } from 'vitest/dist/index-761e769b';
import { createStore as createx } from 'zustand';
import { flattenSchema as flatten } from './flattenSchema';

type FormStore = {
  schema?: any;
  flattenSchema: any;
  widgets: any;
  context?: any;
  isInit: boolean,
  init?: (schema: FormStore['schema']) => any;
  setContext: (context: any) => any;
  setSchema: (schema: any) => any;
};

// 将 useStore 改为 createStore， 并把它改为 create 方法
export const createStore = () => createx<FormStore>((setState: any, get: any) => ({
  isInit: false,
  schema: {},
  flattenSchema: {},
  context: {},
  widgets: null,
  init: data => {
    const { schema, widgets } = data;
    const flattenSchema = flatten(data?.schema);
    debugger;
    return setState({ 
      isInit: true, 
      schema,
      widgets,
      flattenSchema 
    });
  },

  setContext: context => {
    return setState({ context });
  },

  setSchema: (schema: any) => {
    const flattenSchema = flatten(schema);
    return setState({ schema, flattenSchema });
  }
}));



