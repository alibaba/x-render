export const getFormItemLayout = (column: number, schema: any, { labelWidth, displayType, _labelCol, _wrapperCol }: any) => {
  let labelCol: any = { xl: 5, xxl: 3 };
  let wrapperCol: any = { xl: 9, xxl: 6 };

  if (column === 2) {
    labelCol = { xl: 8, xxl: 6 };
    wrapperCol = { xl: 16, xxl: 14 }
  }

  if (column > 2) {
    labelCol = { span: 8 };
    wrapperCol = { span: 16 }
  }

  if (displayType === 'column') {
    labelCol = { xl: 9, xxl: 6 };
    if (column > 1) {
      labelCol = {};
      wrapperCol = {};
    }
    // wrapperCol = { flex: 1 };
  }

  if (_labelCol) {
    labelCol = _labelCol;
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
    wrapperCol = { flex: 1 };
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