import { useState, useEffect } from 'react';
import weatherService from '../services/weather'; 

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    if (country && country.capitalInfo && country.capitalInfo.latlng) {
      weatherService.getWeather(country)
        .then((weather) => {
          setWeather(weather);
          console.log(weather);
        })
        .catch((error) => {
          console.error('Error fetching weather:', error);
          setWeather(null);
        });
    } else {
      setWeather(null);
    }
  }, [country]);

  if (!country) {
    return null;
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages:</p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        style={{ width: '150px', height: 'auto', border: '1px solid gray' }}
      />
      {weather && (
        <>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>Description: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
            style={{ width: '100px', height: 'auto' }}
          />
        </>
      )}
    </div>
  );
};

export default CountryDetails;
