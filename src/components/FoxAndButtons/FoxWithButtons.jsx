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
