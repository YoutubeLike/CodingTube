//  PAGE DISPLAYING THE TRENDINGS TIMELINE

import NonDisplayedBurgerMenu from "../../component/nonDisplayedBurgerMenu";
import TrendingsTimeLine from "../../component/TrendingsTimeline";
import TimelineRightSide from "../../component/timelineRightSide";
import "../../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function Trends() {

  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Trendings - CodingTube";
  }, []);
  return (
    <>

      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Top Trendings</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="sm:block md:flex ml-[3%] md:flex-col content-center">
          <TrendingsTimeLine /> {/* Showing Trendings Timeline */}
        </div>
      </div>
    </>
  );
}
