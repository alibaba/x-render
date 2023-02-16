import { Result } from 'antd';
import React, { ErrorInfo } from 'react';

class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean; errorInfo: string }
> {
  state = { hasError: false, errorInfo: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status="error"
          title="Something went wrong."
          extra={this.state.errorInfo}
        />
      );
    }
    //@ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
