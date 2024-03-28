import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";

const bannedWords = [
  "nigger",
  "nigga",
  "negro",
  "hitler",
  "kys",
  "neg",
  "nig",
  "whore",
  "rape",
  "rapist",
  "enzo",
];

export default function Chat(props) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBanned, setIsBanned] = useState(false);
  const banDuration = 60000; // 1 minute in milliseconds
  const chatContainerRef = useRef(null);
  const socketInstance = props.socket;
  const [socket, setSocket] = useState(socketInstance);

  useEffect(() => {
    setSocket(socketInstance);
    socket.emit("connect-to-room", props.user);

    socketInstance.on("chat-message", (data) => {
      const messagesReceived = data.message;
      const ppReceived = data.profilePicture;
      const ArrayMessage = {
        time: data.time,
        message: messagesReceived,
        sender: data.sender,
        profilePicture: ppReceived,
      };
      setMessages((prevMessages) => [...prevMessages, ArrayMessage]);

      const bannedWordFound = bannedWords.some((word) =>
        data.message.toLowerCase().includes(word)
      );

      if (bannedWordFound) {
        setIsBanned(true);
        setTimeout(() => setIsBanned(false), banDuration);
        socketInstance.emit("ban-message", { banned: true });
      }
    });

    socketInstance.on("ban-message", (data) => {
      setIsBanned(data.banned);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  const getUserProfilePicture = async () => {
    try {
      return axios
        .get("http://localhost:5000/api/live/profile-picture", {
          withCredentials: true,
        })
        .then((response) => {
          return response.data.profilePicture;
        });
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return null;
    }
  };
  const getUserPseudo = async () => {
    try {
      return axios
        .get("http://localhost:5000/api/live/username", {
          withCredentials: true,
        })
        .then((response) => {
          return response.data.pseudo;
        });
    } catch (error) {
      console.error("Error fetching pseudo:", error);
      return null;
    }
  };
  const send = async () => {
    if (socket && inputMessage.trim() !== "") {
      const bannedWordFound = bannedWords.some((word) =>
        inputMessage.toLowerCase().includes(word)
      );
      if (bannedWordFound) {
        setIsBanned(true);
        setTimeout(() => setIsBanned(false), banDuration);
        socket.emit("ban-message", { banned: true });
        alert(
          `You are banned from chatting for 1 minute due to using a banned word.`
        );
      } else {
        axios
          .get("http://localhost:5000/api/live/testa", {
            withCredentials: true,
          })
          .then(async (res) => {
            if (res.data != "undefined") {
              const profilePicture = await getUserProfilePicture();

              const pseudo = await getUserPseudo();
              const newMessage = {
                message: inputMessage,
                sender: pseudo,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                profilePicture,
              };
              socket.emit("chat-message", newMessage);
              setMessages((prevMessages) => [...prevMessages, newMessage]);
              setInputMessage("");
            } else {
              alert("Vous n'êtes pas connecté");
            }
          });
      }
    } else {
      alert("Please enter a non-empty message");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      send();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // w-1/3 h-5/6
  return (
    <div className="w-full h-3/6 md:w-2/5	 md:h-5/6 rounded-t-lg bg-slate-100 flex flex-col justify-between p-4 box-border divide-y divide-slate-600">
      <h1 className="mt-0 ">Top Chat</h1>

      <div
        ref={chatContainerRef}
        className="overflow-y-auto flex-grow flex  bg-slate-100"
      >
        <ul className="list-none p-0 m-0 w-full">
          {console.log(messages)}
          {messages.map((message, index) => (
            <li
              key={index}
              className="p-4 rounded-lg flex text-wrap cursor-pointer hover:bg-slate-200	w-full"
            >
              {console.log(message.profilePicture)}
              <div className="relative mr-4">
                {message.profilePicture && (
                  <img
                    src={message.profilePicture}
                    alt={`pp`}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                {!message.profilePicture && (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                    ?
                  </div>
                )}
              </div>
              <span className="font-bold w-16 text-black">
                {message.sender}:
              </span>
              <span className="flex ml-4 w-55 text-black align-middle	">
                {message.message &&
                  message.message
                    .split("")
                    .reduce((acc, char, i) => {
                      if (i > 0 && i % 40 === 0) {
                        acc.push("\n");
                      }
                      acc.push(char);
                      return acc;
                    }, [])
                    .join("")}
                <span className="text-gray-600 text-sm ml-4 align-middle ">
                  {message.time}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow mr-4 h-full"
          placeholder="New Message"
          disabled={isBanned}
        />
        <button
          onClick={send}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isBanned}
        >
          Send
        </button>
      </div>
    </div>
  );
}
