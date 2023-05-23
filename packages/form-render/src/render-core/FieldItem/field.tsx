import React, { useContext, useEffect } from 'react';
import { Button, ConfigProvider, Form } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { _get, translation, isFunction } from '../../utils';

export const FieldWrapperStatus = (props: any) => {
  const { Field, fieldProps, maxWidth, initialValue, ...otherProps } = props;
  const { onStatusChange, addons, ...otherFieldProps } = fieldProps;
  const style = maxWidth ? { maxWidth, ...fieldProps?.style } : { ...fieldProps?.style } ;

  const { status } = Form.Item.useStatus();
  const errors = addons.getFieldError(addons.dataPath);

  useEffect(() => {
    onStatusChange && onStatusChange(status, errors);
  }, [JSON.stringify(errors)]);

  useUpdateEffect(() => {
    otherProps.onChange(initialValue);
  }, [JSON.stringify(initialValue)]);

  return (
    <Field 
      {...otherProps} 
      {...otherFieldProps} 
      style={style}
      addons={addons}
    />
  );
};

export const FieldWrapper = (props: any) => {
  const { Field, fieldProps, maxWidth, initialValue, ...otherProps } = props;
  const { addons, schema } = fieldProps;

  const _style = maxWidth ? { maxWidth, ...fieldProps?.style }: { ...fieldProps?.style }
  const { removeBtn } = schema;
 
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  useUpdateEffect(() => {
    otherProps.onChange(initialValue);
  }, [JSON.stringify(initialValue)]);

  const handleRemove = () => {
    if (isFunction(removeBtn?.onClick)) {
      removeBtn.onClick(() => {
        addons.setSchemaByPath(addons.schemaPath, { hidden: true });
      });
      return;
    }
    addons.setSchemaByPath(addons.schemaPath, { hidden: true });
  };

  return (
    <>
      <Field 
        {...otherProps} 
        {...fieldProps}
        style={_style}
      />
      {removeBtn && (
        <Button
          type='link'
          danger
          {...removeBtn}
          onClick={handleRemove}
        >
          {removeBtn?.text || t('delete')}
        </Button>
      )}
    </>
  );
}