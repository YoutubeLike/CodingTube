import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DisplayedBurgerMenu from "../timeline/component/displayedBurgerMenu";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [mostview, setMostView] = useState([]);
  const [userhistory, setUserHistory] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastSearchValue, setLastSearchValue] = useState(""); // Ajout d'un état pour stocker la dernière valeur de searchValue
  const menuRef = useRef(null);

  const submit = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/search/request/" + searchValue
      );
      console.log(response.data);
      setSearchValue("");
    } catch (error) {
      console.error("An error occurred while searching: ", error);
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
    // Suppression de l'argument e car il n'est pas utilisé
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
    // Suppression de l'argument e car il n'est pas utilisé
    try {
      const resultHistory_onChange = await axios.get(
        "http://localhost:5000/api/search/history_onChange/1/" + lastSearchValue
      ); // Utilisation de lastSearchValue
      setSearchValue(resultHistory_onChange.data);
    } catch (error) {
      console.error("An error in history_onChange: ", error);
    }
  };

  const mostResearch_onChange = async () => {
    // Suppression de l'argument e car il n'est pas utilisé
    try {
      const resultMostResearch_onChange = await axios.get(
        "http://localhost:5000/api/search/mostResearch_onChange/" +
          lastSearchValue
      ); // Utilisation de lastSearchValue
      setSearchValue(resultMostResearch_onChange.data);
    } catch (error) {
      console.error("An error in mostResearch_onChange: ", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setLastSearchValue(e.target.value); // Met à jour lastSearchValue à chaque changement de valeur
  };

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
              value={searchValue}
              onChange={(e) => {
                handleInputChange(e);
                setMenuOpen(true); // Déplacer la mise à jour de menuOpen ici
              }}
              onClick={() => {
                mostResearch(); // Appel sans argument
                history(); // Appel sans argument
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
                            setSearchValue(result.name_search);
                            submit(result.name_search);
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
                        }}
                      >
                        supprimer
                      </button>
                    </div>
                  ))}
                  {mostview.map((result, index) => (
                    <button
                      className="flex hover:bg-gray-100 py-3 hover:rounded-lg w-full text-left"
                      key={index}
                      onClick={() => {
                        setSearchValue(result.name_search);
                        submit(result.name_search);
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
