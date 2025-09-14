import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({path: ".env.backend"});

const app = express();
app.use(cors());

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
console.log("Port", PORT)
// eslint-disable-next-line no-undef
const WeatherKey = process.env.OPENWEATHER_KEY;
console.log(WeatherKey)

// Weather endpoint
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "Paris";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WeatherKey}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Weather API error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
