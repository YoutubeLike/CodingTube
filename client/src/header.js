import React, { useEffect, useState } from "react";

export default function Header() {
    return (
      <div class="w-[99%] justify-between flex space-x-3 space-y-0.5 ml-2 mt-2">
        <div class="flex w-[33%] h-7 ">
          <img class="w-6 h-6 " src="./menu.png" alt="menu"></img>
          <div class="flex w-[99%] h-6 ml-2 mt-0.5">
            <img class="w-6 h-6 mr-0.5" src="favicon.png"></img>
            <text>CODITUBE</text>
          </div>
        </div>
        <div class="h-7 w-[33%] flex justify-right items-right border-solid border-black rounded-lg">
          <form class="flex w-[100%]">
            <input
              class="w-[90%] text-xs bg-gray-400 rounded-s-lg"
              type="text"
              text="Recherche"
            ></input>
            <button type="submit">
              <img
                class="h-7 bg-gray-400 rounded-e-lg"
                src="search.png"
                alt="search"
              ></img>
            </button>
            <button>
              <img
                class="ml-2 h-7 bg-gray-400 rounded-full"
                src="mic.png"
                alt="vocal-search"
              ></img>
            </button>
          </form>
        </div>
        <div class="flex justify-end space-x-2 w-[33%]">
          <button class="flex justify-center items-center ml-2 h-7 w-7 bg-gray-400 rounded-full">
            <img class="h-5 w-5" src="create.png"></img>
          </button>
          <button class="flex justify-center items-center ml-2 h-7 w-7 bg-gray-400 rounded-full">
            <img class="h-5 w-5" src="notification-bell.png"></img>
          </button>
          <button class="flex  items-center ml-2 h-7 w-7 bg-gray-400 rounded-full space-x-1"></button>
        </div>
      </div>
    );
  }
