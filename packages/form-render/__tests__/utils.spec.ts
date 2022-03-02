import { isUrl, getArray, getFormat } from '../src/utils';

test('getFormat', () => {
  expect(getFormat('date')).toBe('YYYY-MM-DD');
});

test('isUrl', () => {
  expect(isUrl('https://github.com/alibaba/x-render')).toBe(true);
});
