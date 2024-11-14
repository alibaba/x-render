import { customAlphabet } from 'nanoid';
export const uuid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16);


export const isMac = () => {
  return navigator.userAgent.toUpperCase().includes('MAC')
}

const specialKeysNameMap: Record<string, string | undefined> = {
  ctrl: '⌘',
  alt: '⌥',
}

export const getKeyboardKeyNameBySystem = (key: string) => {
  if (isMac())
    return specialKeysNameMap[key] || key

  return key
}


export const capitalize = (string: string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return string;
  }
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export const transformNodes = (nodes: any[]) => {
  return nodes?.map(item => {
    const { type, data, ...rest } = item;
    return {
      type: 'custom',
      data: {
        ...data,
        _nodeType: type,
      },
      ...rest
    }
  })
}