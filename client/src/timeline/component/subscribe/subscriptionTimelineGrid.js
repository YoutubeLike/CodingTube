// File containing all the HTML content to be displayed

import React, { useEffect, useState } from "react";
import axios from "axios";
import {GetTimeElapsed, TimeOfVideo} from "../../functions/VideoTiming";

export default function GridSubscriptionTimeLine() {
  // Get the informations of the SQL Request by the URL
  const [videosInfos, setVideosInfos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {

        const response = await axios.get(
          "http://localhost:5000/api/timeline/subscription-timeline-request"
          , { withCredentials: true}
        );

        setVideosInfos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  var indents = [];
  if (videosInfos.length === 0) {
    indents.push(
      <div>
        <p className="p-5 bg-red-700 text-white rounded-lg">
          No video, subscribe to at least one channel that has published videos
        </p>
      </div>
    );
  }

  for (var i = 0; i < videosInfos.length; i++) {
    var date = videosInfos[i]["upload_date_time"];
    var videoLenght = TimeOfVideo(videosInfos[i]["video_duration"])
    indents.push(
      <div key={i} className="md:max-w-[24%] h-auto inline-block mr-[1%] mb-[4%]">
        <a href={`/watch?video_id=${videosInfos[i]["id"]}`}>

        <div className="relative w-1280 h-720 bg-gray-200 rounded-lg">
            <img
              className="rounded-lg aspect-video object-cover"

              src={"http://localhost:5000/api/channel/thumbnail?idThumbnail=" + videosInfos[i]["id"]}
              alt="Thumbnail"
              width="1280"
              height="720"
            />
            <p className="absolute bottom-1 right-1 z-10 mt-4 ml-4 text-white bg-black bg-opacity-60 pl-1 pr-1 rounded">
              {videoLenght}
            </p>
          </div>



          <div className="sm:block md:flex md:flew-row mt-2.5">
            <img className="pp" src={videosInfos[i]["PP"]} alt="PP" />
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
