import React, { useState } from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import FormRender, { useForm } from '../src/index';
import { listSchema, normalSchema } from './schema';

configure({ adapter: new Adapter() });

const Form = () => {
  const form = useForm();
  const [state, setState] = useState({
    input1: 'fr',
    select1: 'd',
  });
  const onFinish = (formData, errors) => {
    setState(formData);
  };

  const watch = {
    // # 为全局
    '#': val => {
      console.log('表单的实时数据为：', val);
    },
    input1: {
      handler: val => {
        console.log(val);
      },
      immediate: true,
    },
    onSearch: val => {},
  };

  const onMount = () => {
    form.setValueByPath('link', 'www.baidu.com');
  };

  const onClick = () => {
    form.setValueByPath('link', 'www.baidu.com');
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={normalSchema as any}
        onFinish={onFinish}
        watch={watch}
        onMount={onMount}
      />
      <div className="fr-value">
        <div className="input">{state?.input1}</div>
        <div className="select">{state?.select1}</div>
      </div>
      <button id="submit" onClick={form.submit}>
        提交
      </button>
      <button id="test" onClick={onClick}>
        提交
      </button>
    </div>
  );
};

const ListForm = () => {
  const [state, setState] = useState({
    input1: 'fr',
    select1: 'd',
  });
  const form = useForm();

  const onFinish = (formData, errors) => {
    setState(formData);
  };

  return (
    <div>
      <FormRender form={form} onFinish={onFinish} schema={listSchema as any} />
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
      wrapper.find('#test').simulate('click');
      wrapper.find('.ant-collapse-header').simulate('click');
    });
    await act(() => sleep(500));
    expect(wrapper.find('.input').text()).toEqual('简单输入框');
    expect(wrapper.find('.select').text()).toEqual('a');

    act(() => {
      wrapper.unmount();
    });
  });
  // it('📦  Render FR List Widget Success', async () => {
  //   const wrapper = mount(<ListForm />);
  //   act(() => {
  //     wrapper.find('#submit').simulate('click');
  //   });
  //   await act(() => sleep(500));
  //   // expect(wrapper.find('.input').text()).toEqual('简单输入框');
  //   // expect(wrapper.find('.select').text()).toEqual('a');

  //   act(() => {
  //     wrapper.unmount();
  //   });
  // });
  // it('📦  FR Validate Success', async () => {
  //   const { getByText } = render(<Form />);

  //   fireEvent.change(getByText('fr'), {
  //     target: { value: '' },
  //   });
  //   fireEvent.click(getByText('提交'));
  // });
});
