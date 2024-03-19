import "../App.css";
import React, { useEffect, useState } from "react";
import HeroBanner from "./components/herobanner";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section from "./components/section";

function YoutubePremium() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/premium/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="main">
      <HeroBanner />
      <Section1 />
      <Section2 />
      <Section />
    </div>
  );
}

export default YoutubePremium;
