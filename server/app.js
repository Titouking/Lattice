const express = require('express');
const app = express();
const morgan = require('morgan');

const movieRoutes = require('./routes/movie');

// LOGGING
app.use(morgan('dev'));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allowed-Methods', 'GET, POST, DELETE, PATCH, PUT');
        return res.status(200).json({});
    }

    next();
});

// ROUTING
app.use('/movie', movieRoutes);

// 404 ERROR HANDLING
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// GENERIC ERROR HANDLING
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.listen('4000');