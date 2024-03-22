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
        "http://localhost:5000/api/short/get-short-infos",
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

    document.getElementById("shortsSection").addEventListener("scrollend", () => {
      const video = document.getElementById(
        "shortPlayer" + this.state.shortInfos.id
      );

      const position = document
        .getElementById("short" + this.state.shortInfos.id)
        .getBoundingClientRect();
      if (Math.floor(position.top) == 59) {
        console.log(this.state.shortInfos.id);
      }
    });
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
            loop
          />

          {/* Contains video's informations */}
          <div className="flex flex-col justify-between h-full w-full group">
            {/* Contains pause button and sound button */}
            <VideoButtons shortInfos={this.state.shortInfos} />


            <div>
              {/* Contains uploader's informations and video's title */}
              <VideoInfos className='absolute' shortInfos={this.state.shortInfos} />

              {/* COMMENTS TOGGLED: Right bar */}
              <div className={this.state.commentsShown ? "absolute bottom-[2.5vh] right-[2vh] text-white shadow-3xl" : "hidden"}>
              <SideBar
                setState={(p) => {
                  this.setState(p);
                }}
                shortInfos={this.state.shortInfos}
                commentsCount={this.state.commentsCount}
              />
              </div>
            </div>

          </div>


        </div>

        {/* COMMENTS NOT TOGGLED: Right bar */}
        <div className={this.state.commentsShown ? "hidden" : ""}>
          <SideBar
            setState={(p) => {
              this.setState(p);
            }}
            shortInfos={this.state.shortInfos}
            commentsCount={this.state.commentsCount}
          />
        </div>

        {this.state.commentsShown && (
          <CommentBar
            setState={(p) => this.setState(p)}
            shortInfos={this.state.shortInfos}
            commentsCount={this.state.commentsCount}
          />
        )}
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default Video;
