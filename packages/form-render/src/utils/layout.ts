export const getFormItemLayout = (column: number, formProps: any) => {
  let labelCol = { span: 4 };
  let wrapperCol = { span: 8 };

  if (column === 2) {
    labelCol = { span: 6 };
    wrapperCol = { span: 14 }
  }

  if (column > 2) {
    labelCol = { span: 7 };
    wrapperCol = { span: 15 }
  }

  // 自定义进行覆盖
  if (formProps.labelCol) {
    labelCol = formProps.labelCol;
  }

  if (formProps.wrapperCol) {
    wrapperCol = formProps.wrapperCol;
  }

  // if (schema?.labelWidth) {
  //   labelCol.flex = schema.labelWidth + 'px';
  // } else {
  //   labelCol.span = schema?.labelSpan || 6;
  // }

  return { labelCol, wrapperCol }
}