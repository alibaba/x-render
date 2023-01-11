export const getFormItemLayout = (column: number, schema: any, { labelWidth, displayType }: any) => {
  let labelCol: any = { xl: 4, xxl: 3 };
  let wrapperCol: any = { span: 8 };

  if (column === 2) {
    labelCol = { xl: 8, xxl: 6 };
    wrapperCol = { xl: 16, xxl: 14 }
  }

  if (column > 2) {
    labelCol = { span: 8 };
    wrapperCol = { flex: 1 }
  }

  // 兼容一下 1.0 版本
  if (labelWidth) {
    labelCol = { flex : labelWidth + 'px' };
    wrapperCol = { flex: '0.95 1 auto' };
  }

  // 自定义进行覆盖
  if (schema.labelCol) {
    labelCol = schema.labelCol;
  }

  if (schema.wrapperCol) {
    wrapperCol = schema.wrapperCol;
  }

  if (schema.layout === 'inline' || (Object.keys(schema).length > 0 && !schema.title)) {
    labelCol = { offset: 1 };
  }

  if (displayType === 'column') {
    labelCol = {};
    wrapperCol = { flex: 1 };
  }

  return { labelCol, wrapperCol }
}