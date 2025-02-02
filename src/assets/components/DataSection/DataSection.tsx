import styles from './DataSection.module.css';

interface DataSectionProps {
  children: React.ReactNode;
}

const DataSection: React.FC<DataSectionProps> = ({ children }) => {
  return (
    <div className={styles.dataSection}>
      {children}
    </div>
  );
};

export default DataSection;
