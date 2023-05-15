// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoxWithButtons.scss";
import DateAndClock from "../DateAndClock/DateAndClock";

function FoxWithButtons() {
  const [foxImage, setFoxImage] = useState();
  const [pholosophy, setPholosophy] = useState([]);

  const getRandomImage = async () => {
    try {
      const response = await axios.get("https://randomfox.ca/floof");
      setFoxImage(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getRandomImage();
    getStoaPhlosophy();
  }, []);

  return (
    <div>
      <div>
        <DateAndClock />
      </div>
      <div className="fox">
        <img src={foxImage} alt="" />
        <button onClick={getRandomImage}>DEĞİŞTİR</button>
        <div>
          {pholosophy.map((content, index) => (
            <>
              <p>{content.quote}</p>
              <h5 key={index}>{content.author}</h5>
            </>
          ))}
        </div>
        <button onClick={getStoaPhlosophy}>DEĞİŞTİR FELSEFE</button>
      </div>
    </div>
  );
}

export default FoxWithButtons;
