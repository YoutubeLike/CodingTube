import React from "react";
import ClipVideo from "../components/ClipVideo/ClipVideo";
import Comments from "../components/Comments/Comments";
import TimelineRightSide from "../../timeline/component/timelineRightSide";

export default function Video() {
	return (
		<div class="sm:block md:flex md:inset-y-0 md:left-0 md:flex-col">
		<div>
			<ClipVideo />
			<Comments />
		</div>
          	<TimelineRightSide /> {/* Showing Advanced Timeline Right-Side*/}
        </div>
	);
}
