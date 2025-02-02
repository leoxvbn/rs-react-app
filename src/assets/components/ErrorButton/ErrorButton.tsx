import React, { useState } from "react";
import styles from "./ErrorButton.module.css";

const ErrorButton: React.FC = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("Test error!");
  }

  return (
    <button onClick={() => setThrowError(true)} className={styles.errorButton}>
      Check ErrorBoundary
    </button>
  );
};

export default ErrorButton;
