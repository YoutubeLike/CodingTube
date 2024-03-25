//  PAGE DISPLAYING THE VIDEO GAMES TIMELINE

import NonDisplayedBurgerMenu from "../../component/nonDisplayedBurgerMenu";
import VideoGamesTimeLine from "../../component/VideoGamesTimeline";
import TimelineRightSide from "../../component/timelineRightSide";
import "../../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function VideoGames() {

  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Video Games - CodingTube";
  }, []);
  return (
    <>

      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Video Games</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="flex ml-[3%] flex-col content-center">
          <VideoGamesTimeLine /> {/* Showing Video Games Timeline */}
        </div>
      </div>
    </>
  );
}
