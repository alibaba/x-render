import { 
  Input as AntdInput, 
  InputNumber as AntdInputNumber, 
  Select as AntdSelect, 
  DatePicker as AntdDatePicker, 
  Switch as AntdSwitch, 
  Rate as AntdRate, 
  Cascader as AntdCascader, 
  TimePicker as AntdTimePicker, 
  TreeSelect as AntdTreeSelect, 
  Checkbox as AntdCheckbox, 
  Radio as AntdRadio, 
  Table,
  Button as AntdButton
} from 'antd';

import { 
  DatePicker as FDatePicker,
  DateRange as FDateRange,
  Color as FColor,
  Html as FHtml
} from 'form-render';

import withFormItemHoc from './hoc/FormItemHoc';
import withColHoc from './hoc/ColHoc';

import FUpload from './components/Upload';
import FUrlInput from './components/UrlInput';
import FImageInput from './components/ImageInput';
import FTimeRange from './components/TimeRange';
import FTimePicker from './components/TimePicker';
import FSlider from './components/Slider';


export const Input =  withFormItemHoc(AntdInput);
export const InputNumber = withFormItemHoc(AntdInputNumber, {style: { width: '100%'}});
export const TextArea = withFormItemHoc(AntdInput.TextArea);

export const Select = withFormItemHoc(AntdSelect);
export const Checkbox = withFormItemHoc(AntdCheckbox);
export const Checkboxes = withFormItemHoc(AntdCheckbox.Group);
export const Radio = withFormItemHoc(AntdRadio.Group);

export const DatePicker  = withFormItemHoc(FDatePicker, {style: { width: '100%'}});
export const DateRange = withFormItemHoc(FDateRange, {style: { width: '100%'}});
export const TimePicker = withFormItemHoc(FTimePicker, {style: { width: '100%'}});
export const TimeRange = withFormItemHoc(FTimeRange, {style: { width: '100%'}});

export const Switch = withFormItemHoc(AntdSwitch);
export const Slider = withFormItemHoc(FSlider);
export const Rate = withFormItemHoc(AntdRate);

export const Cascader = withFormItemHoc(AntdCascader);
export const TreeSelect = withFormItemHoc(AntdTreeSelect);

export const Button = withFormItemHoc(AntdButton);


export const Color = withFormItemHoc(FColor);
export const UrlInput = withFormItemHoc(FUrlInput);
export const ImageInput = withFormItemHoc(FImageInput);
export const Html = withFormItemHoc(FHtml);
export const Upload = withFormItemHoc(FUpload)

export { default as FormRender } from './components/FormRender';
export { default as FormItem } from './components/FormItem';
export { default as Card } from './components/Card';
export { default as CardList } from './components/CardList';
export const TableList = withColHoc(Table);