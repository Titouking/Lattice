import React, { useEffect, useState } from 'react';
import './App.css';
import MoviesList from './moviesList';

function App() {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [movieSelected, setMovieSelected] = useState(false);
  
  useEffect(() => {
    // initialize the list of popular movies
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=06d48fee752cff62217786c617281f5b`;
    try {
        const res = await fetch(url);
        const data  = await res.json();
        console.log(data);
        setMovies(data.results);
        setMovieSelected(false);
    } catch(err){
        console.error(err);
    }
  }

  const searchMovies = async (e) => {
      e.preventDefault();
      console.log("submitting");
      
      if (query) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=06d48fee752cff62217786c617281f5b&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            console.log(data);
            setMovies(data.results);
            setMovieSelected(false);
        } catch(err){
            console.error(err);
        }
      }

  }

  const handlePopularMovieClick = () => {
    // clear search input
    setQuery('');
    getPopularMovies();
  }

  return (
    <div className="container">
      <h1 className="title">Movies</h1>
      
      <form className="form" onSubmit={searchMovies}>
          <label className="label" htmlFor="query">Movie Name</label>
          <input className="input" type="text" name="query"
              placeholder="i.e. Jurassic Park"
              value={query} onChange={(e) => setQuery(e.target.value)}
              />
          <button className="button" type="submit">Search</button>
      </form>

      <div className="quicklinks">
          <button className="button" type="button" onClick={handlePopularMovieClick} >Popular</button>
      </div>

      <MoviesList movies={movies} details={false} fullmovie={movieSelected}/>
    </div>
  );
}

export default App;