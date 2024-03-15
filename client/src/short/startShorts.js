import React, { useState, useEffect } from "react";

export default function StartShorts() {
  const [videosInfos, setvideosInfos] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/short/get-ids")
      .then((res) => res.json())
      .then((data) => setvideosInfos(data))
      .catch((err) => console.log(err));
  }, []);
}


