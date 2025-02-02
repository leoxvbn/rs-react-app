import styles from './Controls.module.css';

// Определяем тип пропсов для компонента Controls
interface ControlsProps {
  children: React.ReactNode; // Тип для вложенных элементов (children)
}

const Controls: React.FC<ControlsProps> = ({ children }) => {
  return (
    <div className={styles.controls}>
      {children} {/* Рендерим вложенные компоненты */}
    </div>
  );
};

export default Controls;
