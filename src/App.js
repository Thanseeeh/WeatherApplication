import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (SearchData) => {
    const [lat, lon] = SearchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async(response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather( {city: SearchData.label, ...weatherResponse });
        setForecast({ city: SearchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {(!currentWeather && !forecast) ? (
        <div className="empty-search">
          <h1>Search City for Weather and Forecast</h1>
          <img src='home-img.png' alt='weather image' className='weather-image'/>
        </div>
      ) : (
        <>
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} />}
        </>
      )}
    </div>
  );
}

export default App;
