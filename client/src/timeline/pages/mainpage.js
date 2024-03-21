//  PAGE DISPLAYING THE HOME TIMELINE

import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimeLine from "../component/Timeline";
import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function Mainpage() {

  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Home - CodingTube";
  }, []);
  return (
    <>
      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="flex ml-[3%] flex-wrap mt-3 content-center">
          <TimeLine /> {/* Showing Advanced Timeline */}
        </div>
      </div>
    </>
  );
}
