import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Watch() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("video_id");
  
  // Execute the SQL Request whitch adds one to the video's count
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (videoId) {
          await axios.get(`http://localhost:5000/api/timeline/addView-request/${videoId}`);
          console.log('View added successfully');
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [videoId]);

  return (
    <>
    <div>
      <h1 className="text-3xl font-bold underline">Video page</h1>
      <div class="flex inset-y-0 left-0 flex-col">
        <TimelineRightSide />
      </div>
    </div>
    </>
  );
}
