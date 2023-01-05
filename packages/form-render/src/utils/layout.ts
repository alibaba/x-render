export const getFormItemLayout = (column: number) => {
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


  // if (schema?.labelWidth) {
  //   labelCol.flex = schema.labelWidth + 'px';
  // } else {
  //   labelCol.span = schema?.labelSpan || 6;
  // }

  return { labelCol, wrapperCol }
}