import { IApi } from 'dumi';

export default (api: IApi) => {
  api.modifyPublicPathStr(() => {
    return '/x-render/';
  });
};
