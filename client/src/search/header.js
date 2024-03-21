import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DisplayedBurgerMenu from "../timeline/component/displayedBurgerMenu";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [mostview, setMostView] = useState([]);
  const [userhistory, setUserHistory] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const inputRef = useRef("");
  const navigate = useNavigate();

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
          <img className="w-6 h-6 mr-0.5" src="favicon.png" alt=""></img>
          <p>CODITUBE</p>
        </div>
      </div>
      <div className="h-7 w-[33%] flex justify-right items-right border-solid border-black rounded-lg z-20 relative">
        <form
          className="flex w-[100%]"
          onSubmit={(e) => {
            e.preventDefault();
            submit(searchValue);
            navigate("search/")
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
                          >   <svg className="h-6 z-20 relative" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M28.856 26.184c1.054 0 1.851-.797 1.851-1.875c0-.493-.187-.961-.539-1.336l-7.008-6.961c1.406-.305 3.047-.446 4.828-.446c9.399 0 16.946 7.524 16.946 16.922a16.9 16.9 0 0 1-16.946 16.969c-9.398 0-16.922-7.547-16.922-16.969c0-1.125-.726-1.945-1.828-1.945c-1.148 0-1.945.82-1.945 1.945c0 11.508 9.21 20.743 20.695 20.743a20.67 20.67 0 0 0 20.719-20.743c0-11.484-9.234-20.695-20.719-20.695c-1.36 0-2.718.14-4.054.375l6.257-6.14c.329-.376.516-.844.516-1.337c0-1.078-.797-1.921-1.852-1.921c-.562 0-1.03.187-1.359.562l-9.656 9.797c-.375.375-.586.89-.586 1.406c0 .54.164 1.008.586 1.406l9.656 9.704c.328.351.774.539 1.36.539"></path></svg>
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
                      }}>
                      <svg className="h-6 z-20 relative"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="1em" 
                        height="1em" 
                        viewBox="0 0 24 24">
                        <path fill="currentColor" 
                        d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"></path></svg>
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
              alt=""
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
