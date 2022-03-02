import { isUrl, getArray, getFormat } from '../src/utils';

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
