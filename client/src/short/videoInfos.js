import React from "react";

class VideoInfos extends React.Component {
  constructor(props) {
    super(props);
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
          <button className="ml-[0.95vh] font-semibold text-[2vh]">
            @{this.props.shortInfos.pseudo}
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
