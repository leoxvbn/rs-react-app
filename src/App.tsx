import React, { useState, useEffect } from 'react';
import './App.css';
import SearchInput from './assets/components/SearchInput/SearchInput';
import SearchButton from './assets/components/SearchButton/SearchButton';
import Section from './assets/components/Section/Section';
import Controls from './assets/components/Controls/Controls';
import Result from './assets/components/Result/Result';
import DataSection from './assets/components/DataSection/DataSection';
import ErrorBoundary from './assets/components/ErrorBoundary/ErrorBoundary';
import ErrorButton from './assets/components/ErrorButton/ErrorButton';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [submittedSearch, setSubmittedSearch] = useState<string>('');
  const [hasClickedSearch, setHasClickedSearch] = useState<boolean>(false); // Флаг, чтобы отслеживать, была ли нажата кнопка

  // Проверяем savedSearch при монтировании компонента, но не выполняем запрос
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchQuery');
    if (savedSearch) {
      setSubmittedSearch(savedSearch); // Вставляем savedSearch в submittedSearch
    }
  }, []);

  // Обработчик нажатия на кнопку
  const handleButtonClick = () => {
    const trimmedSearch = searchValue.trim();
    setSubmittedSearch(trimmedSearch);
    localStorage.setItem('searchQuery', trimmedSearch); // Сохраняем запрос в localStorage
    setSearchValue('');
    setHasClickedSearch(true); // Устанавливаем флаг, что кнопка была нажата
  };

  return (
    <>
      <ErrorBoundary>
        <Section>
          <Controls>
            <SearchInput
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
            />
            <SearchButton onClick={handleButtonClick} text="Search" />
          </Controls>
          <DataSection>
            <Result searchQuery={submittedSearch} hasClickedSearch={hasClickedSearch} /> {/* Передаем флаг */}
          </DataSection>
          <ErrorButton />
        </Section>
      </ErrorBoundary>
    </>
  );
}

export default App;





