import { useReducer, useRef, useEffect, useState } from 'react';
import { message } from 'antd';

export function usePrevious(value: any) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// 类似于class component的setState
export const useSet = (initState: any) => {
  return useReducer((state: any, newState: any) => {
    return { ...state, ...newState };
  }, initState);
};

/**
 * 业务中为了防止提交按钮会被连续点击 我们会手动的设置setLoading true 和setLoading false 非常麻烦
 * 所以写了这个hook 省事
 * @returns
 */
type TCallback = () => Promise<any>;
type TRequestLoading = () => [boolean, (callback: TCallback) => void];

export const useLoadingRequest: TRequestLoading = () => {
  const [loading, setLoading] = useState(false);

  const handleRequest = async (callback: TCallback) => {
    try {
      setLoading(true);
      await callback();
    } catch (error: any) {
      message.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [loading, handleRequest];
};
