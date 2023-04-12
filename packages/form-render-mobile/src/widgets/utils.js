import dayjs from "dayjs";

export function getFormat(format) {
  switch (format) {
    case 'date': return 'YYYY-MM-DD'
    case 'year': return 'YYYY';
    case 'month': return 'YYYY-MM';
    case 'week': return 'YYYY-w';
    case 'hour': return 'YYYY-MM-DD hh';
    case 'minute': return 'YYYY-MM-DD hh:mm';
    case 'second': return 'YYYY-MM-DD hh:mm:ss';
    case 'week-day': return 'w-d';
    default: return 'YYYY-MM-DD';
  }
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
