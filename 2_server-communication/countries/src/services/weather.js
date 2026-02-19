import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeather = (country) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  return request.then(response => response.data);
};

export default { getWeather };