import React from 'react';
import PropTypes from 'prop-types';
import { isDeepEqual, combineSchema } from './base/utils';
import { asField, DefaultFieldUI } from './base/asField';
import parse from './base/parser';
import resolve from './base/resolve';
import { getValidateList } from './base/validate';
import '../atom.css';
import '../index.css';

function renderField(schema, fields, events) {
  const { Field, props } = parse(schema, fields);
  if (!Field) {
    return null;
  }
  return (
    <Field
      isRoot
      {...props}
      value={schema.data}
      {...events}
      formData={schema.formData}
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
  const _schema = schema ? schema : combineSchema(propsSchema, uiSchema);

  return (
    <FormRender
      readOnly={readOnly}
      showValidate={!readOnly && showValidate} // 预览模式下不展示校验
      {...rest}
      schema={_schema}
    />
  );
};

class FormRender extends React.Component {
  static propTypes = {
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
  };

  static defaultProps = {
    name: '$form',
    column: 1,
    schema: {},
    formData: {},
    widgets: {},
    FieldUI: DefaultFieldUI,
    fields: {},
    mapping: {},
    showDescIcon: false,
    showValidate: true,
    displayType: 'column',
    onChange: () => {},
    onValidate: () => {},
    readOnly: false,
    labelWidth: 110,
  };

  constructor() {
    super();
    this.originWidgets = null;
    this.generatedFields = {};
  }

  componentDidMount() {
    this.needUpdateForm(true);
  }

  componentWillReceiveProps(nextProps) {
    const { schema, formData } = this.props;
    // 遇到有更新 schema 情况，假如项数增多了，发现增多项不会更新
    if (
      !isDeepEqual(nextProps.schema, schema) ||
      !isDeepEqual(Object.keys(nextProps.formData), Object.keys(formData))
    ) {
      setTimeout(this.needUpdateForm, 0);
    }
  }

  // 如果 onMount props存在且入参useOnMount = true，使用onMount代替onChange，用于首次加载的特别逻辑
  needUpdateForm = (useOnMount = false) => {
    const { schema, formData, onChange, onMount, onValidate } = this.props;
    const data = resolve(schema, formData);
    useOnMount && onMount ? onMount(data) : onChange(data);
    onValidate(getValidateList(data, schema));
  };

  render() {
    const {
      name,
      column,
      className,
      schema,
      formData,
      widgets,
      FieldUI,
      fields: customized,
      mapping,
      showDescIcon,
      showValidate,
      displayType,
      onChange,
      onValidate,
      readOnly,
      labelWidth,
    } = this.props;

    const generated = {};
    const list = widgets;
    if (!this.originWidgets) {
      this.originWidgets = list;
    }
    Object.keys(list).forEach(key => {
      const oWidget = this.originWidgets[key];
      const nWidget = list[key];
      let gField = this.generatedFields[key];
      if (!gField || oWidget !== nWidget) {
        if (oWidget !== nWidget) {
          this.originWidgets[key] = nWidget;
        }
        gField = asField({ FieldUI, Widget: nWidget });
        this.generatedFields[key] = gField;
      }
      generated[key] = gField;
    });
    return (
      <div className={className}>
        {renderField(
          {
            schema,
            data: formData,
            name,
            column,
            showDescIcon,
            showValidate,
            displayType,
            readOnly,
            labelWidth,
            formData,
          },
          {
            // 根据 Widget 生成的 Field
            generated,
            // 自定义的 Field
            customized,
            // 字段 type 与 widgetName 的映射关系
            mapping,
          },
          {
            onChange(key, val) {
              onChange(val);
              onValidate(getValidateList(val, schema));
            },
          }
        )}
      </div>
    );
  }
}

export default Wrapper;
