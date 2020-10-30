import React, { useRef, useEffect, useMemo } from 'react';
import { usePrevious, useDebounce } from './hooks';
import PropTypes from 'prop-types';
import { isDeepEqual, combineSchema } from './base/utils';
import { asField, DefaultFieldUI } from './base/asField';
import parse from './base/parser';
import resolve from './base/resolve';
import { getValidateList } from './base/validate';
import fetcher from './HOC/fetcher';
import './atom.css';
import './index.css';

function RenderField({ fields, onChange, ...settings }) {
  const { Field, props } = parse(settings, fields);
  if (!Field) {
    return null;
  }
  return (
    <Field
      isRoot
      {...props}
      value={settings.data}
      onChange={onChange}
      formData={settings.formData}
    />
  );
}

// 在顶层将 propsSchema 和 uiSchema 合并，便于后续处理。 也可直接传入合并的 schema
const Wrapper = ({
  schema,
  propsSchema = {},
  uiSchema = {},
  readOnly,
  showValidate,
  ...rest
}) => {
  let _schema = {};
  const jsonSchema = schema || propsSchema; // 兼容schema字段和propsSchema字段
  // 将uiSchema和schema合并（推荐不写uiSchema）
  _schema = combineSchema(jsonSchema, uiSchema);

  return (
    <FormRender
      readOnly={readOnly}
      showValidate={!readOnly && showValidate} // 预览模式下不展示校验
      {...rest}
      schema={_schema}
    />
  );
};

function FormRender({
  name = '$form',
  column = 1,
  className,
  schema = {},
  formData = {},
  widgets = {},
  FieldUI = DefaultFieldUI,
  fields = {},
  mapping = {},
  showDescIcon = false,
  showValidate = true,
  displayType = 'column',
  onChange = () => {},
  onValidate = () => {},
  onMount,
  readOnly = false,
  labelWidth = 110,
  useLogger = false,
}) {
  const isUserInput = useRef(false); // 状态改变是否来自于用户操作
  const originWidgets = useRef();
  const generatedFields = useRef({});
  const previousSchema = usePrevious(schema);
  const previousData = usePrevious(formData);

  const data = useMemo(() => resolve(schema, formData), [schema, formData]);

  useEffect(() => {
    if (onMount) {
      onMount(data);
    } else {
      onChange(data);
    }
    onValidate(getValidateList(data, schema));
  }, []);

  useEffect(() => {
    if (isUserInput.current) {
      isUserInput.current = false;
      return;
    }
    if (!isDeepEqual(previousSchema, schema)) {
      onChange(data);
      updateValidation();
    } else if (!isDeepEqual(previousData, formData)) {
      updateValidation();
    }
  }, [schema, formData]);

  const debouncedValidate = useDebounce(onValidate);

  // 用户输入都是调用这个函数
  const handleChange = (key, val) => {
    isUserInput.current = true;
    onChange(val);
    debouncedValidate(getValidateList(val, schema));
  };

  const updateValidation = () => {
    onValidate(getValidateList(data, schema));
  };

  const generated = {};
  if (!originWidgets.current) {
    originWidgets.current = widgets;
  }
  Object.keys(widgets).forEach(key => {
    const oWidget = originWidgets.current[key];
    const nWidget = widgets[key];
    let gField = generatedFields.current[key];
    if (!gField || oWidget !== nWidget) {
      if (oWidget !== nWidget) {
        originWidgets.current[key] = nWidget;
      }
      gField = asField({ FieldUI, Widget: nWidget });
      generatedFields.current[key] = gField;
    }
    generated[key] = gField;
  });

  const settings = {
    schema,
    data,
    name,
    column,
    showDescIcon,
    showValidate,
    displayType,
    readOnly,
    labelWidth,
    useLogger,
    formData: data,
  };

  const _fields = {
    // 根据 Widget 生成的 Field
    generated,
    // 自定义的 Field
    customized: fields,
    // 字段 type 与 widgetName 的映射关系
    mapping,
  };

  return (
    <div className={`${className} fr-wrapper`}>
      <RenderField {...settings} fields={_fields} onChange={handleChange} />
    </div>
  );
}

FormRender.propTypes = {
  name: PropTypes.string,
  column: PropTypes.number,
  schema: PropTypes.object,
  formData: PropTypes.object,
  widgets: PropTypes.objectOf(PropTypes.func),
  FieldUI: PropTypes.elementType,
  fields: PropTypes.objectOf(PropTypes.element),
  mapping: PropTypes.object,
  showDescIcon: PropTypes.bool,
  showValidate: PropTypes.bool,
  displayType: PropTypes.string,
  onChange: PropTypes.func,
  onMount: PropTypes.func,
  onValidate: PropTypes.func,
  readOnly: PropTypes.bool,
  labelWidth: PropTypes.number,
  useLogger: PropTypes.bool,
};

export default fetcher(Wrapper);
