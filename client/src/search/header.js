import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  // State to manage the value of the search input
  const [searchValue, setSearchValue] = useState("");

  // Function to handle form submission
  const submit = async (e) => {
    e.preventDefault();
    try {
      // Sending a GET request to the backend API with the search value
      const response = await axios.get("http://localhost:5000/api/search/request/" + searchValue);
      console.log(response.data); // Logging the response data to the console
      setSearchValue(''); // Clearing the search input after submission
    } catch (error) {
      console.error("An error occurred while searching: ", error); // Handling errors if any
    }
  };

  // Function to handle changes in the search input
  const handleInputChange = (e) => {
    setSearchValue(e.target.value); // Updating the search value as the user types
  };

  return (
    // Header component containing search bar and buttons
    <div className="w-[99%] justify-between flex space-x-3 space-y-0.5 ml-2 mt-2">
      <div className="flex w-[33%] h-7 ">
        <img className="w-6 h-6 " src="./menu.png" alt="menu"></img>
        <div className="flex w-[99%] h-6 ml-2 mt-0.5">
          <img className="w-6 h-6 mr-0.5" src="favicon.png" alt="favicon"></img>
          <p>CODITUBE</p>
        </div>
      </div>
      <div className="h-7 w-[33%] flex justify-right items-right border-solid border-black rounded-lg">
        {/* Form for searching */}
        <form className="flex w-[100%]" onSubmit={submit}>
          {/* Search input field */}
          <input
            className="w-[90%] text-xs bg-gray-200 rounded-s-lg"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleInputChange} // Handling input changes
          />
          {/* Search button */}
          <button type="submit">
            <img
              className="h-7 bg-gray-200 rounded-e-lg"
              src="search.png"
              alt="search"
            ></img>
          </button>
          {/* Microphone button (for voice search) */}
          <button>
            <img
              className="ml-2 h-7 bg-gray-200 rounded-full"
              src="mic.png"
              alt="vocal-search"
            ></img>
          </button>
        </form>
      </div>
      {/* Buttons on the right side of the header */}
      <div className="flex justify-end space-x-2 w-[33%]">
        {/* Button for creating */}
        <button className="flex justify-center items-center ml-2 h-7 w-7 bg-gray-200 rounded-full">
          <img className="h-5 w-5" src="create.png" alt="create"></img>
        </button>
        {/* Button for notifications */}
        <button className="flex justify-center items-center ml-2 h-7 w-7 bg-gray-200 rounded-full">
          <img className="h-5 w-5" src="notification-bell.png" alt="notification-bell"></img>
        </button>
        {/* Placeholder button */}
        <button className="flex items-center ml-2 h-7 w-7 bg-gray-200 rounded-full space-x-1"></button>
      </div>
    </div>
  );
}
