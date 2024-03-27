import React, { useEffect, useState, useRef} from "react";
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
  const inputRef = useRef("");

  useEffect(() => {
    const displaySearchPage = async () => {
      const queryParameters = new URLSearchParams(window.location.search);
      const video = queryParameters.get("videoName");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/search/displaySearchPage/" + video
        );
        setVideosInfos(response.data);
      } catch (error) {
        console.error("An error occurred while searching: ", error);
      }
    };

    displaySearchPage(); // Appeler la fonction ici pour qu'elle soit exécutée au montage du composant
  }, []); // [] assure que le useEffect ne s'exécute qu'une seule fois au montage


    const handleClickFilters = async (e) => {
        const buttonValue = e.target.value;
        const queryParameters = new URLSearchParams(window.location.search);
        const video_search = queryParameters.get("videoName")

        try{
          const applyFilters = await axios.get(
            "http://localhost:5000/api/search/filters/" + buttonValue + '/' + video_search );
            setVideosInfos(applyFilters.data)
        } catch(error){
          console.error("An error occurred while applying filter: ", error)
        }
    }
  

  return (
      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div className="flex ml-[3%] flex-wrap mt-[5%] overflow-hidden">
        <div className="flex w-[100] overflow-x-scroll no-scrollbar">
          <div className="flex flex-row h-2">
            <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "All"
                onClick={(e) => {
                
                  handleClickFilters(e);
                }}
              >
              All
              </button>
            </div>
            <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Videos"
                onClick={(e) => {
                 
                  handleClickFilters(e);
                }}
              >
              Videos
              </button>
            </div>
            <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Shorts"
                onClick={(e) => {
                  
                  handleClickFilters(e);
                }}
              >
              Shorts
              </button>
            </div>
            <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Recently-uploaded"
                onClick={(e) => {
                  
                  handleClickFilters(e);
                }}
              >
              Recently uploaded
              </button>
            </div>
            <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Live"
                onClick={(e) => {
                  
                  handleClickFilters(e);
                }}
              >
              Live
              </button>
            </div>
          </div>
          <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Music"
                onClick={(e) => {
                  
                  handleClickFilters(e);
                }}
              >
              Music
              </button>
            </div>
            <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Gaming"
                onClick={(e) => {
                  
                  handleClickFilters(e);
                }}
              >
              Gaming
              </button>
            </div>
          <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Cultivations"
                onClick={(e) => {
                  
                  handleClickFilters(e);
                }}
              >
              Cultivations
              </button>
            </div>
            <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Podcasts"
                onClick={(e) => {
                  
                  handleClickFilters(e);
                }}
              >
              Podcasts
              </button>
            </div>
            <div>
              <button 
                type="submit" 
                className="justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                value= "Sports"
                onClick={(e) => {
                  
                  handleClickFilters(e);
                }}
              >
              Sports
              </button>
            </div>
          {/* <div className="">
            <div className="">
              <button 
              type="submit" 
              className=" flex gap-2 justify-center items-center ml-5 h-10 px-5 w-35 min-w-35 bg-gray-200 rounded-full font-bold hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
              onClick={(e) => {

              }}
              >
              Filters <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 16 16"><path fill="currentColor" d="M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5zM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11zM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75m-3-2.75H8.5v1.5H2.75a.75.75 0 0 1 0-1.5M4 3H2.75a.75.75 0 0 0 0 1.5H4zm-1.25 8.5H4V13H2.75a.75.75 0 0 1 0-1.5"></path></svg>
              </button>
            </div>
          </div> */}
        </div>
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
        {/* <div className="bg-green-800 opacity-100 z-80 flex flex-col">
          <p className="text-lg">Filtres de recherche</p>
          <div className="flex flex-row justify-between gap-4">
            <p className="text-base">DATE D'AJOUT</p>
            <p className="text-base">TYPE</p>
            <p className="text-base">DURÉE</p>
            <p className="text-base">TRIER PAR</p>
          </div> */}         
    </div>
  );
}