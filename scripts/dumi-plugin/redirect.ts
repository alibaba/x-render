import { IApi } from 'dumi'

export default (api: IApi) => {
  api.addEntryCodeAhead(() => {
    const code = `
    if(location.origin.includes('gitee')) location.href = 'https://xrender.fun'
    `
    return code
  })
};