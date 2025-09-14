// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import DateAndClock from "../DateAndClock/DateAndClock";
import Weather from "../Weather/Weather";

function FoxWithButtons() {
  const [foxImage, setFoxImage] = useState(null);
  const [philosophy, setPhilosophy] = useState([]);
  const [error, setError] = useState(null);

  // Fox image API
  const getRandomImage = async () => {
    try {
      setError(null);
      const response = await axios.get("https://randomfox.ca/floof");
      setFoxImage(response.data.image);
    } catch (err) {
      setError("Could not fetch fox image.");
    }
  };

  // Stoic philosophy API
  const getStoicPhilosophy = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:5000/api/stoic");
      setPhilosophy([response.data]);
    } catch (err) {
      setError("Could not fetch stoic quote.");
    }
  };

  useEffect(() => {
    getRandomImage();
    getStoicPhilosophy();
  }, []);

  return (
    <Card elevation={4} sx={{ p: 2, borderRadius: 3, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <DateAndClock />
        <Weather />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {foxImage && (
        <CardMedia
          component="img"
          image={foxImage}
          alt="Random Fox"
          sx={{ borderRadius: 2, maxHeight: 300, objectFit: "cover" }}
        />
      )}

      <CardContent>
        {philosophy.map((content) => (
          <Box key={content.id} mb={2} textAlign="center">
            <Typography variant="body1" gutterBottom>
              “{content.quote}”
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              — {content.author}
            </Typography>
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" onClick={getRandomImage}>
            Change Image
          </Button>
          <Button variant="outlined" onClick={getStoicPhilosophy}>
            Change Quote
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FoxWithButtons;





{/* 
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoxWithButtons.scss";
import DateAndClock from "../DateAndClock/DateAndClock";
import Weather from "../Weather/Weather";

function FoxWithButtons() {
  const [foxImage, setFoxImage] = useState();
  const [pholosophy, setPholosophy] = useState([]);
//Get images from external api
  const getRandomImage = async () => {
    try {
      const response = await axios.get("https://randomfox.ca/floof");
      setFoxImage(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };
//Get phlosophy texts from external api
  const getStoaPhlosophy = async () => {
    try {
      const response = await axios.get(
        "https://api.themotivate365.com/stoic-quote"
      );
      setPholosophy([response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(pholosophy)

  useEffect(() => {
    getRandomImage();
    getStoaPhlosophy();
  }, []);

  return (
    <div className="fox-container">
      <div className="date-clock">
        <DateAndClock />
        <Weather className="weather"/>
      </div>
      <div className="fox">
        <img className="fox-image" src={foxImage} alt="" />
        <button className="buttons change-image-button" onClick={getRandomImage}>CHANGE IMAGE</button>
        <div>
          {pholosophy.map((content) => (
            <>
              <div className= "quote-container" key={content.id}>
                <p className="quote">{content.quote}</p>
                <h5 className="author">{content.author}</h5>
              </div>
            </>
          ))}
        </div>
        <button className="buttons change-quote-button" onClick={getStoaPhlosophy}>CHANGE THE QUOTE</button>
      </div>
    </div>
  );
}

export default FoxWithButtons;
*/}