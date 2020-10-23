const express = require('express');
const router = express.Router();
require('dotenv/config');
const axios = require('axios');

const apiKey = '?api_key=' + process.env.API_KEY;

router.get('/', (req, res, next) => {
    const apiResponse = getPopularMovies(process.env.MOVIE_URL + '/movie/popular' + apiKey);
    apiResponse.then(response => {
        if (response.data) {
            res.status(200).json({
                message: response.data
            });
        }
    })
});

router.get('/:movieId', (req, res, next) => {
    const id = req.params.movieId;
    res.status(200).json({
        message: 'GET THE MOVIE WITH ID: ' + id 
    });
});

const getPopularMovies = async (url) => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.log(error?.data);
    }
}

module.exports = router;
