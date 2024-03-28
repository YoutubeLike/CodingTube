import { Link } from "react-router-dom";
import img from "../../channel/assets/logo.jpg";
import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimelineHistoryYou from "../component/HistoryTimelineYou";
import { useState, useEffect } from "react";
import LikePageYou from "../component/LikePageYou";
import PlaylistYou from "../component/PlaylistYou";
import axios from "axios";
import GetUserPseudo from "../component/GetUserPseudo";

export default function You() {
  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "You - CodingTube";
  }, []);

  var [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/timeline/userInfo`,
          {
            withCredentials: true,
          }
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user infos:", error);
      }
    };
    fetchUserInfo();
  }, []);

  var userPP = "";
  var pseudo = "";
  if (userInfo[0] === undefined) {
    userPP = img;
    pseudo = GetUserPseudo;
  } else {
    userPP = userInfo[0]["PP"];
    pseudo = userInfo[0]["username"];
  }

  return (
    <>
      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div>
          <div className="flex flex-row-reverse relative top-[15px] md:block">
            <div className="relative md:left-[400px] md:top-[80px]  flex flex-col items-start">
              <h1 className="text-start text-2xl font-bold mt-4 relative top-[10px]">
                {pseudo}
              </h1>
              <Link to="/PageChannel" className="text-start mt-4">
                @Itachi Budoke - View Channel
              </Link>
            </div>
            <div>
              <img
                src={userPP}
                alt="Channel Avatar"
                className="rounded-full w-[8em] h-[8em] md:object-contain md:w-[10em] md:h-[10em] relative md:left-[230px] md:top-[-30px]"
              />
            </div>
          </div>
          <div>
            <div className="flex-col">
              <Link
                to="/history"
                className="flex flex-row top-[15px] md:block"
              >
                <img
                  className="md:relative left-[220px] w-10 h-10"
                  src="history.png"
                />
                <button className="md:relative left-[265px] md:relative top-[-32px] font-black">
                  History
                </button>
              </Link>
            </div>
            <div className="flex">
              <div className="flex ml-[10%] md:flex-wrap md:relative top-[-20px] overflow-x-scroll md:overflow-x-hidden">
                <div className="flex md:flex-wrap ">
                  <TimelineHistoryYou />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex-col">
              <Link
                to="/likedVideos"
                className="flex flex-row top-[15px] md:block"
              >
                <img
                  className="md:relative left-[220px] w-10 h-10"
                  src="history.png"
                />
                <button className="md:relative left-[265px] md:relative top-[-32px] font-black">
                  likedVideos
                </button>
              </Link>
            </div>
            <div className="flex">
              <div className="flex ml-[10%] md:flex-wrap md:relative top-[-20px] overflow-x-scroll md:overflow-x-hidden">
                <div className="flex md:flex-wrap ">
                  <LikePageYou />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex-col">
              <Link
                to="/playlist"
                className="flex flex-row top-[15px] md:block"
              >
                <img
                  className="md:relative left-[220px] w-10 h-10"
                  src="history.png"
                />
                <button className="md:relative left-[265px] md:relative top-[-32px] font-black">
                  Playlist
                </button>
              </Link>
            </div>
            <div className="flex">
              <div className="flex ml-[10%] md:flex-wrap md:relative top-[-20px] overflow-x-scroll md:overflow-x-hidden">
                <div className="flex md:flex-wrap ">
                  <PlaylistYou />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
