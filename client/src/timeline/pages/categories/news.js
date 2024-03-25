//  PAGE DISPLAYING THE NEWS TIMELINE

import NonDisplayedBurgerMenu from "../../component/nonDisplayedBurgerMenu";
import NewsTimeLine from "../../component/NewsTimeline";
import TimelineRightSide from "../../component/timelineRightSide";
import "../../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function News() {

  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "News - CodingTube";
  }, []);
  return (
    <>

      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">News</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="flex ml-[3%] flex-col content-center">
          <NewsTimeLine /> {/* Showing News Timeline */}
        </div>
      </div>
    </>
  );
}
