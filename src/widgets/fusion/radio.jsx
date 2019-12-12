/**
 * Updated by Tw93 on 2019-12-07.
 * 单选组件
 */
import { Radio } from '@alifd/next';
import radioHoc from '../../components/radioHoc';

export default function radio(p) {
  const onChange = v => p.onChange(p.name, v);
  return radioHoc(p, onChange, Radio);
}
