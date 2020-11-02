const express = require('express');
const router = express.Router();
require('dotenv/config');
const axios = require('axios');
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY_PARAM = '?api_key=' + process.env.API_KEY;
const nodeCache = require('node-cache');
const ttl = 3600; // set ttl for 1h
const cache = new nodeCache(ttl);


router.get(['/', '/popular'], async (req, res) => {
    try {
        let popular = cache.get("getPopular");
        if (!popular) {
            popular = await axios.get(`${BASE_URL}/movie/popular${API_KEY_PARAM}`);
            cache.set("getPopular", popular.data, ttl);
            popular = popular.data;
            
        }
        return res.status(200).json({ message: popular });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/top_rated', async (req, res) => {
    try {
        let top = cache.get("topRated");
        if (!top) {
            top = await axios.get(`${BASE_URL}/movie/top_rated${API_KEY_PARAM}`);
            cache.set("topRated", top.data, ttl);
            top = top.data;
        }
        return res.status(200).json({ message: top });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/now_playing', async (req, res) => {
    try {
        let now = cache.get("nowPlaying");
        if (!now) {
            now = await axios.get(`${BASE_URL}/movie/now_playing${API_KEY_PARAM}`);
            cache.set("nowPlaying", now.data, ttl);
            now = now.data;
        }
        return res.status(200).json({ message: now });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/search/:query', async (req, res) => {
    try {
        const term = req.params.query;
        let searchMovie = cache.get(`search_${term}`);
        if (!searchMovie) {
            searchMovie = await axios.get(`${BASE_URL}/search/movie${API_KEY_PARAM}&query=${term}`);
            cache.set(`search_${term}`, searchMovie.data, ttl);
            searchMovie = searchMovie.data;
        }
        return res.status(200).json({ message: searchMovie });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/:movieId', async (req, res) => {
    try {
        const id = req.params.movieId;
        let getMovie = cache.get(`getMovie_${id}`);
        if (!getMovie) {
            getMovie = await axios.get(`${BASE_URL}/movie/${id}${API_KEY_PARAM}`);
            cache.set(`getMovie_${id}`, getMovie.data, ttl);
            getMovie = getMovie.data;
        }
        return res.status(200).json({ message: getMovie });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/:movieId/similar', async (req, res) => {
    try {
        const id = req.params.movieId;
        let getSimilar = cache.get(`getSimilar_${id}`);
        if (!getSimilar) {
            getSimilar = await axios.get(`${BASE_URL}/movie/${id}/similar${API_KEY_PARAM}`);
            cache.set(`getSimilar_${id}`, getSimilar.data, ttl);
            getSimilar = getSimilar.data;
        }
        return res.status(200).json({ message: getSimilar });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

const handleError = (response, error) => {
    const status = error.response.status;
    const errorJson = { error: error.response.data }
    return response.status(status).json(errorJson);
}

module.exports = router;
