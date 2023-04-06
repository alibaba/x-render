import * as React from 'react';
import DatePicker from '../DatePicker';

const TimePicker: any = React.forwardRef((props: any, ref: any) => {
  return <DatePicker {...props} picker='time' mode={undefined} ref={ref} />;
});

TimePicker.displayName = 'TimePicker';

TimePicker.RangePicker = React.forwardRef((props: any, ref: any) => {
  return <DatePicker.RangePicker {...props} picker='time' mode={undefined} ref={ref} />;
});

export default TimePicker;