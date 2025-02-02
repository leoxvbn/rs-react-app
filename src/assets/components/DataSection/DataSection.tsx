import React from 'react';
import styles from './DataSection.module.css'; // Подключаем стили для компонента

interface DataSectionProps {
  children: React.ReactNode; // Тип для вложенных элементов (children)
}

const DataSection: React.FC<DataSectionProps> = ({ children }) => {
  return (
    <div className={styles.dataSection}>
      {children} {}
    </div>
  );
};

export default DataSection;
