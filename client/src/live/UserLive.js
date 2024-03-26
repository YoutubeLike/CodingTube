import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ReactPlayer from "react-player";
// syntaxe "import"
import { io } from "socket.io-client";
import Chat from "./chat.js";

export async function loader({ params }) {
  const user = params.user;
  return { user };
}

export default function LiveFromUser() {
  const { user } = useLoaderData();
  console.log(user);

  return (
    <>
      <p> {user} </p>
      <div className="section-live-chat">
        <ReactPlayer
          className="live_container absolute left-0 right-1/3"
          url={"http://localhost:8090/live/" + user + ".flv"}
          controls={false}
          playing={false}
          pip={false}
        />
        <Chat user={user} />
      </div>

      <button onClick={SendWidget}> Appuye moi </button>
    </>
  );
}

export async function ConnectToRoom() {}

export async function SendWidget() {
  io("http://localhost:5000").emit("send");
  // axios.get('http://localhost:5000/api/live/test')
}
