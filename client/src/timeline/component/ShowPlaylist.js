import React, { useEffect, useState } from "react";
import axios from "axios";
import { SetScores } from "../functions/AdvancedTimelineCalculator.js";
import { useLocation } from "react-router-dom";
import { GetTimeElapsed, TimeOfVideo } from "../functions/VideoTiming.js";

// Fonction pour calculer le temps écoulé depuis la date d'upload
function getTimeElapsed(uploadDateTime) {
  const uploadDate = new Date(uploadDateTime);
  const currentDate = new Date();

  const elapsedMilliseconds = currentDate - uploadDate;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays > 0) {
    return `${elapsedDays} days`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours} hours`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minutes`;
  } else {
    return `${elapsedSeconds} seconds`;
  }
}

function timeOfVideo(totalSeconds) {
  var hours;
  var minutes;
  var seconds;
  hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;
  var result = "";
  var resultSeconds = "";
  var resultMinutes = "";
  var resultHours = "";

  // Seconds
  if (seconds < 10) {
    resultSeconds = `0${seconds}`;
  } else {
    resultSeconds = `${seconds}`;
  }
  // Minutes
  if (minutes < 10) {
    resultMinutes = `0${minutes}:`;
  } else {
    resultMinutes = `${minutes}:`;
  }
  // Hours
  if (hours > 0) {
    if (hours < 10) {
      resultHours = `0${hours}:`;
    } else {
      resultHours = `${hours}:`;
    }
  } else {
    resultHours = ``;
  }

  result = `${resultHours}${resultMinutes}${resultSeconds}`;
  return result;
}

export default function ShowPlaylist() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const playlistId = searchParams.get("playlist_id");

  var [videosInfos, setVideosInfos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (playlistId) {
          const response = await axios.get(
            `http://localhost:5000/api/timeline/showPlaylist-request`,
            {
              params: {
                playlistIdParam: playlistId,
              },
            }
          );
          setVideosInfos(response.data);
          console.log("Playlist load successfully");
        }
      } catch (error) {
        setVideosInfos(videosInfos);
      }
    };

    fetchData();
  }, [playlistId]);

  var indents = [];

  for (var i = 0; i < videosInfos.length; i++) {
    var date = videosInfos[i]["upload_date_time"];
    var videoLenght = TimeOfVideo(videosInfos[i]["video_duration"]);
    console.log("infos:",videosInfos[i])

    indents.push(
      <div key={i} className="mb-10 sm:block md:flex content-center">
        <div className="min-w-[6%] pt-2 pb-2 rounded-xl mr-2">
          <h1 className="text-xl text-amber-50 text-center font-extrabold inline-bloc align-middle">
            {i + 1}
          </h1>
        </div>
        <a href={`/video?id=${videosInfos[i]["id"]}`}>
          <div class="sm:block md:flex md:flex-row">

          <div className="relative w-640 h-360 bg-gray-200 rounded-lg">
            <img
              className="rounded-lg aspect-video object-cover"

              src={"http://localhost:5000/api/channel/thumbnail?idThumbnail=" + videosInfos[i]["id"]}
              alt="Thumbnail"
              width="640"
              height="360"
            />
            <p className="absolute bottom-1 right-1 z-10 mt-4 ml-4 text-white bg-black bg-opacity-60 pl-1 pr-1 rounded">
              {videoLenght}
            </p>
          </div>


            <div className="ml-2.5 w-[85%]">
              <h3 className="text-black font-bold text-[120%]">
                {videosInfos[i]["title"]}
              </h3>
              <h4 className="text-gray text-[90%]">
                {videosInfos[i]["number_view"]} views -{" "}
                {GetTimeElapsed(videosInfos[i]["upload_date_time"])} ago
              </h4>
              <div className="flex flex-row mt-2 items-center">
                <img className="pp mr-2" src={videosInfos[i]["PP"]} alt="PP" />
                <h4 className="text-gray text-[90%] text-center font-medium">
                  {videosInfos[i]["pseudo"]}
                </h4>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return indents;
}
