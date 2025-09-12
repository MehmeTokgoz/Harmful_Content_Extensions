// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.scss";

function Weather() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const getWeather = async () => {
    try {
      const key = import.meta.env.VITE_API_KEY;
      console.log("API KEY:", key) // Vercel için VITE_ prefix önerilir
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=${key}`;
      const { data } = await axios.get(url);
      console.log("Hava durumu:", data)
      setWeatherInfo(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (!weatherInfo) {
    return <div className="weather-main-container">Loading weather...</div>;
  }

  const description =
    weatherInfo.weather[0].description.charAt(0).toUpperCase() +
    weatherInfo.weather[0].description.slice(1);

  return (
    <div className="weather-main-container">
      <div className="weather-info-container">
        <h5 className="weather-city-name">{weatherInfo.name}</h5>
        <p className="weather-temp">{weatherInfo.main.temp} °C</p>
        <p className="weather-description">{description}</p>
        {/* Uncomment to show icon */}
        {/* <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="Weather icon" /> */}
      </div>
    </div>
  );
}

export default Weather;


{/*import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Weather.scss";

function Weather() {
  const [weatherInfo, setWeatherInfo] = useState([]);

  function getWeather() {
    const key = import.meta.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Ankara&units=metric&appid=${key}`;
    axios.get(url).then(({ data }) => setWeatherInfo([{ data }]));
  }
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <div className="weather-main-container">
      {weatherInfo.map((weatherDatas, index) => (
        <div className="weather-info-container" key={index}>
          <h5 className="weather-city-name">{weatherDatas.data.name}</h5>
          <p className="weather-temp">{weatherDatas.data.main.temp} °C</p>
          <p className="weather-description">{weatherDatas.data.weather[0].description[0].toUpperCase() + weatherDatas.data.weather[0].description.substr(1)}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherDatas.data.weather[0].icon}@2x.png`} alt="" /> *
        </div>
      ))}
    </div>
  );
}

export default Weather;
*/}