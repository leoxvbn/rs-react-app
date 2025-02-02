import React, { useState, useEffect } from 'react';
import './App.css';
import SearchInput from './assets/components/SearchInput/SearchInput';
import SearchButton from './assets/components/SearchButton/SearchButton';
import Section from './assets/components/Section/Section';
import Controls from './assets/components/Controls/Controls';
import Result from './assets/components/Result/Result';
import DataSection from './assets/components/DataSection/DataSection';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [submittedSearch, setSubmittedSearch] = useState<string>('');

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchQuery');
    if (savedSearch) {
      setSubmittedSearch(savedSearch);
    } else {
      // При старте, если нет сохранённого запроса, делаем запрос ко всем фильмам
      setSubmittedSearch('');
    }
  }, []);

  const handleButtonClick = () => {
    const trimmedSearch = searchValue.trim();
    setSubmittedSearch(trimmedSearch);
    localStorage.setItem('searchQuery', trimmedSearch); // Сохраняем в LS
  };

  return (
    <>
      <Section>
        <Controls>
          <SearchInput
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />
          <SearchButton onClick={handleButtonClick} text="Search" />
        </Controls>
        <DataSection>
          <Result searchQuery={submittedSearch} />
        </DataSection>
      </Section>
    </>
  );
}

export default App;
