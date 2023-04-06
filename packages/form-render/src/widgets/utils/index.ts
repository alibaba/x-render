import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear); // 启用 weekOfYear 插件

export function isUrl(str: string) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  // const domainRE = /^[^\s\.]+\.\S{2,}$/;
  if (typeof str !== 'string') return false;
  return protocolRE.test(str);
}

export function getFormat(format: string) {
  let dateFormat: string;

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

export const transformDateValue = (value: string, format: string, dateFormat: string) => {
  let result: any = value || undefined;

  if (typeof value === 'string') {
    if (format === 'week') {
      const [years, week] = value.split('-');
      result = dayjs(years)?.week(Number(week));
    }
    if (format === 'quarter') {
      const [yearx, quarter]: any = value.split('-');
      result = dayjs(yearx).quarter(quarter);
    }
  }

  if (result) {
    result = dayjs(result, dateFormat);
  }
  return result;
}

export const translation = (configCtx: any) => (key: string) => {
  const locale = configCtx?.locale?.FormRender;
  return locale[key];
}
