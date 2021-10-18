import React from 'react';
import ColorPicker from 'rc-color-picker';
import { Input } from 'antd';
import 'rc-color-picker/assets/index.css';

const alphaHexMap = {
  '1.00': 'FF',
  '0.99': 'FC',
  '0.98': 'FA',
  '0.97': 'F7',
  '0.96': 'F5',
  '0.95': 'F2',
  '0.94': 'F0',
  '0.93': 'ED',
  '0.92': 'EB',
  '0.91': 'E8',
  '0.90': 'E6',
  '0.89': 'E3',
  '0.88': 'E0',
  '0.87': 'DE',
  '0.86': 'DB',
  '0.85': 'D9',
  '0.84': 'D6',
  '0.83': 'D4',
  '0.82': 'D1',
  '0.81': 'CF',
  '0.80': 'CC',
  '0.79': 'C9',
  '0.78': 'C7',
  '0.77': 'C4',
  '0.76': 'C2',
  '0.75': 'BF',
  '0.74': 'BD',
  '0.73': 'BA',
  '0.72': 'B8',
  '0.71': 'B5',
  '0.70': 'B3',
  '0.69': 'B0',
  '0.68': 'AD',
  '0.67': 'AB',
  '0.66': 'A8',
  '0.65': 'A6',
  '0.64': 'A3',
  '0.63': 'A1',
  '0.62': '9E',
  '0.61': '9C',
  '0.60': '99',
  '0.59': '96',
  '0.58': '94',
  '0.57': '91',
  '0.56': '8F',
  '0.55': '8C',
  '0.54': '8A',
  '0.53': '87',
  '0.52': '85',
  '0.51': '82',
  '0.50': '80',
  '0.49': '7D',
  '0.48': '7A',
  '0.47': '78',
  '0.46': '75',
  '0.45': '73',
  '0.44': '70',
  '0.43': '6E',
  '0.42': '6B',
  '0.41': '69',
  '0.40': '66',
  '0.39': '63',
  '0.38': '61',
  '0.37': '5E',
  '0.36': '5C',
  '0.35': '59',
  '0.34': '57',
  '0.33': '54',
  '0.32': '52',
  '0.31': '4F',
  '0.30': '4D',
  '0.29': '4A',
  '0.28': '47',
  '0.27': '45',
  '0.26': '42',
  '0.25': '40',
  '0.24': '3D',
  '0.23': '3B',
  '0.22': '38',
  '0.21': '36',
  '0.20': '33',
  '0.19': '30',
  '0.18': '2E',
  '0.17': '2B',
  '0.16': '29',
  '0.15': '26',
  '0.14': '24',
  '0.13': '21',
  '0.12': '1F',
  '0.11': '1C',
  '0.10': '1A',
  '0.09': '17',
  '0.08': '14',
  '0.07': '12',
  '0.06': '0F',
  '0.05': '0D',
  '0.04': '0A',
  '0.03': '08',
  '0.02': '05',
  '0.01': '03',
  '0.00': '00',
};

// Exp: "#ffffffA6" => algha: 65
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

export default function color(p) {
  const { format } = p.schema;
  const onPickerChange = e => {
    if (p.disabled || p.readonly) return;
    const alphaHex = alphaHexMap[(e.alpha / 100).toFixed(2)];
    const hex = e.color + (e.alpha === 100 ? '' : alphaHex);
    p.onChange(hex);
  };
  const onInputChange = e => {
    p.onChange(e.target.value);
  };

  return (
    <div className="fr-color-picker">
      {
        <ColorPicker
          type={format}
          animation="slide-up"
          color={(p.value && p.value.slice(0, 7)) || '#ffffff'}
          alpha={getAlphaFromHex(p.value)}
          onChange={onPickerChange}
        />
      }
      {p.readonly ? (
        <span>{p.value || '#ffffff'}</span>
      ) : (
        <Input
          placeholder="#ffffff"
          disabled={p.disabled}
          value={p.value}
          onChange={onInputChange}
        />
      )}
    </div>
  );
}
