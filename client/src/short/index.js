import "./short.css";
import React from "react";
import ShortRequest from "./shortRequest";

function Short() {
  const videoInfos = ShortRequest();
  return (
    <div id="shortSection" className="h-[80vh] w-full overflow-auto snap-y snap-mandatory no-scrollbar">
      {/* Contains video and right bar */}
      <div className="mb-[1vh] flex justify-center">
        {/* Contains video and its informations */}
        <div class="videoContainer">
          <video class="short" src="videos/1.mp4" muted autoPlay loop />

          {/* Contains video's informations */}
          <div className="flex flex-col justify-between h-full w-full group">
            {/* Contains pause button and sound button */}
            <div className="p-[1.5vh] flex justify-between items-start bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition ease-in-out">
              {/* Play button */}
              <button className="h-[4vh] w-[4vh]">
                <img src="images/whitePlayButton.png" />
              </button>

              {/* Sound button */}
              <button className="h-[4vh] w-[4vh]">
                <img src="images/whiteSoundButton.png" />
              </button>
            </div>

            {/* Contains uploader's informations and video's title */}
            <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
              {/* Contains uploader's informations */}
              <div className="mb-[1vh] flex items-center">
                {/* Profile picture */}
                <button className="h-[4.5vh] w-[4.5vh] rounded-full overflow-hidden">
                  <img
                    src="images/picture.png"
                    alt="photo"
                    className="h-[4.5vh] w-[4.5vh]"
                  />
                </button>

                {/* Uploader's channel */}
                <button className="ml-[0.95vh] font-semibold text-[2vh]">
                  @ZachChoi
                </button>

                {/* Subscribe button */}
                <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[1.5vh]">
                  Subscribe
                </button>
              </div>

              {/* Video's title */}
              <p className="text-[2vh]">Would you eat this? #shorts</p>
            </div>
          </div>
        </div>

        {/* Right bar */}
        <div className="flex flex-col justify-end">
          {/* Contains like button and likes count */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Like button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/like.png" />
            </button>

            {/* Likes count */}
            <p className="text-[1.5vh]">342124</p>
          </div>

          {/* Contains dislike button and its name */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Dislike button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/dislike.png" />
            </button>

            {/* Name */}
            <p className="text-[1.5vh]">Dislike</p>
          </div>

          {/* Contains comment button and comments count */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Comment button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/comment.png" />
            </button>
            {/* Comments count */}
            <p className="text-[1.5vh]">1432</p>
          </div>

          {/* Contains share button and its name */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Share button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/share.png" />
            </button>

            {/* Name */}
            <p className="text-[1.5vh]">Share</p>
          </div>

          {/* More options button */}
          <button className="m-[0.95vh] h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
            <img className="scale-50" src="images/3dots.png" />
          </button>

          {/* Sound used */}
          <button className="m-[0.95vh] h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded bg-gray-light">
            {" "}
          </button>
        </div>
      </div>

      {/* second short */}
      <div className="mb-[1vh] flex justify-center">
        {/* Contains video and its informations */}
        <div class="videoContainer">
          <video class="short" src="videos/1.mp4" muted autoPlay loop />

          {/* Contains video's informations */}
          <div className="flex flex-col justify-between h-full w-full group">
            {/* Contains pause button and sound button */}
            <div className="p-[1.5vh] flex justify-between items-start bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition ease-in-out">
              {/* Play button */}
              <button className="h-[4vh] w-[4vh]">
                <img src="images/whitePlayButton.png" />
              </button>

              {/* Sound button */}
              <button className="h-[4vh] w-[4vh]">
                <img src="images/whiteSoundButton.png" />
              </button>
            </div>

            {/* Contains uploader's informations and video's title */}
            <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
              {/* Contains uploader's informations */}
              <div className="mb-[1vh] flex items-center">
                {/* Profile picture */}
                <button className="h-[4.5vh] w-[4.5vh] rounded-full overflow-hidden">
                  <img
                    src="images/picture.png"
                    alt="photo"
                    className="h-[4.5vh] w-[4.5vh]"
                  />
                </button>

                {/* Uploader's channel */}
                <button className="ml-[0.95vh] font-semibold text-[2vh]">
                  @ZachChoi
                </button>

                {/* Subscribe button */}
                <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[1.5vh]">
                  Subscribe
                </button>
              </div>

              {/* Video's title */}
              <p className="text-[2vh]">Would you eat this? #shorts</p>
            </div>
          </div>
        </div>

        {/* Right bar */}
        <div className="flex flex-col justify-end">
          {/* Contains like button and likes count */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Like button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/like.png" />
            </button>

            {/* Likes count */}
            <p className="text-[1.5vh]">342124</p>
          </div>

          {/* Contains dislike button and its name */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Dislike button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/dislike.png" />
            </button>

            {/* Name */}
            <p className="text-[1.5vh]">Dislike</p>
          </div>

          {/* Contains comment button and comments count */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Comment button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/comment.png" />
            </button>
            {/* Comments count */}
            <p className="text-[1.5vh]">1432</p>
          </div>

          {/* Contains share button and its name */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Share button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/share.png" />
            </button>

            {/* Name */}
            <p className="text-[1.5vh]">Share</p>
          </div>

          {/* More options button */}
          <button className="m-[0.95vh] h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
            <img className="scale-50" src="images/3dots.png" />
          </button>

          {/* Sound used */}
          <button className="m-[0.95vh] h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded bg-gray-light">
            {" "}
          </button>
        </div>
      </div>

      {/* third short */}
      <div className="mb-[1vh] flex justify-center">
        {/* Contains video and its informations */}
        <div class="videoContainer">
          <video class="short" src="videos/1.mp4" muted autoPlay loop />

          {/* Contains video's informations */}
          <div className="flex flex-col justify-between h-full w-full group">
            {/* Contains pause button and sound button */}
            <div className="p-[1.5vh] flex justify-between items-start bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition ease-in-out">
              {/* Play button */}
              <button className="h-[4vh] w-[4vh]">
                <img src="images/whitePlayButton.png" />
              </button>

              {/* Sound button */}
              <button className="h-[4vh] w-[4vh]">
                <img src="images/whiteSoundButton.png" />
              </button>
            </div>

            {/* Contains uploader's informations and video's title */}
            <div className="mb-[2vh] p-[1vh] mb-[1vh] ml-[2vh] text-white">
              {/* Contains uploader's informations */}
              <div className="mb-[1vh] flex items-center">
                {/* Profile picture */}
                <button className="h-[4.5vh] w-[4.5vh] rounded-full overflow-hidden">
                  <img
                    src="images/picture.png"
                    alt="photo"
                    className="h-[4.5vh] w-[4.5vh]"
                  />
                </button>

                {/* Uploader's channel */}
                <button className="ml-[0.95vh] font-semibold text-[2vh]">
                  @ZachChoi
                </button>

                {/* Subscribe button */}
                <button className="ml-[0.95vh] px-[1.5vh] py-[0.95vh] bg-white text-black rounded-full text-[1.5vh]">
                  Subscribe
                </button>
              </div>

              {/* Video's title */}
              <p className="text-[2vh]">Would you eat this? #shorts</p>
            </div>
          </div>
        </div>

        {/* Right bar */}
        <div className="flex flex-col justify-end">
          {/* Contains like button and likes count */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Like button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/like.png" />
            </button>

            {/* Likes count */}
            <p className="text-[1.5vh]">342124</p>
          </div>

          {/* Contains dislike button and its name */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Dislike button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/dislike.png" />
            </button>

            {/* Name */}
            <p className="text-[1.5vh]">Dislike</p>
          </div>

          {/* Contains comment button and comments count */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Comment button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/comment.png" />
            </button>
            {/* Comments count */}
            <p className="text-[1.5vh]">1432</p>
          </div>

          {/* Contains share button and its name */}
          <div className="m-[0.95vh] flex flex-col items-center">
            {/* Share button */}
            <button className="h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
              <img className="scale-50" src="images/share.png" />
            </button>

            {/* Name */}
            <p className="text-[1.5vh]">Share</p>
          </div>

          {/* More options button */}
          <button className="m-[0.95vh] h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded-full bg-gray-light hover:bg-gray">
            <img className="scale-50" src="images/3dots.png" />
          </button>

          {/* Sound used */}
          <button className="m-[0.95vh] h-[4.5vh] w-[4.5vh] flex items-center justify-center rounded bg-gray-light">
            {" "}
          </button>
        </div>
      </div>

      <ShortRequest />
    </div>
  );
}

export default Short;
