import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Weather.scss";

function Weather() {
  const [weatherInfo, setWeatherInfo] = useState([]);

  function getWeather() {
    const key = "7a94793461bc6f9d1ee8690913c5ca1e";
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
          <p className="waather-description">{weatherDatas.data.weather[0].description[0].toUpperCase() + weatherDatas.data.weather[0].description.substr(1)}</p>
          {/* <img src={`https://openweathermap.org/img/wn/${weatherDatas.data.weather[0].icon}@2x.png`} alt="" /> */}
        </div>
      ))}
    </div>
  );
}

export default Weather;
