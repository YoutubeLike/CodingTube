import React from "react";
import axios from "axios";
import Video from "./video.js";

class Short extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableIds: [],
      renderedElements: [],
      shortsMuted: true,
    };
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
          <Video
            id={IdsList[0]}
            shortsMuted={this.state.shortsMuted}
            setState={(p) => this.setState(p)}
          />,
          <Video
            id={IdsList[1]}
            shortsMuted={this.state.shortsMuted}
            setState={(p) => this.setState(p)}
          />,
        ],
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    document
      .getElementById("shortsSection")
      .addEventListener("scrollend", () => {
        if (this.state.availableIds.length > 0) {
          this.setState((state) => ({
            renderedElements: state.renderedElements.concat([
              <Video id={this.state.availableIds[0]} />,
            ]),
            availableIds: state.availableIds.slice(
              1,
              state.availableIds.length
            ),
          }));
        }
      });
  }

  render() {
    return (
      <div
        id="shortsSection"
        className="mt-[5vh] h-[80vh] w-full overflow-auto snap-y snap-mandatory no-scrollbar"
      >
        {this.state.renderedElements.map((element) => element)}
      </div>
    );
  }
}

export default Short;
