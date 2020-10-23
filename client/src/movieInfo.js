import React from 'react';

export default function MovieInfo(props) {

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
                        <h3 className="card--title">{props.movie.title}</h3>
                        this will be the card for: {props.movie.title}
                    </div>
                </div>
            </div>
    )
}