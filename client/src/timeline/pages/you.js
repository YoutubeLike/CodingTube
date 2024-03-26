import TimeLine from "../component/Timeline";
import img from "../../channel/assets/logo.jpg";
import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import PageChannel from "../../channel/pages/Channel";
import Playlist from "../component/Playlist";
import TimelineHistoryYou from "../component/HistoryTimelineYou";
import TimelineHistory from "../component/HistoryTimeline";
import { useState, useEffect } from "react";
import LikePageYou from "../component/LikePageYou";
import PlaylistYou from "../component/PlaylistYou";

export default function You() {
  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "You - CodingTube";
  }, []);
  return (
    <>
      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div>
          <div className="flex flex-row-reverse md:block">
          <div className="md:relative left-[400px] md:relative top-[80px] flex flex-col items-start">
            <h1 className="text-start text-2xl font-bold mt-4">B R A S C O</h1>
            <a href="/PageChannel" className="text-start mt-4">
              @Itachi Budoke - View Channel
            </a>
          </div> 
          <img
            src={img}
            alt="Channel Avatar"
            className="rounded-full w-21 h-40 md:relative left-[230px]"
          />
          </div>
          <div >
            <a href="/history" className="flex flex-row md:block">
              <img
                className="md:relative left-[220px] w-10 h-10"
                src="history.png"
              />
              <button className="md:relative left-[265px] md:relative top-[-32px] font-black">
                History
              </button>
            </a>
          </div>
          <div className="flex">
            <div className="flex ml-[10%] flex-wrap relative top-[-20px]">
              <div className="flex flex-wrap">
                <TimelineHistoryYou />
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-row md:block">
              <img
                className="md:relative left-[220px] w-10 h-10"
                src="likedvideo.png"
              />
              <button className="md:relative left-[265px] md:relative top-[-32px] font-black">
                Liked Videos
              </button>
            </div>
            <div className="flex">
              <div className="flex ml-[10%] flex-wrap relative top-[-20px]">
                <div className="flex flex-wrap">
                  <LikePageYou />
                </div>
              </div>
            </div>
            <div className="">
              <a href="/playlist" className="flex flex-row md:block">
                <img
                  className="md:relative left-[220px] w-10 h-10"
                  src="history.png"
                />
                <button className="md:relative left-[265px] md:relative top-[-32px] font-black">
                  Playlist
                </button>
              </a>
            </div>
            <div className="flex">
              <div className="flex ml-[10%] flex-wrap relative top-[-20px]">
                <div className="flex flex-wrap">
                  <PlaylistYou />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
