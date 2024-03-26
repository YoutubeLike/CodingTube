import { useState } from "react";
import { io } from "socket.io-client";

export default function Test() {
  const [message, SetMessage] = useState([]);
  // Quand le serveur reçois un message il fait apparaitre le widget pendant 2 second (2000 millisecond)
  io("http://localhost:5000").on("chat-message", () => {
    console.log("message recu");
    SetMessage(
      "https://media3.giphy.com/media/qIltqcndvrtp7kXQjb/200w.gif?cid=6c09b952ajxtj9hjcijy96rwxqqw7paqs2srr8uioiqfxcid&ep=v1_gifs_search&rid=200w.gif&ct=g"
    );
    setTimeout(function () {
      SetMessage("");
    }, 2000);
  });
  return (
    <>
      <p>
        <img src="{message}"></img>
      </p>
    </>
  );
}
