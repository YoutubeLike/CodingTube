import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DisplayedBurgerMenu from "../timeline/component/displayedBurgerMenu";
import { useHistory } from 'react-router-dom';

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [mostview, setMostView] = useState([]);
  const [userhistory, setUserHistory] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const inputRef = useRef("");

  const submit = async () => {
    if (inputRef.current != "") {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/search/request/" + inputRef.current
        );
      } catch (error) {
        console.error("An error occurred while searching: ", error);
      }
    }
  };

  const mostResearch = async () => {
    // Suppression de l'argument e car il n'est pas utilisé
    try {
      const resultsMostView = await axios.get(
        "http://localhost:5000/api/search/mostResearch"
      );
      setMostView(resultsMostView.data);
    } catch (error) {
      console.error(
        "An error occurred while searching research most view: ",
        error
      );
    }
  };

  const history = async () => {
    try {
      const resultHistory = await axios.get(
        "http://localhost:5000/api/search/history/1"
      );
      setUserHistory(resultHistory.data);
    } catch (error) {
      console.error(
        "An error occurred while searching research most view: ",
        error
      );
    }
  };

  const history_onChange = async () => {
    if (inputRef.current === "") {
      history()
    }
    else {
      try {
        const resultHistory_onChange = await axios.get(
          "http://localhost:5000/api/search/history_onChange/1/" + inputRef.current
        );
        setUserHistory(resultHistory_onChange.data)
      } catch (error) {
        console.error("An error in history_onChange: ", error);
      }
    }
  };

  const mostResearch_onChange = async () => {
    // Suppression de l'argument e car il n'est pas utilisé
    if (inputRef.current === "") {
      mostResearch()
    }
    else {
      try {
        const resultMostResearch_onChange = await axios.get(
          "http://localhost:5000/api/search/mostResearch_onChange/" + inputRef.current
        );
        setMostView(resultMostResearch_onChange.data)
      } catch (error) {
        console.error("An error in mostResearch_onChange: ", error);
      }
    }
  };

  const handleInputChange =  (e) => {
    setSearchValue(e.target.value)
    inputRef.current = e.target.value;
  };

  const handleClickSearch = (search) => {
    setSearchValue(search)
    inputRef.current = search
  }
  const handleClickOutsideMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  async function deleteHistory(id, e) {
    e.preventDefault();
    try {
      await axios.get("http://localhost:5000/api/search/deleteHistory/" + id);
    } catch (error) {
      console.error("An error occurred while deleting: ", error);
    }
  }

  return (
    <div className="w-[99%] justify-between flex space-x-3 space-y-0.5 ml-2 mt-2 absolute">
      <div className="flex w-[33%] h-7">
        <DisplayedBurgerMenu />
        <div className="flex w-[99%] h-6 ml-2 mt-0.5 z-20 relative">
          <img className="w-6 h-6 mr-0.5" src="favicon.png" alt="favicon"></img>
          <p>CODITUBE</p>
        </div>
      </div>
      <div className="h-7 w-[33%] flex justify-right items-right border-solid border-black rounded-lg z-20 relative">
        <form
          className="flex w-[100%]"
          onSubmit={(e) => {
            e.preventDefault();
            submit(searchValue);
          }}
        >
          <div
            className="display-block w-[100%] h-7 z-20 relative"
            ref={menuRef}
          >
            <input
              className="w-[100%] h-[100%] text-xs bg-gray-200 rounded-s-lg z-20 relative"
              type="text"
              placeholder="Search"
              value={inputRef.current}
              onChange={(e) => {
                handleInputChange(e);
                history_onChange();
                mostResearch_onChange();
              }}
              onClick={(e) => {
                setMenuOpen(true);
                if (e.target.value === "") {
                  mostResearch(e);
                  history(e);
                }
                else {
                  history_onChange()
                  mostResearch_onChange()
                }
                
              }}
            />
            {menuOpen && (
              <div className="w-[100%] rounded-lg border-solid border-black bg-gray-200 z-20 relative">
                <ul role="listbox" className="z-20 relative">
                  {userhistory.map((result, index) => (
                    <div key={index} className="flex justify-between">
                      <div className=" items-center hover:bg-gray-100 py-3 hover:rounded-lg w-full text-left">
                        <div
                          onClick={() => {
                            handleClickSearch(result.name_search);
                          }}
                        >
                          <img
                            className="h-6 z-20 relative"
                            src="rewind_icon.png"
                            alt="search"
                          ></img>
                          <span>{result.name_search}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-[100%]"
                        onClick={(e) => {
                          deleteHistory(result.id, e);
                        }}>
                        supprimer
                      </button>
                    </div>
                  ))}
                  {mostview.map((result, index) => (
                    <button
                      className="flex hover:bg-gray-100 py-3 hover:rounded-lg w-full text-left"
                      key={index}
                      onClick={() => {
                        handleClickSearch(result.name_search);
                      }}
                    >
                      <img
                        className="h-6 z-20 relative"
                        src="search.png"
                        alt="search"
                      ></img>
                      <span>{result.name_search}</span>
                    </button>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button type="submit">
            <img
              className="h-7 bg-gray-200 rounded-e-lg z-20 relative"
              src="search.png"
              alt="search"
            ></img>
          </button>
          <button>
            <img
              className="ml-2 h-7 bg-gray-200 rounded-full z-20 relative"
              src="mic.png"
              alt="vocal-search"
            ></img>
          </button>
        </form>
      </div>
      <div className="flex justify-end space-x-2 w-[33%]">
        <button className="flex justify-center items-center ml-2 h-7 w-7 bg-gray-200 rounded-full">
          <img className="h-5 w-5" src="create.png" alt="create"></img>
        </button>
        <button className="flex justify-center items-center ml-2 h-7 w-7 bg-gray-200 rounded-full">
          <img
            className="h-5 w-5"
            src="notification-bell.png"
            alt="notification-bell"
          ></img>
        </button>
        <button className="flex items-center ml-2 h-7 w-7 bg-gray-200 rounded-full space-x-1"></button>
      </div>
    </div>
  );
}
