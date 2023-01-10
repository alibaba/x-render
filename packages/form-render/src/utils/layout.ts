export const getFormItemLayout = (column: number, schema: any, { labelWidth, layout }: any) => {
  let labelCol: any = { span: 3 };
  let wrapperCol: any = { span: 8 };

  if (column === 2) {
    labelCol = { span: 6 };
    wrapperCol = { span: 14 }
  }

  if (column > 2) {
    labelCol = { span: 7 };
    wrapperCol = { span: 15 }
  }

  // 兼容一下 1.0 版本
  if (labelWidth) {
    debugger;
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

  if (schema.layout === 'vertical') {
    labelCol = {};
    // wrapperCol = {};
  }

  return { labelCol, wrapperCol }
}