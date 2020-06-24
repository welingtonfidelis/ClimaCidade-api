const express = require('express');
const routes = express.Router();

const WeatherController = require('./Controllers/WeatherController');

routes.get('/test', (req, res) => {
    res.send({message: 'Hello world!'});
});

routes.get('/weather/history', WeatherController.history);
routes.get('/weather/top', WeatherController.top);
routes.get('/weather/:city', WeatherController.get);

module.exports = routes;