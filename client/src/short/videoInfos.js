import React from "react";
import axios from "axios";

class VideoInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscribed: false,
      isHovered: false,
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleHover() {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered,
    }));
  }

  async handleSubscribe() {
    try {
      await axios.get("http://localhost:5000/api/short/follow", {
        params: { channelId: 1, userId: 1 },
      });
      const response = await axios.get(
        "http://localhost:5000/api/short/get-follow",
        { params: { channelId: 1, userId: 1 } }
      );
      this.setState({
        isSubscribed: response.data.length == 0 ? false : true,
      });
    } catch (err) {
      console.error(err);
    }
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
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHover}
          >
            @{this.props.shortInfos.pseudo}
            {this.state.isHovered && (
              <span className="left-[18%] bottom-[8%] mb-[5vh] px-[1vh] text-[1.5vh] rounded-[0.5vh] bg-slate-300/75 absolute">
                @{this.props.shortInfos.pseudo}
              </span>
            )}
          </a>

          {/* Subscribe button */}
          <button onClick={this.handleSubscribe} className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[1.5vh]">
            {this.state.isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* Video's title */}
        <p className="text-[2vh]">{this.props.shortInfos.title}</p>
      </div>
    );
  }
}

export default VideoInfos;
