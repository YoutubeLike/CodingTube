import React from "react";
import axios from "axios";
import Video from "./video.js";

class Short extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableIds: [],
      renderedElements: [],
    };
    this.loadShort = this.loadShort.bind(this);
  }

  async componentDidMount() {
    // Get shorts list
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-shorts-list"
      );
      this.setState({ availableIds: response.data.map((object) => object.id) });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  loadShort() {
    if (this.state.availableIds.length > 0) {
      const videoElement = <Video id={this.state.availableIds[0]} />;
      this.setState((state) => ({
        availableIds: state.availableIds.slice(1, state.availableIds.length),
        renderedElements: state.renderedElements.concat([videoElement]),
      }));
    }
  }

  render() {
    return (
      <div
        id="shortsSection"
        className="mt-[5vh] h-[80vh] w-full overflow-auto snap-y snap-mandatory no-scrollbar"
        onScroll={this.loadShort}
      >
        <Video id={1} />
        <Video id={2} />
        {this.state.renderedElements.map((element) => element)}
      </div>
    );
  }
}

export default Short;
