import { MetaItem } from './type';

export function splitMeta(meta: MetaItem[] = []) {
  const metaDim: MetaItem[] = [];
  const metaInd: MetaItem[] = [];
  meta.forEach(item => (item.isDim ? metaDim : metaInd).push(item));
  return { metaDim, metaInd };
}
