import React from "react";
import axios from "axios";
import SideBar from "./sideBar/sideBar.js";
import CommentBar from "./commentBar.js";
import VideoButtons from "./videoButtons.js";
import VideoInfos from "./videoInfos.js";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortInfos: {},
      commentsCount: 0,
      commentsShown: false,
    };
  }

  async componentDidMount() {
    // Get short infos
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/short-request",
        { params: { shortId: this.props.id } }
      );
      this.setState({ shortInfos: response.data });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }

    // Get comments count
    try {
      const response = await axios.get(
        "http://localhost:5000/api/short/get-comments",
        { params: { shortId: this.props.id } }
      );
      this.setState({ commentsCount: response.data.length });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  render() {
    return this.state.shortInfos.id != null ? (
      <div
        id={"short" + this.state.shortInfos.id}
        className="mb-[1vh] flex justify-center"
      >
        {/* Contains video and its informations */}
        <div className="h-[80vh] w-[45vh] flex flex-col justify-between relative snap-center rounded-[0.7vh] overflow-hidden">
          <video
            src="1.mp4"
            id={"shortPlayer" + this.state.shortInfos.id}
            className="h-full w-full object-cover absolute behind"
            muted
            autoPlay
            loop
          />

          {/* Contains video's informations */}
          <div className="flex flex-col justify-between h-full w-full group">
            {/* Contains pause button and sound button */}
            <VideoButtons shortInfos={this.state.shortInfos} />
            {/* Contains uploader's informations and video's title */}
            <VideoInfos shortInfos={this.state.shortInfos} />
          </div>
        </div>
        <SideBar
          setState={(p) => {
            this.setState(p);
          }}
          shortInfos={this.state.shortInfos}
          commentsCount={this.state.commentsCount}
        />
        {this.state.commentsShown && (
          <CommentBar
            setState={(p) => {
              this.setState(p);
            }}
            shortInfos={this.state.shortInfos}
          />
        )}
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default Video;
