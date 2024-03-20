import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimeLine from "../component/Timeline";
import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function Mainpage() {
  useEffect(() => {
    document.title = "Home - CodingTube";
  }, []);
  return (
    <>
      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div class="flex ml-[3%] flex-wrap mt-3">
          <TimeLine />
        </div>
      </div>
    </>
  );
}
