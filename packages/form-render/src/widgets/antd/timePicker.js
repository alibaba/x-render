import * as React from 'react';
import DatePicker from './datePicker';

const TimePicker = React.forwardRef((props, ref) => {
  return <DatePicker {...props} picker='time' mode={undefined} ref={ref} />;
});

TimePicker.displayName = 'TimePicker';

TimePicker.RangePicker = React.forwardRef((props, ref) => {
  return <DatePicker.RangePicker {...props} picker='time' mode={undefined} ref={ref} />;
});

export default TimePicker;