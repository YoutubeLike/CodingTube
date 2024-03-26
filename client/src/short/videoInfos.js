import React, { useState } from "react";

class VideoInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
    this.handleHover = this.handleHover.bind(this);
  }
  handleHover() {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered
    }));
  }
  render() {
    return (
      <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
        {/* Contains uploader's informations */}
        <div className="mb-[1vh] flex items-center">
          {/* Profile picture */}
          <button className="h-[4.5vh] w-[4.5vh] rounded-full overflow-hidden">
            <img
              src={this.props.shortInfos.PP}
              alt="photo"
              className="h-[4.5vh] w-[4.5vh]"
            />
          </button>

          {/* Uploader's channel */}
          <button className="ml-[0.95vh] font-semibold text-[2vh]"
            
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHover}
          >
            @{this.props.shortInfos.pseudo}
        
          {this.state.isHovered && (
            <span className="left-[18%] bottom-[8%] mb-[5vh] px-[1vh] text-[1.5vh] rounded-[0.5vh] bg-slate-300/75 absolute">
              @{this.props.shortInfos.pseudo}
            </span>
          )}

          </button>

          {/* Subscribe button */}
          <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[1.5vh]">
            Subscribe
          </button>
        </div>

        {/* Video's title */}
        <p className="text-[2vh]">{this.props.shortInfos.title}</p>
      </div>
    );
  }
}

export default VideoInfos;
