import React from 'react';
import MoviesList from './moviesList';

export default function Popular(props) {

    return(
        <MoviesList movies={props.movies} details={false}/>
    )
}