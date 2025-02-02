import styles from "./SearchButton.module.css";

interface SearchButtonProps {
  onClick: () => void;
  text: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, text }) => {
  return (
    <button className={styles.searchButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default SearchButton;
