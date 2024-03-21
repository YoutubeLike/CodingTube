//  PAGE DISPLAYING USER'S VIDEOS HISTORY

import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimelineHistory from "../component/HistoryTimeline";
import React, { useEffect, useState } from "react";

export default function History() {
  
  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "History - CodingTube";
  }, []);
  return (
    <>
      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Your history</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="flex ml-[3%] flex-wrap content-center">
          <TimelineHistory /> {/* Showing Timeline History */}
        </div>
      </div>
    </>
  );
}
