import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimelineHistory from "../component/HistoryTimeline";
import React, { useEffect, useState } from "react";

export default function History() {
  useEffect(() => {
    document.title = "History - CodingTube";
  }, []);
  return (
    <>
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Your history</h1>
      </div>

      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div class="flex ml-[3%] flex-wrap content-center">
          <TimelineHistory />
        </div>
      </div>
    </>
  );
}
