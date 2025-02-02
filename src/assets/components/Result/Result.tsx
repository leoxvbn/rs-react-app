import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner'; // Индикатор загрузки

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
    if (searchQuery === '') {
      setFilms([]); // Очищаем фильмы, если поиск пустой
      return;
    }

    const fetchFilms = async () => {
      setLoading(true); // Устанавливаем loading в true перед началом запроса
      setError(''); // Очищаем предыдущую ошибку
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Если searchQuery пустой, выводим все фильмы
        const filteredFilms = searchQuery.trim()
          ? data.results.filter((film: Film) =>
              film.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
            )
          : data.results;

        setFilms(filteredFilms);
        localStorage.setItem('searchQuery', searchQuery.trim());
      } catch (err: any) {
        setError(`Ошибка при загрузке данных. Код статуса: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [searchQuery]);

  if (loading) {
    return <Spinner />; // Отображаем спиннер во время загрузки
  }

  if (error) {
    return <div>{error}</div>; // Показываем сообщение об ошибке
  }

  if (films.length === 0) {
    return <div>Нет результатов для запроса "{searchQuery}"</div>; // Сообщение, если нет результатов
  }

  return (
    <div>
      <h2>Результаты для: {searchQuery}</h2>
      <ul>
        {films.map((film) => (
          <li key={film.episode_id}>
            <h3><strong>Фильм:</strong>{film.title}</h3>
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









