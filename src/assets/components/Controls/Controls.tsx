import styles from './Controls.module.css';

interface ControlsProps {
  children: React.ReactNode;
}

const Controls: React.FC<ControlsProps> = ({ children }) => {
  return (
    <div className={styles.controls}>
      {children} {}
    </div>
  );
};

export default Controls;
