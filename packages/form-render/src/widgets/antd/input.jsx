import React, { useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Input, Popover } from 'antd';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import previewContent from '../../components/previewContent';

const PreviewNode = ({ format, value, showPop, setShowPop }) => {
  return (
    <Popover
      content={previewContent(format, value)}
      className="fr-preview"
      placement="bottom"
      visible={showPop}
    >
      <PictureOutlined
        onMouseEnter={() => setShowPop(true)}
        onMouseLeave={() => setShowPop(false)}
      />
    </Popover>
  );
};

export default function input(p) {
  const [showPop, setShowPop] = useState(false);
  const { options = {}, invalid, schema = {} } = p;
  const style = invalid
    ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 2px rgba(255,77,79,.2)' }
    : {};
  const { format = 'text', maxLength } = schema;
  const type = ['image', 'email'].indexOf(format) > -1 ? 'text' : format; // TODO: 这里要是添加新的input类型，注意是一个坑啊，每次不想用html的默认都要补上

  const debouncedSetShowPop = useDebouncedCallback(setShowPop, 1000);

  const handleChange = e => {
    p.onChange(p.name, e.target.value);
    setShowPop(true);
    debouncedSetShowPop.callback(false);
  };

  let suffix = undefined;
  try {
    let _value = p.value || '';
    if (typeof _value === 'number') {
      _value = String(_value);
    }
    suffix = options.suffix;
    if (!suffix && maxLength) {
      suffix = (
        <span
          style={
            _value.length > maxLength
              ? { fontSize: 12, color: '#ff4d4f' }
              : { fontSize: 12, color: '#999' }
          }
        >
          {_value.length + ' / ' + maxLength}
        </span>
      );
    }
  } catch (error) {}
  const _options = { ...options };
  delete _options.noTrim;
  const config = {
    ..._options,
    maxLength,
    suffix,
  };

  let addonAfter = options.addonAfter;
  if (format === 'image' && !addonAfter) {
    addonAfter = (
      <PreviewNode
        format={format}
        value={p.value}
        showPop={showPop}
        setShowPop={setShowPop}
      />
    );
  }

  return (
    <Input
      style={style}
      {...config}
      value={p.value}
      type={type}
      disabled={p.disabled || p.readOnly}
      addonAfter={addonAfter}
      onChange={handleChange}
    />
  );
}
