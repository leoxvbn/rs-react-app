// src/assets/components/Result/Result.tsx
import React, { useState, useEffect } from 'react';

interface ResultProps {
  searchQuery: string;
}

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  url: string;
}

const Result: React.FC<ResultProps> = ({ searchQuery }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Если строка поиска пуста, очищаем результаты
    if (searchQuery.trim() === '') {
      setFilms([]);
      return;
    }

    const fetchFilms = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Фильтруем фильмы по названию, учитывая регистр
        const filteredFilms = data.results.filter((film: Film) =>
          film.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilms(filteredFilms);
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [searchQuery]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (films.length === 0) {
    return <div>Нет результатов для запроса "{searchQuery}"</div>;
  }

  return (
    <div>
      <h2>Результаты для: {searchQuery}</h2>
      <ul>
        {films.map((film) => (
          <li key={film.episode_id}>
            <h3>{film.title}</h3>
            <p><strong>Режиссёр:</strong> {film.director}</p>
            <p><strong>Продюсер:</strong> {film.producer}</p>
            <p><strong>Дата выпуска:</strong> {film.release_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;


