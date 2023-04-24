import React, { useContext } from 'react';
import { Input, ConfigProvider } from 'antd';
import { isUrl, translation } from '../../utils';
import withFieldWrap from '../../utils/withFieldWrap';
interface UrlNodeProps {
  value: string;
  addonText?: string;
}

const UrlNode: React.FC<UrlNodeProps> = (props) => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const { value, addonText = t('test_src')} = props;
  const useUrl = isUrl(value);

  if (useUrl) {
    return (
      <a target="_blank" href={value}>
        {addonText}
      </a>
    );
  }

  return <div>{addonText}</div>;
};

interface UrlInputProps {
  value?: string;
  prefix?: string;
  suffix?: string;
  addonText?: string;
  onChange?: (value: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({
  value,
  prefix,
  suffix,
  addonText,
  onChange,
  ...rest
}) => {
  let _value = value || '';

  if (prefix) {
    _value = _value.replace(prefix, '');
  }

  if (suffix) {
    _value = _value.replace(suffix, '');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = e.target.value;
    if (!_value) {
      onChange?.(_value);
      return;
    }
    if (prefix) {
      _value = prefix + _value;
    }
    if (suffix) {
      _value = _value + suffix;
    }
    onChange?.(_value);
  };

  return (
    <Input
      value={_value}
      prefix={prefix}
      suffix={suffix}
      onChange={handleChange}
      addonAfter={
        <UrlNode
          value={value}
          addonText={addonText}
        />
      }
      {...rest}
    />
  );
}

export default withFieldWrap(UrlInput);

