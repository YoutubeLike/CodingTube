import React from "react";
import Video from "./video.js";

class Short extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id="shortSection"
        className="mt-[5vh] h-[80vh] w-full overflow-auto snap-y snap-mandatory no-scrollbar"
      >
        <Video id={"1"} />
      </div>
    );
  }
}

export default Short;
