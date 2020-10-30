import { Component } from 'react';

export default class ApiManager extends Component {
    static getInstance() {  
        return new ApiManager();
    }

    async getPopularMovies(url) {
        try {
            const res = await fetch(`${url}/popular`);
            const data  = await res.json();
            
            return data.message;
        } catch(err){
            console.error(err);
        }
    }

    async getTopRatedMovies(url) {
        try {
            const res = await fetch(`${url}/top_rated`);
            const data  = await res.json();

            return data.message;
        } catch(err){
            console.error(err);
        }
    }

    async getNowPlayingMovies(url) {
        try {
            const res = await fetch(`${url}/now_playing`);
            const data  = await res.json();

            return data.message;
        } catch(err){
            console.error(err);
        }
    }

    async getMovie(url, movieId) {
        try {
            const res = await fetch(`${url}/${movieId}`);
            const data  = await res.json();

            return data.message;
        } catch(err){
            console.error(err);
        }
    }

    async searchMovies(url, query) {
        try {
            const res = await fetch(`${url}/search/${query}`);
            const data  = await res.json();

            return data.message;
        } catch(err){
            console.error(err);
        }
    }
}