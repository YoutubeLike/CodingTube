import "./short.css";
import React from "react";

function Short() {
  return (
    <div className="flex justify-center snap-start snap-always transition overflow-y-scroll snap-y">
      <div id="allVideosContainer">
        <div class="videoContainer">
          <video class="short" src="videos/1.mp4" muted autoPlay loop />

          <div className="flex flex-col justify-between h-full w-full group">
            <div className="flex justify-between items-start gradient opacity-0 group-hover:opacity-100 transition ease-in-out">
              <button className="h-[5vh] w-[5vh]">
                <img src="images/whitePlayButton.png" />
              </button>

              <button className="h-[5vh] w-[5vh]">
                <img src="images/whiteSoundButton.png" />
              </button>
            </div>

            <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
              <div className="mb-[1vh] flex items-center">
                <button className="h-[5.7vh] w-[5.7vh] rounded-full overflow-hidden">
                  <img
                    src="images/picture.png"
                    alt="photo"
                    className="h-[5.7vh] w-[5.7vh]"
                  />
                </button>

                <button className="ml-[0.95vh] font-semibold text-[2.5vh]">
                  @ZachChoi
                </button>
                <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[2vh]">
                  Subscribe
                </button>
              </div>

              <p className="text-[2.5vh]">Would you eat this? #shorts</p>
            </div>
          </div>
        </div>

        <div class="videoContainer">
          <video class="short" src="videos/1.mp4" muted autoPlay loop />

          <div className="flex flex-col justify-between h-full w-full group">
            <div className="flex justify-between items-start gradient opacity-0 group-hover:opacity-100 transition ease-in-out">
              <button className="h-[5vh] w-[5vh]">
                <img src="images/whitePlayButton.png" />
              </button>

              <button className="h-[5vh] w-[5vh]">
                <img src="images/whiteSoundButton.png" />
              </button>
            </div>

            <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
              <div className="mb-[1vh] flex items-center">
                <button className="h-[5.7vh] w-[5.7vh] rounded-full overflow-hidden">
                  <img
                    src="images/picture.png"
                    alt="photo"
                    className="h-[5.7vh] w-[5.7vh]"
                  />
                </button>

                <button className="ml-[0.95vh] font-semibold text-[2.5vh]">
                  @ZachChoi
                </button>
                <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[2vh]">
                  Subscribe
                </button>
              </div>

              <p className="text-[2.5vh]">Would you eat this? #shorts</p>
            </div>
          </div>
        </div>

        <div class="videoContainer">
          <video class="short" src="videos/1.mp4" muted autoPlay loop />

          <div className="flex flex-col justify-between h-full w-full group">
            <div className="flex justify-between items-start gradient opacity-0 group-hover:opacity-100 transition ease-in-out">
              <button className="h-[5vh] w-[5vh]">
                <img src="images/whitePlayButton.png" />
              </button>

              <button className="h-[5vh] w-[5vh]">
                <img src="images/whiteSoundButton.png" />
              </button>
            </div>

            <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
              <div className="mb-[1vh] flex items-center">
                <button className="h-[5.7vh] w-[5.7vh] rounded-full overflow-hidden">
                  <img
                    src="images/picture.png"
                    alt="photo"
                    className="h-[5.7vh] w-[5.7vh]"
                  />
                </button>

                <button className="ml-[0.95vh] font-semibold text-[2.5vh]">
                  @ZachChoi
                </button>
                <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[2vh]">
                  Subscribe
                </button>
              </div>

              <p className="text-[2.5vh]">Would you eat this? #shorts</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <div className="m-[0.95vh] flex flex-col items-center">
          <button className="h-[5.7vh] w-[5.7vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
            <img className="scale-50" src="images/like.png" />
          </button>
          <p className="text-[1.9vh]">342124</p>
        </div>

        <div className="m-[0.95vh] flex flex-col items-center">
          <button className="h-[5.7vh] w-[5.7vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
            <img className="scale-50" src="images/dislike.png" />
          </button>
          <p className="text-[1.9vh]">Dislike</p>
        </div>

        <div className="m-[0.95vh] flex flex-col items-center">
          <button className="h-[5.7vh] w-[5.7vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
            <img className="scale-50" src="images/comment.png" />
          </button>
          <p className="text-[1.9vh]">1432</p>
        </div>

        <div className="m-[0.95vh] flex flex-col items-center">
          <button className="h-[5.7vh] w-[5.7vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
            <img className="scale-50" src="images/share.png" />
          </button>
          <p className="text-[1.9vh]">Share</p>
        </div>

        <button className="m-[0.95vh] h-[5.7vh] w-[5.7vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
          <img className="scale-50" src="images/3dots.png" />
        </button>

        <button className="m-[0.95vh] h-[5.7vh] w-[5.7vh] flex items-center justify-center rounded bg-gray-light">
          {" "}
        </button>
      </div>
    </div>
  );
}

export default Short;
