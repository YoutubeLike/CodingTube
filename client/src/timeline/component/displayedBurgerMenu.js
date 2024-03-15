import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const DisplayedBurgerMenu = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      <div
        className="HAMBURGER-ICON space-y-2"
        onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click so the menu will open
      >
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      </div>
      <div className="w-[19%] flex flex-col items-center">
        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen(false)} // toggle isNavOpen state on click so the menu will close
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>
          <div>
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
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 19%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </div>
    </>
  );
};

export default DisplayedBurgerMenu;
