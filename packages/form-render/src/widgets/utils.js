import dayjs from "dayjs";

export function getFormat(format) {
  let dateFormat;

  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'time':
      dateFormat = 'HH:mm:ss';
      break;
    case 'dateTime':
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
      break;
    case 'week':
      dateFormat = 'YYYY-w';
      break;
    case 'year':
      dateFormat = 'YYYY';
      break;
    case 'quarter':
      dateFormat = 'YYYY-Q';
      break;
    case 'month':
      dateFormat = 'YYYY-MM';
      break;
    default:
      // dateTime
      if (typeof format === 'string') {
        dateFormat = format;
      } else {
        dateFormat = 'YYYY-MM-DD';
      }
  }
  
  return dateFormat;
}

export const transformDateValue = (value, format, dateFormat) => {
  let result = value || undefined;

  if (typeof value === 'string') {
    if (format === 'week') {
      const [years, week] = value.split('-');
      result = dayjs(years).week(week);
    }
    if (format === 'quarter') {
      const [yearx, quarter] = value.split('-');
      result = dayjs(yearx).quarter(quarter);
    }
  }

  if (result) {
    result = dayjs(result, dateFormat);
  }
  return result;
}

export const translation = (configCtx) => (key) => {
  const locale = configCtx?.locale.FormRender;
  return locale[key];
}
