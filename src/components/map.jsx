import React from 'react';

export default function map(p) {
  let className = 'fr-map ';
  const { options = {} } = p || {};
  const isModal = options.modal || options.drawer;
  className += isModal ? 'fr-wrapper' : ''; // 因为modal跳出fr的dom层级了，需要重新加个顶层的className
  const _value = p.value || {};
  return (
    <div className={className}>
      {Object.keys(_value).map(name => {
        return p.getSubField({
          name,
          value: p.value[name],
          onChange(key, val, objValue) {
            let value = {
              ...p.value,
              [key]: val,
            };
            // 第三个参数，允许object里的一个子控件改动整个object的值
            if (objValue) {
              value = objValue;
            }
            if (p.useLogger) {
              console.group(p.name);
              console.log(
                `%c${key}:`,
                'color: #47B04B; font-weight: 700;',
                val
              );
              console.log(
                `%c${p.name}:`,
                'color: #00A7F7; font-weight: 700;',
                value
              );
              console.groupEnd();
            }
            p.onChange(p.name, value);
          },
          rootValue: p.value,
        });
      })}
    </div>
  );
}
