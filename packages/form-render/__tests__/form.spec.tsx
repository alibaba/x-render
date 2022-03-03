import React, { useState } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import FormRender, { useForm } from '../src/index';
import { shallow, configure, mount } from 'enzyme';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

const schema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
      default: '简单输入框',
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
  const [state, setState] = useState({
    input1: 'fr',
    select1: 'd',
  });
  const onFinish = (formData, errors) => {
    console.log('formData:', formData, 'errors', errors);
    setState(formData);
  };

  return (
    <div>
      <FormRender form={form} schema={schema as any} onFinish={onFinish} />
      <div className="fr-value">
        <div className="input">{state?.input1}</div>
        <div className="select">{state?.select1}</div>
      </div>
      <button id="submit" onClick={form.submit}>
        提交
      </button>
    </div>
  );
};

function sleep(ms): Promise<never> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('FormRender', () => {
  it('📦  Render FR Success', async () => {
    const wrapper = mount(<Form />);
    act(() => {
      wrapper.find('#submit').simulate('click');
    });
    await act(() => sleep(500));
    expect(wrapper.find('.input').text()).toEqual('简单输入框');
    expect(wrapper.find('.select').text()).toEqual('a');

    act(() => {
      wrapper.unmount();
    });
  });
  // it('📦  FR Validate Success', async () => {
  //   const { getByText } = render(<Form />);

  //   fireEvent.change(getByText('fr'), {
  //     target: { value: '' },
  //   });
  //   fireEvent.click(getByText('提交'));
  // });
});
