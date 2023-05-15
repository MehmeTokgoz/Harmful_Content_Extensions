import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

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
    <div>
      {weatherInfo.map((weatherDatas, index) => (
        <div key={index}>
          <h5>{weatherDatas.data.name}</h5>
          <p>{weatherDatas.data.main.temp} °C</p>
          <p>{weatherDatas.data.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherDatas.data.weather[0].icon}@2x.png`} alt="" />
        </div>
      ))}
    </div>
  );
}

export default Weather;
