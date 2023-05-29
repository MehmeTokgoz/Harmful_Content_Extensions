// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./DateAndClock.scss";

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
    <div className="date-clock-container">
      <p className="date-info">Date: {currentDate.toLocaleDateString("tr-TR")}</p>
      <p className="clock-info">Clock: {currentDate.toLocaleTimeString()}</p>
    </div>
  );
}

export default DateAndClock;
