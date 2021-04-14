// 从 path 参数去请求 schema 的功能
import React from 'react';

function fetcher(Component) {
  return class extends React.Component {
    state = { urlSchema: null, loading: false };

    componentDidMount() {
      const { path } = this.props;
      if (path && typeof path === 'string') {
        this.setState({ loading: true });
        fetch(path)
          .then(res => res.json())
          .then(data => {
            this.setState({ loading: false, urlSchema: data });
          })
          .catch(err => {
            console.error(err);
          });
      }
    }

    render() {
      const { schema, propsSchema, uiSchema, ...rest } = this.props;
      const { urlSchema, loading } = this.state;
      if (loading) {
        return 'Loading...';
      }
      if (urlSchema) return <Component {...urlSchema} {...rest} />;
      return <Component {...this.props} />;
    }
  };
}

export default fetcher;
