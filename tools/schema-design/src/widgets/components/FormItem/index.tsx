import React from 'react';
import withFormItemHoc from '../../hoc/FormItemHoc';


const FormItem: React.FC = (props: any) => {
  const { children, renderReadOnly, ...otherProps } = props;
  if (renderReadOnly) {
    return renderReadOnly(otherProps);
  }
  
  return React.Children.map(children, (item => {
    return React.cloneElement(item, otherProps)
  }));
}

export default withFormItemHoc(FormItem);



