import React, { useEffect, useState } from "react";
import Header from "./header";
import DisplayedBurgerMenu from "../timeline/component/displayedBurgerMenu";
import axios from "axios";
import NonDisplayedBurgerMenu from "../timeline/component/nonDisplayedBurgerMenu";

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
    return `${elapsedDays} days`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours} hours`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minutes`;
  } else {
    return `${elapsedSeconds} seconds`;
  }
}

function timeOfVideo(totalSeconds) {
  var hours;
  var minutes;
  var seconds;
  hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;
  var result = "";
  var resultSeconds = "";
  var resultMinutes = "";
  var resultHours = "";

  // Seconds
  if (seconds < 10) {
    resultSeconds = `0${seconds}`;
  } else {
    resultSeconds = `${seconds}`;
  }
  // Minutes
  if (minutes < 10) {
    resultMinutes = `0${minutes}:`;
  } else {
    resultMinutes = `${minutes}:`;
  }
  // Hours
  if (hours > 0) {
    if (hours < 10) {
      resultHours = `0${hours}:`;
    } else {
      resultHours = `${hours}:`;
    }
  } else {
    resultHours = ``;
  }

  result = `${resultHours}${resultMinutes}${resultSeconds}`;
  return result;
}

export default function Search() {
  // Get the informations of the SQL Request by the URL
  const [videosInfos, setVideosInfos] = useState([]);

  useEffect(() => {
    const displaySearchPage = async () => {
      const queryParameters = new URLSearchParams(window.location.search);
      const video = queryParameters.get("videoName");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/search/displaySearchPage/" + video
        );
        setVideosInfos(response.data);
        console.log(videosInfos)
      } catch (error) {
        console.error("An error occurred while searching: ", error);
      }
    };

    displaySearchPage(); // Appeler la fonction ici pour qu'elle soit exécutée au montage du composant
  }, []); // [] assure que le useEffect ne s'exécute qu'une seule fois au montage

  return (
      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div className="flex ml-[3%] flex-wrap mt-[5%]">
          {videosInfos && videosInfos.map((result, index) => (
              <div key={index}>
                <a href={`/watch?video_id=${result.id}`}>
                  <div className="flex flex-row">
                    <div className="relative w-[20%]">
                      <img
                        className="max-w-[90%] h-auto rounded-lg"
                        src={result.thumbnail}
                        alt="Thumbnail"
                      />
                      <p className="absolute bottom-[5%] right-[12%] z-10 mt-4 ml-4 text-white bg-black bg-opacity-60 pl-1 pr-1 rounded">{timeOfVideo(result.video_duration)}</p>
                    </div>

                    <div className="flex flew-row mt-2.5">
                    <img className="pp" src={result.PP} alt="PP" />
                      <div className="ml-2.5">
                        <h3 className="text-black font-bold text-[100%]">
                          {result.title}
                        </h3>
                        <h4 className="text-gray text-[90%]">{result.pseudo}</h4>
                        <h4 className="text-gray text-[90%]">
                          {result.number_view} views -{" "}
                          {getTimeElapsed(result.upload_date_time)} ago
                        </h4>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
          ))}
        </div>
    </div>
  );
}