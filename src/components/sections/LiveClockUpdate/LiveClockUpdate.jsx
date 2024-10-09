import React, { useState, useEffect } from "react";

const LiveClockUpdate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  return (
    <div>
      <p>
        {new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        }).format(date)}
      </p>
      <p>Newport Beach, California</p>
    </div>
  );
};

export default LiveClockUpdate;