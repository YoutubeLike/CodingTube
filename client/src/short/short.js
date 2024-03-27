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
    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    // Look for id given in link
    const searchedId = new URLSearchParams(window.location.search).get("id");
    if (searchedId) {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/short/get-short-infos",
          { params: { shortId: searchedId } }
        );
        if (response.data) {
          this.setState({
            searchedId: searchedId,
            loadedVideos: [parseInt(searchedId)],
          });
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    // Get first 10 shorts IDs
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-ten-next-shorts",
        { params: { currentId: 0 } }
      );
      this.setState((state) => ({
        loadedVideos: state.loadedVideos.concat(
          response.data
            .filter((element) => element.id != state.searchedId)
            .map((element) => element.id)
        ),
      }));

      // Add a view in database
      try {
        await axios.get("http://localhost:5000/api/short/add-view", {
          params: {
            shortId: this.state.loadedVideos[0],
          },
        });
      } catch (error) {
        console.error("Error updating datas:", error);
      }

      // Change URL
      window.history.replaceState(
        null,
        "",
        "http://localhost:3000/short?id=" + this.state.loadedVideos[0]
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    document
      .getElementById("shortsSection")
      .addEventListener("scrollend", this.handleScroll);
  }

  componentWillUnmount() {
    document
      .getElementById("shortsSection")
      .removeEventListener("scrollend", this.handleScroll);
  }

  async handleScroll() {
    const position = document
      .getElementById(
        "short" + this.state.loadedVideos[this.state.currentIndex]
      )
      .getBoundingClientRect();
    if (position.top > window.innerHeight / 2) {
      // Add a view in database
      try {
        await axios.get("http://localhost:5000/api/short/add-view", {
          params: {
            shortId: this.state.loadedVideos[this.state.currentIndex - 1],
          },
        });
      } catch (error) {
        console.error("Error updating datas:", error);
      }

      // Change URL
      window.history.replaceState(
        null,
        "",
        "http://localhost:3000/short?id=" +
          this.state.loadedVideos[this.state.currentIndex - 1]
      );
      this.setState((state) => ({ currentIndex: state.currentIndex - 1 }));
    } else if (position.top < 0) {
      // Add a view in database
      try {
        await axios.get("http://localhost:5000/api/short/add-view", {
          params: {
            shortId: this.state.loadedVideos[this.state.currentIndex + 1],
          },
        });
      } catch (error) {
        console.error("Error updating datas:", error);
      }

      // Change URL
      window.history.replaceState(
        null,
        "",
        "http://localhost:3000/short?id=" +
          this.state.loadedVideos[this.state.currentIndex + 1]
      );

      this.setState((state) => ({ currentIndex: state.currentIndex + 1 }));
    }

    this.loadShorts();
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
            response.data
              .filter((element) => element.id != state.searchedId)
              .map((element) => element.id)
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
