import { IMetaItem } from './types';

/**
 * 把元数据信息按照 isDim 字段拆分成维度元数据和指标元数据
 * @param meta 完整元数据信息
 * @todo 可以在这里面加字段的排序逻辑，如有必要
 */
export function splitMeta(meta: IMetaItem[]) {
  const metaDim: IMetaItem[] = [];
  const metaInd: IMetaItem[] = [];
  meta.forEach(item => {
    if (item.isDim) {
      metaDim.push(item);
    } else {
      metaInd.push(item);
    }
  });
  return { metaDim, metaInd };
}

/**
 * 解决浮点数丢失精度的问题，来源：https://github.com/camsong/blog/issues/9
 */
export function strip(num: number, precision = 12) {
  return +parseFloat(num?.toPrecision(precision));
}
