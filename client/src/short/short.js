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
    // Get shorts list and set the two first shorts 
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-shorts-list"
      );
      const IdsList = response.data.map((object) => object.id);
      this.setState({
        availableIds: IdsList.slice(2, IdsList.length),
        renderedElements: [
          <Video id={IdsList[0]} />,
          <Video id={IdsList[1]} />,
        ],
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  loadShort() {
    if (this.state.availableIds.length > 0) {
      const videoElement = <Video id={this.state.availableIds[0]} />;
      this.setState((state) => ({
        renderedElements: state.renderedElements.concat([videoElement]),
        availableIds: state.availableIds.slice(1, state.availableIds.length),
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
        {this.state.renderedElements.map((element) => element)}
      </div>
    );
  }
}

export default Short;
