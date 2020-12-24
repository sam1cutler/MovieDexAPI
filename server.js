require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');
//const helmet = require('helmet');

console.log(process.env.API_TOKEN);

const MOVIES = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
//app.use(helmet());
//app.use(cors());

app.use(function validateBearerToken(req, res, next) {
    console.log('validate bearer token middleware running')
    
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');
    
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json( {error: 'Unauthorized request'} )
    }

    // move to next middleware
    next()
})

app.get('/movie', function handleGetMovie(req, res) {

    res.send(MOVIES);
})


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
});
