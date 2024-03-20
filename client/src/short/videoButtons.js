import React from "react";

class VideoButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const video = document.getElementById("video");
    document.getElementById("soundButton").addEventListener("click", () => {
      if (video.muted) {
        video.muted = false;
        document.getElementById("soundButtonImg").src = "soundButton.png";
      } else {
        video.muted = true;
        document.getElementById("soundButtonImg").src = "muteButton.png";
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        if (video.paused) {
          video.play();
          document.getElementById("playButtonImg").src = "playButton.png";
        } else {
          video.pause();
          document.getElementById("playButtonImg").src = "pauseButton.png";
        }
      }
    });

    document.getElementById("playButton").addEventListener("click", () => {
      if (video.paused) {
        video.play();
        document.getElementById("playButtonImg").src = "playButton.png";
      } else {
        video.pause();
        document.getElementById("playButtonImg").src = "pauseButton.png";
      }
    });
  }

  render() {
    return (
      <div className="p-[1.5vh] flex justify-between items-start bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition ease-in-out">
        {/* Play button */}
        <button id="playButton" className="h-[4vh] w-[4vh]">
          <img src="playButton.png" id="playButtonImg" />
        </button>

        {/* Sound button */}
        <button id="soundButton" className="h-[4vh] w-[4vh]">
          <img src="muteButton.png" id="soundButtonImg" />
        </button>
      </div>
    );
  }
}

export default VideoButtons;
