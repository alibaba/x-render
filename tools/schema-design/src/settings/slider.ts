import { mergeProps, createMeta } from './utils';

const props = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'range',
      title: { label: '双滑块模式', tip: '双滑块模式' },
      setter: 'BoolSetter',
      setValue(target: any, range: any) {
        let defaultValue = target.getNode().getPropValue('default');
        if (range) {
          defaultValue = Array.isArray(defaultValue)
            ? defaultValue
            : [0, defaultValue];
        } else {
          defaultValue = Array.isArray(defaultValue)
            ? defaultValue[1] || defaultValue[0]
            : defaultValue;
        }
        target.getNode().setPropValue('defaultValue', defaultValue);
      },
    },
    {
      name: 'allowClear',
      title: { label: '支持清除', tip: '是否允许清除' },
      condition(target: any) {
        return target.getProps().getPropValue('range') === true;
      },
      setter: 'BoolSetter',
    },
    {
      name: 'dots',
      title: { label: '对齐刻度', tip: '是否只能拖拽到刻度上' },
      setter: 'BoolSetter',
    },
    {
      name: 'max',
      title: { label: '最大值', tip: '最大值' },
      setter: 'NumberSetter',
    },
    {
      name: 'min',
      title: { label: '最小值', tip: '最小值' },
      setter: 'NumberSetter',
    },
    {
      name: 'reverse',
      title: { label: '反向坐标轴', tip: '反向坐标轴' },
      setter: 'BoolSetter',
    },
    {
      name: 'step',
      title: {
        label: '步长',
        tip:
          '步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 null，此时 Slider 的可选值仅有 marks 标出来的部分',
      },
      setter: 'NumberSetter',
    },
  ],
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'NumberSetter'
});

const snippets = [
  {
    label: '滑动条',
    screenshot: 'https://img.alicdn.com/imgextra/i3/O1CN01S1Bt8i1V7ax0QzyrR_!!6000000002606-55-tps-150-14.svg',
    schema: {
      componentName: 'Slider',
      props: {
        title: '滑动条'
      }
    }
  }
];

export default createMeta('Slider', {
  title: '滑动条',
  props,
  snippets,
  priority: 991
});
