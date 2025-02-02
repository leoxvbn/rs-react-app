import { useState } from 'react';
import './App.css';
import SearchInput from './assets/components/SearchInput/SearchInput';
import SearchButton from './assets/components/SearchButton/SearchButton';
import Section from './assets/components/Section/Section';
import Controls from './assets/components/Controls/Controls';
import Result from './assets/components/Result/Result';
import DataSection from './assets/components/DataSection/DataSection';



function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleButtonClick = () => {
    console.log('Поиск:', searchValue);
    alert(`Ищем: ${searchValue}`);
  };

  return (
    <>
      <Section>
        <Controls>
        <SearchInput value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
        <SearchButton onClick={handleButtonClick} text="Поиск" />
        </Controls>
      <DataSection>
        <Result searchQuery={searchValue} /> {/* Рендерим компонент Result в DataSection */}
      </DataSection>
      </Section>
    </>
  );
}

export default App;


