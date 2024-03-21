import "../App.css";
import Reacts, { useEffect, useState } from "react";
import HeroBanner from "./components/herobanner";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section from "./components/section";
import React from "react";

function YoutubePremium() {
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
