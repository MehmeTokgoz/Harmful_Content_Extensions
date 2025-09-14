// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.scss";

function Weather() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendUrl =import.meta.env.VITE_BACKEND_URL 
    console.log(backendUrl)
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/weather?city=Paris`
        );
        console.log("Hava durumu verisi", response)
        setWeatherInfo(response.data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Failed to load weather data.");
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  if (!weatherInfo) {
    return <div className="weather-loading">Loading weather...</div>;
  }

  return (
    <div className="weather-main-container">
      <div className="weather-info-container">
        <h5 className="weather-city-name">{weatherInfo.name}</h5>
        <p className="weather-temp">{weatherInfo.main.temp} °C</p>
        <p className="weather-description">
          {weatherInfo.weather[0].description[0].toUpperCase() +
            weatherInfo.weather[0].description.slice(1)}
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          alt={weatherInfo.weather[0].description}
        />
      </div>
    </div>
  );
}

export default Weather;
