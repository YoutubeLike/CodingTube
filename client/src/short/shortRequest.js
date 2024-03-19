import React, { useState, useEffect } from "react";

export default function ShortRequest() {
  // UTILISEZ AXIOS !!
  const [videosInfos, setvideosInfos] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/short/short-request")
      .then((res) => res.json())
      .then((data) => setvideosInfos(data))
      .catch((err) => console.log(err));
  }, []);
  // UTILISEZ AXIOS
  return [videosInfos.channel_id, videosInfos.title, videosInfos.description];
}
