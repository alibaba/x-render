import { describe, expect, test } from 'vitest';
import { getDate, getDateTime, getMoneyType, isObj } from '../src/utils';

describe('Test TableRender valueType', () => {
  test('Test getDate', () => {
    const current = new Date().getTime();
    expect(getDate(current)).toHaveLength(10);
  });
  test('Test getDateTime', () => {
    const current = new Date().getTime();
    expect(getDateTime(current)).toHaveLength(19);
  });
  test('Test getMoneyType', () => {
    expect(getMoneyType(10000)).toEqual('¥10,000');
  });
  test('Test isObj object', () => {
    expect(isObj({})).toBeTruthy();
  });
  test('Test isObj array', () => {
    expect(isObj([])).toBeFalsy();
  });
  test('Test isObj string', () => {
    expect(isObj('')).toBeFalsy();
  });
  test('Test isObj number', () => {
    expect(isObj('')).toBeFalsy();
  });
});
