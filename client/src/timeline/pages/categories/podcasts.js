//  PAGE DISPLAYING THE PODCASTS TIMELINE

import NonDisplayedBurgerMenu from "../../component/nonDisplayedBurgerMenu";
import PodcastsTimeLine from "../../component/PodcastsTimeline";
import TimelineRightSide from "../../component/timelineRightSide";
import "../../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function Podcasts() {

  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Podcasts - CodingTube";
  }, []);
  return (
    <>

      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Podcasts</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="sm:block md:flex ml-[3%] md:flex-col content-center">
          <PodcastsTimeLine /> {/* Showing Podcasts Timeline */}
        </div>
      </div>
    </>
  );
}
