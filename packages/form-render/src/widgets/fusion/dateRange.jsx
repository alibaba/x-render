import { DatePicker } from '@alifd/next';
import moment from 'moment';
import { getFormatForFusion, getFormat } from '../../base/utils';
const { RangePicker } = DatePicker;

export default function dateRange({
  onChange,
  schema = {},
  value,
  options,
  disabled,
  readOnly,
  name,
}) {
  const { format } = schema;
  let _format = format;
  if (options.format) {
    _format = options.format;
  }
  const dateFormat = getFormatForFusion(_format);
  const formatBack = getFormat(_format);

  const _onChange = value => {
    if (Array.isArray(value)) {
      const result = value.map(
        // null 的时候返回空字符串
        item => {
          if (item) {
            return moment(item).format(dateFormat);
          }
          return '';
        }
      );
      onChange(name, result);
    }
  };

  let [start, end] = Array.isArray(value) ? value : [];

  const _value = [moment(start, formatBack), moment(end, formatBack)];

  const dateParams = {
    ...options,
    value: _value,
    style: { width: '100%' },
    showTime: format === 'dateTime',
    disabled: disabled || readOnly,
    onChange: _onChange,
  };

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  return <RangePicker {...dateParams} />;
}
