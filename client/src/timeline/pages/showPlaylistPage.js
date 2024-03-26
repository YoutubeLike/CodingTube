import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DisplayedBurgerMenu from "../component/displayedBurgerMenu";
import axios from "axios";
import ShowPlaylist from "../component/ShowPlaylist";

export default function ShowPlaylistPage() {
  useEffect(() => {
    document.title = "PlaylistList - CodingTube";
  }, []);
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Playlist</h1>
        <div class="flex inset-y-0 left-0 flex-col">
          <ShowPlaylist />
        </div>
      </div>
    </>
  );
}
