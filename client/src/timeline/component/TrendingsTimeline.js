// File containing all the HTML content to be displayed

import React, { useEffect, useState } from "react";
import axios from 'axios';
import {SetScoresTrendings} from "../functions/TrendingsScoreCalculator.js";
import {GetTimeElapsed, TimeOfVideo} from "../functions/VideoTiming.js";



export default function TrendingsTimeLine() {

  // Get the informations of the SQL Request by the URL
  var [videosInfos, setVideosInfos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/timeline/timeline-request`
        );
        setVideosInfos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  
  videosInfos = SetScoresTrendings(videosInfos);
  videosInfos = videosInfos.slice().sort((a, b) => b.score - a.score);
  
  if (videosInfos.length > 10) {
    videosInfos.slice(10, videosInfos.length);
  }

  var indents = [];
  for (var i = 0; i < videosInfos.length; i++) {
    var date = videosInfos[i]["upload_date_time"];
    var videoLenght = TimeOfVideo(videosInfos[i]["video_duration"])
    indents.push(
      <div key={i} className="mb-10 flex content-center">
        <div className="bg-orange-500 min-w-[6%] pt-2 pb-2 rounded-xl mr-2">
          <h1 className="text-xl text-amber-50 text-center font-extrabold inline-bloc align-middle">🔥 {i+1}</h1>
        </div>
        <a href={`/watch?video_id=${videosInfos[i]["id"]}`}>
          <div class="flex flex-row">
            <div class="relative">
              <img
                class="thumbnail-trendings-list"
                src={videosInfos[i]["thumbnail"]}
                alt="Thumbnail"
              />
              <p class="absolute bottom-1 right-1 z-10 mt-4 ml-4 text-white bg-black bg-opacity-60 pl-1 pr-1 rounded">
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
