//  PAGE DISPLAYING THE NEWS TIMELINE

import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import YourVideosTimeline from "../component/YourVideosTimeline";
import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function Yourvideos() {
  return (
    <>
      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Your Videos</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="sm:block md:flex ml-[3%] md:flex-col content-center">
          <YourVideosTimeline /> {/* Showing Your Videos Timeline */}
        </div>
      </div>
    </>
  );
}
