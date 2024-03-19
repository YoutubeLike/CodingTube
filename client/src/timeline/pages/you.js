import TimeLine from "../component/Timeline";
import img from "../../channel/assets/logo.jpg";
import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import PageChannel from "../../channel/pages/PageChannel"

export default function You() {
    return (
      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div>
        <div className="channel-info relative left-[400px] relative top-[80px] flex flex-col items-start">
          <h1 className="text-start text-2xl font-bold mt-4">B R A S C O</h1>
          <a href="/PageChannel" className="text-start mt-4">@Itachi Budoke - View Channel</a>
        </div>
        <img
            src={img}
            alt="Channel Avatar"
            className="rounded-full w-21 h-40 relative left-[230px]"
          />
          <div className="">
            <a href="/history">
              <img className="relative left-[220px] w-10 h-10" src="history.png" />
              <button className="relative left-[265px] relative top-[-32px] font-black">History</button>
            </a>
          </div>
          <div className="flex">
            <div className="flex ml-[10%] flex-wrap relative top-[-20px]">
              <TimeLine />
              <div className="flex flex-wrap">
                <TimeLine />
              </div>
            </div>
          </div>
          <div className="">
          <div>
            <a href="/likedvideo">
              <img className="relative left-[220px] w-10 h-10" src="likedvideo.png" />
              <button className="relative left-[265px] relative top-[-32px] font-black">Liked Videos</button>
            </a>
          </div>
          <div className="flex">
            <div className="flex ml-[10%] flex-wrap relative top-[-20px]">
              <TimeLine />
              <div className="flex flex-wrap">
                <TimeLine />
              </div>
            </div>
          </div>
      </div>
      </div>
      </div>
    );
}
