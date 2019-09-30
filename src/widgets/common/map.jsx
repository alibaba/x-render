import React from 'react';

export default function map(p) {
  return (
    <div className="flex flex-wrap fr-map">
      {Object.keys(p.value).map(name =>
        p.getSubField({
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
            p.onChange(p.name, value);
          },
          rootValue: p.value,
        })
      )}
    </div>
  );
}
