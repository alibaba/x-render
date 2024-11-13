import { describe, test, afterAll, expect } from 'vitest';
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, act, cleanup } from '@testing-library/react';
import Demo from './form-demo';

function sleep(ms): Promise<never> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

afterAll(cleanup);

describe('FormRender API', () => {
  test('📦  api test setFields and getFieldError success', async () => {
    const { getByTestId, unmount } = render(<Demo />);
    // 测试 setFields + getFieldError
    act(() => {
      getByTestId('setFields').click();
    });
    await act(() => sleep(500));
    act(() => {
      getByTestId('getFieldError').click();
    });
    await act(() => sleep(500));
    expect(getByTestId('result')).toHaveTextContent(
      JSON.stringify(['set input1.test error'])
    );
    act(() => {
      unmount();
    });
  });
  test('📦  api test validateFields success', async () => {
    const { getByTestId, unmount } = render(<Demo />);
    act(() => {
      getByTestId('setFields').click();
    });
    await act(() => sleep(500));
    act(() => {
      getByTestId('validateFields').click();
    });
    await act(() => sleep(500));
    expect(getByTestId('result')).toHaveTextContent(
      JSON.stringify({
        input1: {
          test: 'input1.test value',
        },
        select1: 'select1 value',
      })
    );
    act(() => {
      unmount();
    });
  });
  test('📦  api test isFieldValidating success', async () => {
    const { getByTestId, unmount } = render(<Demo />);
    // 测试 isFieldValidating
    act(() => {
      getByTestId('setFields').click();
    });
    await act(() => sleep(500));
    act(() => {
      getByTestId('fieldValidating').click();
    });
    await act(() => sleep(500));
    expect(getByTestId('result')).toHaveTextContent('true');
    act(() => {
      unmount();
    });
  });

  test('📦  api test isFieldTouched success', async () => {
    const { getByTestId, unmount } = render(<Demo />);
    // 测试 isFieldTouched
    act(() => {
      getByTestId('setFields').click();
    });
    await act(() => sleep(500));
    act(() => {
      getByTestId('fieldTouched').click();
    });
    await act(() => sleep(500));
    expect(getByTestId('result')).toHaveTextContent('true');
    act(() => {
      unmount();
    });
  });

  test('📦  api test isFieldsTouched success', async () => {
    const { getByTestId, unmount } = render(<Demo />);
    act(() => {
      getByTestId('setFields').click();
    });
    await act(() => sleep(500));
    // 测试 isFieldsTouched
    act(() => {
      getByTestId('fieldsTouched').click();
    });
    await act(() => sleep(500));
    expect(getByTestId('result')).toHaveTextContent('false');
    act(() => {
      unmount();
    });
  });

  test('📦  api test getValues success', async () => {
    const { getByTestId, unmount } = render(<Demo />);

    // 测试 getValues
    act(() => {
      getByTestId('setFields').click();
    });
    await act(() => sleep(500));
    // 测试 getValues
    act(() => {
      getByTestId('getValues').click();
    });
    await act(() => sleep(500));
    expect(getByTestId('result')).toHaveTextContent(
      JSON.stringify({
        input1: {
          test: 'input1.test value',
        },
      })
    );
    act(() => {
      unmount();
    });
  });
});
