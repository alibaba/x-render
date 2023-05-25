import React, { useContext } from "react";
import { translation } from '../utils';
import { ConfigProvider } from 'antd';

const ErrorSchema = (schema: any) => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  return (
    <div>
      <div style={{ color: 'red' }}>{t('schema_not_match')}</div>
      <div>{JSON.stringify(schema)}</div>
    </div>
  );
}

export default ErrorSchema;