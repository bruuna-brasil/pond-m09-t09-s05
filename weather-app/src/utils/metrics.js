const promClient = require('prom-client');
const register = promClient.register;

const requestDuration = new promClient.Histogram({
  name: 'weather_api_request_duration_seconds',
  help: 'Histogram of weather API request duration in seconds',
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

module.exports = { register, requestDuration };
