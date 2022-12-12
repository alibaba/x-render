import { describe, it, expect } from 'vitest';
import { flattenSchema } from '../src/form-render-core/src/utils';

describe('Test FormRender Utils', () => {
  it('Test flattenSchema', () => {
    const schema = {
      type: 'object',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          order: 2,
          required: true,
        },
        select1: {
          title: '单选',
          type: 'string',
          order: 1,
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
      },
    };

    const _schema = flattenSchema(schema);
    expect(Object.keys(_schema)).toEqual(['select1', 'input1', '#']);
  });
});
