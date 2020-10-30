import React from 'react';

class Safe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error.message);
    this.setState({ error: error.message });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h3 style={{ color: 'red' }}>
          {this.props.name || this.state.error || 'Something went wrong.'}
        </h3>
      );
    }

    return this.props.children;
  }
}

export default Safe;
