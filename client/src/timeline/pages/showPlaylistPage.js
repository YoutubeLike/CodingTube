import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DisplayedBurgerMenu from "../component/displayedBurgerMenu";
import axios from "axios";
import ShowPlaylist from "../component/ShowPlaylist";
import ShowPlaylistInfos from "../component/ShowPlaylistInfos";

export default function ShowPlaylistPage() {
  useEffect(() => {
    document.title = "PlaylistList - CodingTube";
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-row mt-5">
          <ShowPlaylistInfos />

          <div class="flex inset-y-0 left-0 flex-col md:ml-[450px] mt-5">
            <ShowPlaylist />
          </div>
        </div>
      </div>
    </>
  );
}
