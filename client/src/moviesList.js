import React from 'react';

export default function MoviesList(props) {

    const handleImageClick = (movie) => {
        props.onMovieClicked(movie);
    }

    return (
        <>
        {props.small
            ? <div className="card-list-sm">
                {props.movies.filter(movie => movie.poster_path)
                    .sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
                    .map(movie => (
                    <div className="card" key={movie.id}>
                        <img className="card--image"
                            title={movie.title}
                            src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
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
            : <div className="card-list">
                {props.movies.filter(movie => movie.poster_path)
                    .sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
                    .map(movie => (
                    <div className="card" key={movie.id}>
                        <img className="card--image"
                            title={movie.title}
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