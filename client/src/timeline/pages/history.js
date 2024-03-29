//  PAGE DISPLAYING USER'S VIDEOS HISTORY

import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimelineHistory from "../component/HistoryTimeline";
import React, { useEffect, useState } from "react";
import axios from "axios"


export default function History() {
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
        <div class="sm:block md:flex ml-[3%] md:flex-wrap">
          <TimelineHistory /> {/* Showing Timeline History */}
        </div>
      </div>
    </>
  );
}
