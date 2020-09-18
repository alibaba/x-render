// 从 path 参数去请求 schema 的功能
import React, { useEffect } from 'react';
import { useSet } from '../hooks';

const fetcher = Component => props => {
  const { path, schema, propsSchema, uiSchema, ...rest } = props;
  const [state, setState] = useSet({
    urlSchema: null,
    loading: false,
  });

  const { urlSchema, loading } = state;

  useEffect(() => {
    if (path && typeof path === 'string') {
      setState({ loading: true });
      fetch(path)
        .then(res => res.json())
        .then(data => {
          setState({ loading: false, urlSchema: data });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, []);
  if (loading) {
    return 'Loading...';
  }
  if (urlSchema) return <Component {...urlSchema} {...rest} />;
  return <Component {...props} />;
};

export default fetcher;
