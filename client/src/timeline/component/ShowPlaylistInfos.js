import React, { useEffect, useState } from "react";
import axios from "axios";
import { SetScores } from "../functions/AdvancedTimelineCalculator.js";
import { useLocation } from "react-router-dom";


export default function ShowPlaylistInfos() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const playlistId = searchParams.get("playlist_id");

  // Get the informations of the SQL Request by the URL
  var [playlistInfos, setPlaylistInfosInfos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/timeline/playlistInfos-request', {
          params: {
              playlistIdParam: playlistId,
          },
      });
      setPlaylistInfosInfos(response.data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };
    fetchVideos();
  }, []);

  console.log("test",playlistInfos);
  if (playlistInfos.length == 0) {
    playlistInfos = {
      0 : {
        "nom":"Unkown",
        "id_user":1,

      }
    }
  }

  return (

  <div className="invisible md:visible fixed flex flex-col ml-[3%] h-[700px] w-[400px] bg-center bg-purple-800 bg-opacity-75 rounded-lg">
    <div class="flex justify-center items-center mt-3">
      <img
        className="max-w-[90%] h-auto rounded-lg justify-center blur-none"
        src={playlistInfos[0]["thumbnail"]}
        alt="Thumbnail"
      />
    </div>

    <h1 className="text-xl font-bold mt-5 ml-5 mr-5">{playlistInfos[0]["nom"]}</h1>
    <p className="ml-5 mr-5 mt-10">User {playlistInfos[0]["id_user"]}</p>
  </div>
  )
}
