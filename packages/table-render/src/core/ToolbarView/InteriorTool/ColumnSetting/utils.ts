import { ToolbarActionConfig } from "@/types";
import omit from 'lodash.omit';

export type Setting = ToolbarActionConfig['columnsSettingValue'];


/**
 * 固定某一列
 */
export const fixItem: (setting: Setting, fixKey: string) => Setting = (setting, fixKey) => {
  return setting.map(i => {
    if (i.key === fixKey) {
      const { onFirstPart, preFixed, nextFixed, isFirstOne, isLastOne, index } = getStatus(setting, i.key);
      let fixed;

      if (preFixed && !nextFixed && !isLastOne) {
        fixed = setting[index - 1].fixed
      } else if (!preFixed && nextFixed && !isFirstOne) {
        fixed = setting[index + 1].fixed
      } else if (onFirstPart) {
        fixed = 'left'
      } else {
        fixed = 'right';
      }

      return {
        ...i,
        fixed,
      }
    }
    return i;
  })
}


/**
 * 取消固定不应该的固定的那些列
 * 
 * @param setting 排序或固定之后的 setting 数组
 * @returns newSetting 新 setting 数组
 */
export const cancelFixed: (setting: Setting) => Setting = (setting) => {
  return setting.map((i) => {
    if (i.fixed) {
      const { haveBackwardUnFixed, haveForwardUnFixed, isFirstOne, isLastOne } = getStatus(setting, i.key);

      if (haveForwardUnFixed && haveBackwardUnFixed && !isLastOne && !isFirstOne) {
        return omit(i, 'fixed');
      }
    }
    return i;
  })
}


/**
 * 获取当前项的位置状态
 */
export const getStatus = (setting: Setting, key: string) => {
  const length = setting.length;
  const index = setting.findIndex(i => i.key === key);
  const isFixed = !!setting[index].fixed;
  const isFirstOne = index === 0;
  const isLastOne = index === length - 1;
  const preFixed = !isFirstOne && !!setting[index - 1]?.fixed;
  const nextFixed = !isLastOne && !!setting[index + 1]?.fixed;
  const haveForwardUnFixed = setting.slice(0, index).some(i => !i.fixed);
  const haveBackwardUnFixed = setting.slice(index).some(i => !i.fixed);
  const onFirstPart = index + 1 < (length / 2);

  return {
    index,
    /** 当前项是固定的 */
    isFixed,
    /** 是第一个 */
    isFirstOne,
    /** 是最后一个 */
    isLastOne,
    /** 前一个是固定的 */
    preFixed,
    /** 后一个是固定的 */
    nextFixed,
    /** 前面存在未固定的 */
    haveForwardUnFixed,
    /** 后面存在未固定的 */
    haveBackwardUnFixed,
    /** 在前半部分 */
    onFirstPart,
  }
}
