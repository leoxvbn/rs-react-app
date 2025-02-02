import React, { Component, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Обновляем состояние, чтобы отобразить резервный UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логируем ошибку и информацию о ней
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    // Если произошла ошибка, показываем резервный UI
    if (this.state.hasError) {
      return <h1>Произошла ошибка. Пожалуйста, попробуйте позже.</h1>;
    }

    // В противном случае рендерим дочерние компоненты
    return this.props.children;
  }
}

export default ErrorBoundary;

