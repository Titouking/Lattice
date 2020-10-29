const express = require('express');
const router = express.Router();
require('dotenv/config');
const axios = require('axios');
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY_PARAM = '?api_key=' + process.env.API_KEY;

router.get(['/', '/popular'], async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular${API_KEY_PARAM}`);
        return res.status(200).json({ message: response.data });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/top_rated', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/top_rated${API_KEY_PARAM}`);
        return res.status(200).json({ message: response.data });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/now_playing', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing${API_KEY_PARAM}`);
        return res.status(200).json({ message: response.data });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/search/:query', async (req, res) => {
    try {
        const term = req.params.query;
        const response = await axios.get(`${BASE_URL}/search/movie${API_KEY_PARAM}&query=${term}`);
        return res.status(200).json({ message: response.data });
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
});

router.get('/:movieId', async (req, res) => {
    try {
        const id = req.params.movieId;
        const response = await axios.get(`${BASE_URL}/movie/${id}${API_KEY_PARAM}`);
        return res.status(200).json({ message: response.data });
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
