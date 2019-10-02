import expect from 'expect.js';
import Component from '../index';

describe('index.js', () => {
  it('should export.', () => {
    expect(Component).to.not.eql(undefined);
  });
});
