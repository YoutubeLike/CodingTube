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
          <a
            href={
              "http://localhost:3000/channel?identifier=" +
              this.props.shortInfos.identifier_channel
            }
            className="h-[4.5vh] w-[4.5vh] rounded-full overflow-hidden"
          >
            <img
              src={this.props.shortInfos.PP}
              alt="photo"
              className="h-[4.5vh] w-[4.5vh]"
            />
          </a>

          {/* Uploader's channel */}
          <a
            href={
              "http://localhost:3000/channel?identifier=" +
              this.props.shortInfos.identifier_channel
            }
            className="ml-[0.95vh] font-semibold text-[2vh]"
          >
            @{this.props.shortInfos.pseudo}
          </a>

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
