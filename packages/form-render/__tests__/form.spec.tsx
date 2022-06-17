import * as React from 'react';
import '@testing-library/jest-dom';
import { render, act, cleanup } from '@testing-library/react';
import Demo from './demo';

function sleep(ms): Promise<never> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

afterAll(cleanup);

describe('FormRender', () => {
  it('📦  Render FR Success', async () => {
    const { getByTestId, unmount } = render(<Demo />);
    act(() => {
      getByTestId('submit').click();
      getByTestId('test').click();
    });
    await act(() => sleep(500));
    expect(getByTestId('input')).toHaveTextContent('简单输入框');
    expect(getByTestId('select')).toHaveTextContent('a');

    act(() => {
      unmount();
    });
  });
});
