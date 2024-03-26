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
        <div className="flex flex-row mt-5">
          <div className="fixed flex flex-col ml-[3%] h-[700px] w-[400px] bg-center bg-purple-800 bg-opacity-75 rounded-lg">

          <div class="flex justify-center items-center mt-3">
           <img
                className="max-w-[90%] h-auto rounded-lg justify-center blur-none"
                src="https://img.youtube.com/vi/PTmjVaCCax0/maxresdefault.jpg"
                alt="Thumbnail"
             />
          </div>
            
            <h1 className="text-xl font-bold mt-5 ml-5 mr-5">Nom de la playlist</h1>
            <p className="ml-5 mr-5 mt-10">User</p>
          </div>
          <div class="flex inset-y-0 left-0 flex-col ml-[30%] mt-5">
            <ShowPlaylist />
          </div>
        </div>
      </div>
    </>
  );
}
