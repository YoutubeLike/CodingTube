//  PAGE DISPLAYING THE CULTIVATIONS TIMELINE

import NonDisplayedBurgerMenu from "../../component/nonDisplayedBurgerMenu";
import CultivationsTimeLine from "../../component/CultivationsTimeline";
import TimelineRightSide from "../../component/timelineRightSide";
import "../../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function Cultivations() {
  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Cultivations - CodingTube";
  }, []);
  return (
    <>
      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Cultivations</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="sm:block md:flex ml-[3%] md:flex-col content-center">
          <CultivationsTimeLine /> {/* Showing Cultivations Timeline */}
        </div>
      </div>
    </>
  );
}
