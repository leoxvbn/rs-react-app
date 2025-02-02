import React, { useState, useEffect } from 'react';
import styles from './Result.module.css';
import Spinner from '../Spinner/Spinner';

interface ResultProps {
  searchQuery: string;
  hasClickedSearch: boolean;
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

const Result: React.FC<ResultProps> = ({ searchQuery, hasClickedSearch }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!hasClickedSearch) return; // Запрос не выполняется при первом рендере, пока не нажата кнопка

    const fetchFilms = async () => {
      setLoading(true);
      setError('');

      try {
        let url = 'https://swapi.dev/api/films/';
        if (searchQuery.trim() !== '') {
          url = `https://swapi.dev/api/films/?search=${searchQuery.trim()}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const filteredFilms = data.results.filter((film: Film) =>
          film.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );

        setFilms(filteredFilms);
        localStorage.setItem('searchQuery', searchQuery.trim());
      } catch (err: any) {
        setError(`Error loading data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [searchQuery, hasClickedSearch]); // Теперь запрос выполняется только после нажатия кнопки

  if (loading) return <Spinner />;
  if (error) return <div className={styles.resultContainer}>{error}</div>;
  if (films.length === 0)
    return <div className={styles.resultContainer}>No results for your query "{searchQuery}"</div>;

  return (
    <div className={styles.resultContainer}>
      <h2 className={styles.resultTitle}>Results for: {searchQuery}</h2>
      <ul className={styles.resultList}>
        {films.map((film) => (
          <li key={film.episode_id} className={styles.resultItem}>
            <h3><strong>Film:</strong> {film.title}</h3>
            <p><strong>Director:</strong> {film.director}</p>
            <p><strong>Producer:</strong> {film.producer}</p>
            <p><strong>Date:</strong> {film.release_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;







