import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

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

function Chat() {
  const [response, setResponse] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isBanned, setIsBanned] = useState(false);
  const banDuration = 60000; // 1 minute in milliseconds
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const socketInstance = io(ENDPOINT);
    setSocket(socketInstance);

    socketInstance.on("chat-message", (data) => {
      const messagesReceived = data.message;
      const ArrayMessage = {
        time: data.time,
        message: messagesReceived,
        sender: data.sender,
        profilePicture: data.profilePicture,
      };
      setMessages((prevMessages) => [...prevMessages, ArrayMessage]);

      const bannedWordFound = bannedWords.some((word) =>
        data.message.toLowerCase().includes(word)
      );

      if (bannedWordFound) {
        setIsBanned(true);
        setTimeout(() => setIsBanned(false), banDuration);
        socketInstance.emit("ban-message", { banned: true });
      } else {
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { ...data.message, time: formattedTime },
        // ]);
      }
    });

    socketInstance.on("ban-message", (data) => {
      setIsBanned(data.banned);
    });

    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  const getUserProfilePicture = async (userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/profile-picture?userId=${userId}`
      );
      const data = await response.json();
      return data.profilePicture;
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return null;
    }
  };
  const send = async () => {
    if (socket && inputMessage.trim() !== "") {
      console.log(`Sending message: ${inputMessage}`);
      console.log(`C'est la pp: ${messages.profilePicture}`);
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
        const userId = 90000;
        const profilePicture = await getUserProfilePicture(userId);
        const newMessage = {
          message: inputMessage,
          sender: "You",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          userId,
          profilePicture,
        };
        console.log(
          `Emitting chat-message event with message: ${inputMessage}`
        );
        console.log(newMessage);
        console.log(`C'est la pp: ${messages.profilePicture}`);
        socket.emit("chat-message", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
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

  return (
    <div className="fixed top-1/2 right-0 w-1/3 h-1/2 bg-gray-200 flex flex-col justify-between p-4 box-border transform -translate-y-1/2">
      <h1 className="mt-0">Chat</h1>
      <div
        ref={chatContainerRef}
        className="overflow-y-auto flex-grow flex flex-wrap"
      >
        <ul className="list-none p-0 m-0">
          {console.log(messages)}
          {messages.map((message, index) => (
            <li key={index} className="bg-white p-4 rounded-lg flex">
              <div className="relative mr-4">
                {message.profilePicture && (
                  <img
                    src={message.profilePicture}
                    alt={`${message.sender}'s profile picture`}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                {!message.profilePicture && (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                    ?
                  </div>
                )}
              </div>
              <span className="font-bold w-16">{message.sender}:</span>
              <span className="flex-1 ml-4">
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
                <span className="text-gray-600 text-sm ml-4">
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
          className="flex-grow mr-4"
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

export default Chat;
