import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

function HarmfulContentInfo() {
  const [hundredItem, setHundredItem] = useState([]);

  const getHarmfulContentInfo = async () => {
    const totalPages = 5;
    const allData = [];

    for (let page = 1; page <= totalPages; page++) {
      try {
        const response = await axios.get(
          `https://www.usom.gov.tr/api/address/index?page=${page}`
        );
        const pageData = response.data;
        allData.push(...pageData.models);
      } catch (error) {
        console.log(error);
      }
    }

    setHundredItem(allData);
  };

  console.log(hundredItem);

  useEffect(() => {
    getHarmfulContentInfo();
  }, []);

  return (
    <div>
      {hundredItem.map((item, index) => (
        <div key={index}>
          <p>Açıklama {item.desc}</p>
          <p>Eklenme Tarihi: {item.date}</p>
          <p>Address: {item.url}</p>
          <p>Tehlike Derecesi: {item.criticality_level}</p>
        </div>
      ))}
    </div>
  );
}

export default HarmfulContentInfo;
