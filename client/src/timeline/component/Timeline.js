import React, { useEffect, useState } from "react";

// Fonction pour calculer le temps écoulé depuis la date d'upload
function getTimeElapsed(uploadDateTime) {
  const uploadDate = new Date(uploadDateTime);
  const currentDate = new Date();

  const elapsedMilliseconds = currentDate - uploadDate;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays > 0) {
    return `${elapsedDays} jours`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours} heures`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minutes`;
  } else {
    return `${elapsedSeconds} secondes`;
  }
}

export default function TimeLine() {

  // Get infos onto the request SQL
  const [videosInfos, setvideosInfos] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/timeline-request/")
      .then((resVideo) => resVideo.json())
      .then((dataVideo) => setvideosInfos(dataVideo))
      .catch((errVideo) => console.log(errVideo));
  }, []);

  var indents = [];
  for (var i = 0; i < videosInfos.length; i++) {
    var date = videosInfos[i]["upload_date_time"];
    indents.push(
      <div key={i} className="max-w-[30%] h-auto mb-2">
        <a href="/watch">

        <div class="relative">
            <img
                class="max-w-[90%] h-auto rounded-lg"
                src={videosInfos[i]["thumbnail"]}
                alt="Thumbnail"
            />
            <p class="absolute bottom-2 right-12 z-10 mt-4 ml-4 text-white bg-black bg-opacity-60 pl-1 pr-1 rounded">{videosInfos[i]["video_duration"]}s</p>
        </div>



          <div className="flex flew-row mt-2.5">
            <img className="pp" src={videosInfos[i]["PP"]} alt="PP" />
            <div className="ml-2.5">
              <h3 className="text-black font-bold text-[100%]">
                {videosInfos[i]["title"]}
              </h3>
              <h4 className="text-gray text-[90%]">
                {videosInfos[i]["pseudo"]}
              </h4>
              <h4 className="text-gray text-[90%]">
                {videosInfos[i]["number_view"]} vues - il y a{" "}
                {getTimeElapsed(videosInfos[i]["upload_date_time"])}
              </h4>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return indents;
}
