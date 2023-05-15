// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'


function DateAndClock() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    return (
      <div>
        <p>Tarih: {currentDate.toDateString()}</p>
        <p>Saat: {currentDate.toLocaleTimeString()}</p>
      </div>
    );
  }

export default DateAndClock