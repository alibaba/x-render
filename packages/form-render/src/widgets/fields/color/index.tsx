import React from 'react';
import { Input } from 'antd';
import ColorPicker from 'rc-color-picker';
import alphaHexMap from './alphahexMap';
import 'rc-color-picker/assets/index.css';
import './index.less';

// Exp: '#ffffffA6' => algha: 65
const getAlphaFromHex = (hex = '#ffffff') => {
  const alphaHex = hex.slice(7);
  let alpha = 100;

  for (const key in alphaHexMap) {
    if (alphaHexMap[key] === alphaHex.toUpperCase()) {
      alpha = Number(key) * 100;
    }
  }
  return alpha;
};

const Color = (props: any) => {
  const { className, schema, disabled, readOnly, value, onChange, style } = props;
  
  const onPickerChange = (ev: any) => {
    if (disabled || readOnly) {
      return;
    }
    const alphaHex = alphaHexMap[(ev.alpha / 100).toFixed(2)];
    const hex = ev.color + (ev.alpha === 100 ? '' : alphaHex);
    onChange(hex);
  };

  const onInputChange = (ev: any) => {
    onChange(ev.target.value);
  };


  return (
    <div className='fr-color-picker' style={style}>
      {(disabled || readOnly)? (
        <span className='rc-color-picker-trigger' style={{ backgroundColor: value || '#ffffff' }} />
      ): (
        <ColorPicker
          type={schema?.format}
          animation='slide-up'
          color={(value && value.slice(0, 7)) || '#ffffff'}
          alpha={getAlphaFromHex(value)}
          onChange={onPickerChange}
          disabled={true}
        />
      )}
      {readOnly ? (
        <span>{value || '#ffffff'}</span>
      ) : (
        <Input
          className={className}
          placeholder='#ffffff'
          disabled={disabled}
          value={value}
          onChange={onInputChange}
        />
      )}
    </div>
  );
}

export default Color;


