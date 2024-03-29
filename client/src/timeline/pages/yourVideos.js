//  PAGE DISPLAYING THE NEWS TIMELINE

import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import YourVideosTimeline from "../component/YourVideosTimeline";
import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Yourvideos() {
  useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get(
			  "http://localhost:5000/api/profil/check-session",
			  {
				withCredentials: true,
			  }
			);
	
			const loggedIn = response.data.loggedIn;
	
			if (!loggedIn) {
			  window.location.href = "/login";
			}
		  } catch (error) {
			console.log("Erreur lors de la vérification du login:", error);
		  }
		};
	
		fetchData();
		  }, []);
  return (
    <>
      {/* TITLES */}
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Your Videos</h1>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="sm:block md:flex ml-[3%] md:flex-col content-center">
          <YourVideosTimeline /> {/* Showing Your Videos Timeline */}
        </div>
      </div>
    </>
  );
}
