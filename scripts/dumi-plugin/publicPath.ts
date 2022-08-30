import { IApi } from 'dumi';

export default (api: IApi) => {
  if (window.location.host.includes('alibaba')) {
    api.modifyPublicPathStr(() => {
      return '/x-render/';
    });
  }
};
