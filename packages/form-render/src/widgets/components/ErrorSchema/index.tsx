import React from "react";
import { useTranslation } from "react-i18next";

export const ErrorSchema = (schema: any) => {
  const { t } = useTranslation()
  return (
    <div>
      <div style={{ color: 'red' }}>{t('schema_not_match')}</div>
      <div>{JSON.stringify(schema)}</div>
    </div>
  );
}