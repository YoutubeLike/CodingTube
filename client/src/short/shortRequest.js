import React, { useState, useEffect } from "react";

export default function ShortRequest() {
  const [videosInfos, setvideosInfos] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/shortRequest/")
      .then((res) => res.json())
      .then((data) => setvideosInfos(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
        {videosInfos[0]['id']}
    </div>
  );
}
