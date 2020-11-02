import React, { useEffect, useState } from 'react';
import './App.css';
import MoviesList from './moviesList';
import MovieInfo from './movieInfo';
import ApiManager from './services/apiManager';

export default function App() {

  const INIT_MOVIES = [];
  const INIT_MOVIE = undefined;

  const [movies, setMovies] = useState(INIT_MOVIES);
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(INIT_MOVIE);
  const serverUrl = "http://localhost:4000/movie";

  useEffect(() => {
    // initialize the list of popular movies
    ApiManager.getInstance().getPopularMovies(serverUrl).then(data => {
      setMovies(data.results);
      setMovie(INIT_MOVIE);
    });
  }, []);

  const handlePopularMovieClick = () => {
    // clear search input
    setQuery('');
    ApiManager.getInstance().getPopularMovies(serverUrl).then(data => {
        setMovies(data.results);
        setMovie(INIT_MOVIE);
    });
  }

  const handleTopRatedMovieClick = () => {
    setQuery('');
    ApiManager.getInstance().getTopRatedMovies(serverUrl).then(data => {
      setMovies(data.results);
      setMovie(INIT_MOVIE);
    });
  }

  const handleNowPlayingMovieClick = () => {
    setQuery('');
    ApiManager.getInstance().getNowPlayingMovies(serverUrl).then(data => {
      setMovies(data.results);
      setMovie(INIT_MOVIE);
    });
  }

  const handleSearchMovies = (e) => {
    e.preventDefault();
    
    if (query) {
      ApiManager.getInstance().searchMovies(serverUrl, query).then(data => {
        setMovies(data.results);
        setMovie(INIT_MOVIE);
      });
    }
  }

  const handleMovieSelectionClick = (selectedMovie) => {
    // clear search input
    setQuery('');
    ApiManager.getInstance().getMovie(serverUrl, selectedMovie.id).then(data => {
      setMovies(INIT_MOVIES);
      setMovie(data);
    });
  }

  const handleSimilarMovieClick = (similarMovie) => {
    ApiManager.getInstance().getMovie(serverUrl, similarMovie.id).then(data => {
      setMovies(INIT_MOVIES);
      setMovie(data);
    });
  }

  return (
    <div className="container">
      <h1 className="title">Movies</h1>
      
      <form className="form" onSubmit={handleSearchMovies}>
          <label className="label" htmlFor="query">Movie Name</label>
          <input className="input" type="text" name="query"
              placeholder="i.e. Jurassic Park"
              value={query} onChange={(e) => setQuery(e.target.value)}
              />
          <button className="button" type="submit">Search</button>
      </form>

      <div className="quicklinks">
          <button className="button" type="button" onClick={handlePopularMovieClick} >Popular</button>
          <button className="button" type="button" onClick={handleTopRatedMovieClick} >Top Rated</button>
          <button className="button" type="button" onClick={handleNowPlayingMovieClick} >Now Playing</button>
      </div>

      { movies && <MoviesList movies={movies} details={false} small={false} onMovieClicked={handleMovieSelectionClick}/> }
      { movie && <MovieInfo movie={movie} onSimilarMovieClicked={handleSimilarMovieClick}/> }
    </div>
  );
}
