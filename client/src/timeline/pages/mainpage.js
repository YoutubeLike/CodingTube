import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimeLine from "../component/Timeline";
import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";

export default function Mainpage() {
  return (
    <>
      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div className="flex ml-[3%] flex-wrap mt-[5%]">
          <TimeLine />
        </div>
      </div>
    </>
  );
}
