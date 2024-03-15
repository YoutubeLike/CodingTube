import DisplayedBurgerMenu from "../component/displayedBurgerMenu";
import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimeLine from "../component/Timeline";
import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";

export default function Mainpage() {
  return (
    <>
      <DisplayedBurgerMenu />
      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div class="flex ml-[15%] flex-wrap">
          <TimeLine />
        </div>
      </div>
    </>
  );
}
