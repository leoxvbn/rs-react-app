import styles from './SearchInput.module.css'; // Импортируем стили для компонента

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      className={styles.searchInput}
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Start to find movie"
    />
  );
};

export default SearchInput;