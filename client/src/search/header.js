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
      history();
    } else {
      try {
        const resultHistory_onChange = await axios.get(
          "http://localhost:5000/api/search/history_onChange/1/" +
            inputRef.current
        );
        setUserHistory(resultHistory_onChange.data);
      } catch (error) {
        console.error("An error in history_onChange: ", error);
      }
    }
  };

  const mostResearch_onChange = async () => {
    // Suppression de l'argument e car il n'est pas utilisé
    if (inputRef.current === "") {
      mostResearch();
    } else {
      try {
        const resultMostResearch_onChange = await axios.get(
          "http://localhost:5000/api/search/mostResearch_onChange/" +
            inputRef.current
        );
        setMostView(resultMostResearch_onChange.data);
      } catch (error) {
        console.error("An error in mostResearch_onChange: ", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    inputRef.current = e.target.value;
  };

  const handleClickSearch = (search) => {
    setSearchValue(search);
    inputRef.current = search;
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
    // Header component containing search bar and buttons
    <div className="w-[99%] justify-between flex space-x-3 space-y-0.5 ml-2 mt-2 z-12 bg-white absolute">
      <div className="flex w-[33%] h-7 ">
        <DisplayedBurgerMenu />
      </div>
      <div className="h-7 w-[33%] flex justify-right items-right border-solid border-black rounded-lg z-20 relative">
        <form
          autocomplete="off"
          className="flex w-[100%]"
          onSubmit={(e) => {
            e.preventDefault();
            submit(searchValue);
            navigate({
              pathname: '/search',
              search: '?videoName=' + searchValue,
            });
          }}
        >
          <div
            className="display-block w-[100%] h-7 z-20 relative"
            ref={menuRef}
          >
            <input
              autocomplete="off"
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
                } else {
                  history_onChange();
                  mostResearch_onChange();
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
                          {" "}
                          <svg
                            className="h-6 z-20 relative"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 56 56"
                          >
                            <path
                              fill="currentColor"
                              d="M28.856 26.184c1.054 0 1.851-.797 1.851-1.875c0-.493-.187-.961-.539-1.336l-7.008-6.961c1.406-.305 3.047-.446 4.828-.446c9.399 0 16.946 7.524 16.946 16.922a16.9 16.9 0 0 1-16.946 16.969c-9.398 0-16.922-7.547-16.922-16.969c0-1.125-.726-1.945-1.828-1.945c-1.148 0-1.945.82-1.945 1.945c0 11.508 9.21 20.743 20.695 20.743a20.67 20.67 0 0 0 20.719-20.743c0-11.484-9.234-20.695-20.719-20.695c-1.36 0-2.718.14-4.054.375l6.257-6.14c.329-.376.516-.844.516-1.337c0-1.078-.797-1.921-1.852-1.921c-.562 0-1.03.187-1.359.562l-9.656 9.797c-.375.375-.586.89-.586 1.406c0 .54.164 1.008.586 1.406l9.656 9.704c.328.351.774.539 1.36.539"
                            ></path>
                          </svg>
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
                        handleClickSearch(result.name_search);
                      }}
                    >
                      <svg
                        className="h-6 z-20 relative"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
                        ></path>
                      </svg>
                      <span>{result.name_search}</span>
                    </button>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button type="submit">
          <svg
              className="h-7 bg-gray-200 rounded-e-lg z-20 relative"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                className="ml-2 h-7 bg-gray-200 rounded-full z-20 relative"
                fill="currentColor"
                d="M8 24q-.425 0-.712-.288T7 23q0-.425.288-.712T8 22q.425 0 .713.288T9 23q0 .425-.288.713T8 24m4 0q-.425 0-.712-.288T11 23q0-.425.288-.712T12 22q.425 0 .713.288T13 23q0 .425-.288.713T12 24m4 0q-.425 0-.712-.288T15 23q0-.425.288-.712T16 22q.425 0 .713.288T17 23q0 .425-.288.713T16 24m-4-10q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14m-1 7v-3.1q-2.6-.35-4.3-2.312T5 11h2q0 2.075 1.463 3.538T12 16q2.075 0 3.538-1.463T17 11h2q0 2.625-1.7 4.588T13 17.9V21z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
      <div className="flex justify-end space-x-2 w-[33%]">
        <button className="flex justify-center items-center ml-2 h-7 w-7 bg-gray-200 rounded-full">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 16h2v-3h3v-2h-3V8H9v3H6v2h3zm-5 4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h12q.825 0 1.413.588T18 6v4.5l4-4v11l-4-4V18q0 .825-.587 1.413T16 20zm0-2h12V6H4zm0 0V6z"
            ></path>
          </svg>
        </button>
        <button className="flex justify-center items-center ml-2 h-7 w-7 bg-gray-200 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 19v-2h2v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2q.625 0 1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h2v2zm8 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-1-7h2v-2h2v-2h-2V9h-2v2H9v2h2z"
            ></path>
          </svg>
        </button>
        <button className="flex justify-center items-center ml-2 h-7 w-7 bg-gray-200 rounded-full">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16">
            <path
              fill="currentColor"
              d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09c.016.016.032.016.032.032c.144.112.288.224.448.336c.08.048.144.111.224.175A7.98 7.98 0 0 0 8.016 16a7.98 7.98 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16c.144-.111.304-.223.448-.335c.016-.016.032-.016.032-.032c1.696-1.487 2.8-3.676 2.8-6.106m-8 7.001c-1.504 0-2.88-.48-4.016-1.279c.016-.128.048-.255.08-.383a4.17 4.17 0 0 1 .416-.991c.176-.304.384-.576.64-.816c.24-.24.528-.463.816-.639c.304-.176.624-.304.976-.4A4.15 4.15 0 0 1 8 10.342a4.185 4.185 0 0 1 2.928 1.166c.368.368.656.8.864 1.295c.112.288.192.592.24.911A7.03 7.03 0 0 1 8 14.993m-2.448-7.4a2.49 2.49 0 0 1-.208-1.024c0-.351.064-.703.208-1.023c.144-.32.336-.607.576-.847c.24-.24.528-.431.848-.575c.32-.144.672-.208 1.024-.208c.368 0 .704.064 1.024.208c.32.144.608.336.848.575c.24.24.432.528.576.847c.144.32.208.672.208 1.023c0 .368-.064.704-.208 1.023a2.84 2.84 0 0 1-.576.848a2.84 2.84 0 0 1-.848.575a2.715 2.715 0 0 1-2.064 0a2.84 2.84 0 0 1-.848-.575a2.526 2.526 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.22 5.22 0 0 0-.688-1.406a4.883 4.883 0 0 0-1.088-1.135a5.207 5.207 0 0 0-1.04-.608a2.82 2.82 0 0 0 .464-.383a4.2 4.2 0 0 0 .624-.784a3.624 3.624 0 0 0 .528-1.934a3.71 3.71 0 0 0-.288-1.47a3.799 3.799 0 0 0-.816-1.199a3.845 3.845 0 0 0-1.2-.8a3.72 3.72 0 0 0-1.472-.287a3.72 3.72 0 0 0-1.472.288a3.631 3.631 0 0 0-1.2.815a3.84 3.84 0 0 0-.8 1.199a3.71 3.71 0 0 0-.288 1.47c0 .352.048.688.144 1.007c.096.336.224.64.4.927c.16.288.384.544.624.784c.144.144.304.271.48.383a5.12 5.12 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a4.999 4.999 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992C.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
