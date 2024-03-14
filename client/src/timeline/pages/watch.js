import TimelineRightSide from "../component/timelineRightSide";
import "../styles/Timeline.css";

export default function Watch() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Video page</h1>
      <div class="flex inset-y-0 left-0 flex-col">
        <TimelineRightSide />
      </div>
    </div>
  );
}
