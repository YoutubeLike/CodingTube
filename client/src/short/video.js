import React from "react";
import SideBar from "./sideBar/sideBar.js";
import CommentBar from "./commentBar.js";
import VideoButtons from "./videoButtons.js";
import VideoInfos from "./videoInfos.js";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsShown: false,
    };
  }

  render() {
    return (
      <div className="mb-[1vh] flex justify-center">
        {/* Contains video and its informations */}
        <div className="h-[80vh] w-[45vh] flex flex-col justify-between relative snap-center rounded-[0.7vh] overflow-hidden">
          <video
            src="1.mp4"
            id="video"
            className="h-full w-full object-cover absolute behind"
            muted
            autoPlay
            loop
          />

          {/* Contains video's informations */}
          <div className="flex flex-col justify-between h-full w-full group">
            {/* Contains pause button and sound button */}
            <VideoButtons />
            {/* Contains uploader's informations and video's title */}
            <VideoInfos videosInfos={this.props.videosInfos} />
          </div>
        </div>
        {/* Right bar */}
        <SideBar
          setState={(p) => {
            this.setState(p);
          }}
          videosInfos={this.props.videosInfos}
        />
        {this.state.commentsShown && <CommentBar />}
      </div>
    );
  }
}

const buttonContainerStyle = "flex flex-col items-center";
const buttonStyle =
  "h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]";
const buttonImageStyle = "scale-50";
const buttonTextStyle = "text-[1.5vh]";

export default Video;
