import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in Error Boundary:', error, errorInfo);
    this.setState({
      errorInfo,
    });
  }

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#f9dada', color: '#e74c3c', border: '1px solid #e74c3c' }}>
        <h2>Oops! An error occurred.</h2>
        <p>Something went wrong while loading this component. Try reloading the page.</p>
        <button onClick={this.reloadPage} style={{ padding: '10px', backgroundColor: '#e74c3c', color: '#fff' }}>
          Reload
        </button>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


