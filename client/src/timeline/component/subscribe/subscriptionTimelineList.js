import React, { useEffect, useState } from "react";
import axios from 'axios';

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
    resultSeconds =  `0${seconds}`
  } else {
    resultSeconds =  `${seconds}`
  }
  // Minutes
  if (minutes < 10) {
    resultMinutes =  `0${minutes}:`
  } else {
    resultMinutes =  `${minutes}:`
  }
  // Hours
  if (hours > 0) {
    if (hours < 10) {
      resultHours =  `0${hours}:`
    } else {
      resultHours =  `${hours}:`
    }
  } else {
    resultHours =  ``
  }
  
  result = `${resultHours}${resultMinutes}${resultSeconds}`
  return result;
}

export default function ListSubscriptionTimeLine() {

  // Get the informations of the SQL Request by the URL
  const [videosInfos, setVideosInfos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/timeline/subscription-timeline-request');
        setVideosInfos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  var indents = [];
  if (videosInfos.length === 0) {
    indents.push(
      <div>
        <p className="p-5 bg-red-700 text-white rounded-lg">No video, subscribe to at least one channel that has published videos</p>
      </div>
    );
  }

  for (var i = 0; i < videosInfos.length; i++) {
    var date = videosInfos[i]["upload_date_time"];
    var videoLenght = timeOfVideo(videosInfos[i]["video_duration"])
    indents.push(
      <div key={i} className="mb-10">
        <a href={`/watch?video_id=${videosInfos[i]["id"]}`}>
          <div class="flex flex-row">
            <div class="relative">
              <img
                class="thumbnail-subscribe-list"
                src={videosInfos[i]["thumbnail"]}
                alt="Thumbnail"
              />
              <p class="absolute bottom-1 right-1 z-10 mt-4 ml-4 text-white bg-black bg-opacity-60 pl-1 pr-1 rounded">
                {videoLenght}
              </p>
            </div>

            <div className="ml-2.5 w-[55%]">
              <h3 className="text-black font-bold text-[120%]">
                {videosInfos[i]["title"]}
              </h3>
              <h4 className="text-gray text-[90%]">
                {videosInfos[i]["number_view"]} views - {getTimeElapsed(videosInfos[i]["upload_date_time"])} ago
              </h4>
              <div className="flex flex-row mt-2 items-center">
                <img className="pp mr-2" src={videosInfos[i]["PP"]} alt="PP" />
                <h4 className="text-gray text-[90%] text-center font-medium">
                  {videosInfos[i]["pseudo"]}
                </h4>
              </div>
              <p className="mt-2 text-balance truncate text-xs">{videosInfos[i]["description"]}</p>
              
            </div>
          </div>

          
        </a>
      </div>
    );
  }

  return indents;
}
