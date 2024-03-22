import React from "react";
import axios from "axios";
import Video from "./video.js";

class Short extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedVideos: [],
      renderedElements: [],
      currentIndex: 0,
      maxIndex: 1,
      isMuted: true,
    };
    this.renderVideos = this.renderVideos.bind(this);
  }

  async componentDidMount() {
    // get first 10 shorts IDs
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-ten-next-shorts",
        { params: { currentIndex: 0 } }
      );
      const videos = [];
      for (let i = 0; i < 3; i++) {
        try {
          videos.push(response.data[this.state.currentIndex + i].id);
        } catch (error) {
          console.log(error);
        }
      }

      this.setState({
        loadedVideos: response.data.map((element) => element.id),
        currentIndex: response.data[0].id,
        renderedElements: videos,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    document
      .getElementById("shortsSection")
      .addEventListener("scrollend", () => {});
  }

  renderVideos() {
    const videos = [];
    for (let i = 0; i < 3; i++) {
      try {
        videos.push(this.state.loadedVideos[this.state.currentIndex + i]);
      } catch (error) {
        console.log(error);
      }
    }
    this.setState({ renderedElements: videos });
  }

  render() {
    return (
      <div
        id="shortsSection"
        className="mt-[5vh] h-[80vh] w-full overflow-auto snap-y snap-mandatory no-scrollbar"
      >
        {this.state.renderedElements.map((element) => (
          <Video
            id={element}
            isMuted={this.state.isMuted}
            isFirstShort={this.state.loadedVideos[0] == element}
            setState={(p) => this.setState(p)}
          />
        ))}
      </div>
    );
  }
}

export default Short;
