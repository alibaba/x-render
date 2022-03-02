import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import FormRender, { useForm } from '../src/index';
import { shallow, configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

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

const Form = () => {
  const form = useForm();
  const onFinish = (formData, errors) => {
    console.log('formData:', formData, 'errors', errors);
  };
  return (
    <div>
      <FormRender form={form} schema={schema as any} onFinish={onFinish} />
      <button id="submit" onClick={form.submit}>
        提交
      </button>
    </div>
  );
};

test('render form-render', () => {
  const wrapper = mount(<Form />);
  const text = wrapper.find('button[id="submit"]').text();
  expect(text).toEqual('提交');
});
