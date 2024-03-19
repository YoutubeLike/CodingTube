import DisplayedBurgerMenu from "../component/displayedBurgerMenu";
import TimelineHistory from "../component/HistoryTimeline";

export default function History() {
  return (
    <>
    <DisplayedBurgerMenu />
      <div className="flex">
        <div class="flex ml-[3%] flex-wrap">
          <TimelineHistory />
        </div>
      </div>
    </>
  );
}
