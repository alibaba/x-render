import React from 'react';
import { render } from 'enzyme';

import List from './index';

describe('<List/>', () => {
  it('render 1 child', () => {
    const wrapper = render(<List list={[1, 2, 3, 4, 5, 6]} />);
    expect(wrapper.find('.item').length).toBe(1);
  });
  it('render 4 child', () => {
    const wrapper = render(<List list={[6, 7, 8, 9]} />);
    expect(wrapper.find('.item').length).toBe(4);
  });
});
