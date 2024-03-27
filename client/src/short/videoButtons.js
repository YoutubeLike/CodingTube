import React from "react";

class VideoButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const video = document.getElementById(
      "shortPlayer" + this.props.id
    );

    document
      .getElementById("soundButton" + this.props.id)
      .addEventListener("click", () => {
        video.muted = !this.props.isMuted;
        this.props.setState((state) => ({ isMuted: !state.isMuted }));
      });

    const playButtonImg = document.getElementById(
      "playButtonImg" + this.props.id
    );
    document.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        if (video.paused) {
          video.play();
          playButtonImg.src = "playButton.png";
        } else {
          video.pause();
          playButtonImg.src = "pauseButton.png";
        }
      }
    });

    document
      .getElementById("playButton" + this.props.id)
      .addEventListener("click", () => {
        if (video.paused) {
          video.play();
          playButtonImg.src = "playButton.png";
        } else {
          video.pause();
          playButtonImg.src = "pauseButton.png";
        }
      });
  }

  render() {
    return (
      <div className="p-[1.5vh] flex justify-between items-start bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition ease-in-out">
        {/* Play button */}
        <button
          id={"playButton" + this.props.id}
          className="h-[4vh] w-[4vh]"
        >
          <img
            src="playButton.png"
            id={"playButtonImg" + this.props.id}
          />
        </button>

        {/* Sound button */}
        <button
          id={"soundButton" + this.props.id}
          className="h-[4vh] w-[4vh]"
        >
          <img
            src={this.props.isMuted ? "muteButton.png" : "soundButton.png"}
            id={"soundButtonImg" + this.props.id}
          />
        </button>
      </div>
    );
  }
}

export default VideoButtons;
