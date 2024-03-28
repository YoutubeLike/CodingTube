//  PAGE DISPLAYING THE SPORTS TIMELINE

import NonDisplayedBurgerMenu from "../../component/nonDisplayedBurgerMenu";
import SportsTimeLine from "../../component/SportsTimeline";
import TimelineRightSide from "../../component/timelineRightSide";
import "../../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function Sports() {
  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Sports - CodingTube";
  }, []);
  return (
    <>
      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Sports</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="sm:block md:flex ml-[3%] md:flex-col content-center">
          <SportsTimeLine /> {/* Showing Sports Timeline */}
        </div>
      </div>
    </>
  );
}
