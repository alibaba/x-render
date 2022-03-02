import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

const Button = () => {
  return (
    <button type="submit" id="btn">
      提交
    </button>
  );
};

const wrapper = shallow(<Button />);
test('render react', () => {
  expect(wrapper.find('button[id="btn"]').text()).toEqual('提交');
});
