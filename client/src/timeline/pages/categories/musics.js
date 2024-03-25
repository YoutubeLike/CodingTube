//  PAGE DISPLAYING THE MUSICS TIMELINE

import NonDisplayedBurgerMenu from "../../component/nonDisplayedBurgerMenu";
import MusicsTimeLine from "../../component/MusicsTimeline";
import TimelineRightSide from "../../component/timelineRightSide";
import "../../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function Musics() {

  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Musics - CodingTube";
  }, []);
  return (
    <>

      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Musics</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="flex ml-[3%] flex-col content-center">
          <MusicsTimeLine /> {/* Showing Musics Timeline */}
        </div>
      </div>
    </>
  );
}
