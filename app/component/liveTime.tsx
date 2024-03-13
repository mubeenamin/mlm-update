import React, { useEffect, useState } from "react";

function LiveTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      let date = new Date();
      let options: any = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "America/New_York",
      };
      setTime(date.toLocaleDateString("en-US", options));
    }, 1000);
    return () => clearInterval(interval);
  });
  return <div>{time}</div>;
}

export default LiveTime;
