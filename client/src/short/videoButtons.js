import React from "react";

class VideoButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handlePauseButton = this.handlePauseButton.bind(this);
    this.preventSpaceBarDefault = this.preventSpaceBarDefault.bind(this);
    this.handleSpaceBar = this.handleSpaceBar.bind(this);
    this.handleMute = this.handleMute.bind(this);
  }

  componentDidMount() {
    document
      .getElementById("soundButton" + this.props.id)
      .addEventListener("click", this.handleMute);

    document.addEventListener("keydown", this.preventSpaceBarDefault);
    document.addEventListener("keyup", this.handleSpaceBar);

    document
      .getElementById("playButton" + this.props.id)
      .addEventListener("click", this.handlePauseButton);
  }

  componentWillUnmount() {
    document
      .getElementById("soundButton" + this.props.id)
      .removeEventListener("click", this.handleMute);

      document.removeEventListener("keydown", this.preventSpaceBarDefault);
    document.removeEventListener("keyup", this.handleSpaceBar);

    document
      .getElementById("playButton" + this.props.id)
      .removeEventListener("click", this.handlePauseButton);
  }

  handleMute() {
    const video = document.getElementById("shortPlayer" + this.props.id);
    video.muted = !this.props.isMuted;
    this.props.setState((state) => ({ isMuted: !state.isMuted }));
  }

  preventSpaceBarDefault(event) {
    if (event.code === "Space") {
      event.preventDefault()
    }
  }

  handleSpaceBar(event) {
    if (event.code === "Space") {
      this.handlePauseButton();
    }
  }

  handlePauseButton() {
    if (this.props.isPlaying) {
      const video = document.getElementById("shortPlayer" + this.props.id);
      const playButtonImg = document.getElementById(
        "playButtonImg" + this.props.id
      );

      if (video.paused) {
        video.play();
        playButtonImg.src = "playButton.png";
      } else {
        video.pause();
        playButtonImg.src = "pauseButton.png";
      }
    }
  }

  render() {
    return (
      <div className="p-[1.5vh] flex justify-between items-start bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition ease-in-out">
        {/* Play button */}
        <button id={"playButton" + this.props.id} className="h-[4vh] w-[4vh]">
          <img src="playButton.png" id={"playButtonImg" + this.props.id} />
        </button>

        {/* Sound button */}
        <button id={"soundButton" + this.props.id} className="h-[4vh] w-[4vh]">
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
