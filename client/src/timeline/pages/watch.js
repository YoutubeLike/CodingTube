import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Watch() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("video_id");
  
  const [videosInfos, setVideosInfos] = useState("");
  console.log("request");
  useEffect(() => {
    if (videoId) {
      fetch(`http://localhost:5000/addView-request/${videoId}`)
        .then((res) => res.json())
        .then((data) => setVideosInfos(data))
        .catch((err) => console.log(err));
    }
  }, [videoId]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Video page</h1>
      <div class="flex inset-y-0 left-0 flex-col">
        <TimelineRightSide />
      </div>
    </div>
  );
}
