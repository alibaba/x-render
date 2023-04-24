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

export const translation = (configCtx) => (key) => {
  const locale = configCtx?.locale.FormRender;
  return locale[key];
}
