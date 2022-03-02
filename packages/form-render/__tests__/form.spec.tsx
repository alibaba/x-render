import React, { useState } from 'react';
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
      default: 'form-render测试',
    },
    select1: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      default: 'a',
    },
  },
};

const Form = () => {
  const form = useForm();
  const [state, setState] = useState();
  const onFinish = (formData, errors) => {
    console.log('formData:', formData, 'errors', errors);
    setState(formData);
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

test('Render FR Success', () => {
  const wrapper = mount(<Form />);
  expect(wrapper.find('button').length).toEqual(1);
  const html = wrapper.html();
  expect(html).toContain('fr-container');
  expect(html).toContain('fr-field');
  wrapper.unmount();
});
