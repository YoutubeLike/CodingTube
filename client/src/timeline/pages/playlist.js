import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimelineHistory from "../component/HistoryTimeline";
import React, { useEffect, useState } from "react";
import Playlist from "../component/Playlist";

export default function PlaylistPage() {
  useEffect(() => {
    document.title = "Playlist - CodingTube";
  }, []);
  return (
    <>
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Your playlists</h1>
      </div>

      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div class="flex ml-[3%] flex-wrap">
          <Playlist />
        </div>
      </div>
    </>
  );
}