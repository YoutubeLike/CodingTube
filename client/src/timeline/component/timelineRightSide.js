// File containing all the HTML content to be displayed

import React, { useEffect, useState } from "react";
import axios from 'axios';
import {SetScores} from "../functions/AdvancedTimelineCalculator.js";
import {GetTimeElapsed, TimeOfVideo} from "../functions/VideoTiming.js";

export default function TimelineRightSide() {
  var [videosInfos, setVideosInfos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/timeline/timeline-request');
        setVideosInfos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  videosInfos = SetScores(videosInfos);
  videosInfos = videosInfos.slice().sort((a, b) => b.score - a.score);

  var indents = [];

  for (var i = 0; i < videosInfos.length; i++) {
    var date = videosInfos[i]["upload_date_time"];
    var videoLenght = TimeOfVideo(videosInfos[i]["video_duration"])

    indents.push(
      <div key={i} className="h-auto mb-2 ">
        <a href={`/watch?video_id=${videosInfos[i]["id"]}`}>
          <div class="sm:block md:flex md:flex-row">
            <div class="relative">
              <img
                class="sm:max-w-auto sm:h-auto md:h-20 rounded-lg"
                src={videosInfos[i]["thumbnail"]}
                alt="Thumbnail"
              />
              <p class="absolute bottom-1 right-1 z-10 mt-4 ml-4 text-white bg-black bg-opacity-60 pl-1 pr-1 rounded">
                {videoLenght}
              </p>
            </div>

            <div className="ml-2.5">
              <h3 className="text-black font-bold text-[100%]">
                {videosInfos[i]["title"]}
              </h3>
              <h4 className="text-gray text-[90%]">
                {videosInfos[i]["pseudo"]}
              </h4>
              <h4 className="text-gray text-[90%]">
                {videosInfos[i]["number_view"]} views - {GetTimeElapsed(videosInfos[i]["upload_date_time"])} ago
              </h4>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return indents;
}
