const axios = require('axios');
const { getFromCache, setToCache } = require('../utils/cache');

const BASE_URL = 'https://wttr.in';

class WeatherService {
    async fetchWeatherData(city) {
        const cachedData = getFromCache(city);
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await axios.get(`${BASE_URL}/${city}?format=j1`);
            setToCache(city, response.data);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching weather data: ${error}`);
        }
    }
}

module.exports = { WeatherService };
