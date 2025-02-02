import React from 'react';
import styles from './SearchButton.module.css'; // Импортируем стили для кнопки

interface SearchButtonProps {
  onClick: () => void; // Обработчик клика
  text: string; // Текст на кнопке
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, text }) => {
  return (
    <button className={styles.searchButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default SearchButton;
