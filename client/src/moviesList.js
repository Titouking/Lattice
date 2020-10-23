import React, { useEffect, useState } from 'react';

export default function MoviesList(props) {

    const [movie, setMovie] = useState();
    const [movieSelected, setMovieSelected] = useState(props.fullmovie);

    useEffect(() => {
        setMovieSelected(props.fullmovie);
    }, [props.fullmovie]);

    const handleImageClick = (movie) => {
        getMovie(movie.id);
    }

    const getMovie = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=06d48fee752cff62217786c617281f5b`;
        try {
            const res = await fetch(url);
            const data  = await res.json();
            console.log(data);
            setMovie(data);
            setMovieSelected(true);
        } catch(err){
            console.error(err);
        }
    }


    return (
        <>
        {movieSelected
            ? 
            <div className="card-fullmovie">
                <div className="card">
                    <div className="card--left">
                        <img className="card--image"
                            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`}
                            alt={movie.title + ' poster'}
                        />
                    </div>
                    <div className="card--right">
                        <h3 className="card--title">{movie.title}</h3>
                        this will be the card for: {movie.title}
                    </div>
                </div>
            </div>
            :
            <div className="card-list">
                {props.movies.filter(movie => movie.poster_path).map(movie => (
                    <div className="card" key={movie.id}>
                        <img className="card--image"
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                            alt={movie.title + ' poster'}
                            onClick={() => handleImageClick(movie)}
                            />
                        { props.details && <div className="card--content">
                            <h3 className="card--title">{movie.title}</h3>
                            <p><small>RELEASE DATE: {movie.release_date}</small></p>
                            <p><small>RATING: {movie.vote_average}</small></p>
                            <p className="card--desc">{movie.overview}</p>
                        </div>
                        }
                    </div>
                ))}
            </div>
        }
        </>
    )
}