const { WeatherController } = require('../controllers/weatherController');
const { WeatherService } = require('../services/weatherService');

jest.mock('../services/weatherService');

describe('WeatherController', () => {
    let weatherController;
    let mockWeatherService;
    let req;
    let res;

    beforeEach(() => {
        // Criando uma instância mockada do WeatherService
        mockWeatherService = new WeatherService();
        mockWeatherService.fetchWeatherData = jest.fn();

        // Passando o serviço mockado para o controlador
        weatherController = new WeatherController(mockWeatherService);

        req = {
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it('should return 400 if city is not provided', async () => {
        await weatherController.getWeatherV2(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ error: 'City is required' });
    });

    it('should return weather data if city is provided', async () => {
        const city = 'São Paulo';
        req.query = { city };

        const mockWeatherData = { current_condition: [{ temp_C: '20', weatherDesc: [{ value: 'Sunny' }] }] };

        // Simulando a resposta do serviço de clima
        mockWeatherService.fetchWeatherData.mockResolvedValue(mockWeatherData);

        await weatherController.getWeatherV2(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockWeatherData);
    });

    it('should return 500 if fetchWeatherData throws an error', async () => {
        const city = 'São Paulo';
        req.query = { city };

        // Simulando erro no serviço
        mockWeatherService.fetchWeatherData.mockRejectedValue(new Error('Failed to fetch weather data'));

        await weatherController.getWeatherV2(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: 'Failed to fetch weather data' });
    });
});