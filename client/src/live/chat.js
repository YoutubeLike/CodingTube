import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";
// les ban words
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
  const [response, setResponse] = useState("");
  const [inputMessage, setInputMessage] = useState(""); // Stock le message qu'à rentré l'utilisateur
  const [messages, setMessages] = useState([]); // Stock tout les messages du chat
  const [socket, setSocket] = useState(null); // Stock l'instance du socket
  const [isBanned, setIsBanned] = useState(false); // Permet de voir si l'utilisateur est bannis
  const banDuration = 60000; // 1 minute en milliseconds
  const [isAdmin, setIsAdmin] = useState(false); // Variable qui me sert à être modérateur si je suis l'hote du stream
  const chatContainerRef = useRef(null);
  const [isStreamer, setIsStreamer] = useState("");

  // Le useEffect prock lorsque le composant s'initialise
  useEffect(() => {
    const socketInstance = io(ENDPOINT); // Crée le chemin d'accès avec l'acces ENDPOINT
    setSocket(socketInstance); // Stockage de l'instance pour pouvoir intéragir avec plus facilement
    // Connexion à la room de chat du live
    socketInstance.emit("connect-to-room", props.user);
    // Permet de recevoir les messages
    socketInstance.on("chat-message", (data) => {
      const messagesReceived = data.message; // Permet de lire les informations du message
      const ppReceived = data.profilePicture; // Permet d'avoir la pp de la personne qui écris
      // Sert à stocker les valeurs du message dans un nouvel objet
      const ArrayMessage = {
        time: data.time,
        message: messagesReceived,
        sender: data.sender,
        profilePicture: ppReceived,
        userId: data.userId,
      };
      // ajoute le message à la suite des autres les "..." sont un opérateur de spreadpour décomposer le tableau en élément individuel
      setMessages((prevMessages) => [...prevMessages, ArrayMessage]);

      const bannedWordFound = bannedWords.some((word) =>
        data.message.toLowerCase().includes(word)
      );

      if (bannedWordFound) {
        setIsBanned(true);
        setTimeout(() => setIsBanned(false), banDuration);
        socketInstance.emit("ban-message", { banned: true });
      } else {
      }
    });
    const pseudo = props.user;

    const fetchAdminStatus = async (userId, pseudo) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/live/admind?streamer=" + pseudo,
          { withCredentials: true }
        );
        setIsAdmin(response.data.isAdmin);
        console.log(response.data.isAdmin);
      } catch (error) {
        console.error("Error fetching admin status:", error);
      }
    };

    fetchAdminStatus(null, pseudo);

    socketInstance.on("ban-message", (data) => {
      setIsBanned(data.banned);
    });

    // déconnect le socket à la fin pour éviter tout problème
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Permet d'avoir la profile picture de l'utilisateur connecté
  const getUserProfilePicture = async (userId) => {
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

  // permet de récupéré le pseudo de l'utilisateur connecté
  const getUserPseudo = async (userId) => {
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

  // Fonction pour envoyer un message
  const send = async () => {
    // Vérifie que le message n'est pas vide
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
        const userId = 2;
        const profilePicture = await getUserProfilePicture(userId);
        const pseudo = await getUserPseudo(userId);
        const newMessage = {
          message: inputMessage,
          sender: pseudo,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          userId,
          profilePicture,
        };
        // Emit le nouveau message
        socket.emit("chat-message", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // Réinitialise l'input du message
        setInputMessage("");
      }
    } else {
      alert("Please enter a non-empty message");
    }
  };
  // Quand on envoie le message via la touche entré
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      send();
    }
  };

  const banUser = (userId) => {
    console.log("j'ai cliquer sur ban là gros");
    // Envoyer une demande au serveur pour bannir l'utilisateur
    socket.emit("ban-user", { userId });
  };
  // Mise à jour du scroll lorsque de nouveaux messages sont ajoutés :
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
          {messages.map((message, index) => (
            <li key={index} className="bg-white p-4 rounded-lg flex">
              <div className="relative mr-4">
                {message.profilePicture && (
                  <img
                    src={message.profilePicture}
                    alt={`tg`}
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
              {/* Bouton d'administration, par exemple "Ban" */}
              {isAdmin && (
                <button
                  onClick={() => banUser(message.userId)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Ban
                </button>
              )}
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
        <div>
          <h1>Streamer: {isStreamer}</h1>
        </div>
      </div>
    </div>
  );
}
