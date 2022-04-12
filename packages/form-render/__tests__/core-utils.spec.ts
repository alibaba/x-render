import { flattenSchema } from '../src/form-render-core/src/utils';

describe('Test FormRender Utils', () => {
  it('Test flattenSchema', () => {
    const schema = {
      type: 'object',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          required: true,
        },
        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
      },
    };
  });
});

// console.log(JSON.stringify(flattenSchema(schema), null, 2));
