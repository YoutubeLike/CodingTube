import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimelineHistory from "../component/HistoryTimeline";
import React, { useEffect, useState } from "react";
import Playlist from "../component/Playlist";
import axios from "axios"

export default function PlaylistPage() {
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

  useEffect(() => {
    document.title = "Playlist - CodingTube";
  }, []);
  return (
    <>
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Your playlists</h1>
      </div>

      <div className="flex">
        <div class="flex flex-col items-center ml-[3%] md:items-start">
          <Playlist />
        </div>
      </div>
    </>
  );
}
