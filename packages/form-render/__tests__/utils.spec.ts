import { isUrl, getArray, getFormat } from '../src/utils';
import { getWidgetName } from '../src/form-render-core/src/mapping'

describe('Test Utils', () => {
  test('Test getFormat', () => {
    expect(getFormat('date')).toBe('YYYY-MM-DD');
  });

  test('Test isUrl', () => {
    expect(isUrl('https://github.com/alibaba/x-render')).toBe(true);
    expect(isUrl('http://github.com/alibaba/x-render')).toBe(true);
    expect(isUrl('github.com/alibaba/x-render')).toBe(false);
  });

  test('Test getArray', () => {
    expect(getArray(['hangzhou', 'nanjing'])).toEqual(['hangzhou', 'nanjing']);
    expect(getArray('test')).toEqual([]);
  });

  test('Test getWidgetName', () => {
    expect(getWidgetName({
      type: 'string',
      format: 'date'
    })).toEqual('date');
  });
});
