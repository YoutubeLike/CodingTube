import TimeLine from "../component/Timeline";
import "../styles/Timeline.css";

export default function Mainpage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Here is the main page</h1>
      <div class="flex ml-[15%] flex-wrap">
        <TimeLine />
      </div>
    </div>
  );
}
