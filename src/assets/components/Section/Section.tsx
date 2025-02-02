import styles from './Section.module.css';

// Определяем тип пропсов для компонента Section
interface SectionProps {
  children: React.ReactNode; // Тип для вложенных элементов (children)
}

const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className={styles.section}>
      {children} {/* Рендерим вложенные компоненты */}
    </div>
  );
};

export default Section;