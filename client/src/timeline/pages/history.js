import NonDisplayedBurgerMenu from "../component/nonDisplayedBurgerMenu";
import TimelineHistory from "../component/HistoryTimeline";

export default function History() {
  return (
    <>
      <div className="ml-24 mt-8">
        <h1 className="text-3xl font-bold">Your history</h1>
      </div>

      <div className="flex">
        <NonDisplayedBurgerMenu />
        <div class="flex ml-[3%] flex-wrap">
          <TimelineHistory />
        </div>
      </div>
    </>
  );
}
