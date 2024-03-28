//  PAGE DISPLAYING (THE VIDEO), RIGHT SIDE TIMELINE, (COMMENTARIES)

import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DisplayedBurgerMenu from "../component/displayedBurgerMenu";
import axios from "axios";

export default function Watch() {
  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Watch - CodingTube";
  }, []);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("video_id");
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
          const response = await axios.get(
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
    <>
      {/* PAGE CONTENT */}
      <div>
        <h1 className="text-3xl font-bold underline">Video page</h1>
        <div class="sm:block md:flex md:inset-y-0 md:left-0 md:flex-col">
          <TimelineRightSide /> {/* Showing Advanced Timeline Right-Side*/}
        </div>
      </div>
    </>
  );
}
