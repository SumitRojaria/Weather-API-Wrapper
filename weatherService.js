const axios = require('axios');

class WeatherService
{
    constructor(apiKey)
    {
        this.apiKey=apiKey;
        this.baseUrl='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
    }
    async getWeatherByCity(city) 
    {
        try 
        {
            const response = await axios.get(`${this.baseUrl}/${city}`, 
            {
                params: 
                {
                key: this.apiKey,
                unitGroup: 'metric' 
                }
            }
            );

        return response.data;

        } 
        catch (error) 
        {
        console.error('Error fetching weather data:', error);
        throw error;
        }
    }
}

module.exports = WeatherService;