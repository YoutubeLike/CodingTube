import DisplayedBurgerMenu from "../component/displayedBurgerMenu";
import TimeLine from "../component/Timeline";
import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";

export default function Mainpage() {
  return (
    <>
      <DisplayedBurgerMenu />
      <div>
        <h1 className="text-3xl font-bold underline">Here is the main page</h1>
        <div class="flex ml-[15%] flex-wrap">
        <TimeLine />
      </div>
      </div>
    </>
  );
}
