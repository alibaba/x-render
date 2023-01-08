export const getFormItemLayout = (column: number, formProps: any, labelWidth: number) => {
  let labelCol: any = { span: 4 };
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
    labelCol = { flex : labelWidth + 'px' };
    wrapperCol = { flex: '0.95 1 auto' };
  }

  // 自定义进行覆盖
  if (formProps.labelCol) {
    labelCol = formProps.labelCol;
  }

  if (formProps.wrapperCol) {
    wrapperCol = formProps.wrapperCol;
  }

  return { labelCol, wrapperCol }
}