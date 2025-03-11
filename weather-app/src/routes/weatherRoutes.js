const { Router } = require('express');
const { WeatherController } = require('../controllers/weatherController');

const router = Router();
const weatherController = new WeatherController();

// Versão 1 da API
router.get('/v1/weather/:city', weatherController.getWeatherV1.bind(weatherController));

// Futuras versões podem ser adicionadas assim:
// router.get('/v2/weather/:city', weatherController.getWeatherV2.bind(weatherController));

function setWeatherRoutes(app) {
    app.use('/api', router);
}

module.exports = { setWeatherRoutes };