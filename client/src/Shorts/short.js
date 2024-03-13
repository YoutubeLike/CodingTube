import "./short.css";
import React from "react";

function Short() {
  return (
    <div id="largeThing">
      <div id="videoRectangle">
        <div>
          <p>Blaze</p>
          <p>Titre qualitatif</p>
        </div>
      </div>

      <div id="rightBar">
        <span className="m-3 flex sm:h-5 sm:w-5 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-gray-light"><img className='scale-50' src="images/like.png"/></span>
        <span className="m-3 flex sm:h-5 sm:w-5 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-gray-light"><img className='scale-50' src="images/dislike.png"/></span>
        <span className="m-3 flex sm:h-5 sm:w-5 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-gray-light"><img className='scale-50' src="images/comment.png"/></span>
        <span className="m-3 flex sm:h-5 sm:w-5 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-gray-light"><img className='scale-50' src="images/share.png"/></span>
        <span className="m-3 flex sm:h-5 sm:w-5 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-gray-light"><img className='scale-50'src="images/3dots.png"/></span>
      </div>7d1765a438e580ed3b05f7b152feae1624684
    </div>
  );
}

export default Short;
