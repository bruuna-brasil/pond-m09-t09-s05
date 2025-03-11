const express = require('express');
const { setWeatherRoutes } = require('./routes/weatherRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

setWeatherRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});