const { WeatherService } = require('../services/weatherService');

class WeatherController {
    constructor(weatherService) {
        this.weatherService = weatherService || new WeatherService();
    }

    async getWeatherV1(req, res) {
        const city = req.params.city;

        if (!city) {
            res.status(400).send({ error: 'City is required' });
            return;
        }

        try {
            const weatherData = await this.weatherService.fetchWeatherData(city);

            // Adicionar novos dados na versão 2
            const response = {
                city,
                temperature: weatherData.current_condition[0].temp_C,
                description: weatherData.current_condition[0].weatherDesc[0].value,
                humidity: weatherData.current_condition[0].humidity, // Nova informação
                wind_speed: weatherData.current_condition[0].windspeedKmph // Nova informação
            };

            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({ error: 'Failed to fetch weather data' });
        }
    }
}

module.exports = { WeatherController };