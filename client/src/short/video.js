import React from 'react';
import SideBar from './sideBar/sideBar.js'
import CommentBar from './commentBar.js'

class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
            commentsShown : false,
        }
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

    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        if (video.paused) {
          video.play();
          document.getElementById("playButtonImg").src = "playButton.png";
        } else {
          video.pause();
          document.getElementById("playButtonImg").src = "pauseButton.png";
        }
      }
    })

    document.getElementById("playButton").addEventListener("click", () => {
      const video = document.getElementById("video");
      if (video.paused) {
        video.play();
        document.getElementById("playButtonImg").src = "playButton.png";
      } else {
        video.pause();
        document.getElementById("playButtonImg").src = "pauseButton.png";
      }
    })
  }

  render(){
    return(
        <div className="mb-[1vh] flex justify-center">
          {/* Contains video and its informations */}
          <div class="videoContainer">
            <video src="1.mp4" id="video" class="short" muted autoPlay loop />

            {/* Contains video's informations */}
            <div className="flex flex-col justify-between h-full w-full group">
              {/* Contains pause button and sound button */}
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

              {/* Contains uploader's informations and video's title */}
              <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
                {/* Contains uploader's informations */}
                <div className="mb-[1vh] flex items-center">
                  {/* Profile picture */}
                  <button className="h-[4.5vh] w-[4.5vh] rounded-full overflow-hidden">
                    <img
                      src="picture.png"
                      alt="photo"
                      className="h-[4.5vh] w-[4.5vh]"
                    />
                  </button>

                  {/* Uploader's channel */}
                  <button className="ml-[0.95vh] font-semibold text-[2vh]">
                    @{this.props.videosInfos.pseudo}
                  </button>

                  {/* Subscribe button */}
                  <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[1.5vh]">
                    Subscribe
                  </button>
                </div>

                {/* Video's title */}
                <p className="text-[2vh]">
                  {this.props.videosInfos.description}
                </p>
              </div>
            </div>
          </div>
            {/* Right bar */}
            <SideBar setState={(p)=>{this.setState(p)}} videosInfos={this.state.videosInfos}/>
            {this.state.commentsShown ? <CommentBar /> : <div />}
        </div>
    )
  }

}

const buttonContainerStyle = "flex flex-col items-center";
const buttonStyle =
  "h-[5vh] w-[5vh] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]";
const buttonImageStyle = "scale-50";
const buttonTextStyle = "text-[1.5vh]";

export default Video;