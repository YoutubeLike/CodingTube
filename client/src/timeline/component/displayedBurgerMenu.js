import React from "react";
import { Link } from "react-router-dom";

const DisplayedBurgerMenu = () => {
  return (
    <div className="w-[19%] flex flex-col items-center">
      <div>
        <div className="text-left">
          <button> Trigger Button</button>
        </div>
        <div className="border-2 hover:bg-gray-100">
          <Link to="/">Mainpage</Link>
        </div>
        <div className="hover:bg-gray-100">
          <Link to="/shorts">Shorts</Link>
        </div>
        <div className="hover:bg-gray-100">
          <Link to="/history">History</Link>
        </div>
        <div className="hover:bg-gray-100">
          <Link to="/subscribe">Subscription</Link>
        </div>
        <div className="hover:bg-gray-100">
          <Link to="/channel">Your channel</Link>
        </div>
        <div className="hover:bg-gray-100">
          <Link to="/videos">Your videos</Link>
        </div>
        <div className="hover:bg-gray-100">
          <Link to="/trends">Trending</Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayedBurgerMenu;
