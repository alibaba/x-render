export const getFormItemLayout = (column: number, schema: any, { labelWidth, displayType }: any) => {
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

  // 自定义进行覆盖
  if (schema.labelCol) {
    labelCol = schema.labelCol;
  }

  if (schema.wrapperCol) {
    wrapperCol = schema.wrapperCol;
  }

  if (displayType === 'column') {
    labelCol = {};
    wrapperCol = {};
    // wrapperCol = { flex: 1 };
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

  return { labelCol, wrapperCol }
}