import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimelineHistory from "../component/HistoryTimeline";
import React, { useEffect, useState } from "react";
import LikePage from "../component/LikePage";

export default function LikedPage() {
  useEffect(() => {
    document.title = "Playlist - CodingTube";
  }, []);
  return (
    <>
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Your liked videos</h1>
      </div>

      <div className="flex">
        <div class="flex ml-[3%] flex-wrap">
          <LikePage />
        </div>
      </div>
    </>
  );
}
