const express = require('express');

const WeatherService = require('./weatherService');
const { getCachedValue, setCachedValue } = require('./cache');

const app = express();
const port = 3000;

const apiKey = 'XXXXXXXXXXXXXXXXXXXXX'; 
const weatherService = new WeatherService(apiKey);

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const cachedWeather = await getCachedValue(city);
    if (cachedWeather) {
      return res.json(cachedWeather);
    }

    
    const weather = await weatherService.getWeatherByCity(city);

    
    await setCachedValue(city, weather, 12 * 60 * 60);

    res.json(weather);
  } catch (error) 
  {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
