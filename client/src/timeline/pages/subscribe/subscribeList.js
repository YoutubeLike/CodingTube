//  PAGE DISPLAYING THE LIST OF SUBSCRIPTIONS

import NonDisplayedBurgerMenu from "../../component/nonDisplayedBurgerMenu";
import ListSubscriptionTimeLine from "../../component/subscribe/subscriptionTimelineList";
import "../../styles/Timeline.css";
import React, { useEffect, useState } from "react";

export default function ListSubscribe() {

  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Subscriptions - CodingTube";
  }, []);
  return (
    <>
      {/* TITLES */}
      <div className="ml-24 mt-8 mb-8">
        <h1 className="text-3xl font-bold">Your subscriptions</h1>
        <div className="flex flex-row space-x-[75%]">
          <h2 className="text-1xl font-bold">The most recent</h2>
          <div>
            <a href="#" className="text-base text-blue-700">
              Manage subscriptions
            </a>
          </div>
        </div>

        {/* BUTTONS OF DISPLAYS */}
        <div className="flex flex-row">
          <form action="grid">
            <button
              type="submit"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Grid
            </button>
          </form>
          <form action="./list">
            <button
              type="submit"
              class="text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 red:bg-red-800 red:hover:bg-red-700 red:focus:ring-red-700 red:border-red-700"
            >
              List
            </button>
          </form>
        </div>
      </div>

       {/* PAGE CONTENT */}
      <div className="flex">
        <NonDisplayedBurgerMenu /> {/* Burger menu unfolded */}
        <div class="flex ml-[3%] flex-col content-center">
          <ListSubscriptionTimeLine /> {/* Showing List Subscriptions */}
        </div>
      </div>
    </>
  );
}
