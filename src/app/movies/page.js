'use client'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './movies.css';
import Link from 'next/link';
import MyAPI from '../config/MyAPI';
import '../components/loading.css'

function Page() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [aloading, setALoading] = useState(true);

  useEffect(() => {
    // Fetch popular movies when the component mounts or when the page state changes
    if (!loading && hasMorePages) {
      setLoading(true);
      MyAPI.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`)
        .then((res) => {
          console.log(res.data.results);
          setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
          console.log(movies);
          setLoading(false);
          // Check if there are more pages to load
          if (page >= res.data.total_pages) {
            setHasMorePages(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching popular movies:', error);
          setLoading(false);
        })
        .finally(() => {
          setALoading(false);
        });
    }
  }, [page, hasMorePages]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <React.StrictMode>
      <Header />
      <div className="popular-movies">
        <div className="overlay">
          <div className="title">Popular Movies</div>
          <div className="movies">
          {aloading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="movies">
              {movies.map((movie) => (
                <div className="movie" key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="body">
                      <div className="name">{movie.title}</div>
                      <div className="date">{movie.release_date}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          </div>
          {hasMorePages && (
            <div className="load-more">
              <div className='btn btn-primary button' onClick={handleLoadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.StrictMode>
  );
}

export default Page;

