import "./short.css";
import React from "react";

function Short() {
  return (
    <div id="all">
      <div id="videoContainer">
        <video id="short" src="videos/1.mp4" width="1080" height="1920" muted autoPlay loop/>
        <div className='flex flex-col justify-between h-full w-full group'>

          <div className='flex justify-between items-start gradient opacity-0 group-hover:opacity-100 transition ease-in-out'>
              <button className="h-[5vh] w-[5vh]"><img src="images/whitePlayButton.png"/></button>
              <button className="h-[5vh] w-[5vh]"><img src="images/whiteSoundButton.png"/></button>
          </div>

          <div id="metadataContainer" className="mb-[2vh] items-end">
            <div className="mb-[1vh] flex items-center">
              <button className="rounded-full overflow-hidden"><img src="picture.png" alt="photo" className="h-4 w-4 sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-13 lg:w-13 xl:h-16 xl:w-16"/></button>
              <button className="ml-3 font-semibold text-3xl">@ZachChoi</button>
              <button className="ml-3 px-5 py-3 bg-white text-black rounded-full text-2xl">Subscribe</button>
            </div>
            <p className="text-2xl">Would you eat this? #shorts</p>
          </div>

        </div>

      </div>

      <div className="flex flex-col justify-end">
        <button className="m-2 flex h-[5vh] w-[5vh] items-center justify-center rounded-full bg-gray-light hover:bg-gray"><img className='scale-50' src="images/like.png"/></button>
        <button className="m-3 flex h-[5vh] w-[5vh] items-center justify-center rounded-full bg-gray-light hover:bg-gray"><img className='scale-50' src="images/dislike.png"/></button>
        <button className="m-3 flex h-[5vh] w-[5vh] items-center justify-center rounded-full bg-gray-light hover:bg-gray"><img className='scale-50' src="images/comment.png"/></button>
        <button className="m-3 flex h-[5vh] w-[5vh] items-center justify-center rounded-full bg-gray-light hover:bg-gray"><img className='scale-50' src="images/share.png"/></button>
        <button className="m-3 flex h-[5vh] w-[5vh] items-center justify-center rounded-full bg-gray-light hover:bg-gray"><img className='scale-50'src="images/3dots.png"/></button>
        <button className="m-3 flex h-[5vh] w-[5vh]6 items-center justify-center rounded bg-gray-light" > </button>
      </div>
    </div>
  );
}

export default Short;
