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

export default function TimelineRightSide() {
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
      <div key={i} className="h-auto mb-2 ">
        <a href="/watch">
          <div class="flex flex-row">
            <img
              className="h-20 rounded-lg"
              src={videosInfos[i]["thumbnail"]}
              alt="Thumbnail"
            />

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
