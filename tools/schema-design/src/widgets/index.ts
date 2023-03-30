import { 
  Input as AntdInput, 
  InputNumber, 
  Select as AntdSelect, 
  DatePicker as AntdDatePicker, 
  Switch as AntdSwitch, 
  Rate as AntdRate, 
  Cascader as AntdCascader, 
  TimePicker as AntdTimePicker, 
  TreeSelect as AntdTreeSelect, 
  Slider as AntdSlider, 
  Checkbox as AntdCheckbox, 
  Radio, 
  Table 
} from 'antd';

import withFormItemHoc from './hoc/FormItemHoc';
import withColHoc from './hoc/ColHoc';

// import Checkboxx from 'form-render/es/widgets/antd/checkbox.js';
// import Color from 'form-render/es/widgets/antd/color.js';
// import UrlInput from 'form-render/es/widgets/antd/urlInput.js';
// import Upload from 'form-render/es/widgets/antd/upload.js';
// import ImageInput from 'form-render/es/widgets/antd/imageInput.js';
// import HtmlJsx from 'form-render/es/widgets/html';

export const FInput =  withFormItemHoc(AntdInput);
export const Number = withFormItemHoc(InputNumber);
export const TextArea = withFormItemHoc(AntdInput.TextArea);

export const Select = withFormItemHoc(AntdSelect);
export const Checkbox = withFormItemHoc(AntdCheckbox);
export const Checkboxes = withFormItemHoc(AntdCheckbox.Group);
export const RadioGroup = withFormItemHoc(Radio.Group);

export const Date  = withFormItemHoc(AntdDatePicker);
export const DateRange   = withFormItemHoc(AntdDatePicker.RangePicker);
export const Time = withFormItemHoc(AntdTimePicker);
export const TimeRange = withFormItemHoc(AntdTimePicker.RangePicker);

export const Switch = withFormItemHoc(AntdSwitch);
export const Slider = withFormItemHoc(AntdSlider);
export const Rate = withFormItemHoc(AntdRate);

export const Cascader = withFormItemHoc(AntdCascader);
export const TreeSelect = withFormItemHoc(AntdTreeSelect);

// export const FColor = withFormItemHoc(Color);
// export const FUrlInput = withFormItemHoc(UrlInput);
// export const FImageInput = withFormItemHoc(ImageInput);
// export const FHtml = withFormItemHoc(HtmlJsx);
// export const FUpload = withFormItemHoc(Upload)

export { default as FormRender } from './components/FormRender';
export { default as FormItem } from './components/FormItem';
export { default as Card } from './components/Card';
export { default as CardList } from './components/CardList';
export const TableList = withColHoc(Table);