import { describe, expect, it } from 'vitest';
import { getDescriptorSimple } from '../src/form-render-core/src/getDescriptorSimple';

// 主要对转换格式进行单元测试
describe('get-descriptor utils', () => {
  it('transform test 1', () => {
    const schema = {
      title: '代号',
      type: 'string',
      required: true,
      rules: [{ pattern: '^[a-z]+$', message: 'incorrect province' }],
    };

    const res = getDescriptorSimple(schema, 'count');
    const expectData = {
      count: [
        { required: true, type: 'string' },
        { pattern: /^[a-z]+$/, message: 'incorrect province' },
      ],
    };

    expect(res).toEqual(expectData);
  });

  it('transform test 2', () => {
    const schema = {
      title: '代号',
      type: 'string',
      rules: [
        { required: true, message: '必填' },
        { pattern: '^[a-z]+$', message: 'incorrect province' },
      ],
    };

    const res = getDescriptorSimple(schema, 'count');
    const expectData = {
      count: [
        { required: true, message: '必填' },
        { pattern: /^[a-z]+$/, message: 'incorrect province' },
        { type: 'string' },
      ],
    };

    expect(res).toEqual(expectData);
  });

  it('transform test 3', () => {
    const schema = {
      title: '代号',
      type: 'string',
      rules: [{ pattern: '^[a-z]+$', message: 'incorrect province' }],
    };

    const res = getDescriptorSimple(schema, 'count');

    const expectData = {
      count: [
        { type: 'string' },
        { pattern: /^[a-z]+$/, message: 'incorrect province' },
      ],
    };

    expect(res).toEqual(expectData);
  });

  it('transform test 4', () => {
    const schema = {
      title: '代号',
      type: 'string',
      required: true,
    };

    const res = getDescriptorSimple(schema, 'count');

    const expectData = {
      count: [{ type: 'string', required: true }],
    };

    expect(res).toEqual(expectData);
  });

  it('transform test 5', () => {
    const schema = {
      title: '代号',
      type: 'string',
    };

    const res = getDescriptorSimple(schema, 'count');

    const expectData = {
      count: [{ type: 'string' }],
    };

    expect(res).toEqual(expectData);
  });

  it('transform test 6', () => {
    const schema = {
      title: '时间选择',
      type: 'string',
      widget: 'site',
      format: 'time',
      required: true,
    };

    const res = getDescriptorSimple(schema, 'time');

    const expectData =
      '{"time":[{"required":true},{"type":"string","message":"${title}的格式错误"}]}';

    expect(JSON.stringify(res)).toEqual(expectData);
  });

  it('transform test 7', () => {
    const schema = {
      title: '时间选择',
      type: 'string',
      widget: 'site',
      format: 'time',
    };

    const res = getDescriptorSimple(schema, 'time');
    const expectData =
      '{"time":[{"type":"string","message":"${title}的格式错误"}]}';

    expect(JSON.stringify(res)).toEqual(expectData);
  });

  it('transform test 9', () => {
    const schema = {
      title: '时间选择',
      type: 'string',
      widget: 'site',
      format: 'time',
      required: true,
      rules: [{ pattern: '^[a-z]+$', message: 'incorrect province' }],
    };

    const res = getDescriptorSimple(schema, 'count');
    const expectData =
      '{"count":[{"required":true},{"type":"string","message":"${title}的格式错误"},{"pattern":{},"message":"incorrect province"}]}';
    expect(JSON.stringify(res)).toEqual(expectData);
  });
});
