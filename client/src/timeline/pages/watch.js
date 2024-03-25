//  PAGE DISPLAYING (THE VIDEO), RIGHT SIDE TIMELINE, (COMMENTARIES)

import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DisplayedBurgerMenu from "../component/displayedBurgerMenu";
import axios from "axios";

import CheckSession from "../../session"
//const { isLoggedIn, userId } = CheckSession();

var userId = 1;

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
        if (videoId && userId) {
          const response = await axios.get(
            `http://localhost:5000/api/timeline/addView-request`, { WithCredentials: true},{
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
            `http://localhost:5000/api/timeline/addHistory-request`,{
              params: {
                videoIdParam: videoId,
                userIdParam: userId,
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
        <div class="flex inset-y-0 left-0 flex-col">
          <TimelineRightSide /> {/* Showing Advanced Timeline Right-Side*/}
        </div>
      </div>
    </>
  );
}
