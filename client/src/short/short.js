import React from "react";
import axios from "axios";
import Video from "./video.js";

class Short extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedVideos: [],
      currentIndex: 0,
      isMuted: true,
    };
    this.loadShorts = this.loadShorts.bind(this);
  }

  async componentDidMount() {
    // get first 10 shorts IDs
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-ten-next-shorts",
        { params: { currentId: 0 } }
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
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    document
      .getElementById("shortsSection")
      .addEventListener("scrollend", () => {
        const position = document
          .getElementById(
            "short" + this.state.loadedVideos[this.state.currentIndex]
          )
          .getBoundingClientRect();
        if (position.top > window.innerHeight / 2) {
          this.setState((state) => ({ currentIndex: state.currentIndex - 1 }));
        } else if (position.top < 0) {
          this.setState((state) => ({ currentIndex: state.currentIndex + 1 }));
        }
        this.loadShorts();
      });
  }

  async loadShorts() {
    // Get 10 next shorts
    if (this.state.currentIndex == this.state.loadedVideos.length - 1) {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/short/get-ten-next-shorts",
          {
            params: {
              currentId: this.state.loadedVideos[this.state.currentIndex],
            },
          }
        );
        this.setState((state) => ({
          loadedVideos: state.loadedVideos.concat(
            response.data.map((element) => element.id)
          ),
        }));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
  }

  render() {
    const renderedShortsIds = [];

    if (this.state.loadedVideos.length > 0) {
      if (this.state.currentIndex > 0)
        renderedShortsIds.push(
          this.state.loadedVideos[this.state.currentIndex - 1]
        );

      renderedShortsIds.push(this.state.loadedVideos[this.state.currentIndex]);

      if (this.state.currentIndex < this.state.loadedVideos.length - 1)
        renderedShortsIds.push(
          this.state.loadedVideos[this.state.currentIndex + 1]
        );
    }
    return (
      <div
        id="shortsSection"
        className="mt-[5vh] h-[80vh] w-full overflow-auto snap-y snap-mandatory no-scrollbar"
      >
        {renderedShortsIds.map((element) => (
          <Video
            key={element}
            id={element}
            isMuted={this.state.isMuted}
            isPlaying={
              this.state.loadedVideos[this.state.currentIndex] == element
            }
            setState={(p) => this.setState(p)}
          />
        ))}
      </div>
    );
  }
}

export default Short;
