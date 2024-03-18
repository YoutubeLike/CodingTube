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
        <img className="w-6 h-6 " src="./menu.png" alt="menu"></img>
      </div>
      <div>
        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen(false)} // toggle isNavOpen state on click so the menu will close
          >
            <img className="w-6 h-6 " src="./menu.png" alt="menu"></img>
          </div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-1">
            <img className="h-12 w-12" src="homeytb1.png" />
            <Link to="/" className="pl-4"> Home</Link>
          </div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-1">
          <img className="h-12 w-12" src="shorts1.png" />
            <Link to="/shorts" className="pl-4">Shorts</Link>
          </div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-1">
          <img className="h-12 w-12" src="homeytb1.png" />
            <Link to="/history" className="pl-4">History</Link>
          </div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-1">
          <img className="h-12 w-12" src="subscriptions1.png" />
            <Link to="/subscribe" className="pl-4">Subscription</Link>
          </div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-1">
          <img className="h-12 w-12" src="you1.png" />
            <Link to="/channel" className="pl-4">Your channel</Link>
          </div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-1">
          <img className="h-12 w-12" src="you1.png" />
            <Link to="/videos" className="pl-4">Your videos</Link>
          </div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-1">
          <img className="h-12 w-12" src="homeytb1.png" />
            <Link to="/trends" className="pl-4">Trending</Link>
          </div>
        </div>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 15%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 12;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
      </div>
    </>
  );
};

export default DisplayedBurgerMenu;
