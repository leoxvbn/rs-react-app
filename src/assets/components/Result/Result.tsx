import React, { useState, useEffect } from 'react';

interface ResultProps {
  searchQuery: string;
}

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
}

const Result: React.FC<ResultProps> = ({ searchQuery }) => {
  const [results, setResults] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (searchQuery.trim() === '') return; // Прекращаем запрос, если строка поиска пуста

    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://swapi.dev/api/films/`);
        const data = await response.json();
        const filteredResults = data.results.filter((film: Film) =>
          film.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredResults); // Отфильтровываем фильмы по поисковому запросу
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Результаты поиска для: {searchQuery}</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((film) => (
            <li key={film.episode_id}>
              <h3>{film.title}</h3>
              <p>{film.opening_crawl}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет результатов</p>
      )}
    </div>
  );
};

export default Result;

