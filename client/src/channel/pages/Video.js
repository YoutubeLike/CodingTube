import React from "react";
import ClipVideo from "../components/ClipVideo/ClipVideo";
import Comments from "../components/Comments/Comments";
import TimelineRightSide from "../../timeline/component/timelineRightSide";
import "../../timeline/styles/Timeline.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";




export default function Video() {
	useEffect(() => {
		document.title = "Video - CodingTube";
	  }, []);
	  const location = useLocation();
	  const searchParams = new URLSearchParams(location.search);
	  const videoId = searchParams.get("id");
	  // Execute the SQL Request whitch adds one to the video's count
	  const [error, setError] = useState([]);
	  useEffect(() => {
		const fetchData = async () => {
		  try {
			if (videoId) {
			  const response = await axios.get(
				`http://localhost:5000/api/timeline/addView-request`,
				{
				  params: {
					videoIdParam: videoId,
				  },
				}
			  );
			  console.log("View added successfully");
			}
		  } catch (error) {
			setError(error);
		  }
		};
	
		fetchData();
	  }, [videoId]);
	
	  // Execute the SQL Request whitch adds the video's history
	  const [errorHistory, setErrorHistory] = useState([]);
	  useEffect(() => {
		const fetchData = async () => {
		  try {
			if (videoId) {
			  const execute = await axios.get(
				`http://localhost:5000/api/timeline/addHistory-request`,
				{
				  withCredentials: true,
				  params: {
					videoIdParam: videoId,
				  },
				}
			  );
	
			  console.log("History added successfully");
			}
		  } catch (errorHistory) {
			setErrorHistory(errorHistory);
		  }
		};
		fetchData();
	  }, [videoId]);

  return (
    <div class="sm:block md:flex md:inset-y-0 md:left-0">
      <div>
        <ClipVideo />
        <Comments />
      </div>
      <div>
        <TimelineRightSide /> {/* Showing Advanced Timeline Right-Side*/}
      </div>
    </div>
  );
}
