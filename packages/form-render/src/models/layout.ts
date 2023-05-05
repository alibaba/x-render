export const getFormItemLayout = (column: number, schema: any, { labelWidth, displayType, _labelCol, _fieldCol }: any) => {
  let labelCol: any = { span: 5 };
  let fieldCol: any = { span: 9 };

  if (column === 2) {
    labelCol = { span: 6 };
    fieldCol = { span: 14 }
  }

  if (column > 2) {
    labelCol = { span: 7 };
    fieldCol = { span: 16 }
  }

  if (displayType === 'column') {
    // labelCol = { xl: 9, xxl: 6 };
    // if (column > 1) {
    //   labelCol = {};
    //   fieldCol = {};
    // }
    labelCol = {};
    fieldCol = {};
  }

  if (_labelCol) {
    labelCol = _labelCol;
    if (displayType === 'column') {
      labelCol = {};
    }
  }

  if (_fieldCol) {
    fieldCol = _fieldCol;
    if (typeof _fieldCol === 'number') {
      fieldCol = { span: _fieldCol }
    }
  }

  if (displayType === 'inline') {
    labelCol = {};
    fieldCol = {};
  }

  // 兼容一下 1.0 版本
  if ((labelWidth || labelWidth === 0) && displayType !== 'column') {
    labelCol = { flex : labelWidth + 'px' };
    fieldCol = { flex: 'auto' };
  }

  // 自定义进行覆盖
  if (schema.cellSpan) {
    fieldCol = {};
  }


  if (schema.labelCol || schema.labelCol === 0) {
    labelCol = schema.labelCol;
  }

  if (schema.fieldCol || schema.fieldCol === 0) {
    fieldCol = schema.fieldCol;
  }

  if (typeof labelCol === 'number') {
    labelCol = { span: labelCol }
  }

  if (typeof fieldCol === 'number') {
    fieldCol = { span: fieldCol }
  }
  
  return { labelCol, fieldCol }
}