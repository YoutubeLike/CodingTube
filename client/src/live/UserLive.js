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
  const [UserSize, setUserSize] = useState();
  const socket = io("http://localhost:5000");
  const [Socket, SetSocket] = useState(socket);

  useEffect(() => {
    // SetSocket(socket);
    socket.emit("AskUserCount", { user: user });

    socket.on(
      "user-count",
      (arg) => {
        setUserSize(arg.size);
        console.log(arg.size);
      },
      []
    );
  });

  console.log(Socket);

  return (
    <>
      <p> {user} </p>
      <div className="section-live-chat flex flex-col items-start md:flex-row w-full h-screen">
        <div
          style={{ width: "100%", height: "auto" }}
          class="video-container w-auto flex flex-col"
        >
          <div>
            <ReactPlayer
              style={{}}
              className="video-container2 bg-slate-400 relative"
              url={"http://localhost:8090/live/" + user + ".flv"}
              controls={false}
              playing={false}
              pip={false}
            />
            <img
              className="bottom-96"
              style={{ position: "relative" }}
              src="/live/offline.jpg"
            />
          </div>

          <p>{UserSize}bonjour les gens </p>
        </div>

        <Chat user={user} socket={Socket} />
      </div>
      {/* <button onClick={SendWidget}> Appuye moi </button> */}
    </>
  );
}

export async function SendWidget() {
  io("http://localhost:5000").emit("send");
}
