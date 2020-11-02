import React, { useEffect, useState } from 'react';
import ApiManager from './services/apiManager';
import MoviesList from './moviesList';

export default function MovieInfo(props) {
    
    const serverUrl = "http://localhost:4000/movie";
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        ApiManager.getInstance().getSimilarMovies(serverUrl, props.movie.id).then(data => {
            setSimilarMovies(data.results);
        });
    }, [props.movie.id]);

    const handleMovieSelectionClick = (e) => {
        props.onSimilarMovieClicked(e);
    }

    return (
        <div className="card-fullmovie">
            <div className="card">
                <div className="card--left">
                    <img className="card--image"
                        src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${props.movie.poster_path}`}
                        alt={props.movie.title + ' poster'}
                    />
                </div>
                <div className="card--right">
                    <div className="card--title">
                        <h1>{props.movie.title}</h1>
                        { props.movie.tagline && <h3 className="card--tagline">"{props.movie.tagline}"</h3> }
                        <h2 className="card--genres">Genres: {props.movie.genres.map(genre => genre.name).join(', ')}</h2>
                    </div>

                    <div className="card--info">
                        <h1>Overview:</h1>
                        <p>{props.movie.overview}</p>

                        <h2>Release Date: {new Date(props.movie.release_date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                    </div>

                    <div className="card--similar">
                        <h1>Similar movies:</h1>
                        { similarMovies && <MoviesList movies={similarMovies} details={false} small={true} onMovieClicked={handleMovieSelectionClick}/> }
                    </div>
                </div>
            </div>
        </div>
    )
}