import create from 'zustand';

type RootStore = {
  column?: number;
  labelCol?: number;
  wrapperCol?: number;
  // readyOnly: boolean,
  widgets?: any;
  setStore: (params: any) => any;
};

type ParentStore = {
  columns?: number;
  labelCol?: number;
  wrapperCol?: number;
  setStore: (params: any) => any;
};

export const useRootStore = create<RootStore>((set, get) => ({
  setStore: newState => {
    return set(state => ({ ...newState }));
  },
}));

export const useParentStore = create<ParentStore>((set, get) => ({
  setStore: newState => {
    return set(state => ({ ...newState }));
  },
}));
