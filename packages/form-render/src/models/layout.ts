export const getFormItemLayout = (column: number, schema: any, { labelWidth, displayType, _labelCol, _wrapperCol }: any) => {
  let labelCol: any = { span: 5 };
  let wrapperCol: any = { span: 9 };

  if (column === 2) {
    labelCol = { span: 6 };
    wrapperCol = { span: 14 }
  }

  if (column > 2) {
    labelCol = { span: 8 };
    wrapperCol = { span: 16 }
  }

  if (displayType === 'column') {
    // labelCol = { xl: 9, xxl: 6 };
    // if (column > 1) {
    //   labelCol = {};
    //   wrapperCol = {};
    // }
    labelCol = {};
    wrapperCol = {};
  }

  if (_labelCol) {
    labelCol = _labelCol;
    if (displayType === 'column') {
      labelCol = {};
    }
  }

  if (_wrapperCol) {
    wrapperCol = _wrapperCol;
  }

  if (displayType === 'inline') {
    labelCol = {};
    wrapperCol = {};
  }

  // 兼容一下 1.0 版本
  if (labelWidth) {
    labelCol = { flex : labelWidth + 'px' };
    wrapperCol = { flex: 'auto' };
  }

  // 自定义进行覆盖
  if (schema.labelCol) {
    labelCol = schema.labelCol;
  }

  if (schema.wrapperCol) {
    wrapperCol = schema.wrapperCol;
  }
  
  return { labelCol, wrapperCol }
}